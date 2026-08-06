import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Thesis } from "@/components/thesis";
import { Passagem } from "@/components/passagem";
import { Services } from "@/components/services";
import { Method } from "@/components/method";
import { Monitoring } from "@/components/monitoring";
import { Voices } from "@/components/voices";
import { Credentials } from "@/components/credentials";
import { Contact } from "@/components/contact";
import { SiteFooter } from "@/components/site-footer";
import { contato, empresa, rodape } from "@/lib/content";

/**
 * Uma página só, uma descida só.
 *
 * O arco emocional está na ordem das seções e não deve ser reorganizado sem
 * pensar no que se perde:
 *
 *   Hero        chegada   — garantia e escala. "Você achou gente séria."
 *   Thesis      dobradiça — o alívio, dito uma vez e em voz baixa.
 *   Passagem    respiração— o hall às seis da manhã, de borda a borda.
 *   Services    entendimento — a extensão do serviço, com calma.
 *   Method      competência  — como o trabalho é feito, na ordem em que é feito.
 *   Monitoring  vigília      — alguém acordado. Aqui a página escurece de novo.
 *   Voices      confiança    — as pessoas que convivem com a equipe.
 *   Credentials evidência    — o que sustenta tudo isso por escrito.
 *   Contact     calor        — atrás do rigor, uma pessoa e uma mão estendida.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1">
        <Hero />
        <Thesis />
        <Passagem />
        <Services />
        <Method />
        <Monitoring />
        <Voices />
        <Credentials />
        <Contact />
      </main>

      <SiteFooter />

      {/* Dados estruturados: ajuda o negócio a aparecer como empresa local,
          não como página solta. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SecurityService",
            name: empresa.nome,
            legalName: empresa.razaoSocial,
            description:
              "Portaria, vigilância, controle de acesso, recepção, monitoramento de câmeras e consultoria em segurança para condomínios, empresas e canteiros de obra.",
            email: contato.email,
            telephone: `+${contato.whatsapp}`,
            foundingDate: empresa.desde,
            taxID: rodape.cnpj,
            // Sem `areaServed` nem `openingHours`: a empresa não publica região
            // atendida nem horário, e dado estruturado inventado é dado errado.
          }),
        }}
      />
    </>
  );
}
