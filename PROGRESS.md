# OM Portaria — landing page

Documento de contexto para retomar o trabalho em outra sessão.
Última atualização: **5 de agosto de 2026** (2ª sessão — fotografia e tipografia).

---

## 1. O que é isto

Landing page de página única para uma empresa brasileira de portaria e segurança
patrimonial: coloca porteiros, controladores de acesso e recepcionistas em
condomínios, empresas e canteiros de obra, com monitoramento por câmeras 24h e
consultoria. A promessa de atendimento é de prazo: resposta em até 8 horas e
orçamento completo em 24 horas.

Construída a partir do briefing em [`LANDING_PROMPT.md`](./LANDING_PROMPT.md),
no estilo **Corporate Professional**. Leia o briefing antes de mexer no visual —
ele é bem específico sobre o que a página **não** pode ser.

Substitui a landing anterior em <https://www.omportaria.com.br/> (SPA Vite).
**Os dados cadastrais, serviços e depoimentos são os reais, extraídos de lá** —
ver §7 para a origem de cada um.

**Estado: completa e verificada.** Todas as seções construídas, 55 testes
passando, Lighthouse medido, conteúdo real aplicado, fotografia em lugar.
Pendências em §7 — a principal delas é trocar as fotos de banco por fotos da
própria empresa.

---

## 2. Como rodar

```bash
npm run dev            # desenvolvimento em http://localhost:3000
npm run build          # build de produção (estático)
npm start              # serve o build

npm run lint           # eslint
npm test               # Playwright: mobile + desktop (sobe o servidor sozinho)
npm run test:mobile    # só o cenário de celular
npm run test:ui        # modo interativo
```

`npm test` roda `next build && next start --port 3100` automaticamente (ver
`playwright.config.ts`). Testes rodam contra o **build de produção**, nunca
contra o dev server.

> ⚠️ **Armadilha:** rodar `next build` enquanto um `next start` antigo está de pé
> invalida os hashes dos assets — o servidor velho passa a devolver 500 para CSS
> e fontes, e a página aparece sem estilo nenhum. Se ver isso, mate o processo da
> porta e suba de novo. Isso já enganou uma medição de Lighthouse inteira nesta
> sessão (deu falha de contraste e de alvo de toque que não existiam).

---

## 3. Stack

| | |
|---|---|
| Next.js | 16.3.0, App Router, Turbopack |
| React | 19.2.8 |
| CSS | Tailwind v4 (`@theme` no `globals.css`, sem `tailwind.config`) |
| Fontes | `next/font/google`, auto-hospedadas |
| Testes | Playwright + `@axe-core/playwright` |
| Métricas | Lighthouse CLI (devDependency) |

A página é **100% estática** (`○ (Static) prerendered`). Não há back-end, banco,
nem rota de API.

**`AGENTS.md` na raiz avisa que esta versão do Next tem mudanças de API em
relação ao seu treinamento.** Consulte `node_modules/next/dist/docs/` antes de
escrever código de framework.

---

## 4. A identidade (inventada do zero)

O briefing exigia rejeitar os clichês da categoria: **nada de preto-e-vermelho de
alarme, nada de escudo/brasão, nada de estética tática.** A empresa vende calma,
não força.

### Paleta — cada cor faz trabalho emocional, nenhuma é decoração

Definida em `app/globals.css`, bloco `@theme`.

| Token | Papel |
|---|---|
| `ink-*` (grafite/petróleo) | A fundação. Concreto molhado, sala de controle à noite, permanência. **Nunca preto puro** — preto é linguagem de alarme. |
| `stone-*` (calcário morno) | Hall de banco em mármore, papel de dossiê. O claro da página. |
| `azul-*` (ultramarino profundo) | Convicção e ação. Vem do azulejo e do modernismo civil brasileiro, não do "navy corporativo". **Só em CTA.** |
| `vig-*` (verde-água, "vigília") | Presença viva e calma: o instrumento aceso enquanto todos dormem. Status, central, "agora". |
| `brass-*` (latão escovado) | As pessoas: botão de uniforme, placa do hall, hospitalidade. |

