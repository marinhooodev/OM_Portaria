import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { LiveStatus } from "@/components/live-status";
import { hero } from "@/lib/content";
import { imagens } from "@/lib/imagens";

/**
 * Chegada.
 *
 * O saguão de um prédio muito bem administrado às seis da manhã: escuro,
 * silencioso, impecável, já acordado. A luz vem do alto à direita como
 * amanhecer entrando por uma fachada de vidro; o ritmo vertical de colunas
 * atravessa o fundo sem nunca competir com o texto.
 *
 * A fotografia entra por baixo de tudo isso e nunca é olhada de frente: é a
 * profundidade da sala atrás do texto. Três camadas a seguram no lugar —
 * o véu escuro (legibilidade), o gradiente de luz (a identidade da paleta) e
 * a colunata (o ritmo da fachada). Sem elas a foto viraria o assunto, e o
 * assunto é a frase.
 */
export function Hero() {
  return (
    <section
      id="topo"
      className="on-ink grain relative overflow-hidden bg-ink-900 text-stone-50"
    >
      <Image
        src={imagens.heroSaguao.src}
        alt={imagens.heroSaguao.alt}
        fill
        sizes="100vw"
        // Sob o véu, metade da informação da imagem é apagada antes de chegar
        // ao olho: 50 economiza banda no caminho crítico sem diferença visível.
        quality={50}
        /*
         * `eager`, e não `preload` (o sucessor do `priority`, deprecado no
         * Next 16). A diferença é de fila, e aqui ela vale 300ms.
         *
         * O elemento de LCP desta página não é a foto: é o parágrafo do hero,
         * que espera a webfont. Com `preload` + `fetchPriority="high"` a
         * imagem entrava no <head> à frente das fontes e empurrava o LCP para
         * 3,0s. Com `eager` ela continua sendo baixada de imediato, sem
         * disputar a frente da fila com quem realmente segura a pintura.
         */
        loading="eager"
        className="pointer-events-none object-cover object-center opacity-70"
      />

      {/*
        O véu vem em duas versões porque o texto ocupa lugares diferentes.
        No celular ele toma a tela inteira, então o véu é parelho e a foto vira
        profundidade. A partir de lg o texto se recolhe à esquerda, o véu vira
        diagonal e a sala aparece de fato no canto por onde entra a luz.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(6 11 13 / 0.84) 0%, rgb(10 18 20 / 0.7) 38%, rgb(10 18 20 / 0.68) 68%, rgb(6 11 13 / 0.9) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          backgroundImage:
            "linear-gradient(104deg, rgb(6 11 13 / 0.92) 0%, rgb(10 18 20 / 0.78) 36%, rgb(10 18 20 / 0.42) 66%, rgb(6 11 13 / 0.5) 100%)",
        }}
      />

      {/* luz controlada, natural — nunca um brilho */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            "radial-gradient(120% 90% at 88% -18%, rgb(214 178 124 / 0.15) 0%, transparent 58%)",
            "radial-gradient(90% 70% at 6% 104%, rgb(63 168 148 / 0.12) 0%, transparent 62%)",
            // Fecha o pé, onde a régua de números precisa de fundo firme: as
            // notas embaixo de cada indicador são o menor texto do hero, e
            // foram medidas no pixel contra a foto (ver PROGRESS.md).
            "linear-gradient(180deg, transparent 0%, transparent 46%, rgb(6 11 13 / 0.66) 78%, rgb(6 11 13 / 0.92) 100%)",
          ].join(","),
        }}
      />
      <div className="colonnade" aria-hidden="true" />

      <div className="shell relative flex min-h-[100svh] flex-col justify-between pt-[8.5rem] pb-10">
        <div className="grid flex-1 items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-11 xl:col-span-10">
            {/* Tudo acima da dobra nasce assentado: nada de o saguão aparecer
                aos poucos. Só a régua de números, no rodapé do hero, assenta. */}
            <Reveal imediato className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <span className="eyebrow text-brass-400">{hero.eyebrow}</span>
              <span className="rule-x w-12 shrink-0" aria-hidden="true" />
            </Reveal>

            <Reveal imediato as="h1" className="display-1 mt-9 max-w-[19ch]">
              {hero.titulo}
            </Reveal>

            {/* `lede` sozinho, sem `measure`: são 46ch em vez de 62ch. Duas
                razões, e as duas importam. A medida curta é a que o texto de
                abertura pede tipograficamente — e é também a que mantém o
                parágrafo dentro da metade escura da fotografia. Medido: em
                62ch a linha alcançava a parte clara do saguão e o contraste
                caía para 3,8:1, abaixo do mínimo. */}
            <Reveal imediato className="lede mt-10 text-ink-200">
              {hero.texto}
            </Reveal>

            <Reveal
              imediato
              className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <a href="#contato" className="btn btn-primary">
                {hero.acaoPrimaria}
              </a>
              <a href="#metodo" className="btn btn-ghost">
                {hero.acaoSecundaria}
              </a>
            </Reveal>

            <Reveal imediato>
              <LiveStatus className="mt-12" />
            </Reveal>
          </div>
        </div>

        {/* Escala, dita em voz baixa. */}
        <Reveal className="mt-16 border-t hair pt-10">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {hero.indicadores.map((indicador) => (
              <div key={indicador.nota}>
                <dt className="sr-only">{indicador.nota}</dt>
                <dd>
                  <span className="font-display text-[clamp(2.1rem,3.4vw,2.9rem)] leading-none font-semibold tracking-[-0.03em] text-stone-50">
                    {indicador.valor}
                  </span>
                  <span className="ml-2 font-display text-[1.05rem] text-ink-300">
                    {indicador.unidade}
                  </span>
                  <span className="mt-3 block text-[0.8125rem] leading-relaxed text-ink-400">
                    {indicador.nota}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
