import { test, expect, type Page } from "@playwright/test";
import { assentarTudo, esperarMovimentoParar } from "./helpers";

/**
 * Contraste do texto que pousa sobre fotografia.
 *
 * Este teste existe porque o axe **não** cobre este caso. Ele lê a cor de
 * fundo computada do elemento; sobre uma imagem essa cor é transparente, e o
 * resultado sai como `incomplete`, não como violação — ou seja, passa batido
 * numa suíte que só reprova violações.
 *
 * Aqui a medição é no pixel:
 *
 *   1. esconde só o texto da região (a fotografia e os véus continuam lá);
 *   2. tira um screenshot dessa região — é o fundo real que o texto vai pisar;
 *   3. para cada nó de texto, recorta a caixa dele nesse screenshot e calcula
 *      a razão de contraste WCAG contra o **p99** de luminância do recorte —
 *      o pior pedaço real do fundo, descartando 1% de outliers de compressão.
 *
 * A conta roda dentro do navegador, num canvas, para não depender de nenhuma
 * biblioteca de imagem além do próprio Chromium.
 *
 * Se um dia a foto do hero for trocada pela do prédio de verdade, é este teste
 * que vai dizer se o véu ainda dá conta — antes de alguém publicar.
 */

/** Mínimos da WCAG 2.1 AA: 3:1 para texto grande, 4.5:1 para o resto. */
const MINIMO_GRANDE = 3;
const MINIMO_NORMAL = 4.5;

type Medida = {
  texto: string;
  cor: string;
  px: number;
  grande: boolean;
  razao: number;
  minimo: number;
};

async function medirTextoSobreFoto(page: Page, seletor: string): Promise<Medida[]> {
  const regiao = page.locator(seletor).first();
  await regiao.scrollIntoViewIfNeeded();
  await esperarMovimentoParar(page);

  // 1. caixa, cor e corpo de cada nó de texto da região
  const alvos = await regiao.evaluate((raiz) => {
    const base = raiz.getBoundingClientRect();
    const saida: {
      texto: string;
      cor: string;
      px: number;
      grande: boolean;
      x: number;
      y: number;
      w: number;
      h: number;
    }[] = [];

    for (const el of Array.from(raiz.querySelectorAll("*"))) {
      const texto = Array.from(el.childNodes)
        .filter((n) => n.nodeType === Node.TEXT_NODE)
        .map((n) => n.textContent?.trim() ?? "")
        .join(" ")
        .trim();
      if (!texto) continue;

      const estilo = getComputedStyle(el);
      // fundo próprio (botões) resolve o próprio contraste; invisível não conta
      if (estilo.backgroundColor !== "rgba(0, 0, 0, 0)") continue;
      if (Number(estilo.opacity) < 0.9) continue;

      const caixa = el.getBoundingClientRect();
      if (caixa.width < 6 || caixa.height < 6) continue;

      const px = parseFloat(estilo.fontSize);
      saida.push({
        texto: texto.slice(0, 48),
        cor: estilo.color,
        px,
        grande: px >= 24 || (px >= 18.66 && Number(estilo.fontWeight) >= 700),
        x: caixa.x - base.x,
        y: caixa.y - base.y,
        w: caixa.width,
        h: caixa.height,
      });
    }
    return saida;
  });

  expect(alvos.length, `nenhum texto encontrado em ${seletor}`).toBeGreaterThan(0);

  // 2. a mesma região, sem texto: o fundo puro.
  //
  // Apaga pela cor, e não por `visibility`/lista de tags: metade do texto
  // desta página mora dentro de um `<div class="reveal">`, então qualquer
  // seletor por tag deixaria justamente o parágrafo do hero visível — e a
  // medição leria os próprios pixels da letra como se fossem o fundo.
  await page.addStyleTag({
    content: `${seletor} *, ${seletor} { color: transparent !important; -webkit-text-fill-color: transparent !important; }`,
  });
  await page.waitForTimeout(150);
  const fundo = (await regiao.screenshot()).toString("base64");

  // 3. razão de contraste de cada alvo contra o p99 do seu recorte
  return page.evaluate(
    async ({ alvos, fundo, minimoGrande, minimoNormal }) => {
      const bitmap = await createImageBitmap(
        await (await fetch(`data:image/png;base64,${fundo}`)).blob(),
      );
      const canvas = document.createElement("canvas");
      canvas.width = bitmap.width;
      canvas.height = bitmap.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(bitmap, 0, 0);

      // o screenshot sai em pixels de dispositivo; as caixas, em CSS
      const escala = bitmap.width / Math.round(bitmap.width / devicePixelRatio);

      const canal = (c: number) => {
        const v = c / 255;
        return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      };
      const luz = (r: number, g: number, b: number) =>
        0.2126 * canal(r) + 0.7152 * canal(g) + 0.0722 * canal(b);
      const razaoEntre = (a: number, b: number) =>
        (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);

      return alvos.map((alvo) => {
        const x = Math.max(0, Math.round(alvo.x * escala));
        const y = Math.max(0, Math.round(alvo.y * escala));
        const w = Math.min(canvas.width - x, Math.round(alvo.w * escala));
        const h = Math.min(canvas.height - y, Math.round(alvo.h * escala));

        const dados = ctx.getImageData(x, y, Math.max(1, w), Math.max(1, h)).data;
        const luzes: number[] = [];
        for (let i = 0; i < dados.length; i += 4) {
          luzes.push(luz(dados[i], dados[i + 1], dados[i + 2]));
        }
        luzes.sort((a, b) => a - b);
        const piorFundo = luzes[Math.floor(luzes.length * 0.99)];

        const [r, g, b] = alvo.cor.match(/\d+/g)!.map(Number);
        return {
          texto: alvo.texto,
          cor: alvo.cor,
          px: alvo.px,
          grande: alvo.grande,
          razao: razaoEntre(luz(r, g, b), piorFundo),
          minimo: alvo.grande ? minimoGrande : minimoNormal,
        };
      });
    },
    { alvos, fundo, minimoGrande: MINIMO_GRANDE, minimoNormal: MINIMO_NORMAL },
  );
}