**Contrastes são calibrados, não escolhidos por gosto.** Três tokens foram
escurecidos depois de o axe reprovar (`ink-400`, `stone-500`, `brass-700`) — os
comentários no CSS registram a razão e a razão de contraste alvo de cada um.
`stone-500` está calibrado contra `stone-100`, que é o fundo mais escuro em que
ele aparece; se for usado em fundo mais escuro que isso, recalcule.

### Tipografia

Duas famílias, uma voz: alguém com trinta anos de ofício falando com calma.

- **Newsreader** — títulos, citações e a assinatura da marca. Serifa editorial,
  de jornal sério e relatório anual: peso real, terminações humanas.
- **Libre Franklin** — todo o resto. Descendente da Franklin Gothic, a letra da
  sinalização institucional e do impresso público. Em caixa-alta espaçada dá às
  etiquetas a precisão de uma placa de hall.

Utilitários: `.display-1/2/3`, `.lede`, `.measure`, `.eyebrow`, `.numeral`.

**Não há monoespaçada, e isso é decisão de identidade.** Mono é a voz do
terminal, e esta empresa não vende software — era a coisa mais "tech" que a
página tinha. Índices e leituras de mostrador (`.numeral`) usam a própria sans
com `tabular-nums`: alinham a coluna igual, sem soar a código.

> **Não passe listas de `weight` para `next/font`.** Com pesos explícitos o
> next/font deixa de gerar o `@font-face` de fallback com métricas ajustadas
> (`size-adjust`, `ascent-override`), e a troca da fonte reflui o texto. Isso
> custou 0,042 de CLS até ser descoberto. Use a variável (sem `weight`) ou um
> peso único em string. Detalhe registrado em `app/layout.tsx`.

> **Nem toda fonte variável custa igual.** A Newsreader também oferece o eixo
> óptico (`opsz`). Pedi-lo via `axes: ["opsz"]` leva o arquivo latino de
> **58 kB para 132 kB** — 74 kB no caminho crítico de uma página cujo LCP é um
> parágrafo esperando a webfont. O refinamento é real e o preço não valia; o
> aperto de entreletras dos `.display-*` cobre a maior parte. Se algum dia
> voltar a considerar, meça antes.

### A marca

`components/marque.tsx`. O símbolo é um **vão**: verga e dois montantes, como um
pórtico de frente. O montante da direita para antes do chão — é por ali que se
entra — e o quadrado que ocupa esse vazio é a pessoa de plantão. No cabeçalho e
no rodapé esse quadrado acende em verde-água (`live`). Também é o favicon
(`app/icon.svg`).

### Movimento

Porta pesada em dobradiças boas. `--ease-door` sem overshoot em lugar nenhum,
transições de 450–1000ms. Conteúdo **assenta**, nunca salta.

### Fotografia

A página nasceu **sem imagem nenhuma** — só tipografia, CSS e SVG. Era coerente
no papel e ficou crua na tela: um site de serviço presencial em que não se vê
um saguão, um posto nem um uniforme. Hoje são **onze fotografias**, listadas em
`lib/imagens.ts` e creditadas em `assets/imagens/CREDITOS.md`.

Onde entram e por quê:

| Onde | O que mostra |
|---|---|
| Hero | Saguão escuro ao amanhecer, sob véu. Não é foto para olhar: é a profundidade da sala atrás da frase. |
| `Passagem` | Faixa de borda a borda entre a promessa e os serviços. Hall de pedra clara, uma pessoa ao fundo. É a única vez que a página sai da grade. |
| Serviços | Uma por frente, **dentro da gaveta aberta**. Fechada, a lista continua sendo uma lista de seis títulos, não uma parede de miniaturas. |
| Central 24h | Prédio à noite, uma faixa de janelas acesa. É o título da seção dito em imagem. |
| Confiança | Hall com alguém no balcão — o lugar de onde as três vozes falam. |
| Por que a OM | Punho de camisa sendo ajustado. A seção mais seca da página ganha a matéria do serviço. |

