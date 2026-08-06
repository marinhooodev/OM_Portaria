import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { assentarTudo, esperarMovimentoParar } from "./helpers";

/**
 * Acessibilidade — auditoria axe em cada estado que a página pode assumir.
 * Uma varredura só no estado inicial não prova nada: o acordeão, o painel de
 * seções e o formulário mudam a árvore.
 */

const REGRAS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"];

const scan = (page: Page) => new AxeBuilder({ page }).withTags(REGRAS);

/**
 * O relatório cru do axe tem milhares de linhas por violação. Isto reduz a
 * uma linha por nó: regra, elemento e — no caso de contraste — os números que
 * importam para corrigir.
 */
async function violacoes(page: Page, escopo?: string) {
  const construtor = scan(page);
  const resultado = await (escopo ? construtor.include(escopo) : construtor).analyze();

  return resultado.violations.flatMap((violacao) =>
    violacao.nodes.map((no) => {
      const contraste = no.any.find((c) => c.id === "color-contrast")?.data as
        | { contrastRatio?: number; fgColor?: string; bgColor?: string; fontSize?: string }
        | undefined;

      const detalhe = contraste
        ? ` [${contraste.contrastRatio}:1 ${contraste.fgColor} sobre ${contraste.bgColor}, ${contraste.fontSize}]`
        : "";

      return `${violacao.id}: ${no.html.slice(0, 110)}${detalhe}`;
    }),
  );
}

test.describe("acessibilidade", () => {
  test("página em repouso, tudo assentado", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    expect(await violacoes(page)).toEqual([]);
  });

  test("com todos os serviços abertos", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    // abre cada linha do dossiê que ainda estiver fechada
    const gatilhos = page.locator('#servicos button[aria-expanded]');
    const total = await gatilhos.count();
    for (let i = 0; i < total; i++) {
      const gatilho = gatilhos.nth(i);
      if ((await gatilho.getAttribute("aria-expanded")) === "false") {
        await gatilho.click();
      }
    }
    await esperarMovimentoParar(page);

    expect(await violacoes(page)).toEqual([]);
  });

  test("com todos os serviços fechados", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    const gatilhos = page.locator('#servicos button[aria-expanded]');
    const total = await gatilhos.count();
    for (let i = 0; i < total; i++) {
      const gatilho = gatilhos.nth(i);
      if ((await gatilho.getAttribute("aria-expanded")) === "true") {
        await gatilho.click();
      }
    }
    await esperarMovimentoParar(page);

    expect(await violacoes(page)).toEqual([]);
  });

  test("painel de seções aberto", async ({ page, isMobile }, testInfo) => {
    test.skip(
      testInfo.project.name === "desktop" && !isMobile,
      "o painel só existe abaixo de lg",
    );

    await page.goto("/");
    await assentarTudo(page);
    await page.getByRole("button", { name: "Seções" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await esperarMovimentoParar(page);

    expect(await violacoes(page)).toEqual([]);
  });

  test("cabeçalho após assentar sobre o calcário", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, window.innerHeight * 1.2));
    await page.waitForTimeout(700);
    await assentarTudo(page);

    // o header muda de cor ao sair do hero — contraste precisa valer nos dois
    expect(await violacoes(page, "header")).toEqual([]);
  });

  test("marcos de página e hierarquia de títulos", async ({ page }) => {
    await page.goto("/");
    await assentarTudo(page);

    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");

    // nenhum salto de nível (h1 → h3 sem h2 no meio)
    const niveis = await page
      .locator("h1, h2, h3")
      .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));

    for (let i = 1; i < niveis.length; i++) {
      expect(niveis[i] - niveis[i - 1]).toBeLessThanOrEqual(1);
    }
  });

  test("o link de pular conteúdo aparece ao receber foco", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");

    const pular = page.getByRole("link", { name: "Pular para o conteúdo" });
    await expect(pular).toBeFocused();

    const caixa = await pular.boundingBox();
    expect(caixa).not.toBeNull();
    expect(caixa!.width).toBeGreaterThan(80);
  });
});
