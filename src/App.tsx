import { useState, useEffect, useCallback } from 'react';
import { Header }       from './components/Header';
import { Hero }         from './components/Hero';
import { Products }     from './components/Products';
import { About }        from './components/About';
import { ProductDetails } from './components/ProductDetails';
import { CartDrawer }   from './components/CartDrawer';
import { SearchDrawer } from './components/SearchDrawer';
import { Product, CartItem } from './data/products';

/* ── Helpers ──────────────────────────────────────────── */
const CART_KEY    = 'hn-oliveira-cart';
const WISH_KEY    = 'hn-oliveira-wishlist';

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try { localStorage.setItem(CART_KEY, JSON.stringify(items)); } catch { /* no-op */ }
}

function loadWishlist(): string[] {
  try {
    const raw = localStorage.getItem(WISH_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function saveWishlist(ids: string[]) {
  try { localStorage.setItem(WISH_KEY, JSON.stringify(ids)); } catch { /* no-op */ }
}

/* ── App ──────────────────────────────────────────────── */
export default function App() {
  const [cartOpen,   setCartOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartItems,  setCartItems]  = useState<CartItem[]>(loadCart);
  const [wishlist,   setWishlist]   = useState<string[]>(loadWishlist);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /* Persist cart and wishlist */
  useEffect(() => { saveCart(cartItems); }, [cartItems]);
  useEffect(() => { saveWishlist(wishlist); }, [wishlist]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.classList.toggle('no-scroll', cartOpen || searchOpen);
  }, [cartOpen, searchOpen]);

  /* Keyboard: Escape closes any open drawer */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setCartOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  /* ── Cart actions ───────────────────────────────────── */
  const handleAddToCart = useCallback((product: Product, size: string) => {
    setCartItems((prev) => {
      // If same product+size exists, increment quantity
      const existing = prev.find((i) => i.id === product.id && i.selectedSize === size);
      if (existing) {
        return prev.map((i) =>
          i.cartId === existing.cartId ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [
        ...prev,
        { ...product, cartId: `${product.id}-${size}-${Date.now()}`, selectedSize: size, quantity: 1 },
      ];
    });
    setSearchOpen(false);
    setCartOpen(true);
  }, []);

  const handleRemoveFromCart = useCallback((cartId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
  }, []);

  const handleQuantityChange = useCallback((cartId: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((i) => i.cartId === cartId
        ? { ...i, quantity: Math.max(1, i.quantity + delta) }
        : i
      )
    );
  }, []);

  /* ── Wishlist actions ───────────────────────────────── */
  const handleWishlist = useCallback((product: Product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  }, []);

  /* ── Drawer controls ────────────────────────────────── */
  const openCart = useCallback(() => {
    setSearchOpen(false);
    setCartOpen(true);
  }, []);

  const openSearch = useCallback(() => {
    setCartOpen(false);
    setSearchOpen(true);
  }, []);

  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      {/* Skip navigation link (accessibility) */}
      <a href="#main-content" className="skip-link">
        Ir para o conteudo principal
      </a>

      <Header
        cartCount={totalItems}
        onCartOpen={openCart}
        onSearchOpen={openSearch}
        forceLight={cartOpen || searchOpen}
      />

      <main id="main-content" tabIndex={-1}>
        {selectedProduct ? (
          <ProductDetails 
            product={selectedProduct}
            onBack={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onWishlist={handleWishlist}
          />
        ) : (
          <>
            <Hero />
            <Products
              onProductClick={(p) => {
                setSelectedProduct(p);
                window.scrollTo(0, 0);
              }}
              wishlist={wishlist}
              onWishlist={handleWishlist}
            />
            <About />
          </>
        )}
      </main>

      <SearchDrawer
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemove={handleRemoveFromCart}
        onQuantityChange={handleQuantityChange}
      />
    </>
  );
}
