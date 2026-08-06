"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Faz o conteúdo *assentar* na posição conforme a página rola.
 *
 * Não é uma entrada animada: é um bloco pesado encontrando o seu lugar e
 * parando ali. Sem salto, sem elástico, sem repetição — uma vez assentado,
 * fica assentado (o observer se desconecta).
 *
 * O atributo é escrito direto no DOM em vez de virar estado do React: são
 * dezenas destes por página, e nenhum precisa provocar re-render. O React fica
 * de fora do laço de scroll inteiro.
 *
 * Sem JavaScript, `@media (scripting: enabled)` no globals.css garante que o
 * conteúdo já nasça visível em vez de sumir.
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  imediato = false,
  ...resto
}: {
  children: ReactNode;
  as?: ElementType;
  /** Escalona a chegada de itens irmãos, em ms. Use passos de 90–120ms. */
  delay?: number;
  className?: string;
  /**
   * Nasce assentado, sem esperar scroll nem JavaScript.
   *
   * Obrigatório para qualquer coisa acima da dobra: um elemento em opacidade 0
   * não conta como candidato a LCP, então animar a entrada do conteúdo do topo
   * atrasaria a métrica pelo tempo inteiro da transição. E, de todo modo, o
   * saguão não aparece aos poucos quando você entra — ele já está aceso.
   */
  imediato?: boolean;
  /** `id`, `aria-*` e afins seguem para o elemento renderizado. */
  [prop: string]: unknown;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (imediato) return;

    const node = ref.current;
    if (!node) return;

    const assentar = () => node.setAttribute("data-settled", "true");

    if (!("IntersectionObserver" in window)) {
      assentar();
      return;
    }

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        assentar();
        observer.disconnect();
      },
      // Começa um pouco antes de o bloco entrar de fato: o movimento termina
      // enquanto o leitor ainda está chegando, nunca sob o olhar dele.
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [imediato]);

  return (
    <Tag
      {...resto}
      ref={ref}
      className={`reveal ${className}`}
      data-settled={imediato ? "true" : "false"}
      style={
        delay && !imediato
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
