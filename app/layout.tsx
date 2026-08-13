import type { Metadata, Viewport } from "next";
import { Libre_Franklin, Newsreader } from "next/font/google";
import "./globals.css";

/**
 * A voz tipográfica: alguém com trinta anos de ofício falando com calma numa
 * sala silenciosa. Duas famílias, nenhuma delas com sotaque de software.
 *
 * Newsreader — os títulos. Serifa editorial, de jornal sério e de relatório
 *   anual: peso real, terminações humanas, nada de display da moda.
 *
 *   Sem o eixo óptico (`opsz`), que ela também oferece. Medido: pedir o eixo
 *   leva o arquivo latino de 58 kB para 132 kB, e esses 74 kB caem inteiros no
 *   caminho crítico — o LCP desta página é um parágrafo esperando a webfont.
 *   O refinamento óptico é real, mas custava mais do que vale; o aperto de
 *   entreletras dos `.display-*` cobre a maior parte do que ele daria.
 * Libre Franklin — todo o resto. Descendente da Franklin Gothic, a letra da
 *   sinalização institucional e do impresso público. Humanista, de leitura
 *   longa e confortável, e em caixa-alta espaçada dá às etiquetas a precisão
 *   discreta de uma boa placa de hall.
 *
 * Não há fonte monoespaçada aqui de propósito: mono é a voz do terminal, e
 * esta empresa não vende software. Índices e leituras usam a própria sans com
 * `tabular-nums`, que alinha as colunas sem soar a código.
 */

const serifDisplay = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-serif",
});

/*
 * Sem lista de `weight` de propósito, nas duas famílias.
 *
 * Ao receber pesos explícitos, o next/font deixa de emitir o @font-face de
 * fallback com métricas ajustadas (`size-adjust`, `ascent-override`…). Sem ele,
 * a troca da fonte de sistema pela fonte real reflui o texto e gera deslocamento
 * de layout — foi exatamente o que apareceu como CLS de 0,042 no hero. Pedir a
 * variável traz um arquivo só, todos os pesos, e o fallback calibrado junto.
 */
const sansBody = Libre_Franklin({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body-sans",
});

export const metadata: Metadata = {
  title: {
    default: "OM Portaria — Portaria, controle de acesso e monitoramento 24h",
    template: "%s · OM Portaria",
  },
  description:
    "Porteiros, controladores de acesso e recepcionistas treinados para condomínios, empresas e canteiros de obra, com monitoramento por câmeras 24 horas. Resposta em até 8 horas e orçamento completo em 24 horas.",
  applicationName: "OM Portaria",
  authors: [{ name: "OM Portaria" }],
  keywords: [
    "portaria",
    "portaria de condomínio",
    "controle de acesso",
    "monitoramento por câmeras",
    "segurança patrimonial",
    "recepcionista",
    "portaria corporativa",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "OM Portaria",
    title: "OM Portaria — uma portaria bem conduzida não chama atenção",
    description:
      "Porteiros, controladores de acesso e recepcionistas treinados, com monitoramento 24 horas. Resposta em até 8 horas e orçamento completo em 24 horas.",
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true, address: false, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // A cor da barra do navegador acompanha o grafite do hero.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a1214" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1214" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${serifDisplay.variable} ${sansBody.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
