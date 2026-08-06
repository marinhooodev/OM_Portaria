import { Reveal } from "@/components/reveal";
import { Marque } from "@/components/marque";
import { tese } from "@/lib/content";

/**
 * A dobradiça entre a chegada e a competência.
 *
 * Uma faixa quase vazia com um único parágrafo grande. O espaço em branco aqui
 * é o argumento: uma empresa que precisa preencher cada centímetro não tem
 * compostura. Esta tem.
 */
export function Thesis() {
  return (
    <section className="on-stone band bg-stone-100">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal className="flex items-center gap-4">
              <span className="eyebrow text-azul-700">{tese.eyebrow}</span>
            </Reveal>
            <Reveal delay={90} className="mt-8 hidden lg:block">
              <Marque className="h-10 w-10 text-stone-300" />
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal
              as="p"
              className="font-display text-[clamp(1.5rem,2.85vw,2.45rem)] leading-[1.34] font-normal tracking-[-0.018em] text-ink-900"
            >
              {tese.texto}
            </Reveal>

            <Reveal delay={140} className="mt-10 flex items-center gap-4">
              <span className="rule-x w-10 shrink-0" aria-hidden="true" />
              <span className="eyebrow text-stone-500">{tese.assinatura}</span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
