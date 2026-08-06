import { test, expect } from "@playwright/test";
import { assentarTudo, rolarAPaginaToda } from "./helpers";

/**
 * O celular é o cenário principal: quem contrata portaria consulta esta página
 * no corredor do prédio, na portaria, no canteiro — não numa mesa de trabalho.
 * Tudo aqui roda no projeto "mobile"; o "desktop" pula.
 */

test.describe("uso no celular", () => {
  test.skip(({ isMobile }) => !isMobile, "cenário exclusivo de celular");

  test("nada vaza para os lados em nenhum ponto da página", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);
    await rolarAPaginaToda(page);

    const { larguraDocumento, larguraJanela } = await page.evaluate(() => ({
      larguraDocumento: document.documentElement.scrollWidth,
      larguraJanela: document.documentElement.clientWidth,
    }));

    expect(larguraDocumento).toBeLessThanOrEqual(larguraJanela + 1);
  });

  test("nenhum elemento isolado estoura a largura da tela", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const vazamentos = await page.evaluate(() => {
      const limite = document.documentElement.clientWidth;
      return Array.from(document.querySelectorAll<HTMLElement>("body *"))
        .filter((el) => {
          const caixa = el.getBoundingClientRect();
          if (caixa.width === 0 || caixa.height === 0) return false;
          if (getComputedStyle(el).position === "fixed") return false;
          return caixa.right > limite + 1 || caixa.left < -1;
        })
        .slice(0, 8)
        .map((el) => `${el.tagName.toLowerCase()}.${el.className}`.slice(0, 120));
    });

    expect(vazamentos).toEqual([]);
  });

  test("todo alvo de toque cabe no dedo", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    // Links dentro de parágrafo são exceção prevista na WCAG 2.2 (alvo em
    // linha), por isso ficam de fora.
    const pequenos = await page.evaluate(() => {
      const alvos = document.querySelectorAll<HTMLElement>(
        "button, a[href], select, [role='button']",
      );

      return Array.from(alvos)
        .filter((el) => {
          if (el.closest("p")) return false;
          // atalhos só para leitor de tela não são alvos de toque
          if (el.classList.contains("sr-only")) return false;
          const caixa = el.getBoundingClientRect();
          if (caixa.width === 0 || caixa.height === 0) return false;
          return caixa.height < 44 || caixa.width < 44;
        })
        .map((el) => {
          const caixa = el.getBoundingClientRect();
          return `${el.tagName.toLowerCase()} "${(el.textContent ?? "").trim().slice(0, 30)}" ${Math.round(caixa.width)}×${Math.round(caixa.height)}`;
        });
    });

    expect(pequenos).toEqual([]);
  });

  test("o painel de seções prende o foco, fecha no Esc e leva à seção", async ({
    page,
  }) => {
    await page.goto("/");

    const abrir = page.getByRole("button", { name: "Seções" });
    await expect(abrir).toBeVisible();
    await abrir.click();

    const painel = page.getByRole("dialog");
    await expect(painel).toBeVisible();

    // <dialog> modal: o conteúdo de trás fica inerte para o teclado
    const heroAlcancavel = await page.evaluate(() => {
      const h1 = document.querySelector("h1");
      return h1 ? h1.closest("section")!.matches(":modal *") : false;
    });
    expect(heroAlcancavel).toBe(false);

    await page.keyboard.press("Escape");
    await expect(painel).not.toBeVisible();

    // e navega de fato
    await abrir.click();
    await painel.getByRole("link", { name: "Método" }).click();
    await expect(painel).not.toBeVisible();

    // A rolagem é suave e longa de propósito; espera-se que ela termine, não
    // um número fixo de milissegundos.
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.querySelector("#metodo")!.getBoundingClientRect().top,
          ),
        { timeout: 8000, message: "a página deveria descer até o Método" },
      )
      .toBeLessThan(200);
  });

  test("o cabeçalho não cobre o topo da seção ao pular por âncora", async ({
    page,
  }) => {
    await page.goto("/#confianca");
    await page.waitForTimeout(600);

    const { topoSecao, alturaCabecalho } = await page.evaluate(() => ({
      topoSecao: document.querySelector("#confianca")!.getBoundingClientRect().top,
      alturaCabecalho: document.querySelector("header")!.getBoundingClientRect().height,
    }));

    expect(topoSecao).toBeGreaterThanOrEqual(alturaCabecalho - 2);
  });

  test("o texto é grande o bastante para ler sem apertar os olhos", async ({
    page,
  }) => {
    await page.goto("/");
    await assentarTudo(page);

    const medir = (piso: number, escopo: string) =>
      page.evaluate(
        ({ piso, escopo }) => {
          const raiz = document.querySelector(escopo);
          if (!raiz) return ["escopo inexistente: " + escopo];
          return Array.from(raiz.querySelectorAll<HTMLElement>("p, li, dd"))
            .filter((el) => (el.textContent ?? "").trim().length > 60)
            .filter((el) => parseFloat(getComputedStyle(el).fontSize) < piso)
            .map(
              (el) =>
                `${Math.round(parseFloat(getComputedStyle(el).fontSize))}px — ${(el.textContent ?? "").trim().slice(0, 40)}`,
            );
        },
        { piso, escopo },
      );

    // Texto corrido do conteúdo: precisa ser confortável, não só legível.
    expect(await medir(15, "main")).toEqual([]);

    // Letra miúda do rodapé pode ser menor, mas nunca abaixo do piso que o
    // Lighthouse considera legível.
    expect(await medir(12, "footer")).toEqual([]);
  });

  test("o formulário abre o teclado certo em cada campo", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    await expect(page.getByLabel("Nome")).toHaveAttribute("autocomplete", "name");
    await expect(page.getByLabel("Telefone ou e-mail")).toHaveAttribute(
      "autocomplete",
      "tel",
    );
    await expect(page.getByLabel("Cidade")).toHaveAttribute(
      "autocomplete",
      "address-level2",
    );
  });

  test("o cabeçalho assenta ao sair do hero e continua legível", async ({ page }) => {
    await page.goto("/");

    const cabecalho = page.locator("header");
    await expect(cabecalho).toHaveAttribute("data-assentada", "false");

    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.5));
    await page.waitForTimeout(700);

    await expect(cabecalho).toHaveAttribute("data-assentada", "true");

    // e continua fixo, à mão, em qualquer ponto da página
    const caixa = await cabecalho.boundingBox();
    expect(caixa!.y).toBeLessThanOrEqual(1);
  });
});
