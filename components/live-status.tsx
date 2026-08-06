"use client";

import { useEffect, useState } from "react";
import { hero } from "@/lib/content";

/**
 * O sinal de que há alguém acordado.
 *
 * Um ponto que respira devagar (3,6s por ciclo — mais perto de uma respiração
 * do que de um alerta) e o horário de Brasília correndo ao vivo. É o detalhe
 * que transforma "monitoramento 24h" de promessa em fato observável.
 *
 * O relógio só aparece depois da hidratação: renderizar hora no servidor
 * causaria divergência de hidratação e mostraria o fuso errado.
 */
export function LiveStatus({ className = "" }: { className?: string }) {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const formatador = new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "America/Sao_Paulo",
    });

    const atualizar = () => setHora(formatador.format(new Date()));
    atualizar();

    const intervalo = window.setInterval(atualizar, 1000);
    return () => window.clearInterval(intervalo);
  }, []);

  return (
    <div className={`flex flex-wrap items-center gap-x-3.5 gap-y-2 ${className}`}>
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="pulse-live absolute inset-0 rounded-full bg-vig-400" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-vig-400" />
      </span>

      <p className="eyebrow text-ink-300">
        <span className="text-vig-300">{hero.statusRotulo}</span>
        <span className="mx-2 text-ink-500" aria-hidden="true">
          /
        </span>
        {hero.statusTexto}
      </p>

      {/* O relógio fica também no celular: é ali que a prova de que há alguém
          acordado vale mais. Se faltar largura, ele desce de linha. */}
      <span className="rule-x hidden w-6 shrink-0 sm:block" aria-hidden="true" />

      {/* ink-300, e não ink-400: o ink-400 foi calibrado contra o grafite
          chapado, mas aqui o relógio pousa sobre a fotografia do hero, onde o
          fundo é mais claro em partes. Medido no pixel — ver PROGRESS.md. */}
      <p className="eyebrow numeral text-ink-300">
        {hora ? (
          <>
            <span className="tabular-nums">{hora}</span>
            <span className="ml-2">BRT</span>
          </>
        ) : (
          <span className="opacity-0">00:00:00 BRT</span>
        )}
      </p>
    </div>
  );
}
