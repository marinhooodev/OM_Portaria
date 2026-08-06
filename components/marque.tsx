/**
 * A marca OM Portaria.
 *
 * O símbolo é um vão: verga e dois montantes, como um pórtico visto de frente.
 * O montante da direita para antes do chão — é por ali que se entra — e o
 * quadrado que ocupa esse vazio é a pessoa que está ali, de plantão.
 *
 * Deliberadamente: nenhum escudo, nenhum brasão, nenhuma insígnia. A empresa
 * vende calma, não força.
 */
export function Marque({
  className = "",
  live = false,
}: {
  className?: string;
  /** Acende o quadrado da soleira na cor de presença ativa. */
  live?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {/* verga */}
      <rect x="3" y="4" width="26" height="3" fill="currentColor" />
      {/* montante longo */}
      <rect x="3" y="7" width="3" height="21" fill="currentColor" />
      {/* montante curto — deixa o vão da entrada */}
      <rect x="26" y="7" width="3" height="12" fill="currentColor" />
      {/* a presença na soleira */}
      <rect
        x="26"
        y="25"
        width="3"
        height="3"
        fill={live ? "var(--color-vig-400)" : "currentColor"}
        opacity={live ? 1 : 0.45}
      />
    </svg>
  );
}

/** Símbolo + assinatura, como uma placa de latão no hall. */
export function Wordmark({
  className = "",
  live = false,
}: {
  className?: string;
  live?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Marque className="h-[1.35em] w-[1.35em] shrink-0" live={live} />
      <span className="font-display text-[1.0625rem] leading-none font-semibold tracking-[-0.005em] whitespace-nowrap">
        OM Portaria
      </span>
    </span>
  );
}
