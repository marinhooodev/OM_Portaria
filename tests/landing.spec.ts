import { test, expect } from "@playwright/test";
import { assentarTudo, rolarAPaginaToda, SECOES } from "./helpers";

/**
 * Estrutura e comportamento da página — o que ela promete ao visitante.
 */

test.describe("estrutura da página única", () => {
  test("entrega o arco inteiro numa só página, na ordem certa", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    for (const id of SECOES) {
      await expect(page.locator(`#${id}`)).toHaveCount(1);
    }

    // a ordem das seções no DOM é o arco emocional; não pode embaralhar
    const ordem = await page
      .locator("main section[id]")
      .evaluateAll((els) => els.map((el) => el.id));
    expect(ordem).toEqual(["topo", ...SECOES]);
  });

  test("a promessa central está no h1", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("não chama atenção");
  });

  test("todo link interno aponta para uma âncora que existe", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const alvos = await page
      .locator('a[href^="#"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href")!.slice(1)));

    for (const alvo of new Set(alvos)) {
      await expect(page.locator(`#${alvo}`), `âncora #${alvo}`).toHaveCount(1);
    }
  });

  /**
   * A página passou a ter fotografia. Este teste substitui o antigo
   * "nenhuma imagem": o que precisa ser garantido agora não é a ausência de
   * imagens, é a disciplina delas.
   */
  test("toda fotografia entra otimizada, medida e descrita", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const fotos = await page.locator("img").evaluateAll((els) =>
      els.map((el) => {
        const img = el as HTMLImageElement;
        return {
          src: img.getAttribute("src") ?? "",
          alt: img.getAttribute("alt"),
          loading: img.getAttribute("loading"),
          largura: img.getAttribute("width"),
          altura: img.getAttribute("height"),
          posicao: getComputedStyle(img).position,
        };
      }),
    );

    expect(fotos.length).toBeGreaterThan(0);

    for (const foto of fotos) {
      // passou pelo otimizador do Next — nada de JPEG cru de 2000px
      expect(foto.src, `src de ${foto.src}`).toContain("/_next/image");

      // `alt` sempre presente; vazio só é aceitável em imagem decorativa,
      // e a única decorativa da página é o fundo do hero
      expect(foto.alt, `alt de ${foto.src}`).not.toBeNull();

      // espaço reservado antes de baixar: ou dimensões próprias, ou `fill`
      // dentro de um contêiner que já tem proporção definida
      const temMedida = foto.largura !== null && foto.altura !== null;
      const preencheOContainer = foto.posicao === "absolute";
      expect(temMedida || preencheOContainer, `medidas de ${foto.src}`).toBe(true);
    }

    // exatamente uma imagem sai na frente: a do hero. Todas as outras esperam
    // a sua vez, senão a primeira dobra disputa banda com o resto da página.
    const adiantadas = fotos.filter((f) => f.loading !== "lazy");
    expect(adiantadas).toHaveLength(1);
    expect(adiantadas[0].alt).toBe("");
  });
});

test.describe("dossiê de serviços", () => {
  test("abre e fecha com o peso de uma gaveta, sem sumir com o resumo", async ({
    page,
  }) => {
    await page.goto("/");
    await assentarTudo(page);

    const primeiro = page.locator("#servicos button[aria-expanded]").first();

    // a primeira linha já nasce aberta: ninguém precisa clicar para entender
    await expect(primeiro).toHaveAttribute("aria-expanded", "true");

    const idPainel = await primeiro.getAttribute("aria-controls");
    const painel = page.locator(`#${idPainel}`);
    await expect(painel).toBeVisible();

    await primeiro.click();
    await expect(primeiro).toHaveAttribute("aria-expanded", "false");
    // fechado, sai da árvore de acessibilidade
    await expect(painel).toHaveAttribute("inert", "");

    // título e resumo continuam legíveis mesmo com a linha fechada
    await expect(
      page.getByRole("heading", { name: /Segurança patrimonial/ }),
    ).toBeVisible();
  });

  test("todos os seis serviços estão presentes", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);
    await expect(page.locator("#servicos button[aria-expanded]")).toHaveCount(6);
  });

  test("responde ao teclado", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const segundo = page.locator("#servicos button[aria-expanded]").nth(1);
    await segundo.focus();
    await expect(segundo).toHaveAttribute("aria-expanded", "false");

    await page.keyboard.press("Enter");
    await expect(segundo).toHaveAttribute("aria-expanded", "true");

    await page.keyboard.press("Enter");
    await expect(segundo).toHaveAttribute("aria-expanded", "false");
  });
});

