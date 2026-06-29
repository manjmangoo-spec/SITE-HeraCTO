import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { SORT_OPTIONS } from '../data/products';

interface FilterDrawerProps {
  open: boolean;
  onClose: () => void;
  minPrice: string;
  maxPrice: string;
  onSaleOnly: boolean;
  sortBy: string;
  selectedSizes: string[];
  onFilterChange: (filters: { minPrice: string; maxPrice: string; onSaleOnly: boolean; sortBy: string; selectedSizes: string[] }) => void;
}

const AVAILABLE_SIZES = ['P', 'M', 'G', 'GG'];

export function FilterDrawer({ open, onClose, minPrice, maxPrice, onSaleOnly, sortBy, selectedSizes, onFilterChange }: FilterDrawerProps) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);
  const [localSale, setLocalSale] = useState(onSaleOnly);
  const [localSort, setLocalSort] = useState(sortBy);
  const [localSizes, setLocalSizes] = useState<string[]>(selectedSizes || []);

  // Sync state when opening
  useEffect(() => {
    if (open) {
      setLocalMin(minPrice);
      setLocalMax(maxPrice);
      setLocalSale(onSaleOnly);
      setLocalSort(sortBy);
      setLocalSizes(selectedSizes || []);
    }
  }, [open, minPrice, maxPrice, onSaleOnly, sortBy, selectedSizes]);

  const handleApply = () => {
    onFilterChange({
      minPrice: localMin,
      maxPrice: localMax,
      onSaleOnly: localSale,
      sortBy: localSort,
      selectedSizes: localSizes
    });
    onClose();
  };

  const handleClear = () => {
    setLocalMin('');
    setLocalMax('');
    setLocalSale(false);
    setLocalSort('default');
    setLocalSizes([]);
    onFilterChange({
      minPrice: '',
      maxPrice: '',
      onSaleOnly: false,
      sortBy: 'default',
      selectedSizes: []
    });
    onClose();
  };

  const toggleSize = (size: string) => {
    setLocalSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  return (
    <>
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`overlay-bg fixed inset-0 z-[55] bg-black/40 backdrop-blur-sm transition-all duration-500 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros"
        className={`drawer-container fixed top-0 right-0 z-[60] w-full max-w-[420px] h-full bg-white shadow-2xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <header className="flex-none flex items-center justify-between px-6 h-[64px] bg-white border-b border-black/5">
          <div className="flex items-end gap-4">
            <h2 className="font-serif text-2xl font-medium tracking-wide leading-none">Filtros</h2>
            <button
              onClick={handleClear}
              className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] text-black/40 hover:text-black transition-colors pb-0.5"
            >
              Limpar tudo
            </button>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar filtros"
            className="p-2 -mr-2 text-black/60 hover:text-black transition-colors"
          >
            <X size={22} strokeWidth={1.5} />
          </button>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">
          
          {/* Ordenação */}
          <section>
            <h3 className="font-sans text-[10px] font-bold tracking-widest uppercase text-black/50 mb-3">
              Ordenar por
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLocalSort(opt.value)}
                  className={`
                    px-3 h-10 flex items-center justify-center border font-sans text-xs font-semibold transition-all duration-300
                    ${localSort === opt.value 
                      ? 'bg-neutral-900 text-white border-neutral-900' 
                      : 'bg-[#fafafa] text-black/70 border-black/5 hover:border-black/20 hover:text-black'
                    }
                  `}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-black/5" />
          
          {/* Tamanhos */}
          <section>
            <h3 className="font-sans text-[10px] font-bold tracking-widest uppercase text-black/50 mb-3">
              Tamanhos
            </h3>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = localSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`
                      w-10 h-10 flex items-center justify-center border font-sans text-sm font-bold transition-all duration-300
                      ${isSelected 
                        ? 'bg-neutral-900 text-white border-neutral-900' 
                        : 'bg-[#fafafa] text-black/70 border-black/5 hover:border-black/20 hover:text-black'
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </section>

          <div className="w-full h-px bg-black/5" />

          {/* Faixa de Preço */}
          <section>
            <h3 className="font-sans text-[10px] font-bold tracking-widest uppercase text-black/50 mb-3">
              Preço
            </h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <label htmlFor="minPrice" className="sr-only">Preço mínimo</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-xs font-sans font-bold">R$</span>
                <input 
                  type="number" 
                  id="minPrice"
                  placeholder="Mín."
                  value={localMin}
                  onChange={(e) => setLocalMin(e.target.value)}
                  className="w-full h-10 pl-9 pr-2 bg-[#fafafa] border border-black/5 focus:border-black/20 font-sans text-sm font-semibold outline-none transition-all placeholder:text-black/30"
                />
              </div>
              <span className="text-black/30 font-bold">-</span>
              <div className="flex-1 relative">
                <label htmlFor="maxPrice" className="sr-only">Preço máximo</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40 text-xs font-sans font-bold">R$</span>
                <input 
                  type="number" 
                  id="maxPrice"
                  placeholder="Máx."
                  value={localMax}
                  onChange={(e) => setLocalMax(e.target.value)}
                  className="w-full h-10 pl-9 pr-2 bg-[#fafafa] border border-black/5 focus:border-black/20 font-sans text-sm font-semibold outline-none transition-all placeholder:text-black/30"
                />
              </div>
            </div>
          </section>

          <div className="w-full h-px bg-black/5" />

          {/* Destaques */}
          <section>
            <button 
              type="button"
              onClick={() => setLocalSale(!localSale)}
              className="w-full h-8 flex items-center justify-between group"
            >
              <h3 className="font-sans text-[11px] font-bold tracking-widest uppercase text-black/90 group-hover:text-black transition-colors">
                Itens em promoção
              </h3>
              <div className={`
                w-10 h-5 rounded-full p-1 flex items-center transition-all duration-300 ease-in-out
                ${localSale ? 'bg-neutral-900' : 'bg-black/10'}
              `}>
                <div className={`
                  w-3 h-3 bg-white rounded-full shadow-sm transition-transform duration-300 ease-in-out
                  ${localSale ? 'translate-x-5' : 'translate-x-0'}
                `} />
              </div>
            </button>
          </section>

        </div>

        {/* Footer */}
        <footer className="flex-none p-5 bg-white border-t border-black/5">
          <button
            onClick={handleApply}
            className="w-full h-12 bg-neutral-900 text-white font-sans text-xs font-bold tracking-widest uppercase hover:bg-black transition-colors"
          >
            Ver Resultados
          </button>
        </footer>
      </div>
    </>
  );
}
