import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * A partir do Next 16 a lista de qualidades é obrigatória: só os valores
     * declarados aqui podem ser pedidos ao otimizador.
     *
     * 75 é o padrão e vale para toda foto que aparece por inteiro. 50 é para
     * as que ficam sob véu — o hero, principalmente: metade da informação da
     * imagem é apagada pelo gradiente antes de chegar ao olho, então pagar
     * banda por ela seria pagar duas vezes pelo mesmo pixel.
     */
    qualities: [50, 75],
  },
};

export default nextConfig;
