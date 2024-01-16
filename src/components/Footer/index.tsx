import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className="content">
        
        <div className="box">
          <div className="logoBox">
            <img src="./logo.webp" alt="Logo" />
            <p>
              Fundada em 2022, a OM Portaria é uma empresa dedicada a oferecer
              soluções completas em segurança e monitoramento.
            </p>
          </div>
        </div>

          <div className="box">

            <div className="menu">

              <span>Menu Rápido</span>

              <nav>
                <ul>
                  <li><a href="#banner">Home</a></li>
                  <li><a href="#sobre-nos">Sobre</a></li>
                  <li><a href="#servicos">Serviços</a></li>
                  <li><a href="#contato">Contato</a></li>
                </ul>
              </nav>
            </div>

          </div>

          <div className="box">

            <div className="atendimento">

            <span className="title">
              Canais de Atendimento
            </span>

            <p><span>Email: </span> contato@omportaria.com.br</p>
            <p><span>Whatsapp: </span> (11) 98405-8255</p>

            <div className="copyright">
              <img src="./copyright.png" alt="Copyright Icon" />
              <p>2024 - OM Portaria e Limpeza LTDA.</p>
            </div>

            <div className="copyright">
              <img src="./empresa.png" alt="Copyright Icon" />
              <p>CNPJ: 47.319.362/0001-03</p>
            </div>

            </div>
          </div>

      </div>

      <p className="credits">Desenvolvido por <a href="#">Gabriel Marinho</a>.</p>

    </footer>
  );
};

export default Footer;