test.describe("presença ao vivo", () => {
  test("o relógio da central corre em horário de Brasília", async ({ page }) => {
    await page.goto("/");

    const relogio = page.locator("#topo").getByText(/\d{2}:\d{2}:\d{2}/).first();
    await expect(relogio).toBeVisible();

    const primeira = await relogio.textContent();
    await page.waitForTimeout(1600);
    const segunda = await relogio.textContent();

    expect(segunda).not.toBe(primeira);
  });
});

test.describe("o convite final", () => {
  test("o formulário monta a mensagem e abre o WhatsApp", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    // captura o window.open em vez de deixar abrir uma aba de verdade
    await page.evaluate(() => {
      (window as unknown as { __urlAberta?: string }).__urlAberta = undefined;
      window.open = (url?: string | URL) => {
        (window as unknown as { __urlAberta?: string }).__urlAberta = String(url);
        return null;
      };
    });

    await page.getByLabel("Nome").fill("Marina Alencar");
    await page.getByLabel("Telefone ou e-mail").fill("11 98888-7777");
    await page.getByLabel("Cidade").fill("Santo André");
    await page.getByLabel("Como é a rotina hoje").fill("Dois acessos, três turnos.");

    await page.getByRole("button", { name: /Enviar pelo WhatsApp/ }).click();

    const url = await page.evaluate(
      () => (window as unknown as { __urlAberta?: string }).__urlAberta,
    );

    expect(url).toContain("https://wa.me/");
    expect(decodeURIComponent(url!)).toContain("Marina Alencar");
    expect(decodeURIComponent(url!)).toContain("Santo André");
    expect(decodeURIComponent(url!)).toContain("Condomínio residencial");
  });

  test("o formulário exige o essencial antes de enviar", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    for (const rotulo of ["Nome", "Telefone ou e-mail"]) {
      await expect(page.getByLabel(rotulo)).toHaveAttribute("required", "");
    }
  });

  test("as vias diretas de contato estão a um toque", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    // Os dois canais que a empresa realmente publica — nem mais, nem menos.
    const contato = page.locator("#contato");
    await expect(contato.locator('a[href^="https://wa.me/"]').first()).toBeVisible();
    await expect(contato.locator('a[href^="mailto:"]').first()).toBeVisible();

    // o número e o e-mail precisam ser os reais, não os de exemplo
    await expect(contato.locator('a[href="https://wa.me/5511984058255"]').first()).toBeVisible();
    await expect(
      contato.locator('a[href="mailto:omportaria.contato@gmail.com"]').first(),
    ).toBeVisible();
  });
});

test.describe("movimento", () => {
  test("o conteúdo assenta conforme a página desce", async ({ page }) => {
    await page.goto("/");

    const alvo = page.locator("#servicos .reveal").first();
    await expect(alvo).toHaveAttribute("data-settled", "false");

    await rolarAPaginaToda(page);
    await expect(alvo).toHaveAttribute("data-settled", "true");
  });

  test("com movimento reduzido, nada se move e nada some", async ({ browser }) => {
    const contexto = await browser.newContext({ reducedMotion: "reduce" });
    const page = await contexto.newPage();
    await page.goto("/");

    const alvo = page.locator("#contato .reveal").first();
    // sem rolar até lá: precisa já estar legível
    const opacidade = await alvo.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacidade)).toBe(1);

    await contexto.close();
  });

  test("sem JavaScript o conteúdo continua todo visível", async ({ browser }) => {
    const contexto = await browser.newContext({ javaScriptEnabled: false });
    const page = await contexto.newPage();
    await page.goto("/");

    await expect(page.locator("h1")).toBeVisible();

    const opacidade = await page
      .locator("#contato .reveal")
      .first()
      .evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacidade)).toBe(1);

    await contexto.close();
  });
});
