"use client";

import { useEffect, useRef, useState } from "react";
import { Wordmark } from "@/components/marque";
import { empresa, navegacao } from "@/lib/content";

/**
 * Barra fixa. Sobre o hero ela é quase invisível — só a marca flutuando no
 * grafite. Ao sair do hero, assenta numa faixa de calcário com um filete
 * embaixo. A transição leva 600ms de propósito: fecha como uma porta pesada em
 * dobradiças boas, não como um menu que aparece.
 *
 * O painel de seções do celular é um <dialog> nativo: prisão de foco, Esc e
 * inércia do resto da página vêm do navegador, não de JavaScript improvisado.
 */
export function SiteHeader() {
  const [assentada, setAssentada] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let frame = 0;

    const aoRolar = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setAssentada(window.scrollY > window.innerHeight * 0.72);
      });
    };

    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      window.removeEventListener("scroll", aoRolar);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const abrirMenu = () => {
    dialogRef.current?.showModal();
    setMenuAberto(true);
  };

  const fecharMenu = () => {
    dialogRef.current?.close();
  };

  /**
   * Um <dialog> modal vive na top layer e tem o próprio contexto de rolagem:
   * deixar o link de âncora agir sozinho rolaria o painel, não a página, e o
   * visitante voltaria para o topo ao fechar. Então fechamos primeiro e
   * rolamos a página em seguida — `scrollIntoView()` sem argumento herda o
   * `scroll-behavior` e o `scroll-padding-top` do CSS, o que preserva tanto a
   * suavidade quanto o respeito a `prefers-reduced-motion`.
   */
  const irParaSecao = (evento: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    evento.preventDefault();
    fecharMenu();
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView();
      history.replaceState(null, "", `#${id}`);
    });
  };

  return (
    <>
      <a
        href="#servicos"
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60"
      >
        Pular para o conteúdo
      </a>

      <header
        data-assentada={assentada}
        className={[
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,color,backdrop-filter] duration-500 ease-door",
          assentada
            ? "on-stone border-[color:var(--rule)] bg-stone-50/94 text-ink-900 backdrop-blur-md"
            : "on-ink border-transparent text-stone-50",
        ].join(" ")}
      >
        <div className="shell flex h-[4.75rem] items-center justify-between gap-8">
          <a
            href="#topo"
            className="inline-flex min-h-11 items-center transition-opacity duration-500 ease-door hover:opacity-70"
            aria-label={`${empresa.nome} — voltar ao início`}
          >
            <Wordmark live={!assentada} />
          </a>

          <nav aria-label="Seções da página" className="hidden items-center gap-9 lg:flex">
            {navegacao.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={[
                  "eyebrow inline-flex min-h-11 items-center transition-colors duration-500 ease-door",
                  assentada
                    ? "text-stone-600 hover:text-ink-900"
                    : "text-ink-200 hover:text-stone-50",
                ].join(" ")}
              >
                {item.rotulo}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contato"
              className="btn btn-primary hidden h-12 px-5 text-[0.8125rem] sm:inline-flex"
            >
              Falar com o responsável
            </a>

            <button
              type="button"
              onClick={abrirMenu}
              className="btn btn-ghost h-12 px-5 text-[0.8125rem] lg:hidden"
              aria-haspopup="dialog"
              aria-expanded={menuAberto}
            >
              Seções
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={dialogRef}
        aria-label="Seções da página"
        onClose={() => setMenuAberto(false)}
        onClick={(evento) => {
          // Fecha ao clicar fora do painel (o alvo é o próprio <dialog>).
          if (evento.target === dialogRef.current) fecharMenu();
        }}
        className="menu-dialog on-ink text-stone-50"
      >
        <div className="flex min-h-[100dvh] flex-col bg-ink-950">
          <div className="shell flex h-[4.75rem] shrink-0 items-center justify-between">
            <Wordmark live />
            <button
              type="button"
              onClick={fecharMenu}
              className="btn btn-ghost h-12 px-5 text-[0.8125rem]"
            >
              Fechar
            </button>
          </div>

          <nav aria-label="Seções" className="shell mt-8 pb-12">
            <ul className="border-t hair">
              {navegacao.map((item, i) => (
                <li key={item.id} className="border-b hair">
                  <a
                    href={`#${item.id}`}
                    onClick={(evento) => irParaSecao(evento, item.id)}
                    className="flex items-baseline gap-5 py-6 transition-colors duration-500 ease-door hover:text-vig-300"
                  >
                    <span className="eyebrow numeral text-ink-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="display-3">{item.rotulo}</span>
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contato"
              onClick={(evento) => irParaSecao(evento, "contato")}
              className="btn btn-primary mt-10 w-full"
            >
              Falar com o responsável
            </a>
          </nav>
        </div>
      </dialog>
    </>
  );
}
