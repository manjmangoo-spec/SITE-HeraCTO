import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES, SORT_OPTIONS, sortProducts } from '../data/products';
import { ProductCard } from './ProductCard';

interface ProductsProps {
  onAddToCart:  (product: Product, size: string) => void;
  wishlist:     string[];
  onWishlist:   (product: Product) => void;
}

export function Products({ onAddToCart, wishlist, onWishlist }: ProductsProps) {
  const [category,  setCategory]  = useState('Todos');
  const [sortBy,    setSortBy]    = useState('default');
  const [sortOpen,  setSortOpen]  = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const getFiltered = useCallback(() => {
    const base = category === 'Todos'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === category);
    return sortProducts(base, sortBy);
  }, [category, sortBy]);

  const filtered = getFiltered();

  /* Reveal observer */
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
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' }
    );
    sectionRef.current.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [category, sortBy]);

  return (
    <section
      ref={sectionRef}
      id="collections"
      className="bg-[--sand] py-[clamp(72px,10vw,130px)] px-[clamp(16px,5vw,72px)]"
      aria-label="Catalogo de produtos"
    >
      {/* ── Section heading ──────────────────────────── */}
      <div className="reveal flex flex-col gap-6 mb-[clamp(36px,5vw,64px)]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="label text-[--muted] mb-4">Colecao</p>
            <h2 className="font-serif text-display font-semibold uppercase leading-[0.86] tracking-[0.04em]">
              Street<br />Selection
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] font-light text-[--graphite] leading-[1.88] sm:pb-1">
            Pecas selecionadas com rigor editorial.
            Cada item e escolhido pela qualidade, identidade e presenca visual.
          </p>
        </div>
      </div>

      {/* ── Controls bar ─────────────────────────────── */}
      <div className="reveal flex items-center justify-between gap-4 mb-[clamp(28px,4vw,52px)] flex-wrap">

        {/* Category filters */}
        <div
          role="tablist"
          aria-label="Filtrar por categoria"
          className="flex gap-2 overflow-x-auto scrollbar-hide pb-px"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              role="tab"
              type="button"
              aria-selected={category === cat}
              onClick={() => setCategory(cat)}
              className={`
                label flex-none h-10 px-5 border transition-colors duration-250
                ${category === cat
                  ? 'bg-[--ink] text-white border-[--ink]'
                  : 'border-[--line-strong] text-[--graphite] hover:border-[--ink] hover:text-[--ink]'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            onClick={() => setSortOpen((v) => !v)}
            className="label inline-flex items-center gap-2 h-10 px-4 border border-[--line-strong] text-[--graphite] hover:border-[--ink] transition-colors duration-200"
          >
            {SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? 'Ordenar'}
            <ChevronDown
              size={13}
              strokeWidth={2}
              aria-hidden="true"
              className={`transition-transform duration-200 ${sortOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {sortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
                aria-hidden="true"
              />
              <ul
                role="listbox"
                aria-label="Opcoes de ordenacao"
                className="absolute right-0 top-full mt-1 z-20 min-w-[180px] bg-white border border-[--line] shadow-luxury-md"
              >
                {SORT_OPTIONS.map((opt) => (
                  <li key={opt.value} role="none">
                    <button
                      type="button"
                      role="option"
                      aria-selected={sortBy === opt.value}
                      onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                      className={`
                        label-sm w-full text-left px-5 py-3.5
                        transition-colors duration-200
                        ${sortBy === opt.value
                          ? 'bg-[--ink] text-white'
                          : 'text-[--graphite] hover:bg-[--bone]'
                        }
                      `}
                    >
                      {opt.label}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* ── Product grid — uniform luxury catalog ────── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[clamp(18px,3vw,40px)] gap-y-[clamp(48px,6vw,82px)]"
        aria-label={`${filtered.length} produto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
      >
        {filtered.map((product, i) => (
          <div
            key={product.id}
            className="reveal"
            style={{ transitionDelay: `${(i % 3) * 0.07}s` }}
          >
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              onWishlist={onWishlist}
              wishlisted={wishlist.includes(product.id)}
            />
          </div>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="py-24 text-center">
          <p className="font-serif text-title font-semibold text-[--stone] uppercase">
            Sem pecas
          </p>
          <p className="label text-[--muted] mt-4">
            Nenhum produto nessa categoria no momento.
          </p>
        </div>
      )}

      {/* Result count */}
      {filtered.length > 0 && (
        <p className="label text-[--muted] text-center mt-[clamp(40px,5vw,64px)]">
          {filtered.length} {filtered.length === 1 ? 'peca' : 'pecas'} na selecao
        </p>
      )}
    </section>
  );
}