**Regras que não são de gosto:**

1. **Nenhum rosto ao lado de nome próprio.** Pedro, Mônica e Guilherme existem;
   retrato de banco de imagens junto do depoimento deles seria inventar uma
   pessoa. Pelo mesmo motivo a seção do responsável não tem foto — teria sido
   lida como o rosto do dono.
2. **Nenhuma foto fingindo ser câmera nossa.** A grade de seis retângulos que
   imitava um painel de monitoramento saiu. Miniatura de foto sob rótulo de
   câmera se lê como "estas são as nossas câmeras", e não são.
3. **`.foto` unifica.** Onze fotógrafos diferentes chegam com onze
   temperaturas; `saturate(.82) contrast(1.04) brightness(.97)` traz todas ao
   mesmo ar. É a diferença entre "tem imagens" e "tem trabalho de imagem".

**Licença — a armadilha.** Todas são do Unsplash, sob a Unsplash License (uso
comercial livre). **Nenhuma é Unsplash+**, que exige assinatura paga. Isso não
é detalhe: na primeira seleção desta sessão, **7 das 11 escolhidas eram
Unsplash+** — a busca do Unsplash ranqueia as pagas primeiro. Verifique o campo
`plus` da foto antes de baixar qualquer substituta.

Os arquivos ficam em `assets/`, e não em `public/`, porque são importados de
forma estática: é o que dá ao Next a proporção real em tempo de build (espaço
reservado, CLS zero) e o `blurDataURL` do placeholder.

---

## 5. Arquitetura

```
app/
  layout.tsx        fontes, metadata, viewport, lang="pt-BR"
  globals.css       tokens (@theme), base, componentes, movimento
  page.tsx          composição das seções + JSON-LD
  icon.svg          favicon (a marca)
lib/
  content.ts        TODO o texto da página
  imagens.ts        as 11 fotos: import estático + `alt` de cada uma
assets/
  imagens/          os arquivos + CREDITOS.md (autoria e licença)
components/
  reveal.tsx          assentamento no scroll (client)
  marque.tsx          símbolo + assinatura
  section-heading.tsx cabeçalho de seção em formato de dossiê
  site-header.tsx     barra fixa + painel de seções (client)
  live-status.tsx     ponto pulsante + relógio de Brasília (client)
  passagem.tsx        a faixa de imagem de borda a borda
  hero.tsx / thesis.tsx / services.tsx / method.tsx /
  monitoring.tsx / voices.tsx / credentials.tsx / contact.tsx
  site-footer.tsx
tests/
  helpers.ts, a11y.spec.ts, landing.spec.ts, mobile-ux.spec.ts,
  contraste-sobre-foto.spec.ts
```

**Para editar texto, mexa só em `lib/content.ts`.** Os componentes cuidam de
layout e comportamento.

### O arco emocional (não reorganize sem pensar)

A ordem das seções **é** o argumento da página:

1. **Hero** — chegada: garantia e escala. "Você achou gente séria."
2. **Thesis** — a dobradiça: o alívio, dito uma vez, em voz baixa.
3. **Passagem** — respiração: o hall às seis da manhã, de borda a borda.
4. **Services** — entendimento: seis frentes, em formato de dossiê numerado.
5. **Method** — competência: quatro etapas, sempre na mesma ordem.
6. **Monitoring** — vigília: a página escurece de novo, sala de controle.
7. **Voices** — confiança: síndico, cliente e funcionário (depoimentos reais).
8. **Credentials** — evidência: razão contábil, sem selo nem brasão. Só afirmações que a empresa já faz por escrito.
9. **Contact** — calor: atrás do rigor, uma pessoa e uma mão estendida.

### Decisões que parecem detalhe e não são

- **A foto do hero é fundo, não assunto.** Entra com `loading="eager"` e **não**
  com `preload`: o elemento de LCP é o parágrafo, e pôr a imagem à frente das
  fontes na fila custava 300ms. Ver §6.
