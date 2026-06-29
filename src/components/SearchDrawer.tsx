import { X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { PRODUCTS, Product, formatCurrency } from '../data/products';

interface SearchDrawerProps {
  open:          boolean;
  onClose:       () => void;
  onAddToCart:   (product: Product, size: string) => void;
}

function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return PRODUCTS;
  return PRODUCTS.filter((p) =>
    `${p.name} ${p.brand} ${p.category} ${p.variant} ${p.tags.join(' ')}`.toLowerCase().includes(q)
  );
}

export function SearchDrawer({ open, onClose, onAddToCart }: SearchDrawerProps) {
  const [query,   setQuery]   = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const results = searchProducts(query);

  /* Focus input when drawer opens */
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 90);
      return () => clearTimeout(t);
    } else {
      setQuery('');
    }
  }, [open]);

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!open}
        onClick={handleClose}
        className={`overlay-bg fixed inset-0 z-[55] bg-[--overlay-bg] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Buscar produtos"
        aria-hidden={!open}
        className={`
          drawer-panel
          fixed inset-x-0 top-0 z-[60]
          bg-white/98 backdrop-blur-2xl border-b border-[--line]
          shadow-luxury-lg
          px-[clamp(18px,5vw,72px)]
          pt-[clamp(84px,12vh,116px)]
          pb-8
          ${open ? 'translate-y-0' : '-translate-y-full'}
        `}
      >
        {/* Close */}
        <button
          type="button"
          aria-label="Fechar busca"
          onClick={handleClose}
          className="absolute top-5 right-5 icon-btn"
        >
          <X size={19} strokeWidth={1.5} />
        </button>

        {/* Search input */}
        <div className="border-b border-[--line-strong] pb-2 mb-7">
          <label htmlFor="search-input" className="sr-only">Buscar produtos</label>
          <input
            ref={inputRef}
            id="search-input"
            type="search"
            role="searchbox"
            placeholder="Buscar marca, peca ou tamanho…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            className="
              w-full bg-transparent outline-none
              font-serif font-medium
              text-[clamp(28px,5vw,68px)]
              leading-tight tracking-[0.03em] uppercase
              text-[--ink] placeholder:text-[--stone]
            "
          />
        </div>

        {/* Results label */}
        <p className="label text-[--muted] mb-4" aria-live="polite" aria-atomic="true">
          {query.trim()
            ? `${results.length} resultado${results.length !== 1 ? 's' : ''} para "${query}"`
            : `${PRODUCTS.length} pecas em catalogo`}
        </p>

        {/* Results grid */}
        {results.length === 0 ? (
          <p className="text-sm text-[--muted] font-light">
            Nenhum resultado. Tente buscar por Lacoste, Boss, kit ou tamanho P/M/G.
          </p>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[44vh] overflow-y-auto scrollbar-hide"
            role="list"
            aria-label="Resultados da busca"
          >
            {results.map((product) => (
              <div key={product.id} role="listitem">
                <button
                  type="button"
                  aria-label={`Ver ${product.name} — ${formatCurrency(product.price)}`}
                  onClick={() => {
                    onAddToCart(product, product.sizes[0] ?? '');
                    handleClose();
                  }}
                  className="
                    w-full flex gap-3 items-center p-3 text-left
                    border border-[--line] hover:border-[--ink]
                    hover:bg-[--bone] transition-all duration-200
                    group
                  "
                >
                  {/* Thumbnail */}
                  <div className="w-14 h-14 flex-none bg-[--bone] overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-450"
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0">
                    <p className="label text-[--muted] mb-0.5">{product.brand}</p>
                    <p className="font-serif text-[15px] font-semibold uppercase tracking-wide leading-tight line-clamp-1">
                      {product.name}
                    </p>
                    <p className="text-xs text-[--gold] font-semibold mt-1">{formatCurrency(product.price)}</p>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
