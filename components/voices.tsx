import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { vozes } from "@/lib/content";
import { imagens } from "@/lib/imagens";

/**
 * A prova vira confiança humana.
 *
 * Sem aspas decorativas: um filete de latão abre cada depoimento, a citação é
 * composta na serifa como um texto de verdade, e a atribuição vem discreta,
 * como uma legenda.
 *
 * **Nenhum retrato, e isto não é uma escolha estética.** Pedro, Mônica e
 * Guilherme existem — são nomes publicados pela própria empresa. Pôr ao lado
 * deles um rosto comprado num banco de imagens seria inventar uma pessoa e
 * atribuir a ela uma frase real. A fotografia desta seção é de ambiente: um
 * hall com alguém no balcão ao fundo, o lugar onde essas três vozes convivem
 * com a equipe. Ela dá calor à seção sem afirmar coisa nenhuma.
 *
 * ⚠️ Os textos dos depoimentos vêm da landing original. Ver PROGRESS.md.
 */
export function Voices() {
  const [principal, ...demais] = vozes.itens;

  return (
    <section id="confianca" className="on-stone band scroll-mt-24 bg-stone-50">
      <div className="shell">
        <SectionHeading index="04" eyebrow={vozes.eyebrow} title={vozes.titulo}>
          {vozes.texto}
        </SectionHeading>

        <div className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <Reveal as="figure" className="lg:col-span-7">
            <span className="block h-0.5 w-14 bg-brass-500" aria-hidden="true" />
            <blockquote className="mt-8">
              <p className="font-display text-[clamp(1.4rem,2.3vw,1.95rem)] leading-[1.4] tracking-[-0.015em] text-ink-900">
                {principal.citacao}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-[0.95rem] font-medium text-ink-900">
                {principal.autor}
              </span>
              <span className="eyebrow text-stone-500">{principal.contexto}</span>
            </figcaption>
          </Reveal>

          {/* O lugar de onde essas vozes falam. */}
          <Reveal delay={180} className="lg:col-span-5">
            <figure className="quadro aspect-4/3 w-full lg:aspect-4/5">
              <Image
                src={imagens.recepcaoHall.src}
                alt={imagens.recepcaoHall.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="foto"
              />
            </figure>
          </Reveal>

          {/* As outras duas vozes atravessam a largura inteira, embaixo. */}
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-x-16 lg:col-span-12">
            {demais.map((voz, i) => (
              <Reveal key={voz.autor} as="figure" delay={140 + i * 110}>
                <span className="block h-px w-10 bg-brass-500" aria-hidden="true" />
                <blockquote className="mt-6">
                  <p className="measure-tight text-[1.0625rem] leading-relaxed text-stone-700">
                    {voz.citacao}
                  </p>
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[0.9rem] font-medium text-ink-900">{voz.autor}</span>
                  <span className="eyebrow text-stone-500">{voz.contexto}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
