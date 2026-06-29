/* ============================================================
   HN Oliveira — Product Catalog
   ============================================================ */

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  variant: string;
  sizes: string[];
  stock: number;
  image: string;
  images: string[];
  tags: string[];
  description: string;
  material?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  gridSize?: 'normal' | 'large';
}

export type CartItem = Product & {
  cartId: string;
  selectedSize: string;
  quantity: number;
};

export const PRODUCTS: Product[] = [
  {
    id: 'camiseta-lacoste',
    name: 'Camiseta Clean',
    brand: 'LACOSTE',
    category: 'Camisetas',
    price: 199.90,
    variant: 'Branca premium — corte iconic',
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 9,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
    ],
    tags: ['camisetas', 'lacoste', 'branca', 'basico'],
    description:
      'Camiseta branca de algodao premium com o classico logo Lacoste. Corte limpo, caimento impecavel e versatilidade para qualquer composicao street ou casual.',
    material: 'Algodao pima 100%',
    isFeatured: true,
    gridSize: 'large',
  },
  {
    id: 'kit-boss',
    name: 'Kit Black Edition',
    brand: 'BOSS',
    category: 'Kits',
    price: 249.90,
    variant: 'Camiseta branca + short preto',
    sizes: ['P', 'M', 'G'],
    stock: 5,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
    ],
    tags: ['kits', 'boss', 'conjunto', 'street'],
    description:
      'Kit completo Boss com camiseta com estampa exclusiva e short coordenado em algodao premium. Conjunto de alto impacto para o dia a dia urbano.',
    material: 'Algodao 30.1 penteado',
    isFeatured: true,
    isNew: true,
    gridSize: 'normal',
  },
  {
    id: 'lacoste-polo',
    name: 'Polo Signature',
    brand: 'LACOSTE',
    category: 'Camisetas',
    price: 229.90,
    originalPrice: 289.90,
    variant: 'Branca slim fit — polo icone',
    sizes: ['P', 'M', 'G', 'GG'],
    stock: 6,
    image: 'https://images.unsplash.com/photo-1507344922115-3db5a882a9d6?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1507344922115-3db5a882a9d6?auto=format&fit=crop&q=80&w=800'],
    tags: ['camisetas', 'lacoste', 'polo'],
    description:
      'Polo Lacoste em algodao pima de alta qualidade. Corte slim reinventado para o streetwear contemporaneo — do campo ao asfalto.',
    material: 'Algodao pima piquet',
    gridSize: 'normal',
  },
  {
    id: 'kit-boss-premium',
    name: 'Kit Premium Set',
    brand: 'BOSS',
    category: 'Kits',
    price: 289.90,
    variant: 'Camiseta graphic + bermuda Boss',
    sizes: ['M', 'G', 'GG'],
    stock: 3,
    image: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1509319117193-57bab727e09d?auto=format&fit=crop&q=80&w=800'],
    tags: ['kits', 'boss', 'premium'],
    description:
      'Set premium Boss com camiseta de estampa exclusiva e bermuda coordenada em moletom french terry. Visual completo para quem entende de moda.',
    material: 'Moletom french terry 280g',
    isNew: true,
    gridSize: 'large',
  },
  {
    id: 'lacoste-essentials',
    name: 'Essentials Tee',
    brand: 'LACOSTE',
    category: 'Camisetas',
    price: 179.90,
    variant: 'Branca relaxed fit — everyday',
    sizes: ['M', 'G', 'GG'],
    stock: 11,
    image: 'https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=800'],
    tags: ['camisetas', 'lacoste', 'relaxed'],
    description:
      'Camiseta Lacoste linha Essentials com corte relaxed fit. O basico elevado — algodao macio, caimento fluido e logo sutil no peito.',
    material: 'Algodao jersey 180g',
    gridSize: 'normal',
  },
  {
    id: 'boss-oversized',
    name: 'Oversized Graphic',
    brand: 'BOSS',
    category: 'Camisetas',
    price: 219.90,
    variant: 'Branca oversized — estampa exclusive',
    sizes: ['P', 'M', 'G'],
    stock: 4,
    image: 'https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800',
    images: ['https://images.unsplash.com/photo-1520975954732-57dd22299614?auto=format&fit=crop&q=80&w=800'],
    tags: ['camisetas', 'boss', 'oversized'],
    description:
      'Camiseta Boss oversized com estampa exclusiva da colecao Drop 01. Tecido premium, caimento generoso e presenca visual imediata.',
    material: 'Algodao fio 40 penteado',
    gridSize: 'normal',
  },
];

export const CATEGORIES = ['Todos', 'Camisetas', 'Kits'];

export const SORT_OPTIONS = [
  { value: 'default',    label: 'Em destaque' },
  { value: 'price-asc',  label: 'Menor preco' },
  { value: 'price-desc', label: 'Maior preco' },
  { value: 'new',        label: 'Novidades' },
];

export function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function sortProducts(products: Product[], sortBy: string): Product[] {
  const list = [...products];
  if (sortBy === 'price-asc')  return list.sort((a, b) => a.price - b.price);
  if (sortBy === 'price-desc') return list.sort((a, b) => b.price - a.price);
  if (sortBy === 'new')        return list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
  return list; // default: editorial order
}