- **O parágrafo do hero usa `lede` sem `measure`** (46ch, não 62ch). É a medida
  certa para um texto de abertura — e é também a que mantém a linha dentro da
  metade escura da foto. Em 62ch o contraste caía para 3,8:1.
- **O hero não é animado.** `<Reveal imediato>` renderiza assentado. Dois
  motivos: elemento em opacidade 0 não conta como candidato a LCP (era 1550ms de
  atraso), e o saguão não aparece aos poucos quando você entra.
- **O painel de seções do celular é um `<dialog>` nativo.** Prisão de foco, Esc e
  inércia do fundo vêm do navegador. Os links dentro dele são interceptados: um
  dialog modal tem contexto de rolagem próprio, então fechamos primeiro e
  rolamos a página depois (`irParaSecao`).
- **`Reveal` escreve no DOM, não em estado do React.** São dezenas por página e
  nenhum precisa causar re-render.
- **Sem JavaScript, a página aparece inteira.** O estado escondido do `Reveal`
  fica dentro de `@media (scripting: enabled)`.
- **`prefers-reduced-motion` desliga tudo**, inclusive o scroll suave.

---

## 6. Verificação

### Playwright — 55 testes, mobile e desktop

O celular é o cenário principal (`tests/mobile-ux.spec.ts` só roda lá).

- **a11y.spec.ts** — axe em cada estado da árvore: repouso, acordeão aberto,
  acordeão fechado, painel de seções aberto, cabeçalho depois de assentar.
  Mais marcos de página, hierarquia de títulos e o link de pular conteúdo.
- **landing.spec.ts** — ordem das seções, âncoras válidas, acordeão (mouse e
  teclado), relógio correndo, formulário montando a URL do WhatsApp, os três
  modos de movimento (normal, reduzido, sem JS) e a **disciplina das fotos**
  (todas pelo otimizador, todas com `alt`, todas com espaço reservado, e
  exatamente uma fora do `lazy`).
- **mobile-ux.spec.ts** — vazamento horizontal, alvos de toque ≥44px, `<dialog>`,
  âncora que não fica sob o cabeçalho, tamanho de texto, `autocomplete`.
- **contraste-sobre-foto.spec.ts** — contraste do texto que pousa sobre imagem.

Dois utilitários em `tests/helpers.ts` existem por um motivo específico:
`assentarTudo` desliga as transições antes de medir (auditar contraste no meio de
um fade lê a cor mesclada com o fundo e acusa falha que não existe) e
`esperarMovimentoParar` espera as transições CSS terminarem, filtrando as
animações infinitas do ponto de presença e da varredura.

> As tags do axe incluem `wcag2a/2aa/21a/21aa` e `best-practice`. **Não incluem
> `wcag22aa`** — a regra `target-size` (WCAG 2.2) é coberta pelo teste próprio de
> alvo de toque em `mobile-ux.spec.ts` e pelo Lighthouse.

### O axe não vê contraste sobre fotografia

Isto merece parágrafo próprio porque quase passou batido. O axe lê a **cor de
fundo computada** do elemento; sobre uma imagem essa cor é transparente, e o
resultado sai como `incomplete` — não como violação. Uma suíte que só reprova
violações dá verde com texto ilegível na tela.

`tests/contraste-sobre-foto.spec.ts` mede no pixel: esconde só o texto da
região (a foto e os véus continuam), tira screenshot, recorta a caixa de cada
nó de texto e calcula a razão WCAG contra o **p99 de luminância** daquele
recorte — o pior pedaço real do fundo, descartando 1% de outliers de
compressão. Tudo dentro do navegador, num canvas, sem dependência nova.

Quando a foto do hero entrou, esse teste pegou três reprovações que os outros
54 testes não viram:

