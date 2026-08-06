import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { metodo } from "@/lib/content";

/**
 * A coreografia discreta — o trabalho que o cliente nunca vê.
 *
 * Quatro colunas sob um único filete contínuo, com o índice apoiado nele como
 * marcação de planta baixa. No celular a mesma linha vira vertical, sem virar
 * outra coisa.
 */
export function Method() {
  return (
    <section id="metodo" className="on-stone band scroll-mt-24 bg-stone-100">
      <div className="shell">
        <SectionHeading index="02" eyebrow={metodo.eyebrow} title={metodo.titulo}>
          {metodo.texto}
        </SectionHeading>

        {/* As margens negativas alinham o texto da primeira e da última coluna
            com a borda do grid, mantendo os filetes verticais entre elas. */}
        <ol className="mt-20 grid gap-px bg-[color:var(--rule)] md:-mx-8 md:grid-cols-2 xl:-mx-9 xl:grid-cols-4">
          {metodo.etapas.map((etapa, i) => (
            <Reveal
              key={etapa.titulo}
              as="li"
              delay={i * 110}
              className="flex flex-col bg-stone-100 pt-9 pb-2 md:px-8 xl:px-9"
            >
              <div className="flex items-baseline gap-4">
                <span className="numeral text-[0.75rem] tracking-[0.16em] text-azul-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rule-x flex-1" aria-hidden="true" />
              </div>

              <h3 className="display-3 mt-7 text-ink-900">{etapa.titulo}</h3>

              <p className="mt-4 text-[0.95rem] leading-relaxed text-stone-700">
                {etapa.texto}
              </p>

              {/* `mt-auto` encosta a marca no pé da coluna: as quatro se alinham
                  numa linha só, independentemente do tamanho de cada texto. */}
              <p className="eyebrow mt-auto flex items-start gap-3 pt-7 text-brass-700">
                <span
                  aria-hidden="true"
                  className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-brass-600"
                />
                {etapa.marca}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
