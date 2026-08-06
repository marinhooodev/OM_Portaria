/**
 * OM Portaria — todo o conteúdo editorial da landing page.
 *
 * Tudo que é texto, número ou dado de contato vive aqui. Os componentes em
 * `components/` só cuidam de layout e comportamento. Para editar a página,
 * edite este arquivo.
 *
 * ORIGEM DOS DADOS
 * Os dados cadastrais, os serviços, os depoimentos e as promessas de prazo
 * foram extraídos da landing original em https://www.omportaria.com.br/
 * (bundle Vite, capturado em 5/8/2026). São os dados reais da empresa.
 *
 * O que a original NÃO publica, e portanto não afirmamos aqui: telefone fixo,
 * endereço, região atendida, número de clientes, de postos ou de colaboradores,
 * e qualquer certificação nomeada. Ver PROGRESS.md → "Pendências de conteúdo".
 */

export const empresa = {
  nome: "OM Portaria",
  razaoSocial: "OM Portaria e Limpeza LTDA",
  descritor: "Portaria · Controle de acesso · Segurança patrimonial",
  desde: "2022",
} as const;

/** Âncoras da navegação — a ordem define o arco emocional do scroll. */
export const navegacao = [
  { id: "servicos", rotulo: "Serviços" },
  { id: "metodo", rotulo: "Método" },
  { id: "central", rotulo: "Central 24h" },
  { id: "confianca", rotulo: "Confiança" },
  { id: "contato", rotulo: "Contato" },
] as const;

