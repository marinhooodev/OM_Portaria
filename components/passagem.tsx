import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { passagem } from "@/lib/content";
import { imagens } from "@/lib/imagens";

/**
 * A passagem — uma respiração de largura total entre a promessa e o dossiê.
 *
 * Depois da tese, que é quase só espaço em branco, a página precisa de um
 * corte de ar antes de começar a listar serviços. Aqui ela sai da grade pela
 * única vez em toda a descida: a imagem encosta nas duas bordas, e a legenda
 * volta para dentro do `shell`, para que o texto continue alinhado com o resto
 * da página.
 *
 * É um `<figure>`, não uma seção rotulada: legenda de imagem é exatamente o
 * que isto é, e um marco de página a mais só tornaria a lista de marcos mais
 * difícil de percorrer com leitor de tela.
 *
 * A altura é fixa e a proporção é cortada pelo `object-cover` de propósito —
 * uma faixa larga e baixa se lê como uma passagem, não como uma parada.
 */
export function Passagem() {
  return (
    <section className="on-ink bg-ink-950">
      <figure>
        <div className="relative h-[clamp(16rem,40vw,28rem)] w-full overflow-hidden">
          <Image
            src={imagens.hallManha.src}
            alt={imagens.hallManha.alt}
            fill
            sizes="100vw"
            placeholder="blur"
            className="foto object-cover object-center"
          />
          {/* O véu só nas pontas: a imagem fica inteira à vista e mesmo assim
              emenda com o grafite acima e abaixo dela. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgb(6 11 13 / 0.34) 0%, transparent 24%, transparent 62%, rgb(6 11 13 / 0.82) 100%)",
            }}
          />
        </div>

        <figcaption className="shell">
          <Reveal className="flex flex-col gap-4 pt-8 pb-14 sm:flex-row sm:items-baseline sm:gap-8">
            <span className="eyebrow shrink-0 text-brass-400">{passagem.eyebrow}</span>
            <p className="measure text-[0.95rem] leading-relaxed text-ink-200">
              {passagem.legenda}
            </p>
          </Reveal>
        </figcaption>
      </figure>
    </section>
  );
}
