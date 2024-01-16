import Banner from "./Banner";
import "./style.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Home = () => {
  const dep = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.to(dep.current, {
      transform: "translateX(-100%)",
      scrollTrigger: {
        scrub: true,
        trigger: "#depoimentos",
        start: "center bottom",
      },
    });
  }, [dep]);

  return (
    <main id="main">
      <Banner />

      <section id="sobre-nos">
        <div className="content">
          <div className="textSide">
            <span>SOBRE NÓS</span>
            <h2>Conheça a OM Portaria</h2>

            <p>
              Fundada em 2022, a OM Portaria é uma empresa dedicada a oferecer
              soluções completas em segurança e monitoramento. Com um
              compromisso sólido com a proteção de empresas e patrimônios, a OM
              Portaria rapidamente se destacou no mercado de serviços de
              segurança.
            </p>

            <p>
              A OM Portaria é composta por uma equipe altamente capacitada e
              comprometida, formada por profissionais experientes e treinados
              para lidar com as mais diversas situações de segurança. Nossos
              serviços abrangem desde portaria, vigilância, monitoramento de
              câmeras até consultoria em segurança, garantindo uma abordagem
              abrangente para atender às necessidades de nossos clientes.
            </p>

            <p>
              Na OM Portaria, acreditamos que a segurança é um direito
              fundamental, e nosso compromisso é garantir que nossos clientes
              tenham acesso a serviços de qualidade que proporcionem paz de
              espírito. Junte-se a nós nesta jornada em busca de um ambiente
              mais seguro e protegido. Conheça a OM Portaria e descubra como
              podemos ser seu parceiro confiável em segurança."
            </p>

            <a href="#contato" className="modelButton">
              <span>Entre em contato</span>
            </a>
          </div>

          <div className="imageSide">
            <img src="about-guarda.webp" alt="Guarda" />
          </div>
        </div>
      </section>

      <section id="servicos">
        <div className="content">
          <div className="sectionHeading">
            <span>SERVIÇOS</span>
            <h2>O que a OM Portaria oferece?</h2>
            <p></p>
          </div>

          <div className="cardsBox">
            <div className="cardConfig">
              <div className="iconSide">
                <img src="icon-bens.png" alt="Obras" />
              </div>
              <div className="contentSide">
                <h3>Segurança Patrimonial</h3>
                <p>
                  Confie na excelência do nosso serviço de segurança patrimonial
                  para proteger o que é mais valioso para você.
                </p>
              </div>
            </div>
            <div className="cardConfig">
              <div className="iconSide">
                <img src="icon-monitoramento.png" alt="Obras" />
              </div>
              <div className="contentSide">
                <h3>Monitoramento 24h</h3>
                <p>
                  Nosso serviço de monitoramento 24 horas garante tranquilidade
                  a qualquer hora do dia para sua empresa.
                </p>
              </div>
            </div>

            <div className="cardConfig">
              <div className="iconSide">
                <img src="icon-portaria.png" alt="Obras" />
              </div>
              <div className="contentSide">
                <h3>Portaria de Condomínio</h3>
                <p>
                  Terceirização de porteiros para condomínios, proporcionando
                  segurança e comodidade com expertise profissional.
                </p>
              </div>
            </div>

            <div className="cardConfig">
              <div className="iconSide">
                <img src="icon-controlador-de-acesso.png" alt="Obras" />
              </div>
              <div className="contentSide">
                <h3>Controlador de Acesso</h3>
                <p>
                  Facilitamos seu trabalho com terceirização de controladores de
                  acesso, garantindo um ambiente bem gerido.
                </p>
              </div>
            </div>
            <div className="cardConfig">
              <div className="iconSide">
                <img src="icon-recepcionista.png" alt="Obras" />
              </div>
              <div className="contentSide">
                <h3>Recepcionistas</h3>
                <p>
                  Terceirização de recepcionistas, oferecendo profissionalismo e
                  atendimento excelentes para sua empresa.
                </p>
              </div>
            </div>

            <div className="cardConfig">
              <div className="iconSide">
                <img src="icon-obras.png" alt="Obras" />
              </div>

              <div className="contentSide">
                <h3>Canteiro de Obras</h3>
                <p>
                  Serviço de segurança em canteiro de obras, garantindo a
                  segurança de seus equipamentos e trabalhadores.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="depoimentos">
        <div className="content">
          <div className="depContent">
            <div className="heading">
              <span>DEPOIMENTOS</span>
              <h2>O que dizem sobre a OM Portaria?</h2>
              <p>
                Os depoimentos dos nossos clientes e colegas de equipe são um
                feedback valioso que nos ajuda a melhorar e a continuar
                oferecendo serviços de qualidade.
              </p>
            </div>

            <div className="depCarousel">
              <div className="card">
                <div className="content">
                  <div className="imgBox">
                    <img src="woman-1.png" alt="Homem - 1" />
                  </div>

                  <div className="nameBox">
                    <p>Mônica</p>
                    <span></span>
                  </div>

                  <div className="roleStars">
                    <span>cliente</span>
                    <img src="icon-five-stars.png" alt="Five Stars" />
                  </div>

                  <div className="quoteMarks">
                    <img src="quote.png" alt="" />
                    <span></span>
                  </div>

                  <div className="quote">
                    <cite>
                      Contratamos os serviços da OM Portaria para garantir a
                      segurança de nossa empresa e estamos extremamente
                      satisfeitos. A equipe da OM Portaria é altamente
                      profissional e competente. Desde que começamos a parceria,
                      nossa segurança melhorou significativamente. Recomendo a
                      OM Portaria a todas as empresas que buscam tranquilidade e
                      proteção.
                    </cite>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="content">
                  <div className="imgBox">
                    <img src="man-2.png" alt="Homem - 1" />
                  </div>

                  <div className="nameBox">
                    <p>Pedro</p>
                    <span></span>
                  </div>

                  <div className="roleStars">
                    <span>CLIENTE</span>
                    <img src="icon-five-stars.png" alt="Five Stars" />
                  </div>

                  <div className="quoteMarks">
                    <img src="quote.png" alt="" />
                    <span></span>
                  </div>

                  <div className="quote">
                    <cite>
                      Como administrador de um condomínio, a segurança dos
                      nossos moradores é de extrema importância. A OM Portaria
                      tem sido um parceiro valioso nesse aspecto. Eles oferecem
                      uma equipe de porteiros e controladores de acesso
                      altamente qualificados, além de sistemas de monitoramento
                      de última geração. Nossa comunidade se sente mais segura
                      graças aos serviços da OM Portaria.
                    </cite>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="content">
                  <div className="imgBox">
                    <img src="man-3.png" alt="Homem - 1" />
                  </div>

                  <div className="nameBox">
                    <p>Guilherme</p>
                  </div>

                  <div className="roleStars">
                    <span>FUNCIONÁRIO</span>
                    <img src="icon-five-stars.png" alt="Five Stars" />
                  </div>

                  <div className="quoteMarks">
                    <img src="quote.png" alt="Quote" />
                    <span></span>
                  </div>

                  <div className="quote">
                    <cite>
                      Aqui na OM Portaria, somos treinados com rigor e
                      responsabilidade para garantir a segurança dos nossos
                      clientes. A empresa valoriza seus funcionários e promove
                      um ambiente de trabalho que incentiva o desenvolvimento
                      profissional. Estou orgulhoso de fazer parte da equipe da
                      OM Portaria e de contribuir para a segurança de nossos
                      clientes.
                    </cite>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="profissionais">
        <div className="content">
          <div className="textSide">
            <h2>Nossos profissionais são altamente capacitados,</h2>
            <p>
              e possuem certificados dos melhores cursos preparatórios da área.
            </p>
          </div>

          <div className="certificateSide">
            <h3>Clique para abrir</h3>
            <span>Ver certificado</span>
          </div>
        </div>
      </section>

      <section id="contato">
        <div className="content">
          <div className="heading">
            <span>CONTATO</span>
            <h2>Entre em contato conosco</h2>
          </div>

          <div className="box">
            <div className="whatsappSide">
              <h3>Nossos canais de atendimento</h3>

              <p>
                Seu atendimento será feito direto com o dono, para proporcionar
                uma experiência completa sobre o serviço e tirar todas as suas
                dúvidas.{" "}
              </p>

              <p>
                Em no máximo 8 horas respondemos sua mensagem, e se assim
                desejar, 24 horas para fazer seu orçamento completo e detalhado!
              </p>

              <p>
                Aqui na OM Portaria você vai encontrar os melhores
                profissionais, solicite já seu orçamento!
              </p>

              <div className="emailBox">
                <a href="mailto:contato@omportaria.com.br">
                  <img src="./mail.webp" alt="Email Icon" />
                </a>
                <p>contato@omportaria.com.br</p>
              </div>

              <div className="zapBox">
                <a href="https://wa.me/+5511984058255" target="_blank">
                  <img src="./zap-icon.webp" alt="Whatsapp Icon" />
                </a>

                <p>(11) 98405-8255</p>
              </div>
            </div>

            <div className="imageSide">
              <img src="./contato.jpg" alt="Guarda" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
