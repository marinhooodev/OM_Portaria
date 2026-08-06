import type { Page } from "@playwright/test";

/**
 * Força todos os blocos `Reveal` ao estado final.
 *
 * O conteúdo assenta com opacidade 0 → 1 conforme o scroll. Para auditar
 * contraste e ler texto de forma determinística, precisamos da página no
 * estado em que o visitante de fato a lê: tudo assentado, nada em trânsito.
 */
export async function assentarTudo(page: Page) {
  // A transição dura 1s. Medir contraste no meio dela leria a cor mesclada com
  // o fundo, não a cor real — por isso desligamos o movimento antes de marcar
  // tudo como assentado.
  await page.addStyleTag({
    content: `.reveal { transition: none !important; opacity: 1 !important; transform: none !important; }`,
  });
  await page.evaluate(() => {
    document
      .querySelectorAll("[data-settled]")
      .forEach((el) => el.setAttribute("data-settled", "true"));
  });
  await page.waitForTimeout(60);
}

/**
 * Espera toda transição CSS terminar.
 *
 * Auditar contraste no meio de um fade lê a cor mesclada com o fundo e acusa
 * falha onde não há. Filtra só transições: as animações do ponto de presença e
 * da varredura da central são infinitas e nunca terminariam.
 */
export async function esperarMovimentoParar(page: Page) {
  await page.waitForFunction(
    () =>
      document
        .getAnimations()
        .filter((a) => a.constructor.name === "CSSTransition").length === 0,
    undefined,
    { timeout: 5000 },
  );
}

/** Percorre a página inteira, como um visitante faria, e volta ao topo. */
export async function rolarAPaginaToda(page: Page) {
  await page.evaluate(async () => {
    const passo = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += passo) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 120));
  });
}

/** Seções esperadas, na ordem do arco emocional do scroll. */
export const SECOES = ["servicos", "metodo", "central", "confianca", "contato"] as const;
