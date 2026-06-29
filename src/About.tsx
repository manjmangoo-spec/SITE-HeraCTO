import { useEffect, useRef } from 'react';

const STATS = [
  { value: '1.2k+', label: 'Clientes satisfeitos' },
  { value: '4.9',   label: 'Avaliacao media' },
  { value: '100%',  label: 'Autenticidade garantida' },
];

const BENEFITS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2Z"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    label: 'Estoque real',
    desc:  'Sem pre-order. Produtos disponiveis para envio imediato.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    ),
    label: 'Curadoria editorial',
    desc:  'Cada marca e peca escolhida com criterio de moda de alto nivel.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    label: 'Atendimento pessoal',
    desc:  'Suporte via WhatsApp de segunda a sabado. Resposta rapida.',
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-white border-t border-hairline"
      aria-label="Sobre a HN Oliveira"
    >
      {/* ── Main split ───────────────────────────────── */}
      <div className="grid md:grid-cols-[minmax(280px,0.50fr)_minmax(0,0.50fr)] min-h-[72svh]">

        {/* LEFT: brand image — dark panel */}
        <div className="reveal bg-[#070707] flex items-center justify-center min-h-[460px] md:min-h-0 p-[clamp(48px,8vw,100px)] relative overflow-hidden">
          <div className="absolute inset-[10%] rounded-full border border-white/6 pointer-events-none" aria-hidden="true" />
          <img
            src="/assets/images/oliveira-logo.png"
            alt="Logo HN Oliveira em destaque"
            width={390}
            height={390}
            className="w-[min(80%,340px)] h-auto object-contain relative z-10"
            style={{ mixBlendMode: 'screen' }}
            loading="lazy"
          />
        </div>

        {/* RIGHT: editorial copy */}
        <div className="reveal flex flex-col justify-center px-[clamp(32px,7vw,100px)] py-[clamp(52px,7vw,88px)]">
          <p className="label text-[--muted] mb-6">Nossa Historia</p>

          <h2
            className="font-serif font-semibold uppercase leading-[0.88] tracking-[0.04em] mb-7"
            style={{ fontSize: 'clamp(40px,6vw,88px)' }}
          >
            Rua,<br />grife<br />e atitude.
          </h2>

          <p className="text-[15px] font-light text-[--graphite] leading-[1.9] max-w-[520px] mb-4">
            A HN Oliveira nasce da intersecao entre o streetwear autentico e o
            refinamento de uma curadoria premium. Cada peca e selecionada com
            rigor editorial — da qualidade do tecido ao impacto visual do conjunto.
          </p>

          <p className="text-[15px] font-light text-[--graphite] leading-[1.9] max-w-[520px] mb-10">
            Mais do que uma loja, uma vitrine de identidade: urbana, exclusiva
            e construida para quem entende que o detalhe e tudo.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-10 py-7 border-y border-hairline">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <p
                  className="font-serif font-semibold leading-none tracking-wide"
                  style={{ fontSize: 'clamp(20px,2.8vw,32px)', color: 'var(--gold)' }}
                >
                  {value}
                </p>
                <p className="label text-[--muted] mt-1.5">{label}</p>
              </div>
            ))}
          </div>

          <a href="#collections" className="btn-outline self-start">
            Ver colecao
          </a>
        </div>
      </div>

      {/* ── Benefits strip ───────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 border-t border-hairline">
        {BENEFITS.map(({ icon, label, desc }, i) => (
          <div
            key={label}
            className={`
              reveal py-8 px-[clamp(24px,4vw,52px)]
              flex flex-col items-center text-center gap-3
              ${i < 2 ? 'sm:border-r border-hairline' : ''}
              ${i > 0 ? 'border-t sm:border-t-0 border-hairline' : ''}
            `}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="w-10 h-10 rounded-full border border-[--line] grid place-items-center text-[--muted]">
              {icon}
            </div>
            <p className="label text-[--ink]">{label}</p>
            <p className="text-xs text-[--muted] font-light leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
