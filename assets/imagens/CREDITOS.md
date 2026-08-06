# Fotografias — origem, licença e crédito

Todas as imagens desta pasta vêm do [Unsplash](https://unsplash.com) e estão
sob a **[Unsplash License](https://unsplash.com/license)**: uso comercial e não
comercial livre, sem necessidade de pedir autorização, sem pagamento e sem
obrigação de creditar. Modificar é permitido — todas foram recortadas e
recomprimidas antes de entrar no repositório.

**Nenhuma delas é Unsplash+.** Isto foi verificado uma a uma pelo campo `plus`
da API: as imagens Unsplash+ exigem assinatura paga e **não podem** ser usadas
aqui. Se um dia trocar alguma foto, confira isso antes — as buscas do Unsplash
colocam as Unsplash+ nos primeiros resultados, então a chance de pegar uma sem
querer é alta.

O crédito não é exigido, mas é de praxe e está aqui pronto caso a OM Portaria
queira publicá-lo (por exemplo, numa página de política ou no rodapé).

| Arquivo | Onde aparece | Fotógrafo | Original |
|---|---|---|---|
| `hero-saguao.jpg` | Fundo do hero | [Timofey Radkevich](https://unsplash.com/@beauty_is_everywhere) | [unsplash.com](https://unsplash.com/photos/modern-hotel-lobby-with-contemporary-furniture-and-natural-light-hWWrF-XyQWk) |
| `hall-manha.jpg` | Faixa de passagem, entre a promessa e os serviços | [Zoshua Colah](https://unsplash.com/@zoshuacolah) | [unsplash.com](https://unsplash.com/photos/a-modern-lobby-with-pillars-and-a-security-gate-goyJ2pxJjrg) |
| `servico-patrimonial.jpg` | Serviços → Segurança patrimonial | [Matthias Heil](https://unsplash.com/@matthias_heil) | [unsplash.com](https://unsplash.com/photos/a-camera-on-a-wall-znkIL3MQnvY) |
| `servico-monitoramento.jpg` | Serviços → Monitoramento 24 horas | [Mike Meeks](https://unsplash.com/@mikemeex) | [unsplash.com](https://unsplash.com/photos/computer-monitor-and-equalizer-3DSt8b-nCyo) |
| `servico-portaria.jpg` | Serviços → Portaria de condomínio | [Andrew Wang](https://unsplash.com/@wangdrew) | [unsplash.com](https://unsplash.com/photos/grand-building-entrance-with-security-guards-on-a-red-carpet-m796b1IdC40) |
| `servico-acesso.jpg` | Serviços → Controlador de acesso | [Declan Sun](https://unsplash.com/@declansun) | [unsplash.com](https://unsplash.com/photos/an-empty-room-with-a-bunch-of-glass-doors-enVHHv8wU08) |
| `servico-recepcao.jpg` | Serviços → Recepcionistas | [Performance Medicine](https://unsplash.com/@performance_medicine1) | [unsplash.com](https://unsplash.com/photos/modern-reception-desk-with-minimalist-decor-and-logo-BB13Zm9jWPU) |
| `servico-obras.jpg` | Serviços → Canteiro de obras | [Benjamin White](https://unsplash.com/@bjwhite66212) | [unsplash.com](https://unsplash.com/photos/a-large-building-with-a-crane-on-top-of-it-6ZshT5udWxs) |
| `central-noite.jpg` | Central 24 horas | [Bruno BD](https://unsplash.com/@brunobd) | [unsplash.com](https://unsplash.com/photos/office-windows-illuminated-at-night-against-dark-background-JFccAXhJBN0) |
| `uniforme.jpg` | Por que a OM Portaria | [Nick Karvounis](https://unsplash.com/@nickkarvounis) | [unsplash.com](https://unsplash.com/photos/person-wearing-white-dress-shirt-Y_E0Or3TUpg) |
| `recepcao-hall.jpg` | Contato (só em telas largas) | [Neon Wang](https://unsplash.com/@neonwangphotography) | [unsplash.com](https://unsplash.com/photos/hotel-reception-desk-with-modern-wooden-furniture-and-seating-kfnWOD1Tbp8) |

## ⚠️ São todas ilustrativas

Nenhuma dessas fotos mostra a equipe, os postos ou os clientes da OM Portaria.
Elas estão em lugares onde isso é evidente — ambientes, materiais, edifícios —
e **nunca ao lado de um nome próprio**: os depoimentos não têm retrato e a
seção do responsável não tem rosto. Rosto comprado ao lado de pessoa real é
mentira, e destruiria exatamente a confiança que a página existe para
construir.

Quando houver fotografia própria, a troca é arquivo por arquivo: mesmo nome,
mesma proporção, e só o `alt` a reescrever em `lib/imagens.ts`. Nenhum layout
muda. A ordem de prioridade, do que mais ganha com foto real:

1. `servico-portaria`, `servico-recepcao` e `servico-acesso` — são as pessoas
   que o cliente vai receber. Foto do posto de verdade vale muito mais.
2. `hero-saguao` — se houver um prédio atendido que possa ser fotografado com
   autorização do condomínio, é a imagem mais valiosa da página inteira.
3. `uniforme` — o uniforme real da OM Portaria, com a marca dela.

## Como as imagens foram preparadas

Baixadas já recortadas na proporção final (parâmetros `w`, `h` e `fit=crop` da
CDN do Unsplash) e recomprimidas em JPEG progressivo, qualidade 80, com
mozjpeg. O `next/image` faz o resto em tempo de requisição: escolhe a largura
pelo `sizes` de cada uso e converte para WebP.

Os arquivos ficam em `assets/`, e não em `public/`, porque são importados de
forma estática — é isso que permite ao Next descobrir a proporção real em
tempo de build, reservar o espaço antes do download e gerar o `blurDataURL`.
Em `public/` seriam só URLs, sem nada disso.
