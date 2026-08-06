import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";

/**
 * Cabeçalho de seção no formato de dossiê: índice, filete, etiqueta.
 * O índice numerado dá ao scroll a cadência de um documento bem organizado —
 * o leitor sempre sabe em que parte da conversa está.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  children,
  tone = "stone",
  align = "start",
}: {
  index: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  tone?: "stone" | "ink";
  align?: "start" | "wide";
}) {
  const eyebrowColor = tone === "ink" ? "text-vig-400" : "text-azul-700";
  const indexColor = tone === "ink" ? "text-ink-400" : "text-stone-500";
  const bodyColor = tone === "ink" ? "text-ink-200" : "text-stone-700";

  return (
    // <div> e não <header>: um <header> por seção poluiria a leitura de
    // marcos da página, onde só o cabeçalho do site deve figurar.
    <div className={align === "wide" ? "" : "max-w-3xl"}>
      <Reveal className="flex items-center gap-4">
        <span className={`eyebrow numeral ${indexColor}`}>{index}</span>
        <span className="rule-x w-8 shrink-0" aria-hidden="true" />
        <span className={`eyebrow ${eyebrowColor}`}>{eyebrow}</span>
      </Reveal>

      <Reveal as="h2" delay={90} className="display-2 mt-8">
        {title}
      </Reveal>

      {children ? (
        <Reveal delay={170} className={`lede measure mt-6 ${bodyColor}`}>
          {children}
        </Reveal>
      ) : null}
    </div>
  );
}
