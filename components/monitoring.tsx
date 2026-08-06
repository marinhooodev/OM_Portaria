import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { central } from "@/lib/content";
import { imagens } from "@/lib/imagens";

/**
 * A sala de controle à noite: penumbra, ordem, todo instrumento legível,
 * alguém acordado enquanto os outros dormem.
 *
 * Aqui havia uma grade de seis retângulos escuros imitando um painel de
 * câmeras. Ela foi substituída por uma fotografia — e não por outra grade,
 * agora com fotos dentro: miniatura de foto sob rótulo de câmera se lê como
 * "estas são as nossas câmeras", e não são. A imagem escolhida diz a mesma
 * coisa pelo avesso e sem fingir nada: um prédio inteiro apagado, uma faixa de
 * janelas ainda acesa. É literalmente o título da seção.
 *
 * A varredura continua atravessando por cima dela — 11 segundos de ponta a
 * ponta, lenta o suficiente para tranquilizar em vez de alertar.
 */
export function Monitoring() {
  return (
    <section
      id="central"
      className="on-ink grain relative scroll-mt-24 overflow-hidden bg-ink-950 text-stone-50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(85% 65% at 78% 30%, rgb(63 168 148 / 0.09) 0%, transparent 60%)",
        }}
      />

      <div className="shell band relative">
        {/* O painel é mais baixo que a coluna de texto; centrado, o vazio fica
            distribuído em vez de todo empoçado embaixo dele. */}
        <div className="grid items-start gap-16 lg:grid-cols-12 lg:items-center lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeading
              index="03"
              eyebrow={central.eyebrow}
              title={central.titulo}
              tone="ink"
              align="wide"
            >
              {central.texto}
            </SectionHeading>

            {/* Leitura de instrumentos: rótulo à esquerda, valor à direita,
                filete entre um e outro. Um mostrador, não uma lista. */}
            <Reveal delay={220} className="mt-14 border-t hair">
              <dl>
                {central.leitura.map((linha) => (
                  <div
                    key={linha.rotulo}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b hair py-4"
                  >
                    <dt className="eyebrow text-ink-400">{linha.rotulo}</dt>
                    <dd className="numeral text-[0.8125rem] text-vig-300">{linha.valor}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={140} className="lg:col-span-7">
            <figure className="quadro aspect-16/10 w-full">
              <Image
                src={imagens.centralNoite.src}
                alt={imagens.centralNoite.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="foto"
              />

              {/* a varredura, agora atravessando a própria imagem */}
              <div
                aria-hidden="true"
                className="sweep pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vig-400/55 to-transparent"
              />

              {/* o instrumento aceso: alguém está de olho nisto agora */}
              <span
                aria-hidden="true"
                className="pulse-live absolute top-4 right-4 h-1.5 w-1.5 rounded-full bg-vig-400"
              />

              <figcaption className="eyebrow absolute right-4 bottom-3.5 left-4 flex items-center gap-3 text-ink-200">
                <span className="rule-x w-6 shrink-0" aria-hidden="true" />
                {central.legendaFoto}
              </figcaption>

              {/* véu curto no pé, só o suficiente para a legenda ter contraste
                  sobre qualquer parte da foto */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent"
              />
            </figure>

            {/* Os pontos monitorados saem em texto, não em miniatura: dito
                assim é informação; dito em grade de quadradinhos viraria uma
                simulação de painel de câmeras que não é nossa. */}
            <div className="mt-8">
              <h3 className="eyebrow text-ink-400">{central.pontosRotulo}</h3>
              <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2.5">
                {central.pontos.map((ponto) => (
                  <li
                    key={ponto}
                    className="border hair px-3 py-1.5 text-[0.8125rem] leading-none text-ink-200"
                  >
                    {ponto}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
