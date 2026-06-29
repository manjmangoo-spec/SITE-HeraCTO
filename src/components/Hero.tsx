import { useEffect, useRef } from 'react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  /* Stagger-reveal on mount */
  useEffect(() => {
    if (!sectionRef.current) return;
    const els = Array.from(sectionRef.current.querySelectorAll('.reveal')) as HTMLElement[];
    const timers: ReturnType<typeof setTimeout>[] = [];
    els.forEach((el, i) =>
      timers.push(setTimeout(() => el.classList.add('visible'), 240 + i * 140))
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  /* Subtle parallax on scroll */
  useEffect(() => {
    const onScroll = () => {
      if (!imgRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const y = Math.min(window.scrollY * -0.06, 0);
      imgRef.current.style.transform = `scale(1.08) translateY(${y}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Campanha principal HN Oliveira"
      className="relative min-h-svh flex flex-col items-center justify-center overflow-hidden isolate bg-[--ink]"
    >
      {/* ── Background image ─────────────────────────── */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=1600"
          alt=""
          aria-hidden="true"
          className="w-full h-[108%] object-cover object-[center_20%] scale-[1.08]"
          style={{ filter: 'brightness(0.52) saturate(0.7) contrast(1.08)' }}
          loading="eager"
          decoding="async"
        />
      </div>

      {/* ── Gradient overlay ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-[5]"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.62) 100%)',
        }}
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center text-white px-6 py-4">

        {/* Kicker */}
        <p className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] md:tracking-[0.25em] text-white/80 uppercase mb-6 reveal md:mr-[-0.25em] mr-[-0.2em]">
          HN Oliveira &nbsp;/&nbsp; Drop Premium 2026
        </p>

        {/* Headline */}
        <h1
          className="font-serif uppercase text-balance reveal delay-1"
          style={{
            fontSize: 'clamp(64px, 11vw, 150px)',
            lineHeight: 0.85,
            letterSpacing: '0.04em',
            marginRight: '-0.04em',
            textShadow: '0 4px 24px rgba(0,0,0,0.1)'
          }}
        >
          Street<br />Luxury
        </h1>

        {/* CTAs */}
        <div className="flex flex-row justify-center gap-4 mt-10 reveal delay-2">
          <a
            href="#collections"
            className="flex w-[190px] sm:w-[220px] items-center justify-center bg-white text-black font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase py-4 transition-transform hover:scale-[1.02]"
          >
            <span style={{ marginRight: '-0.2em' }}>Explorar colecao</span>
          </a>
          <a
            href="#about"
            className="flex w-[190px] sm:w-[220px] items-center justify-center border border-white/40 text-white font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase py-4 transition-all hover:bg-white/5 hover:border-white/60 hover:scale-[1.02]"
          >
            <span style={{ marginRight: '-0.2em' }}>Sobre nos</span>
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 reveal delay-4"
        aria-hidden="true"
      >
        <div className="w-[0.5px] h-12 relative overflow-hidden">
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 h-[30%] w-[0.5px] bg-white/80"
            style={{ animation: 'scrollLine 3.5s cubic-bezier(0.645, 0.045, 0.355, 1) infinite' }}
          />
        </div>
        <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase text-white/60 mr-[-0.2em]">Deslize</span>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(0%); opacity: 0; }
          10%  { opacity: 1; }
          45%  { opacity: 1; }
          60%  { transform: translateY(250%); opacity: 0; }
          100% { transform: translateY(250%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
