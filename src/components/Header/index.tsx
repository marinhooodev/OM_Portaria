import "./style.scss";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Header = () => {
  gsap.registerPlugin(ScrollTrigger);

  const barrinha = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(barrinha.current, {
      duration: 3,
      maxWidth: "100%",
      borderWidth: "100%",
      scrollTrigger: {
        scrub: true,
        trigger: "#root",
        start: "top top",
      },
    });
  }, []);

  return (
    <>
      <header>
        <div className="content">
          <div className="logoBox">
            <img src="logo.webp" alt="Logotipo" />
          </div>

          <nav className="mainNavigation">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#sobre-nos">Sobre</a>
              </li>
              <li>
                <a href="#servicos">Serviços</a>
              </li>
              <li>
                <a href="#contato">Contato</a>
              </li>
            </ul>
          </nav>

          <div className="contactBox">
            <span>
              <img src="zap-icon.webp" alt="Whatsapp" /> (11) 98405-8255
            </span>
            <span>
              <img src="mail.webp" alt="Whatsapp" />contato@omportaria.com.br
            </span>
          </div>
        </div>

        <div className="iconsFixed">
          <div className="whatsapp">
            <a href="https://wa.me/+5511984058255" target="_blank">
              <img src="zap-icon.webp" alt="Whatsapp" />
            </a>

            <div className="hiddenContact">
              <p>Entrar em contato!</p>
            </div>
          </div>
        </div>
      </header>
      <div ref={barrinha} id="barrinha"></div>
    </>
  );
};

export default Header;