| Texto | Antes | Correção |
|---|---|---|
| Parágrafo do hero (19px) | 3,83:1 | `lede` sem `measure`: 46ch em vez de 62ch, a linha para antes da parte clara |
| Relógio da central (12px) | 3,33:1 | `ink-400` → `ink-300` (o `ink-400` fora calibrado contra grafite chapado, não contra foto) |
| Notas dos indicadores (13px) | 4,60:1 raspando | Véu do pé reforçado: 0,55→0,66 em 78% |

Se um dia a foto do hero for trocada pela do prédio de verdade, é este teste
que diz se o véu ainda dá conta — antes de alguém publicar.

### Lighthouse (medido em 5/8/2026, build de produção local)

| | Perf | A11y | Best Practices | SEO |
|---|---|---|---|---|
| **Desktop** | **100** | **100** | **100** | **100** |
| **Mobile** | **95** | **100** | **100** | **100** |

Mobile: FCP 1,1s · LCP 2,9s · TBT 20ms · **CLS 0** · SI 2,3s
Desktop: FCP 0,3s · LCP 0,7s · TBT 0ms · **CLS 0** · SI 0,3s

**O que mudou com as fotos e as fontes novas:** mobile saiu de 96 para 95, com
LCP de 2,7s para 2,9s — e **CLS de 0,042 para 0**. As imagens não custaram
nada: entram por `next/image` com import estático, então o espaço já está
reservado antes do primeiro byte. A foto do hero pesa **16 kB** na largura que
o celular realmente pede.

**Por que o mobile não é 100** — e por que ficou assim de propósito:

Os pontos que faltam são **inteiramente LCP** (2,9s contra o limiar de 2,5s).
O elemento de LCP é o parágrafo do hero, e o custo é a troca da fonte: sob a
simulação de 4G lento do Lighthouse, o texto pinta com o fallback e repinta
quando a webfont chega, gerando um candidato tardio.

Experimentos já feitos, para não repetir:

| Tentativa | Resultado |
|---|---|
| Hero sem animação de entrada | **1550ms → 59ms** de atraso de render. Mantido. |
| Fallback com métricas ajustadas (fonte variável) | CLS 0,042 → **0**. Mantido. |
| `preload: false` na sans do corpo | **Piorou**: perf 95, LCP 2,8s. Revertido. |
| Newsreader **com** eixo `opsz` | Fonte de 58 kB → 132 kB, perf 92, LCP 3,4s. Revertido. |
| Foto do hero com `preload` + `fetchPriority="high"` | Entrava à frente das fontes: perf 94, FCP 1,2s. Trocado por `loading="eager"` → perf 95, FCP 0,9s. |
| `preload: false` na serifa dos títulos | LCP 2,9s (igual), mas **FCP 0,9s → 1,2s**. Revertido. |

A única alavanca restante continua sendo `font-display: optional`, que zeraria
o LCP — **ao custo de mostrar Arial na primeira visita**. Numa página cujo
argumento inteiro é a tipografia, essa troca não vale 5 pontos de Lighthouse.
Se um dia valer, é uma linha em `app/layout.tsx`.

---

## 7. Conteúdo — de onde vem cada coisa

### Dados reais, extraídos da landing original

A original em <https://www.omportaria.com.br/> é uma SPA Vite: o HTML servido
tem 465 bytes e nenhum conteúdo. Os dados foram extraídos do bundle
`/assets/index-CVUZPIXD.js` em 5/8/2026. Se precisar refazer, é só baixar o
bundle e procurar as strings — o JSX compilado preserva o texto legível.

| Dado | Valor |
|---|---|
| Nome fantasia | OM Portaria |
| Razão social | **OM Portaria e Limpeza LTDA** |
| CNPJ | **47.319.362/0001-03** |
| WhatsApp | **(11) 98405-8255** (`5511984058255`) |
| E-mail | **omportaria.contato@gmail.com** |
| Fundação | **2022** |
| Prazos | resposta em até **8 h**, orçamento completo em **24 h** |
| Atendimento | "direto com o dono" — publicado pela original, **não usado aqui** (ver abaixo) |

