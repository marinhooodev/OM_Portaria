import Banner from "./Banner";
import "./style.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

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
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis laudantium error mollitia, laborum est recusandae qui
              optio quasi fuga id? Totam iusto animi optio delectus nobis vitae
              veritatis quis, eum sint molestias unde mollitia placeat
              praesentium natus excepturi cum saepe.
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis laudantium error mollitia, laborum est recusandae qui
              optio quasi fuga id? Totam iusto animi optio delectus nobis vitae
              veritatis quis, eum sint molestias unde mollitia placeat
              praesentium natus excepturi cum saepe.
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
                feedback valioso que nos ajuda a melhorar constantemente e a
                continuar dando o nosso melhor.
              </p>
            </div>

            <Slider className="depCarousel" {...settings}>
              <div className="card">
                <div className="content">
                  <div className="imgBox">
                    <img src="man-1.png" alt="Homem - 1" />
                  </div>

                  <div className="nameBox">
                    <p>Gabriel Marinho</p>
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
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eveniet officiis aliquam, nostrum tempore aut at et
                      voluptates dicta beatae explicabo?
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
                    <p>Carimbo</p>
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
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eveniet officiis aliquam, nostrum tempore aut at et
                      voluptates dicta beatae explicabo?
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
                    <p>Gangorra</p>
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
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Eveniet officiis aliquam, nostrum tempore aut at et
                      voluptates dicta beatae explicabo?
                    </cite>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
