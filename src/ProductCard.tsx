import { useState } from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product, formatCurrency } from '../data/products';

interface ProductCardProps {
  product:      Product;
  onAddToCart:  (product: Product, size: string) => void;
  onWishlist?:  (product: Product) => void;
  wishlisted?:  boolean;
}

export function ProductCard({ product, onAddToCart, onWishlist, wishlisted = false }: ProductCardProps) {
  const [selectedSize, setSelectedSize]   = useState('');
  const [sizeError,    setSizeError]      = useState(false);
  const isLow = product.stock > 0 && product.stock <= 4;

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1800);
      return;
    }
    onAddToCart(product, selectedSize);
    setSelectedSize('');
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card flex flex-col gap-4">

      {/* ── Image frame ──────────────────────────────── */}
      <div className="product-frame aspect-[4/5]">

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="label-sm bg-[--ink] text-white px-2 py-1">Novo</span>
          )}
          {discount > 0 && (
            <span className="label-sm bg-[--gold] text-white px-2 py-1">-{discount}%</span>
          )}
          {isLow && !product.isNew && (
            <span className="label-sm border border-[--ink] text-[--ink] px-2 py-1 bg-white/80 backdrop-blur-sm">
              Ultimas unidades
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={wishlisted ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`}
          aria-pressed={wishlisted}
          onClick={() => onWishlist?.(product)}
          className={`wishlist-btn ${wishlisted ? 'is-active' : ''}`}
        >
          <Heart
            size={15}
            strokeWidth={2}
            fill={wishlisted ? '#0a0a0a' : 'none'}
            stroke={wishlisted ? '#0a0a0a' : '#0a0a0a'}
          />
        </button>

        {/* Product image */}
        <img
          src={product.image}
          alt={`${product.name} — ${product.brand}`}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center"
        />

        {/* Quick-add overlay */}
        <button
          type="button"
          aria-label={`Adicionar ${product.name} a sacola`}
          onClick={handleAdd}
          className="product-quick-add label-sm inline-flex items-center gap-2 h-10 px-5 bg-white/92 text-[--ink] backdrop-blur-sm shadow-luxury-sm hover:bg-[--ink] hover:text-white transition-colors duration-250"
        >
          <ShoppingBag size={12} strokeWidth={2} aria-hidden="true" />
          Adicionar
        </button>
      </div>

      {/* ── Info block ───────────────────────────────── */}
      <div className="flex flex-col gap-2.5">

        {/* Brand / Category kicker */}
        <p className="label text-[--muted]">{product.brand} / {product.category}</p>

        {/* Name */}
        <h3
          className="font-serif font-semibold uppercase leading-[0.92] tracking-[0.04em]"
          style={{ fontSize: 'clamp(15px, 1.5vw, 22px)' }}
        >
          {product.name}
        </h3>

        {/* Variant */}
        <p className="text-sm font-light text-[--graphite] leading-relaxed line-clamp-1">
          {product.variant}
        </p>

        {/* Price row */}
        <div className="flex items-baseline gap-3">
          <span className="font-semibold text-base tracking-tight">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[--muted] line-through font-light">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Size selector */}
        <div>
          <p className={`label-sm mb-1.5 ${sizeError ? 'text-red-600' : 'text-[--muted]'}`}>
            {sizeError ? 'Selecione um tamanho' : 'Tamanho'}
          </p>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Selecionar tamanho">
            {product.sizes.map((size) => (
              <button
                key={size}
                type="button"
                aria-pressed={selectedSize === size}
                aria-label={`Tamanho ${size}`}
                onClick={() => { setSelectedSize(size); setSizeError(false); }}
                className={`
                  label-sm min-w-[36px] h-8 px-2
                  border transition-all duration-200
                  ${selectedSize === size
                    ? 'bg-[--ink] text-white border-[--ink]'
                    : sizeError
                      ? 'border-red-400 text-red-600 hover:border-[--ink] hover:text-[--ink]'
                      : 'border-[--line-strong] text-[--graphite] hover:border-[--ink] hover:text-[--ink]'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Stock indicator */}
        <p className="label-sm text-[--muted]">
          {product.stock === 0 ? (
            <span className="text-red-500">Fora de estoque</span>
          ) : isLow ? (
            <span className="text-[--gold]">{product.stock} unidades restantes</span>
          ) : (
            `${product.stock} em estoque`
          )}
        </p>

        {/* CTA */}
        <button
          type="button"
          disabled={product.stock === 0}
          onClick={handleAdd}
          className="btn-primary mt-1 w-full disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
          aria-label={`Comprar ${product.name}${selectedSize ? ` tamanho ${selectedSize}` : ''}`}
        >
          {product.stock === 0 ? 'Indisponivel' : 'Comprar'}
        </button>
      </div>
    </article>
  );
}