function reprovados(medidas: Medida[]) {
  return medidas
    .filter((m) => m.razao < m.minimo)
    .map(
      (m) =>
        `${m.razao.toFixed(2)}:1 (mín ${m.minimo}) · ${Math.round(m.px)}px ${m.cor} · "${m.texto}"`,
    );
}

test.describe("contraste sobre fotografia", () => {
  test("todo texto do hero se lê sobre a foto do saguão", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const medidas = await medirTextoSobreFoto(page, "#topo");

    // o hero tem texto de sobra; se este número cair, algo sumiu sem querer
    expect(medidas.length).toBeGreaterThanOrEqual(8);
    expect(reprovados(medidas)).toEqual([]);
  });

  test("a legenda da central se lê sobre a foto do prédio à noite", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const medidas = await medirTextoSobreFoto(page, "#central figure");
    expect(reprovados(medidas)).toEqual([]);
  });

  test("a legenda da passagem se lê sobre o grafite, não sobre a foto", async ({
    page,
  }) => {
    await page.goto("/");
    await assentarTudo(page);

    // A legenda da faixa fica *abaixo* da imagem, no grafite — é isso que
    // permite que ela seja texto corrido e não uma tarja sobre a foto.
    const sobrepoe = await page.evaluate(() => {
      const legenda = document.querySelector("figcaption .reveal");
      const img = legenda?.closest("figure")?.querySelector("img");
      if (!legenda || !img) return null;
      const a = legenda.getBoundingClientRect();
      const b = img.getBoundingClientRect();
      return a.top < b.bottom - 1;
    });

    expect(sobrepoe, "a legenda da passagem não deve pousar sobre a imagem").toBe(
      false,
    );
  });
});
