/**
 * OM Portaria — as fotografias da página.
 *
 * Import estático de propósito: o next/image lê a largura e a altura reais do
 * arquivo em tempo de build, reserva o espaço exato antes de baixar qualquer
 * byte e gera o `blurDataURL` do placeholder. Foto referenciada por string
 * (`/img/x.jpg`) não tem nada disso e volta a custar deslocamento de layout.
 *
 * ⚠️ TODO(cliente): TODAS as fotos aqui são de banco de imagens, escolhidas
 * para dar atmosfera — nenhuma mostra a equipe, os postos ou os clientes da OM
 * Portaria. Elas são ilustrativas e estão em lugares onde isso é evidente
 * (ambientes, materiais, edifícios), nunca ao lado de um nome próprio: os
 * depoimentos não têm retrato e a seção do responsável não tem rosto, porque
 * pôr um rosto comprado ao lado de uma pessoa real seria mentir. Assim que
 * houver fotografia própria dos postos e da equipe, troque arquivo por arquivo
 * — o `alt` já está escrito e o layout não muda.
 *
 * Licença: todas do Unsplash, sob a Unsplash License (uso comercial livre,
 * sem necessidade de autorização). Nenhuma é Unsplash+. Autoria e link de
 * origem de cada uma em `assets/imagens/CREDITOS.md`.
 */

import centralNoite from "@/assets/imagens/central-noite.jpg";
import hallManha from "@/assets/imagens/hall-manha.jpg";
import heroSaguao from "@/assets/imagens/hero-saguao.jpg";
import recepcaoHall from "@/assets/imagens/recepcao-hall.jpg";
import servicoAcesso from "@/assets/imagens/servico-acesso.jpg";
import servicoMonitoramento from "@/assets/imagens/servico-monitoramento.jpg";
import servicoObras from "@/assets/imagens/servico-obras.jpg";
import servicoPatrimonial from "@/assets/imagens/servico-patrimonial.jpg";
import servicoPortaria from "@/assets/imagens/servico-portaria.jpg";
import servicoRecepcao from "@/assets/imagens/servico-recepcao.jpg";
import uniforme from "@/assets/imagens/uniforme.jpg";

export const imagens = {
  /**
   * O hero. Fica sob véu e sob a colunata, então nunca é lida como fotografia
   * — é a profundidade da sala atrás do texto. `alt` vazio de propósito: é
   * decoração, e anunciá-la ao leitor de tela seria ruído antes do h1.
   */
  heroSaguao: { src: heroSaguao, alt: "" },

  hallManha: {
    src: hallManha,
    alt: "Hall de entrada de um edifício em silêncio, com pilares de pedra clara e uma pessoa ao fundo caminhando para os elevadores.",
  },

  centralNoite: {
    src: centralNoite,
    alt: "Fachada de um edifício à noite, quase toda apagada, com uma faixa de janelas ainda acesa.",
  },

  uniforme: {
    src: uniforme,
    alt: "Detalhe de um uniforme: mãos ajustando o punho de uma camisa branca sob um colete escuro.",
  },

  recepcaoHall: {
    src: recepcaoHall,
    alt: "Balcão de recepção de madeira num hall de pé-direito alto, com poltronas de couro e luz morna.",
  },

  /** Uma por serviço — a chave é o `id` do item em `lib/content.ts`. */
  servicos: {
    patrimonial: {
      src: servicoPatrimonial,
      alt: "Duas câmeras de segurança fixadas na fachada de vidro escuro de um edifício.",
    },
    monitoramento: {
      src: servicoMonitoramento,
      alt: "Monitores acesos numa sala escura, exibindo imagens de câmeras lado a lado.",
    },
    portaria: {
      src: servicoPortaria,
      alt: "Entrada iluminada de um edifício à noite, com dois porteiros uniformizados de plantão.",
    },
    acesso: {
      src: servicoAcesso,
      alt: "Conjunto de portas de vidro na entrada controlada de um edifício, vistas de fora.",
    },
    recepcao: {
      src: servicoRecepcao,
      alt: "Balcão de recepção de concreto claro, organizado e sem ninguém em volta.",
    },
    obras: {
      src: servicoObras,
      alt: "Edifício em construção iluminado à noite, com a grua ainda montada sobre a laje.",
    },
  },
} as const;

export type ChaveServico = keyof typeof imagens.servicos;
