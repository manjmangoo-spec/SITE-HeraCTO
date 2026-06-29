import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem, formatCurrency } from '../data/products';

interface CartDrawerProps {
  open:            boolean;
  items:           CartItem[];
  onClose:         () => void;
  onRemove:        (cartId: string) => void;
  onQuantityChange:(cartId: string, delta: number) => void;
}

export function CartDrawer({ open, items, onClose, onRemove, onQuantityChange }: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!open}
        onClick={onClose}
        className={`overlay-bg fixed inset-0 z-[55] bg-[--overlay-bg] ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Sacola de compras"
        aria-hidden={!open}
        className={`
          drawer-panel fixed inset-y-0 right-0 z-[60]
          w-[min(460px,100vw)] flex flex-col
          bg-[--paper] shadow-luxury-xl
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between min-h-[74px] px-6 border-b border-hairline flex-shrink-0">
          <div>
            <h2 className="label">Sacola</h2>
            {totalItems > 0 && (
              <p className="text-xs text-[--muted] mt-0.5 font-light">
                {totalItems} {totalItems === 1 ? 'peca' : 'pecas'}
              </p>
            )}
          </div>
          <button
            type="button"
            aria-label="Fechar sacola"
            onClick={onClose}
            className="icon-btn"
          >
            <X size={19} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-5 px-8 text-center">
              <div className="w-[64px] h-[64px] rounded-full border border-[--line] grid place-items-center text-[--stone]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M7.2 8.5h9.6l1 11H6.2l1-11Z" />
                  <path d="M9 8.5a3 3 0 0 1 6 0" />
                </svg>
              </div>
              <div>
                <p className="font-serif text-[22px] font-semibold uppercase tracking-wide text-[--graphite]">
                  Sacola vazia
                </p>
                <p className="text-sm text-[--muted] mt-2 font-light leading-relaxed">
                  Selecione uma peca para<br />iniciar sua curadoria.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline mt-2 w-full"
              >
                Explorar colecao
              </button>
            </div>
          ) : (
            <ul
              aria-label="Itens na sacola"
              className="divide-y divide-[--line]"
            >
              {items.map((item) => (
                <li key={item.cartId} className="flex gap-4 px-6 py-5">
                  {/* Image */}
                  <div className="w-[80px] h-[80px] flex-none bg-[--bone] overflow-hidden">
                    <img
                      src={item.image}
                      alt={`${item.name} — ${item.brand}`}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="label text-[--muted] mb-1">{item.brand}</p>
                      <p className="font-serif text-[20px] font-semibold uppercase tracking-wide leading-tight line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-[--muted] mt-1 font-light">
                        Tam: <strong className="font-semibold text-[--graphite]">{item.selectedSize}</strong>
                      </p>
                    </div>

                    {/* Qty + price row */}
                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-[--line]" role="group" aria-label="Quantidade">
                        <button
                          type="button"
                          aria-label="Diminuir quantidade"
                          onClick={() => onQuantityChange(item.cartId, -1)}
                          disabled={item.quantity <= 1}
                          className="w-8 h-8 grid place-items-center text-[--graphite] hover:bg-[--bone] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus size={12} strokeWidth={2} />
                        </button>
                        <span className="label w-7 text-center" aria-label={`Quantidade: ${item.quantity}`}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Aumentar quantidade"
                          onClick={() => onQuantityChange(item.cartId, 1)}
                          className="w-8 h-8 grid place-items-center text-[--graphite] hover:bg-[--bone] transition-colors"
                        >
                          <Plus size={12} strokeWidth={2} />
                        </button>
                      </div>
                      <p className="text-sm font-semibold tracking-tight">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    aria-label={`Remover ${item.name} da sacola`}
                    onClick={() => onRemove(item.cartId)}
                    className="flex-none self-start mt-0.5 icon-btn text-[--muted] hover:text-[--ink]"
                  >
                    <Trash2 size={15} strokeWidth={1.6} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="flex-shrink-0 px-6 py-5 border-t border-hairline bg-[--paper]">
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-1">
              <span className="label text-[--muted]">Subtotal</span>
              <span className="text-xl font-semibold tracking-tight">{formatCurrency(subtotal)}</span>
            </div>
            <p className="text-xs text-[--muted] font-light mb-5">
              Frete calculado no checkout
            </p>

            {/* Checkout */}
            <button
              type="button"
              className="btn-primary w-full mb-2"
            >
              Finalizar compra
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn-outline w-full"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
