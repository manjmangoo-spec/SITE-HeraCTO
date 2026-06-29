import { useState, useEffect, useCallback } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

interface HeaderProps {
  cartCount:     number;
  onCartOpen:    () => void;
  onSearchOpen:  () => void;
  forceLight?:   boolean;
}

export function Header({ cartCount, onCartOpen, onSearchOpen, forceLight }: HeaderProps) {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Close mobile menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isLight = scrolled || forceLight || menuOpen;

  return (
    <>
      {/* ── Live region for screen readers ─────────── */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {cartCount > 0 ? `${cartCount} ${cartCount === 1 ? 'item' : 'itens'} na sacola` : 'Sacola vazia'}
      </div>

      {/* ── Header bar ──────────────────────────────── */}
      <header
        className={`site-header ${isLight ? 'is-light' : 'is-dark'}`}
        aria-label="Cabecalho principal"
      >
        {/* Left nav — desktop */}
        <nav
          className="flex items-center gap-7"
          aria-label="Navegacao principal"
        >
          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="icon-btn md:hidden"
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>

          {/* Desktop links */}
          <a
            href="#collections"
            className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase hidden md:block opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            Colecoes
          </a>
          <a
            href="#about"
            className="font-sans text-[10px] md:text-[11px] font-bold tracking-[0.2em] uppercase hidden md:block opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            Historia
          </a>
        </nav>

        {/* Center — text logo */}
        <a
          href="#"
          aria-label="HN Oliveira — pagina inicial"
          className="flex flex-col items-center justify-self-center gap-1.5 no-underline"
        >
          <span
            className="font-serif font-bold uppercase leading-none tracking-[0.1em]"
            style={{ fontSize: 'clamp(24px, 3.2vw, 36px)', marginRight: '-0.1em' }}
          >
            HN
          </span>
          <span
            className="font-sans font-bold uppercase leading-none"
            style={{ fontSize: '10px', letterSpacing: '0.45em', marginRight: '-0.45em' }}
          >
            Oliveira
          </span>
        </a>

        {/* Right actions */}
        <div className="flex items-center justify-end gap-0.5" aria-label="Acoes">
          <button
            type="button"
            aria-label="Buscar produtos"
            onClick={onSearchOpen}
            className="icon-btn"
          >
            <Search size={19} strokeWidth={1.6} />
          </button>

          <button
            type="button"
            aria-label={`Sacola de compras — ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
            onClick={onCartOpen}
            className="icon-btn relative"
          >
            <ShoppingBag size={19} strokeWidth={1.6} />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-[7px] right-[7px] w-[14px] h-[14px] rounded-full bg-[--ink] text-white text-[8px] font-bold grid place-items-center leading-none"
                style={{ color: isLight ? 'white' : 'var(--ink)', background: isLight ? 'var(--ink)' : 'white' }}
              >
                {Math.min(cartCount, 9)}{cartCount > 9 ? '+' : ''}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ── Mobile slide-down nav ────────────────────── */}
      <div
        aria-hidden={!menuOpen}
        className={`
          fixed inset-x-0 top-[76px] z-40
          bg-[rgba(248,247,244,0.98)] border-b border-hairline
          backdrop-blur-xl
          transition-all duration-450 ease-luxury
          ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-3 pointer-events-none'}
        `}
      >
        <nav className="flex flex-col divide-y divide-[--line] px-6 py-2" aria-label="Menu mobile">
          {[
            { href: '#collections', label: 'Colecoes' },
            { href: '#about',       label: 'Historia' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="label py-5 flex items-center justify-between opacity-80 hover:opacity-100 transition-opacity duration-200"
            >
              {label}
              <span className="text-[--muted] text-xs">→</span>
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