Também vieram da original, verbatim: os **seis serviços** com seus textos de
resumo, os **três depoimentos** (Pedro/cliente-síndico, Mônica/cliente,
Guilherme/funcionário — nomes reais, publicados pela própria empresa) e as
afirmações da seção "Por que a OM Portaria".

O nome "OM Portaria" que eu havia deduzido do nome da pasta **conferiu** — o
monograma OM da placa de latão e o favicon continuam corretos.

### O que a original NÃO publica — e que portanto a página não afirma

Nada disto foi inventado para preencher espaço; simplesmente não está na página:

- **Telefone fixo** — só existe o celular/WhatsApp. A seção de contato tem dois
  canais (WhatsApp e e-mail), exatamente como a original.
- **Endereço e região atendida** — o DDD é 11, mas isso é inferência, não dado.
  Nenhum texto da página afirma região, e o JSON-LD **não** tem `areaServed`.
- **Horário de atendimento** — não há. Onde antes havia horário, hoje está a
  promessa de prazo (8 h / 24 h), que é real.
- **Números de clientes, postos ou colaboradores** — a original não publica
  nenhum. Os indicadores do hero foram refeitos só com fatos publicados
  (24 h de monitoramento, 8 h de resposta, 24 h de orçamento, 6 frentes).
- **Certificações nomeadas** — a única afirmação de formação é "certificados dos
  melhores cursos preparatórios da área", e é assim que aparece na página.

### Ainda pendente

| Item | Onde | Por quê |
|---|---|---|
| **Nome de quem atende** | `contato.responsavel.nome` | Hoje: "Atendimento OM Portaria", um provisório. A original nunca nomeia ninguém. A seção é construída para levar um nome e uma assinatura de verdade — é a pendência de maior retorno. |
| **"Atendimento direto com o dono"** | — | A original publica isso, mas a página **não usa**: pede que o leitor se importe com o organograma, e a versão pela negativa ("sem vendedor/intermediário") é incoerente, porque sempre existe alguém atendendo. No lugar ficou só o que é verificável: prazo de 8 h e orçamento em 24 h. Não reintroduzir sem decisão do cliente. |
| **Região atendida** | — | Se a empresa quiser declarar, entra no rodapé, no fecho e no `areaServed` do JSON-LD. |
| **Detalhes dos serviços** | `servicos.itens[].detalhes` | ⚠️ Os 4 bullets de cada serviço foram escritos por mim para dar corpo ao acordeão. São descritivos, não contratuais — mas **revise item por item** e ajuste ao que a OM Portaria de fato entrega. |
| **Números auditáveis** | `hero.indicadores` | Se a empresa tiver contagem real de condomínios ou postos, ela é mais forte que os prazos. Um número inflado, porém, destrói exatamente a confiança que esta página existe para construir. |
| **Fotografia própria** | `lib/imagens.ts` | ⚠️ As 11 fotos são de banco de imagens e **ilustrativas**. A troca é arquivo por arquivo: mesmo nome, mesma proporção, só o `alt` a reescrever. Ordem de retorno em `assets/imagens/CREDITOS.md`. |

A legenda "Imagem ilustrativa" na Central 24h existe justamente porque a
fotografia não é de um prédio atendido pela OM Portaria — mantenha-a enquanto a
imagem for de banco.

---

## 8. Próximos passos possíveis

1. **Formulário com envio de verdade.** Hoje `components/contact.tsx` monta a
   mensagem e abre o WhatsApp com ela pronta — funciona sem back-end, e o botão
   diz exatamente isso ("Enviar pelo WhatsApp"), então ninguém é surpreendido.
   Para trocar por envio real: Server Action + provedor de e-mail, mantendo o
   WhatsApp como alternativa visível. Os `name` dos campos já são os certos
   (`nome`, `contato`, `tipo`, `cidade`, `mensagem`).
2. **Imagem de Open Graph.** O metadata de OG está preenchido, mas sem imagem.
   Um `app/opengraph-image.tsx` com a marca sobre o grafite resolveria.
