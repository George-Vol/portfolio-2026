// The V mark from the "LOGO NEW" frame in the Portfolio Figma file. Favicon twin: src/app/icon.svg
export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1092 946" aria-hidden className={className}>
      <path d="M0 0H327.6L414.277 150.202H86.6775L0 0Z" fill="#AD0508" />
      <path d="M102.443 177.512H430.043L516.789 327.714H189.189L102.443 177.512Z" fill="#940407" />
      <path d="M204.886 355.023H532.486L619.232 505.225H291.632L204.886 355.023Z" fill="#7A0306" />
      <path d="M307.398 532.535H634.998L709.8 662.255L546 946L307.398 532.535Z" fill="#610305" />
      <path d="M709.8 0H1092L1005.32 150.202H796.478L709.8 0Z" fill="#AD0508" />
      <path d="M812.243 177.512H989.557L900.9 331.127L812.243 177.512Z" fill="#940407" />
    </svg>
  );
}
