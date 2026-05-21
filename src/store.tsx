import { createContext, useContext, useState, ReactNode } from 'react';

export type Category = 'Torte' | 'Biscotti' | 'Piccola Pasticceria' | 'Eventi' | 'Idee Regalo';

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
  {
    id: "torta-luigia",
    name: "Torta Luigia",
    category: "Torte",
    description: "Pan di Spagna soffice, crema chantilly e fragoline di bosco fresche. Una sinfonia di leggerezza e tradizione.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKs5YlECx8GzbPTt3cPp_A00jLq7O0J8kXHtTu3tjrfh1yEpkVOJHmttVAEd_6xYEIrLxQum5ajX8ROWJyYI6J0MLu-p45IWeEtuw-r1aqis9wKBYWSFHmgoU2juSlrwu-XVzGhfbgepliZ3IcZMMYFksMpdYWe8HzFXD2EXFQOMRa8-9NfnUrNOiQuFtwmZnxG9gbbVcKykdgf4VIDKkAraaI0q0zp3soHc3Q4RGRxvyd0IhegS0GdvACdglGQRclOm4aPdve2RY",
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
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhwNcUC-en7NCbCd72cs002J-yFIPJl4z4wsK9mjFETOMYTT0fJ-RxSgbFRyJar5-WiMUrQLUfeGMDOOLVUk3ruxw0WnN7yQ1Ewsk6L-dJaNeHFeS8cA6pemkyfoJdaaScYwjsre-cBpV5x5iDAXvE5rLPQAq6aBXnX6udD-YxKBEjy0qu9C-7SGe6f-m_In6jVZySM9qFd1Xi67ykZG39q1Tf0ahAy5Cd-RKw_yRix0X8HHtyeVTBmAhg",
    price: 18.00,
    tags: ["Ingredienti locali", "Fatto a mano", "Senza conservanti"],
    isPopular: true
  },
  {
    id: "cantucci-mandorle",
    name: "Cantucci alle mandorle",
    category: "Biscotti",
    description: "Croccanti e profumati, perfetti da accompagnare a un vino dolce o un caffè. Realizzati con mandorle selezionate.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ujUb0DotiBBI1k9-noP0rFj4g6vIDxdI1m3Q_kmQvKHseYQ4ZOptrEaWkYMNwKY3jCRj9g77KmYz2wwqO-4k0hts_QRkY_UE8nJ5sl2PtgVLJaRgMlNndqCeGaQx6vaSPznZFjTIwf_11EDGYplm_LGmy1Io04PSsPpabXfY-Qw3NI29VPpvlNFFF7afvHiID8UD1zdVU8HTplrGPjbRJK1MKUrtXdCpPxcNSwcbP2R9kCj-sxLJKZOjA8",
    price: 15.00,
    tags: ["Mandorle tostate", "Tradizione Irpina"],
    isPopular: true
  },
  {
    id: "chiffon-cake",
    name: "Chiffon Cake",
    category: "Torte",
    description: "Soffice come una nuvola, la nostra Chiffon Cake è il dolce ideale per ogni momento della giornata.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhrzew3m5_j8UVGRco5-HAhhY59ABHGd4cRem4-McH9Rodai5cCQFHrpeiPrw2INo7gOnMU1JSxm4Vu8JA5Lkokv944fslc3rchg56pmCkC7isB1VqGES-lpwPyXcAPYVKSD5n69Vq_XDQ9zZGhOUtIYlVtAAxCgpMU2Nt9SNW89pngxCEOC9mjCMOzyVwHWllxyMPDUOT_1rW55-NcAAy_1UNkzD17R34-qDd7Wh85CJEJjNtLWd-15-w",
    price: 35.00,
    tags: ["Estremamente soffice", "Ingredienti freschi"],
    isPopular: true
  },
  {
    id: "pipatielli",
    name: "Pipatielli",
    category: "Biscotti",
    description: "Biscotti rustici tradizionali, ricchi di sapore e perfetti per una pausa golosa in ogni momento della giornata.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ujXHASB0zYrXoB-ZxbiWlzjhy-GRVFe3_Go-KK2HfZLd-Gq-NxzILrCKfp9euNVzHlRwhNijQ4LHdydO10TFOnN6hBpwOkRse1_LrtAbQ3RNtu97inxODP9AT9zguWh6AtOBZGpwtVDYVWvoMSsWoVl0BMYST-bHNI7L43TDpGNkngkcwSB4PQ2pgy_vX_Kz4rBIwD_YYpQmtdCnQ4kWeumV2XMETLA2D8piOsmb3XtC5TqhMuEjz2slMM",
    price: 16.00,
    tags: ["Classici"],
    isPopular: true
  },
  {
    id: "macarons",
    name: "Scatola di Macarons (12 pz)",
    category: "Piccola Pasticceria",
    description: "Delicati gusci di mandorla racchiudono morbide ganache nei gusti più raffinati.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE3sTRq6NdFdWRhmtq1SE6jIOVPRAAU-s4AdyZzt7liknvDahG0tN5PTEbCZWhb1XzsAOH3_CrlkcVxbJSgc7-Np9EfgeiUFEPCnx5rhqHDTirkx7r-NboFOwrrfhwAdnqoUsS7fWcEfufWwGHC-NXIH22djntJSoNRXksOUcXxFmClxs2tnTY2bq0a9uN-eSSyFlRWNNGxVQTAaxwB2YQ5LiEBh0obRewbv3-ovs3rs-IGb57ny6IlXro_S6tCuu1slWqIVyjZV4",
    price: 24.00,
    tags: ["Selezione dello chef"],
    isPopular: false
  },
  {
    id: "torta-cioccolato",
    name: "Torta al Cioccolato",
    category: "Torte",
    description: "Un classico intramontabile, intenso e cremoso, per i veri amanti del cioccolato.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRS4ot1bxsIc3R3ZnrY_tIQTGeQqMMrTU8MoSBfZ8DyWZq3z-c-CnE-ksIf5MFr3wAor1RpTH2xoNXjpkV_aX3SH70sUl1NnTIRwM6LQ8CNVK_D2E4OX9G5hH6O7rpqFMvfKuo2XlBwNYNbsS1sVb706GaVK6X9nJyYe1CxvCBSUlBgaHKFBg0yeFA1on6Ah0gZEnXi8TGJOEAGF6fc14Vc6TikuBJZEoRHp9iG7WoHW0XELFv9n74ybZNuY8eDE59vo7R4oKqI3E",
    price: 40.00,
    tags: ["Più venduto"],
    isPopular: false
  },
  {
    id: "frollini-cioccolato",
    name: "Frollini al cioccolato",
    category: "Biscotti",
    description: "Frolla finissima arricchita con gocce di cioccolato fondente.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugzatrE1GRj_nZAR1bFGzZwCop7QRFTVmu7iaT_JvrGU0y_7oFk8knmxssYfTwNn-YhfGU1LrCvZWl8wGnTe2l7wU3HkpNPgjuZyVezzpWv0uMJamZ0CXzYnedwvLhBqVf3azu-Sqj9TM3hAP5N-AmVPACItg3J-21GpcxZ4SgKg1krEh-AzP8ujtLjfg8r-q08gRmxCOqnFeopaSK0H3Nuxwtx3B-PUp7TrRBoxz2NyHXyU7uWE5dgbQ",
    price: 15.00,
    tags: ["Artigianale"],
    isPopular: false
  },
  {
    id: "rotoli-amarena",
    name: "Rotoli all'amarena",
    category: "Biscotti",
    description: "Frolla ripiena della nostra confettura artigianale di amarene selvatiche.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uje7uYkV2vTp45Vw1K9ezqAq4ekuh0mOE8mfUg7kEkePFNVUIsRLTrMiHbRSjDeXe5wTWFCAjbROiGCqYf2k6JA4048pTOq10u3e1EzbtjnSgpzsmGEchkp025ziNps2r9WavmQ8-KlU2V5vi6lbZRuJ0UKfRz-rQ8IGKVbC3M4Mcg69b-3fsai8BM-gMlnzeojLtLgFioK_KJXRtAfT-2HTupt_5FmBHDHqG5NUb5VOwE59-kNMUtmng",
    price: 17.50,
    tags: ["Artigianale"],
    isPopular: false
  },
  {
    id: "ciambelline-vino",
    name: "Ciambelline al vino",
    category: "Biscotti",
    description: "Classiche ciambelline preparate con vino locale e olio d'oliva.",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugfomQkIW_vx8oN0oOpESQecF1Y7cuZAuwqo8h8gAeg2QkqPYnfigLKOhU9c-iBnrHpjCzWECUpa0Zn-BHprNvmPaAu4JhvAqqhKmCl5ZV8wBXUxtPDwZKQj7_W-ay4uXY4KD9V8vzmy1D9q3I8eEj2p-ldb8j0zh37XXfUsqIQCOjnH_VOzwl866k-IU19nJ1oa1PWVvIIk-K8kHuCIqsbM_KKWW4i4p6WMucnmAkhL82T09gFqmiZtPU",
    price: 14.00,
    tags: ["Artigianale"],
    isPopular: false
  }
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewType = 'home' | 'catalog' | 'product' | 'cart';

interface AppContextType {
  view: ViewType;
  setView: (view: ViewType, payload?: any) => void;
  activePayload: any;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [view, setViewState] = useState<ViewType>('home');
  const [activePayload, selectPayload] = useState<any>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

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

  return (
    <AppContext.Provider value={{ view, setView, activePayload, cart, addToCart, updateQuantity, removeFromCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