3. **Domínio e `metadataBase`.** Definir em `app/layout.tsx` quando houver
   domínio, para as URLs absolutas de OG.
4. **Analytics**, se o cliente quiser. Cuidado para não derrubar o TBT.
5. **Página de política de privacidade**, se o formulário passar a coletar dados
   em servidor próprio (LGPD).

---

## 9. Histórico

### Sessão 2 — fotografia e tipografia (5/8/2026)

Diagnóstico do cliente: *"o site tá muito cru, faltou trabalho de imagem, e umas
coisas estão muito puxadas pra tech"*. Estava certo nas três.

O que mudou:

1. **Onze fotografias**, onde antes não havia nenhuma. A decisão original de não
   usar banco de imagens era defensável no papel — e produzia um site de serviço
   presencial em que não se via um saguão, um posto nem um uniforme. Detalhes em
   §4 → Fotografia.
2. **A grade falsa de câmeras saiu.** Seis retângulos com rótulo de posto
   imitavam um painel de monitoramento. Foi substituída por uma fotografia de um
   prédio à noite com uma faixa de janelas acesa — que é o título da seção dito
   em imagem, e não finge ser câmera de ninguém.
3. **Duas fontes no lugar de três.** IBM Plex Sans + IBM Plex Mono + Source
   Serif 4 → **Newsreader + Libre Franklin**. A monoespaçada era a coisa mais
   "tech" da página: etiquetas, índices e o relógio da central todos com voz de
   terminal. Hoje `.numeral` faz o mesmo alinhamento com `tabular-nums`.
4. **Um teste novo de contraste sobre foto**, porque o axe não cobre esse caso —
   e ele pegou três reprovações reais no primeiro uso. Ver §6.

O que **não** mudou, e por quê: a seção de depoimentos continua sem retrato e a
do responsável continua sem rosto. Foto comprada ao lado de nome real é invenção
de pessoa, e é justamente a credibilidade que a página inteira existe para
construir. A imagem que entrou em Confiança é de ambiente — o hall de onde
aquelas vozes falam.

Armadilha cara desta sessão, para não repetir: **`next build` com um
`next start` antigo de pé não derruba o servidor velho — ele continua servindo o
build anterior em silêncio.** Duas rodadas de medição de contraste foram feitas
contra código que não estava mais lá. Mate o processo da porta antes de medir.

### Sessão 1 — construção (5/8/2026)

Construção completa, do scaffold `create-next-app` até o estado atual.

Bugs reais encontrados e corrigidos pela verificação (não pela leitura do
código):

- O hero animado atrasava o LCP em 1,5s — **encontrado pelo Lighthouse**.
- Pesos explícitos de fonte suprimiam o fallback com métricas, causando CLS —
  **encontrado ao investigar o culpado do CLS**.
- Resumos dos serviços herdavam a serifa de título e o peso 600 do `<h3>` que os
  embrulha — **encontrado na inspeção visual dos screenshots**, não nos testes.
- Detalhes do acordeão alinhavam sob o número em vez de sob o título — idem.
- `dt`/`dd` aninhados fundo demais dentro do `<dl>` — **encontrado pelo axe**.
- Dois `<nav>` com o mesmo `aria-label` — **encontrado pelo axe no desktop**.
- Âncoras dentro do `<dialog>` rolavam o painel, não a página — **encontrado
  pelo teste de celular**.
- Contrastes insuficientes em três tokens — **encontrado pelo axe**.
- Relógio da central escondido justamente no celular, que é o cenário principal.
- Letra miúda de 11px em linhas longas do rodapé.

Depois disso, todo o conteúdo provisório foi trocado pelos dados reais extraídos
do bundle da landing original — inclusive a correção do ano de fundação (2009 →
**2022**) e a remoção dos números inventados do hero.

Vale registrar: a inspeção visual pegou coisas que 49 testes verdes não pegaram.
Se mexer no visual, tire screenshots e olhe.
