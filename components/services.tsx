"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { servicos } from "@/lib/content";
import { imagens } from "@/lib/imagens";

/**
 * O dossiê.
 *
 * Cada serviço é uma linha numerada separada por filete — nunca um card com
 * ícone. Título e resumo ficam sempre legíveis; só o detalhamento se abre,
 * com 700ms de curso e sem salto, como uma gaveta de arquivo bem construída.
 *
 * A primeira linha nasce aberta para que ninguém precise clicar em nada para
 * entender o que a empresa faz.
 *
 * A fotografia vive dentro da gaveta, ao lado dos detalhes — nunca na linha
 * fechada. Assim a lista continua sendo uma lista (seis títulos legíveis de
 * uma vez, sem virar uma parede de miniaturas), e a imagem chega como parte
 * da explicação, para quem pediu para saber mais.
 */
export function Services() {
  const [aberto, setAberto] = useState<string | null>(servicos.itens[0].id);
  const idBase = useId();

  return (
    <section id="servicos" className="on-stone band scroll-mt-24 bg-stone-50">
      <div className="shell">
        <SectionHeading index="01" eyebrow={servicos.eyebrow} title={servicos.titulo}>
          {servicos.texto}
        </SectionHeading>

        <div className="mt-20 border-t hair">
          {servicos.itens.map((item, i) => {
            const estaAberto = aberto === item.id;
            const idPainel = `${idBase}-${item.id}`;

            return (
              <Reveal key={item.id} delay={i * 80} className="border-b hair">
                {/* O <h3> existe pela semântica do acordeão, mas o resumo dentro
                    dele é texto corrido: sem este reset ele herdaria a serifa de
                    título e o peso 600 da regra base de h1–h3. Só o título leva
                    `.display-3`. */}
                <h3 className="font-sans font-normal">
                  <button
                    type="button"
                    onClick={() => setAberto(estaAberto ? null : item.id)}
                    aria-expanded={estaAberto}
                    aria-controls={idPainel}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-6 gap-y-3 py-9 text-left transition-colors duration-500 ease-door hover:bg-stone-100/70 sm:gap-x-10 sm:px-4 sm:-mx-4"
                  >
                    <span
                      className={[
                        "numeral pt-1.5 text-[0.75rem] tracking-[0.16em] transition-colors duration-500 ease-door",
                        estaAberto ? "text-azul-600" : "text-stone-500",
                      ].join(" ")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="display-3 block text-ink-900">{item.titulo}</span>
                      <span className="measure mt-3 block text-[0.975rem] leading-relaxed text-stone-700">
                        {item.resumo}
                      </span>
                    </span>

                    {/* Um traço que vira cruz: mecânico, sem rotação boba. */}
                    <span
                      aria-hidden="true"
                      className="relative mt-3 h-3.5 w-3.5 shrink-0 justify-self-end"
                    >
                      <span
                        className={[
                          "absolute top-1/2 left-0 h-px w-full -translate-y-1/2 transition-colors duration-500 ease-door",
                          estaAberto ? "bg-azul-600" : "bg-stone-500",
                        ].join(" ")}
                      />
                      <span
                        className={[
                          "absolute top-0 left-1/2 h-full w-px -translate-x-1/2 origin-center transition-[transform,background-color] duration-600 ease-door",
                          estaAberto ? "scale-y-0 bg-azul-600" : "scale-y-100 bg-stone-500",
                        ].join(" ")}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={idPainel}
                  // `inert` tira o painel fechado da árvore de acessibilidade
                  // sem usar `hidden`, que mataria a transição de altura.
                  inert={!estaAberto}
                  className="grid transition-[grid-template-rows] duration-700 ease-door"
                  style={{ gridTemplateRows: estaAberto ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div
                      className={[
                        // O recuo iguala a largura do índice mais o gap da linha,
                        // para os detalhes começarem sob o título e não sob o número.
                        "grid gap-x-12 gap-y-8 pb-11 pl-[2.65rem] transition-opacity duration-700 ease-door sm:pl-[3.65rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start",
                        estaAberto ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    >
                      <ul className="grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-4">
                        {item.detalhes.map((detalhe) => (
                          <li
                            key={detalhe}
                            className="flex gap-4 text-[0.95rem] leading-relaxed"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.72em] h-px w-4 shrink-0 bg-brass-500"
                            />
                            <span className="text-stone-700">{detalhe}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Sem `loading="eager"`: a gaveta fechada não deve gastar
                          banda do visitante que nunca vai abri-la. */}
                      <figure className="quadro aspect-4/3 w-full max-w-[26rem] lg:max-w-none">
                        <Image
                          src={imagens.servicos[item.id].src}
                          alt={imagens.servicos[item.id].alt}
                          fill
                          placeholder="blur"
                          sizes="(min-width: 1024px) 20rem, (min-width: 640px) 26rem, 100vw"
                          className="foto"
                        />
                      </figure>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
