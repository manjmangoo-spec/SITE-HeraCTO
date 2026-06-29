import { useEffect, useRef } from 'react';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef     = useRef<HTMLImageElement>(null);

  /* Stagger-reveal on mount */
  useEffect(() => {
    if (!sectionRef.current) return;
    const els = Array.from(sectionRef.current.querySelectorAll('.reveal'));
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
          src="/assets/images/products/produto-camiseta-lacoste.png"
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
        <p className="label text-white/55 tracking-[0.22em] mb-5 reveal">
          HN Oliveira &nbsp;/&nbsp; Drop Premium 2026
        </p>

        {/* Headline */}
        <h1
          className="font-serif font-semibold uppercase text-balance reveal delay-1"
          style={{
            fontSize: 'clamp(52px, 8.5vw, 118px)',
            lineHeight: 0.86,
            letterSpacing: '0.02em',
          }}
        >
          Street<br />Luxury
        </h1>

        {/* Divider */}
        <div className="w-[1px] h-8 bg-white/25 my-5 reveal delay-2" aria-hidden="true" />

        {/* Subtext */}
        <p
          className="max-w-[480px] font-light text-white/72 leading-[1.7] reveal delay-2"
          style={{ fontSize: 'clamp(13px, 1.2vw, 16px)' }}
        >
          Curadoria rigorosa de pecas premium —<br className="hidden sm:block" />
          do asfalto ao editorial.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-7 reveal delay-3">
          <a href="#collections" className="btn-white">
            Explorar colecao
          </a>
          <a href="#about" className="btn-ghost-white">
            Sobre nos
          </a>
        </div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 text-white/40 reveal delay-4"
        aria-hidden="true"
      >
        <div className="w-px h-11 bg-white/20 relative overflow-hidden">
          <div
            className="absolute inset-x-0 top-0 h-[45%] bg-white/55"
            style={{ animation: 'scrollLine 2.2s ease-in-out infinite' }}
          />
        </div>
        <span className="label-sm">Scroll</span>
      </div>

      <style>{`
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(240%); }
        }
      `}</style>
    </section>
  );
}
