import { Heart } from 'lucide-react';
import { Product, formatCurrency } from '../data/products';

interface ProductCardProps {
  product:      Product;
  onClick:      () => void;
  onWishlist?:  (product: Product) => void;
  wishlisted?:  boolean;
}

export function ProductCard({ product, onClick, onWishlist, wishlisted = false }: ProductCardProps) {
  const isLow = product.stock > 0 && product.stock <= 4;
  
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <article className="product-card flex flex-col gap-4 group cursor-pointer" onClick={onClick}>

      {/* ── Image frame ──────────────────────────────── */}
      <div className="product-frame aspect-[4/5] bg-[#f4f4f4] relative overflow-hidden">

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] bg-black text-white px-2 py-1">Novo</span>
          )}
          {discount > 0 && (
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] bg-[#b8922e] text-white px-2 py-1">-{discount}%</span>
          )}
          {isLow && !product.isNew && (
            <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] border border-black text-black px-2 py-1 bg-white/80 backdrop-blur-sm">
              Ultimas unidades
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={wishlisted ? `Remover ${product.name} dos favoritos` : `Adicionar ${product.name} aos favoritos`}
          aria-pressed={wishlisted}
          onClick={(e) => {
            e.stopPropagation();
            onWishlist?.(product);
          }}
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
          className="w-full h-full object-cover object-center mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
      </div>

      {/* ── Info block ───────────────────────────────── */}
      <div className="flex flex-col gap-1.5 px-1">

        {/* Brand / Category kicker */}
        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-black/50">{product.brand} / {product.category}</p>

        {/* Name */}
        <h3 className="font-sans text-sm md:text-base font-bold uppercase tracking-tight text-black line-clamp-1">
          {product.name}
        </h3>

        {/* Variant */}
        {product.variant && (
          <p className="font-sans text-[11px] font-semibold text-black/60 line-clamp-1">
            {product.variant}
          </p>
        )}

        {/* Price row */}
        <div className="flex items-baseline gap-3 mt-1">
          <span className="font-sans text-sm font-bold tracking-tight">
            {formatCurrency(product.price)}
          </span>
          {product.originalPrice && (
            <span className="font-sans text-xs text-black/40 line-through font-semibold">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
