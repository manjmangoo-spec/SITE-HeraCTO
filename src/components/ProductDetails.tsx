import { useState } from 'react';
import { Product, formatCurrency } from '../data/products';
import { Heart, Ruler, CreditCard } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, size: string) => void;
  wishlist: string[];
  onWishlist: (product: Product) => void;
}

export function ProductDetails({ product, onBack, onAddToCart, wishlist, onWishlist }: ProductDetailsProps) {
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);

  const isLow = product.stock > 0 && product.stock <= 4;
  const wishlisted = wishlist.includes(product.id);

  const handleAdd = () => {
    if (!selectedSize) {
      setSizeError(true);
      setTimeout(() => setSizeError(false), 1800);
      return;
    }
    onAddToCart(product, selectedSize);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20 px-6 sm:px-12">
      <button 
        onClick={onBack}
        className="font-sans text-xs font-bold uppercase tracking-widest text-black/50 hover:text-black transition-colors mb-10 flex items-center gap-2"
      >
        <span>&larr;</span> Voltar
      </button>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] xl:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16">
        
        {/* Left: Images */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="aspect-[4/5] bg-[#f4f4f4] relative">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {product.isNew && (
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] bg-black text-white px-3 py-1.5">Novo</span>
                )}
                {discount > 0 && (
                  <span className="font-sans text-[10px] font-bold uppercase tracking-[0.1em] bg-[#b8922e] text-white px-3 py-1.5">-{discount}%</span>
                )}
              </div>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover object-center mix-blend-multiply" 
              />
            </div>
            {/* Duplicated for layout */}
            <div className="aspect-[4/5] bg-[#f4f4f4] hidden md:block">
               <img src={product.image} alt="" className="w-full h-full object-cover object-center mix-blend-multiply" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
             <div className="aspect-[4/5] bg-[#f4f4f4]">
                <img src={product.image} alt="" className="w-full h-full object-cover object-center mix-blend-multiply" />
             </div>
             <div className="aspect-[4/5] bg-[#f4f4f4]">
                <img src={product.image} alt="" className="w-full h-full object-cover object-center mix-blend-multiply" />
             </div>
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col">
          <div className="sticky top-28 pt-4">
            <h1 className="font-sans text-[28px] md:text-3xl font-normal uppercase text-black mb-8">
              {product.name}
            </h1>
            
            <div className="mb-6">
              <span className={`block font-sans text-[11px] font-semibold uppercase tracking-wider mb-3 ${sizeError ? 'text-red-500' : 'text-black'}`}>
                Selecione a opção de tamanho:
              </span>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false); }}
                    className={`
                      min-w-[48px] h-10 px-3 flex items-center justify-center font-sans text-sm font-semibold border transition-colors
                      ${selectedSize === size 
                        ? 'border-black bg-black text-white' 
                        : sizeError
                          ? 'border-red-300 text-red-500 hover:border-red-500'
                          : 'border-black/20 text-black/80 hover:border-black/50'
                      }
                    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <button className="flex items-center gap-2 font-sans text-[13px] text-black hover:underline underline-offset-4 decoration-black/40">
                <Ruler size={16} />
                Tabela de medidas
              </button>
            </div>

            <div className="w-full h-px bg-black/10 my-6" />

            <div className="mb-8">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-sans text-2xl font-bold text-black">{formatCurrency(product.price)}</span>
                {product.originalPrice && (
                  <span className="font-sans text-base text-black/40 line-through">{formatCurrency(product.originalPrice)}</span>
                )}
              </div>
              <p className="font-sans text-[13px] text-black/60 mb-4">
                até <strong className="font-semibold text-black">8x</strong> de <strong className="font-semibold text-black">{formatCurrency(product.price / 8)}</strong> sem juros
              </p>
              
              <button className="flex items-center gap-2 font-sans text-[13px] text-black hover:underline underline-offset-4 decoration-black/40">
                <CreditCard size={16} />
                mais formas de pagamento
              </button>
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="w-full h-14 bg-[#808080] hover:bg-black text-white font-sans text-[15px] font-bold uppercase tracking-widest transition-colors mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.stock === 0 ? 'Esgotado' : 'Comprar'}
            </button>

            <button
              onClick={() => onWishlist(product)}
              className="w-full h-12 flex items-center justify-center gap-2 font-sans text-[11px] font-bold uppercase tracking-widest border border-black/10 hover:border-black transition-colors"
            >
               <Heart size={14} fill={wishlisted ? "black" : "none"} stroke={wishlisted ? "black" : "currentColor"} />
               {wishlisted ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </button>

            <div className="w-full h-px bg-black/10 my-8" />
            
            <div className="mb-10">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-black/60 mb-4">Calcule o frete</h3>
              <div className="flex gap-0">
                <input 
                  type="text" 
                  placeholder="CEP" 
                  className="flex-1 h-[46px] px-4 border border-black/20 border-r-0 font-sans text-sm outline-none focus:border-black focus:border-r transition-colors"
                />
                <button className="h-[46px] px-8 bg-black text-white font-sans text-[11px] font-bold uppercase tracking-widest">
                  Calcular
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h3 className="font-sans text-lg font-bold text-black mb-4 pb-2 border-b border-black/10">Descrição</h3>
                <p className="font-sans text-[14px] text-black/80 leading-[1.6]">
                  {product.description || `A ${product.name} é confeccionada em material de alta qualidade, com um tecido que oferece durabilidade e conforto.`}
                </p>
              </div>
              
              <div>
                <h3 className="font-sans text-[14px] font-bold text-black mb-3">Detalhes do produto</h3>
                <ul className="list-disc pl-5 font-sans text-[14px] text-black/80 flex flex-col gap-1.5">
                  <li>Silk de relevo com acabamento premium.</li>
                  <li>Brasão em material termocolante com bordado periférico</li>
                  <li>Tecido resistente e de alta qualidade.</li>
                  <li>Costura reforçada para durabilidade.</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
