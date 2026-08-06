import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { credenciais } from "@/lib/content";
import { imagens } from "@/lib/imagens";

/**
 * A evidência — tratada como razão contábil, não como selo.
 *
 * Nenhum brasão, nenhuma medalha, nenhum "certificado" em dourado. Só uma
 * grade de filetes com o que a empresa entrega, escrito por extenso. Quem
 * precisa exibir insígnia normalmente não tem o que mostrar por escrito.
 *
 * A única imagem da seção é um punho de camisa sendo ajustado. Está aqui
 * porque esta é a seção mais seca da página — seis afirmações em fila — e
 * porque a matéria do serviço são pessoas vestidas para receber alguém. Um
 * detalhe de uniforme diz isso sem precisar de um rosto comprado.
 */
export function Credentials() {
  return (
    <section className="on-stone band bg-stone-100">
      <div className="shell">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              index="05"
              eyebrow={credenciais.eyebrow}
              title={credenciais.titulo}
              align="wide"
            >
              {credenciais.texto}
            </SectionHeading>
          </div>

          <Reveal delay={200} className="lg:col-span-5">
            <figure className="quadro aspect-5/4 w-full">
              <Image
                src={imagens.uniforme.src}
                alt={imagens.uniforme.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="foto"
              />
            </figure>
          </Reveal>
        </div>

        <dl className="mt-20 grid border-t hair md:grid-cols-2">
          {credenciais.itens.map((item, i) => (
            // dt e dd precisam ser filhos diretos deste <div> para que a lista
            // de definição continue sendo uma lista de definição; o subgrid
            // alinha o texto do dd sob o título sem exigir aninhamento extra.
            <Reveal
              key={item.titulo}
              delay={(i % 2) * 90}
              className="grid grid-cols-[auto_1fr] gap-x-5 border-b hair py-8 md:odd:pr-12 md:even:border-l md:even:pl-12"
            >
              <dt className="col-span-2 grid grid-cols-subgrid items-baseline">
                <span className="numeral text-[0.7rem] tracking-[0.16em] text-brass-700">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[1.05rem] font-medium text-ink-900">{item.titulo}</span>
              </dt>
              <dd className="measure col-start-2 mt-2.5 text-[0.95rem] leading-relaxed text-stone-700">
                {item.texto}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
