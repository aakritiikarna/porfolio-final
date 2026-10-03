export default function AnimatedBackdrop() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#1a1240_0%,_#070617_55%,_#04030f_100%)]" />
      <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-violet-600/10 blur-3xl animate-drift" />
      <div className="absolute inset-0 bg-grid" />
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  )
}
