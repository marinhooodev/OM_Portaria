import { Marque } from "@/components/marque";
import { contato, empresa, navegacao, rodape } from "@/lib/content";

/**
 * O fim da página volta ao grafite — as luzes do saguão baixando de novo.
 * Nada de novidade aqui: só os dados que uma empresa séria deixa à vista.
 */
export function SiteFooter() {
  return (
    <footer className="on-ink bg-ink-950 text-stone-50">
      <div className="shell pt-20 pb-12">
        <div className="grid gap-14 border-b hair pb-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-3.5">
              <Marque className="h-7 w-7" live />
              <span className="font-display text-[1.25rem] leading-none font-semibold">
                {empresa.nome}
              </span>
            </span>
            <p className="eyebrow mt-5 text-ink-300">{empresa.descritor}</p>
            <p className="measure-tight mt-7 text-[0.95rem] leading-relaxed text-ink-300">
              Portaria, vigilância, controle de acesso, recepção, monitoramento
              de câmeras e consultoria em segurança para condomínios, empresas e
              canteiros de obra.
            </p>
          </div>

          {/* Rotulado pelo próprio título: dois <nav> com o mesmo aria-label
              (aqui e no cabeçalho) deixariam a lista de marcos ambígua. */}
          <nav aria-labelledby="rodape-secoes" className="lg:col-span-3">
            <h2 id="rodape-secoes" className="eyebrow text-ink-400">
              Nesta página
            </h2>
            <ul className="mt-6 grid gap-1">
              {navegacao.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-flex min-h-11 items-center text-[0.95rem] text-ink-200 transition-colors duration-500 ease-door hover:text-vig-300"
                  >
                    {item.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <h2 className="eyebrow text-ink-400">Contato direto</h2>
            <ul className="mt-6 grid gap-1">
              <li>
                <a
                  href={`https://wa.me/${contato.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center text-[0.95rem] text-ink-200 transition-colors duration-500 ease-door hover:text-vig-300"
                >
                  WhatsApp {contato.whatsappExibicao}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contato.email}`}
                  className="inline-flex min-h-11 items-center text-[0.95rem] text-ink-200 transition-colors duration-500 ease-door hover:text-vig-300"
                >
                  {contato.email}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-[0.875rem] leading-relaxed text-ink-300">
              {contato.promessa}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          {/* Linha corrida e longa: sai do corpo de 11px das etiquetas para um
              tamanho que se lê de fato num celular. */}
          <p className="text-[0.8125rem] leading-relaxed text-ink-300">
            CNPJ {rodape.cnpj}
            <span className="mx-2.5 text-ink-500" aria-hidden="true">
              ·
            </span>
            {rodape.legal}
          </p>
          <p className="eyebrow text-ink-400">
            <a
              href="#topo"
              className="inline-flex min-h-11 items-center transition-colors duration-500 ease-door hover:text-vig-300"
            >
              Voltar ao início
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
