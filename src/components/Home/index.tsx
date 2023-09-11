import Banner from "./Banner";
import "./style.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Home = () => {

  const dep = useRef<HTMLSpanElement>(null)
  
  useEffect(() => {

    gsap.to(dep.current, {
      transform: "translateX(-90%)",
      scrollTrigger: {
        scrub: true,
        trigger: "#depoimentos",
        start: "center bottom",
      }
    })
  
  }, [dep])
  

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
                  Facilitamos seu trabalho com terceirização de
                  controladores de acesso, garantindo um ambiente bem gerido.
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
            <div className="sectionHeading">
            <span ref={dep}></span>
            </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
