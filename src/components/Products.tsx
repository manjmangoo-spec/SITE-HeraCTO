import { useState, useEffect, useRef, useCallback } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Product, PRODUCTS, CATEGORIES, sortProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import { FilterDrawer } from './FilterDrawer';

interface ProductsProps {
  onAddToCart:  (product: Product, size: string) => void;
  wishlist:     string[];
  onWishlist:   (product: Product) => void;
}

export function Products({ onAddToCart, wishlist, onWishlist }: ProductsProps) {
  const [category,  setCategory]  = useState('Todos');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  
  const sectionRef = useRef<HTMLElement>(null);

  const getFiltered = useCallback(() => {
    let base = PRODUCTS;
    
    // Category filter
    if (category !== 'Todos') {
      base = base.filter((p) => p.category === category);
    }
    
    // Sale filter
    if (onSaleOnly) {
      base = base.filter((p) => p.originalPrice && p.originalPrice > p.price);
    }
    
    // Size filters
    if (selectedSizes.length > 0) {
      base = base.filter((p) => p.sizes.some(size => selectedSizes.includes(size)));
    }

    // Price filters
    if (minPrice) {
      const min = parseFloat(minPrice);
      if (!isNaN(min)) {
        base = base.filter((p) => p.price >= min);
      }
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice);
      if (!isNaN(max)) {
        base = base.filter((p) => p.price <= max);
      }
    }
    
    return sortProducts(base, sortBy);
  }, [category, minPrice, maxPrice, onSaleOnly, sortBy, selectedSizes]);

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
  }, [category, minPrice, maxPrice, onSaleOnly, sortBy, selectedSizes]);

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
            <div className="flex items-center gap-4 mb-6">
              <span className="w-10 h-px bg-neutral-900/40"></span>
              <p className="text-xs uppercase tracking-[0.3em] font-semibold text-neutral-800">Colecao</p>
            </div>
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
                label flex-none h-10 px-5 border transition-all duration-300 ease-out
                ${category === cat
                  ? 'bg-neutral-900 text-white border-neutral-900 scale-[1.03] shadow-md'
                  : 'bg-transparent border-black/20 text-black/70 hover:border-black/60 hover:text-black'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter button */}
        <div>
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className={`
              label flex items-center gap-2 h-10 px-5 border transition-all duration-300 ease-out
              ${isFilterOpen || minPrice || maxPrice || onSaleOnly || selectedSizes.length > 0 || sortBy !== 'default'
                ? 'bg-neutral-900 text-white border-neutral-900 shadow-md'
                : 'bg-transparent border-black/20 text-black/70 hover:border-black/60 hover:text-black'
              }
            `}
          >
            <SlidersHorizontal size={16} strokeWidth={1.5} />
            Filtros
          </button>
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

      <FilterDrawer
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onSaleOnly={onSaleOnly}
        sortBy={sortBy}
        selectedSizes={selectedSizes}
        onFilterChange={(f) => {
          setMinPrice(f.minPrice);
          setMaxPrice(f.maxPrice);
          setOnSaleOnly(f.onSaleOnly);
          setSortBy(f.sortBy);
          setSelectedSizes(f.selectedSizes);
        }}
      />
    </section>
  );
}
