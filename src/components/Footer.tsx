import React, { useState } from 'react';
import { Instagram, Send } from 'lucide-react';

const FOOTER_LINKS = {
  Comprar:      ['Colecoes', 'Novidades', 'Mais vendidos', 'Guia de tamanhos'],
  Atendimento:  ['WhatsApp', 'FAQ', 'Devolucoes', 'Rastrear pedido'],
  Institucional: ['Sobre nos', 'Privacidade', 'Termos de uso', 'Contato'],
};

const PAYMENT_METHODS = ['Pix', 'Cartao de credito', 'Boleto', 'Parcelamento'];

export function Footer() {
  const [email,      setEmail]      = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error,      setError]      = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) {
      setError('Email invalido.');
      return;
    }
    setError('');
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-[--ink] text-white" aria-label="Rodape">

      {/* ── Newsletter ───────────────────────────────── */}
      <div className="border-b border-white/10">
        <div className="px-[clamp(20px,5vw,72px)] py-[clamp(44px,6vw,72px)] max-w-3xl">
          <p className="label text-white/40 mb-3">Newsletter</p>
          <h2 className="font-serif text-[clamp(34px,5vw,62px)] font-semibold uppercase leading-[0.9] tracking-[0.04em] mb-4">
            Fique por<br />dentro
          </h2>
          <p className="text-[15px] font-light text-white/60 leading-relaxed mb-7">
            Novas pecas, drops exclusivos e ofertas especiais diretamente no seu email.
          </p>

          {subscribed ? (
            <div className="flex items-center gap-3 text-[--gold]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span className="label">Inscricao realizada com sucesso!</span>
            </div>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-2 max-w-md"
              aria-label="Formulario de newsletter"
              noValidate
            >
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Seu email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  required
                  aria-required="true"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'newsletter-error' : undefined}
                  className="
                    w-full h-12 px-4
                    bg-white/8 border border-white/18
                    text-white text-[15px] font-light placeholder:text-white/35
                    outline-none
                    focus:border-white/50
                    transition-colors duration-200
                  "
                />
                {error && (
                  <p id="newsletter-error" role="alert" className="label-sm text-red-400 mt-1">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn-white h-12 flex-none gap-2"
                aria-label="Inscrever no newsletter"
              >
                <Send size={13} strokeWidth={2} aria-hidden="true" />
                Inscrever
              </button>
            </form>
          )}
        </div>
      </div>

      {/* ── Main footer grid ─────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 px-[clamp(20px,5vw,72px)] py-[clamp(44px,6vw,72px)] border-b border-white/10">

        {/* Brand column */}
        <div className="col-span-2 md:col-span-1">
          <a
            href="#"
            aria-label="HN Oliveira — pagina inicial"
            className="flex flex-col items-start gap-[3px] no-underline mb-5"
          >
            <span
              className="font-serif font-bold uppercase leading-none tracking-[0.18em] text-white"
              style={{ fontSize: 'clamp(20px, 2.6vw, 28px)' }}
            >
              HN
            </span>
            <span
              className="font-sans font-bold uppercase leading-none text-white"
              style={{ fontSize: '9px', letterSpacing: '0.38em' }}
            >
              Oliveira
            </span>
          </a>
          <p className="text-[13px] font-light text-white/55 leading-relaxed max-w-[240px] mb-6">
            HN Oliveira — curadoria de streetwear premium.
            Identidade urbana, qualidade de grife.
          </p>

          {/* Social */}
          <div className="flex gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da HN Oliveira"
              className="icon-btn text-white/50 hover:text-white transition-colors duration-200"
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp da HN Oliveira"
              className="icon-btn text-white/50 hover:text-white transition-colors duration-200"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Link columns */}
        {(Object.entries(FOOTER_LINKS) as [string, string[]][]).map(([title, links]) => (
          <div key={title}>
            <p className="label text-white/35 mb-5">{title}</p>
            <ul className="flex flex-col gap-3">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-[13px] font-light text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* ── Payment & trust ──────────────────────────── */}
      <div className="px-[clamp(20px,5vw,72px)] py-5 border-b border-white/10">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="label text-white/30">Pagamento</p>
          <div className="flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => (
              <span
                key={m}
                className="label-sm px-3 py-1.5 border border-white/14 text-white/45 rounded-sm"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-[clamp(20px,5vw,72px)] py-5">
        <p className="label text-white/30">
          &copy; {new Date().getFullYear()} HN Oliveira — Todos os direitos reservados
        </p>
        <div className="flex gap-5">
          <a href="#" className="text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200">
            Privacidade
          </a>
          <a href="#" className="text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200">
            Termos de uso
          </a>
        </div>
      </div>
    </footer>
  );
}
