import { createContext, useContext, useState, ReactNode } from 'react';

export type Category = 'Torte' | 'Biscotti' | 'Eventi' | 'Idee Regalo';

export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  longDescription?: string;
  image: string;
  price: number;
  tags: string[];
  stats?: string;
  isPopular?: boolean;
}

export const PRODUCTS: Product[] = [
  // ... (keep initial list as default)
  {
    id: "torta-luigia",
    name: "Torta Luigia",
    category: "Torte",
    description: "Pan di Spagna soffice, crema chantilly e fragoline di bosco fresche. Una sinfonia di leggerezza e tradizione.",
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?q=80&w=2792&auto=format&fit=crop",
    price: 45.00,
    tags: ["Prodotto Artigianale"],
    stats: "4.9 (124) Recensioni",
    isPopular: true
  },
  {
    id: "pastetta-montecalvese",
    name: "Pastetta Montecalvese",
    category: "Biscotti",
    description: "Una ricetta antica tramandata da generazioni, simbolo della tradizione dolciaria di Montecalvo Irpino.",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2665&auto=format&fit=crop",
    price: 18.00,
    tags: ["Ingredienti locali", "Fatto a mano", "Senza conservanti"],
    isPopular: true
  },
  {
    id: "cantucci-mandorle",
    name: "Cantucci alle mandorle",
    category: "Biscotti",
    description: "Croccanti e profumati, perfetti da accompagnare a un vino dolce o un caffè. Realizzati con mandorle selezionate.",
    image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=2574&auto=format&fit=crop",
    price: 15.00,
    tags: ["Mandorle tostate", "Tradizione Irpina"],
    isPopular: true
  },
  {
    id: "chiffon-cake",
    name: "Chiffon Cake",
    category: "Torte",
    description: "Soffice come una nuvola, la nostra Chiffon Cake è il dolce ideale per ogni momento della giornata.",
    image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=2574&auto=format&fit=crop",
    price: 35.00,
    tags: ["Estremamente soffice", "Ingredienti freschi"],
    isPopular: true
  },
  {
    id: "pipatielli",
    name: "Pipatielli",
    category: "Biscotti",
    description: "Biscotti rustici tradizionali, ricchi di sapore e perfetti per una pausa golosa in ogni momento della giornata.",
    image: "https://images.unsplash.com/photo-1557089706-68d02dfbb856?q=80&w=2574&auto=format&fit=crop",
    price: 16.00,
    tags: ["Classici"],
    isPopular: true
  },
  {
    id: "torta-cioccolato",
    name: "Torta al Cioccolato",
    category: "Torte",
    description: "Un classico intramontabile, intenso e cremoso, per i veri amanti del cioccolato.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=2589&auto=format&fit=crop",
    price: 40.00,
    tags: ["Più venduto"],
    isPopular: false
  },
  {
    id: "frollini-cioccolato",
    name: "Frollini al cioccolato",
    category: "Biscotti",
    description: "Frolla finissima arricchita con gocce di cioccolato fondente.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2640&auto=format&fit=crop",
    price: 15.00,
    tags: ["Artigianale"],
    isPopular: false
  },
  {
    id: "rotoli-amarena",
    name: "Rotoli all'amarena",
    category: "Biscotti",
    description: "Frolla ripiena della nostra confettura artigianale di amarene selvatiche.",
    image: "https://images.unsplash.com/photo-1601314212814-11f8b4d8d1e2?q=80&w=2574&auto=format&fit=crop",
    price: 17.50,
    tags: ["Artigianale"],
    isPopular: false
  },
  {
    id: "ciambelline-vino",
    name: "Ciambelline al vino",
    category: "Biscotti",
    description: "Classiche ciambelline preparate con vino locale e olio d'oliva.",
    image: "https://images.unsplash.com/photo-1621251347072-1b1e220bed78?q=80&w=2574&auto=format&fit=crop",
    price: 14.00,
    tags: ["Artigianale"],
    isPopular: false
  }
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewType = 'home' | 'catalog' | 'product' | 'cart' | 'admin-login' | 'admin-dashboard';

interface AppContextType {
  view: ViewType;
  setView: (view: ViewType, payload?: any) => void;
  activePayload: any;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCustomCakeModalOpen: boolean;
  setCustomCakeModalOpen: (open: boolean) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  isAdminLoggedIn: boolean;
  setAdminLoggedIn: (status: boolean) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [view, setViewState] = useState<ViewType>('home');
  const [activePayload, selectPayload] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCustomCakeModalOpen, setCustomCakeModalOpen] = useState(false);
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  // Initialize products from localStorage or default PRODUCTS
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const stored = localStorage.getItem('luigia-cake-products');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  const addProduct = (product: Product) => {
    const updated = [product, ...products];
    setProducts(updated);
    localStorage.setItem('luigia-cake-products', JSON.stringify(updated));
  };

  const updateProduct = (product: Product) => {
    const updated = products.map(p => p.id === product.id ? product : p);
    setProducts(updated);
    localStorage.setItem('luigia-cake-products', JSON.stringify(updated));
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter(p => p.id !== productId);
    setProducts(updated);
    localStorage.setItem('luigia-cake-products', JSON.stringify(updated));
  };

  const setView = (newView: ViewType, payload?: any) => {
    setViewState(newView);
    selectPayload(payload || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <AppContext.Provider value={{ 
      view, 
      setView, 
      activePayload, 
      cart, 
      addToCart, 
      updateQuantity, 
      removeFromCart,
      clearCart,
      isCustomCakeModalOpen, 
      setCustomCakeModalOpen,
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      isAdminLoggedIn,
      setAdminLoggedIn
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
