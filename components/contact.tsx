"use client";

import { useId, useState, type FormEvent } from "react";
import { Reveal } from "@/components/reveal";
import { contato, empresa, rodape } from "@/lib/content";

/**
 * O fecho: um aperto de mão oferecido por cima da mesa.
 *
 * Depois de todo o rigor institucional, a página termina numa pessoa. Por isso
 * o texto está em primeira pessoa, a assinatura é manuscrita em serifa e a
 * placa de latão traz iniciais, não um logotipo.
 *
 * O formulário funciona sem back-end: monta a mensagem e abre o WhatsApp com
 * ela pronta. O botão diz exatamente isso — ninguém é surpreendido.
 * Para trocar por um envio de verdade, ver PROGRESS.md → "Próximos passos".
 *
 * É a única seção do corpo sem fotografia, e isso é deliberado: o fecho é uma
 * pessoa se oferecendo para atender, e qualquer rosto de banco de imagens aqui
 * seria lido como o rosto do dono. A placa de latão com as iniciais faz o
 * trabalho de presença sem afirmar nada que não seja verdade.
 */
export function Contact() {
  const idBase = useId();
  const [enviando, setEnviando] = useState(false);

  const campo = (nome: string) => `${idBase}-${nome}`;

  function montarMensagem(dados: FormData) {
    const linhas = [
      "Olá! Vim pelo site e gostaria de um orçamento.",
      "",
      `Nome: ${dados.get("nome") || "—"}`,
      `Contato: ${dados.get("contato") || "—"}`,
      `Tipo de imóvel: ${dados.get("tipo") || "—"}`,
      `Cidade: ${dados.get("cidade") || "—"}`,
      "",
      `Situação hoje: ${dados.get("mensagem") || "—"}`,
    ];
    return linhas.join("\n");
  }

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setEnviando(true);

    const texto = montarMensagem(new FormData(evento.currentTarget));
    const url = `https://wa.me/${contato.whatsapp}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    window.setTimeout(() => setEnviando(false), 1200);
  }

  return (
    <section
      id="contato"
      className="on-stone band scroll-mt-24 bg-stone-50"
      aria-labelledby={campo("titulo")}
    >
      <div className="shell">
        <div className="grid gap-x-16 gap-y-20 lg:grid-cols-12">
          {/* A pessoa */}
          <div className="lg:col-span-6">
            <Reveal className="flex items-center gap-4">
              <span className="eyebrow numeral text-stone-500">06</span>
              <span className="rule-x w-8 shrink-0" aria-hidden="true" />
              <span className="eyebrow text-azul-700">{contato.eyebrow}</span>
            </Reveal>

            <Reveal as="h2" id={campo("titulo")} delay={90} className="display-2 mt-8">
              {contato.titulo}
            </Reveal>

            <Reveal delay={170} className="mt-10 flex items-start gap-6">
              {/* placa de latão, gravada — não um retrato de banco de imagens */}
              <span
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[2px] border border-brass-500/45 bg-gradient-to-br from-brass-300/35 to-brass-600/15"
              >
                <span className="font-display text-[1.15rem] font-semibold tracking-[0.06em] text-brass-700">
                  {contato.responsavel.iniciais}
                </span>
              </span>

              <div className="min-w-0">
                <p className="measure text-[1.0625rem] leading-relaxed text-stone-700">
                  {contato.responsavel.mensagem}
                </p>
                <p className="mt-7 font-display text-[1.35rem] leading-none font-semibold tracking-[-0.01em] text-ink-900">
                  {contato.responsavel.nome}
                </p>
                <p className="eyebrow mt-2.5 text-stone-500">{contato.responsavel.cargo}</p>
              </div>
            </Reveal>

            {/* Vias diretas — sem formulário no meio do caminho.
                São exatamente os dois canais que a empresa publica. */}
            <Reveal delay={250} className="mt-14 border-t hair">
              <ul>
                {[
                  {
                    rotulo: "WhatsApp",
                    valor: contato.whatsappExibicao,
                    href: `https://wa.me/${contato.whatsapp}`,
                    externo: true,
                  },
                  {
                    rotulo: "E-mail",
                    valor: contato.email,
                    href: `mailto:${contato.email}`,
                    externo: false,
                  },
                ].map((via) => (
                  <li key={via.rotulo} className="border-b hair">
                    <a
                      href={via.href}
                      {...(via.externo
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="group flex min-h-14 flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 transition-colors duration-500 ease-door hover:text-azul-700"
                    >
                      <span className="eyebrow text-stone-500">{via.rotulo}</span>
                      <span className="text-[1.0625rem] font-medium">{via.valor}</span>
                    </a>
                  </li>
                ))}
              </ul>
              {/* A promessa de prazo é informação de verdade, não etiqueta:
                  sai do corpo das eyebrows para um tamanho de leitura. */}
              <p className="mt-6 text-[0.875rem] leading-relaxed text-stone-600">
                {contato.promessa}
              </p>
            </Reveal>

          </div>

          {/* O pedido */}
          <Reveal delay={140} className="lg:col-span-6">
            <div className="border hair bg-stone-100 p-8 sm:p-11">
              <h3 className="display-3 text-ink-900">{contato.formulario.titulo}</h3>
              <p className="measure mt-4 text-[0.95rem] leading-relaxed text-stone-700">
                {contato.formulario.texto}
              </p>

              <form onSubmit={aoEnviar} className="mt-10 grid gap-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor={campo("nome")} className="field-label block">
                      Nome
                    </label>
                    <input
                      id={campo("nome")}
                      name="nome"
                      type="text"
                      required
                      autoComplete="name"
                      className="field mt-2"
                      placeholder="Como devo te chamar"
                    />
                  </div>

                  <div>
                    <label htmlFor={campo("contato")} className="field-label block">
                      Telefone ou e-mail
                    </label>
                    <input
                      id={campo("contato")}
                      name="contato"
                      type="text"
                      required
                      autoComplete="tel"
                      className="field mt-2"
                      placeholder="Por onde te respondo"
                    />
                  </div>

                  <div>
                    <label htmlFor={campo("tipo")} className="field-label block">
                      Tipo de imóvel
                    </label>
                    <select
                      id={campo("tipo")}
                      name="tipo"
                      required
                      defaultValue={contato.formulario.tiposImovel[0]}
                      className="field mt-2"
                    >
                      {contato.formulario.tiposImovel.map((tipo) => (
                        <option key={tipo} value={tipo}>
                          {tipo}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor={campo("cidade")} className="field-label block">
                      Cidade
                    </label>
                    <input
                      id={campo("cidade")}
                      name="cidade"
                      type="text"
                      autoComplete="address-level2"
                      className="field mt-2"
                      placeholder="Onde fica o imóvel"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={campo("mensagem")} className="field-label block">
                    Como é a rotina hoje
                  </label>
                  <textarea
                    id={campo("mensagem")}
                    name="mensagem"
                    rows={4}
                    className="field mt-2 resize-y"
                    placeholder="Quantos acessos, quantos turnos, o que não está funcionando"
                  />
                </div>

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    {enviando ? "Abrindo o WhatsApp…" : contato.formulario.acao}
                  </button>

                  <p className="text-[0.85rem] text-stone-700">
                    {contato.formulario.alternativa}{" "}
                    <a href={`mailto:${contato.email}`} className="link-quiet font-medium">
                      {contato.email}
                    </a>
                  </p>
                </div>

                <p aria-live="polite" className="sr-only">
                  {enviando
                    ? "Abrindo o WhatsApp com a sua mensagem pronta."
                    : ""}
                </p>
              </form>
            </div>

            <p className="eyebrow mt-6 text-stone-500">
              {empresa.razaoSocial} · CNPJ {rodape.cnpj}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