/* -------------------------------------------------------------------------- */
/*  01 — Chegada                                                              */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: `Portaria profissional · desde ${empresa.desde}`,
  titulo: "Uma portaria bem conduzida não chama atenção.",
  texto:
    "Colocamos porteiros, controladores de acesso e recepcionistas treinados dentro de condomínios, empresas e canteiros de obra — com monitoramento por câmeras 24 horas e atendimento feito direto com o dono. Sua mensagem é respondida em até 8 horas.",
  acaoPrimaria: "Pedir um orçamento",
  acaoSecundaria: "Como trabalhamos",
  statusRotulo: "Central de monitoramento",
  statusTexto: "ativa agora",
  /**
   * Só fatos que a empresa realmente publica. A landing original não divulga
   * número de clientes, de postos nem de colaboradores — e um número inflado
   * destruiria exatamente a confiança que esta página existe para construir.
   */
  indicadores: [
    { valor: "24", unidade: "horas", nota: "de monitoramento por câmeras" },
    { valor: "8", unidade: "horas", nota: "no máximo para responder sua mensagem" },
    { valor: "24", unidade: "horas", nota: "para o orçamento completo e detalhado" },
    { valor: "1", unidade: "interlocutor", nota: "o dono, do primeiro contato ao contrato" },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  02 — A promessa                                                           */
/* -------------------------------------------------------------------------- */

export const tese = {
  eyebrow: "A promessa",
  texto:
    "Contratar portaria é entregar a alguém a chave, a entrada e o sossego de todo mundo que mora ou trabalha ali. É uma responsabilidade pesada. Nosso trabalho é carregá-la com discrição — e devolver ao síndico, ao gestor e ao morador a parte mais rara do serviço: não precisar pensar nele.",
  assinatura: "O que fazemos, resumido em uma frase.",
} as const;

/**
 * A passagem entre a promessa e os serviços: uma respiração em imagem.
 *
 * O texto aqui é editorial — descreve o que se vê na fotografia e o que ela
 * quer dizer. Não afirma nada sobre a empresa que não esteja no resto da
 * página, justamente porque a imagem é ilustrativa.
 */
export const passagem = {
  eyebrow: "Seis da manhã",
  legenda:
    "O hall antes de o primeiro morador descer. Quando o trabalho está bem feito, é exatamente isto que se vê: nada acontecendo.",
} as const;

/* -------------------------------------------------------------------------- */
/*  03 — Serviços                                                             */
/* -------------------------------------------------------------------------- */

export const servicos = {
  eyebrow: "Serviços",
  titulo: "Seis frentes, uma só disciplina.",
  texto:
    "Cada posto é dimensionado a partir do que o local realmente exige. Abra qualquer item para ver o que ele envolve.",
  /**
   * Os seis serviços e os textos de `resumo` vêm da landing original.
   *
   * ⚠️ TODO(cliente): os itens de `detalhes` foram escritos para dar corpo à
   * seção e descrevem o serviço de forma genérica — não são compromissos
   * contratuais confirmados pela empresa. Revise item por item com o cliente e
   * ajuste ao que a OM Portaria de fato entrega antes de publicar.
   */
  itens: [
    {
      id: "patrimonial",
      titulo: "Segurança patrimonial",
      resumo:
        "Confie na excelência do nosso serviço de segurança patrimonial para proteger o que é mais valioso para você.",
      detalhes: [
        "Proteção de instalações, equipamentos e áreas comuns",
        "Rotina de inspeção do perímetro e dos pontos de acesso",
        "Registro de ocorrências e passagem de turno documentada",
        "Dimensionamento do posto conforme o risco de cada local",
      ],
    },
    {
      id: "monitoramento",
      titulo: "Monitoramento 24 horas",
      resumo:
        "Nosso serviço de monitoramento 24 horas garante tranquilidade a qualquer hora do dia para sua empresa.",
      detalhes: [
        "Acompanhamento das imagens em tempo real, todos os dias",
        "Rondas virtuais nos horários de maior exposição",
        "Protocolo definido para cada tipo de ocorrência",
        "Comunicação imediata ao síndico ou ao gestor predial",
      ],
    },
    {
      id: "portaria",
      titulo: "Portaria de condomínio",
      resumo:
        "Terceirização de porteiros para condomínios, proporcionando segurança e comodidade com expertise profissional.",
      detalhes: [
        "Porteiro integrado à rotina do prédio e aos moradores",
        "Identificação de visitantes, prestadores e entregas",
        "Cobertura de turnos combinada com a administração",
        "Uniforme, postura e padrão de atendimento definidos",
      ],
    },
    {
      id: "acesso",
      titulo: "Controlador de acesso",
      resumo:
        "Facilitamos seu trabalho com terceirização de controladores de acesso, garantindo um ambiente bem gerido.",
      detalhes: [
        "Controle de entrada e saída de pessoas e veículos",
        "Operação de catracas, cancelas e sistemas já instalados",
        "Conferência de crachás, autorizações e agendamentos",
        "Registro do fluxo para consulta posterior",
      ],
    },
    {
      id: "recepcao",
      titulo: "Recepcionistas",
      resumo:
        "Terceirização de recepcionistas, oferecendo profissionalismo e atendimento excelentes para sua empresa.",
      detalhes: [
        "A primeira pessoa que seu cliente encontra, bem preparada",
        "Atendimento telefônico e encaminhamento de visitantes",
        "Apoio administrativo e gestão de correspondência",
        "Padrão de atendimento alinhado com a sua empresa",
      ],
    },
    {
      id: "obras",
      titulo: "Canteiro de obras",
      resumo:
        "Serviço de segurança em canteiro de obras, garantindo a segurança de seus equipamentos e trabalhadores.",
      detalhes: [
        "Controle de entrada e saída de materiais e veículos",
        "Acompanhamento do fluxo de terceiros no canteiro",
        "Proteção de equipamentos fora do horário de trabalho",
        "Cobertura noturna, de fim de semana e de feriado",
      ],
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  04 — Método                                                               */
/* -------------------------------------------------------------------------- */

export const metodo = {
  eyebrow: "Como trabalhamos",
  titulo: "Quatro etapas, sempre na mesma ordem.",
  texto:
    "A ordem importa mais do que a pressa. É ela que faz o primeiro turno começar sem susto.",
  etapas: [
    {
      titulo: "Você fala com o dono",
      texto:
        "Seu atendimento é feito direto com o dono, para você ter uma visão completa do serviço e tirar todas as dúvidas antes de decidir qualquer coisa.",
      marca: "Sem intermediário",
    },
    {
      titulo: "Resposta e orçamento",
      texto:
        "Em no máximo 8 horas respondemos sua mensagem. Se assim desejar, em 24 horas entregamos o orçamento completo e detalhado.",
      marca: "8 h · 24 h",
    },
    {
      titulo: "Profissional certificado",
      texto:
        "Nossos profissionais são altamente capacitados e possuem certificados dos melhores cursos preparatórios da área, treinados para as mais diversas situações de segurança.",
      marca: "Formação comprovada",
    },
    {
      titulo: "Acompanhamento",
      texto:
        "A equipe é treinada com rigor e responsabilidade, e a empresa mantém um ambiente que incentiva o desenvolvimento profissional de quem está no posto.",
      marca: "Enquanto durar o contrato",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  05 — Central 24 horas                                                     */
/* -------------------------------------------------------------------------- */

export const central = {
  eyebrow: "Central 24 horas",
  titulo: "Alguém acordado enquanto o prédio dorme.",
  texto:
    "O monitoramento por câmeras funciona 24 horas e garante tranquilidade a qualquer hora do dia — para a sua empresa e para o seu condomínio.",
  leitura: [
    { rotulo: "Operação", valor: "24 h · todos os dias" },
    { rotulo: "Resposta à sua mensagem", valor: "em até 8 h" },
    { rotulo: "Orçamento completo", valor: "em até 24 h" },
    { rotulo: "Atendimento", valor: "direto com o dono" },
  ],
  /**
   * Os pontos que costumam entrar num plano de monitoramento. São exemplos
   * genéricos de um prédio, não uma lista de câmeras da OM Portaria — por isso
   * aparecem como texto, e não como se fossem miniaturas de câmera ao vivo.
   */
  pontosRotulo: "Pontos que costumam entrar no plano",
  pontos: [
    "Acesso principal",
    "Garagem −1",
    "Hall social",
    "Doca de carga",
    "Perímetro",
    "Áreas comuns",
  ],
  legendaFoto: "Imagem ilustrativa",
} as const;

/* -------------------------------------------------------------------------- */
/*  06 — Confiança                                                            */
/* -------------------------------------------------------------------------- */

export const vozes = {
  eyebrow: "Confiança",
  titulo: "O que dizem sobre a OM Portaria.",
  texto:
    "Três vozes: quem administra o prédio, quem contrata e quem fica no posto.",
  /**
   * Depoimentos reais, publicados pela própria empresa na landing original,
   * com os nomes e papéis que constam lá.
   */
  itens: [
    {
      citacao:
        "Como administrador de um condomínio, a segurança dos nossos moradores é de extrema importância. A OM Portaria tem sido um parceiro valioso nesse aspecto. Eles oferecem uma equipe de porteiros e controladores de acesso altamente qualificados, além de sistemas de monitoramento de última geração. Nossa comunidade se sente mais segura graças aos serviços da OM Portaria.",
      autor: "Pedro",
      contexto: "Cliente · administrador de condomínio",
      destaque: true,
    },
    {
      citacao:
        "Contratamos os serviços da OM Portaria para garantir a segurança de nossa empresa e estamos extremamente satisfeitos. A equipe é altamente profissional e competente. Desde que começamos a parceria, nossa segurança melhorou significativamente.",
      autor: "Mônica",
      contexto: "Cliente",
      destaque: false,
    },
    {
      citacao:
        "Aqui na OM Portaria, somos treinados com rigor e responsabilidade para garantir a segurança dos nossos clientes. A empresa valoriza seus funcionários e promove um ambiente de trabalho que incentiva o desenvolvimento profissional.",
      autor: "Guilherme",
      contexto: "Funcionário",
      destaque: false,
    },
  ],
} as const;

export const credenciais = {
  eyebrow: "Por que a OM Portaria",
  titulo: "A parte que ninguém vê — e que sustenta o resto.",
  texto:
    "Fundada em 2022, a OM Portaria oferece soluções completas em segurança e monitoramento, com uma equipe formada por profissionais experientes e treinados para as mais diversas situações.",
  /**
   * Cada item corresponde a uma afirmação que a empresa já faz na landing
   * original. Nada de selo, brasão ou certificação nomeada: só o que está
   * escrito por extenso e pode ser cobrado.
   */
  itens: [
    {
      titulo: "Profissionais certificados",
      texto:
        "Nossos profissionais são altamente capacitados e possuem certificados dos melhores cursos preparatórios da área.",
    },
    {
      titulo: "Atendimento direto com o dono",
      texto:
        "Seu atendimento é feito direto com o dono, para proporcionar uma experiência completa sobre o serviço e tirar todas as suas dúvidas.",
    },
    {
      titulo: "Resposta em até 8 horas",
      texto:
        "Em no máximo 8 horas respondemos a sua mensagem — e, se desejar, em 24 horas entregamos o orçamento completo e detalhado.",
    },
    {
      titulo: "Equipe treinada com rigor",
      texto:
        "A equipe é preparada com rigor e responsabilidade, e a empresa mantém um ambiente que incentiva o desenvolvimento profissional.",
    },
    {
      titulo: "Cobertura completa",
      texto:
        "Portaria, vigilância, controle de acesso, recepção, monitoramento de câmeras e consultoria em segurança, numa abordagem única.",
    },
    {
      titulo: "Empresa constituída",
      texto:
        "OM Portaria e Limpeza LTDA, CNPJ 47.319.362/0001-03, em operação desde 2022.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/*  07 — O convite                                                            */
/* -------------------------------------------------------------------------- */

export const contato = {
  eyebrow: "Fale com o responsável",
  titulo: "Quem responde esta página é quem responde pelo serviço.",
  responsavel: {
    // ⚠️ TODO(cliente): a landing original não publica o nome do proprietário.
    // Esta seção inteira é construída sobre "quem responde é quem responde pelo
    // serviço" — ela ganha muito com um nome e uma assinatura de verdade aqui.
    nome: "O dono atende",
    cargo: empresa.razaoSocial,
    iniciais: "OM",
    mensagem:
      "Seu atendimento é feito direto comigo, para você ter uma visão completa do serviço e tirar todas as dúvidas. Em no máximo 8 horas eu respondo a sua mensagem e, se você quiser, em 24 horas devolvo o orçamento completo e detalhado. Sem visita de vendedor, sem proposta genérica.",
  },
  // Dados reais da landing original.
  whatsapp: "5511984058255",
  whatsappExibicao: "(11) 98405-8255",
  email: "omportaria.contato@gmail.com",
  promessa: "Resposta em até 8 horas · orçamento completo em 24 horas",
  formulario: {
    titulo: "Peça o orçamento",
    texto:
      "Preencha o essencial. Abrimos o WhatsApp com a sua mensagem já escrita — é só confirmar o envio.",
    tiposImovel: [
      "Condomínio residencial",
      "Empresa / edifício corporativo",
      "Canteiro de obras",
      "Outro",
    ],
    acao: "Enviar pelo WhatsApp",
    alternativa: "Prefere e-mail?",
  },
} as const;

export const rodape = {
  cnpj: "47.319.362/0001-03",
  legal: `© ${new Date().getFullYear()} ${empresa.razaoSocial}. Todos os direitos reservados.`,
} as const;
