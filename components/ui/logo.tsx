export default function DaemonHexVaultLogo({
  size = 48,
  stroke = 3.2,
  className = '',
  title = 'Daemon S',
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role="img"
      aria-label={title}
    >
      {/* outer hex */}
      <path d="M32 8 L52 20 V44 L32 56 L12 44 V20 Z" />
      {/* inset hex */}
      <path d="M32 13 L48 22 V42 L32 51 L16 42 V22 Z" opacity=".85" />
      {/* data bars */}
      <path d="M24 27 V39" />
      <path d="M32 23 V43" />
      <path d="M40 28 V36" />
      {/* baseline hint */}
      <path d="M20 44 H44" opacity=".6" />
    </svg>
  );
}
