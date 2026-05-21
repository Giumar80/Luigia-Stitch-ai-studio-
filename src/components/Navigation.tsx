import { FC, ReactNode } from 'react';
import { Menu, ShoppingBag, Search, Store, CakeSlice, Sparkles, User, Phone, Instagram, Facebook } from 'lucide-react';
import { useAppContext } from '../store';

const TikTokIcon: FC = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.62 4.19.98 1.15 2.37 1.84 3.86 2.01v3.9c-1.24-.07-2.45-.52-3.47-1.25-.91-.65-1.61-1.57-2.01-2.61-.06 2.9-.04 5.8-.05 8.7-.08 2.06-.72 4.13-1.92 5.8-1.55 2.19-4.24 3.51-6.93 3.25-2.28-.21-4.46-1.54-5.59-3.53-1.42-2.39-1.39-5.63.1-7.98 1.35-2.14 3.89-3.41 6.43-3.08.01 1.34 0 2.67 0 4.01-1.48-.44-3.14.15-3.9 1.48-.79 1.28-.53 3.09.58 4.07.96.86 2.41.97 3.48.27 1.05-.65 1.63-1.91 1.56-3.14-.02-3.78-.01-7.56-.02-11.34z"/>
  </svg>
);

export const TopBar: FC = () => {
  const { setView, cart, setCustomCakeModalOpen } = useAppContext();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 md:px-16 py-4 bg-cream/90 backdrop-blur-md border-b border-outline/30 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="text-chocolate hover:text-gold transition-colors duration-300">
          <Menu size={24} strokeWidth={1.5} />
        </button>
        <nav className="hidden md:flex gap-8 items-center">
          <button onClick={() => setView('home')} className="text-xs uppercase tracking-widest font-bold text-chocolate hover:text-gold transition-colors">Bottega</button>
          <button onClick={() => setView('catalog')} className="text-xs uppercase tracking-widest font-bold text-chocolate/70 hover:text-gold transition-colors">Dolci</button>
          <button onClick={() => setCustomCakeModalOpen(true)} className="text-[10px] uppercase tracking-widest font-bold text-white bg-gold/90 px-3.5 py-1.5 rounded-sm shadow-sm hover:bg-chocolate transition-colors flex items-center gap-1.5">
            <CakeSlice size={13} strokeWidth={2}/> Torta Personalizzata
          </button>
        </nav>
      </div>
      <h1 onClick={() => setView('home')} className="font-display text-2xl md:text-3xl tracking-widest text-chocolate uppercase cursor-pointer">Luigia Cake</h1>
      <div className="flex items-center gap-4">
        <span className="hidden md:inline text-xs uppercase tracking-widest font-bold text-chocolate/70">334 791 4133</span>
        <button className="text-chocolate hover:text-gold transition-colors duration-300 hidden md:block">
          <Search size={22} strokeWidth={1.5} />
        </button>
        <button onClick={() => setView('cart')} className="relative text-chocolate hover:text-gold transition-colors duration-300">
          <ShoppingBag size={22} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-chocolate-deep text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export const MobileNav: FC = () => {
  const { setView, view, setCustomCakeModalOpen } = useAppContext();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-cream border-t border-outline/30 shadow-[0_-4px_20px_rgba(27,28,28,0.06)] rounded-t-3xl">
      <button onClick={() => setView('home')} className={`flex flex-col items-center justify-center transition-transform active:scale-95 ${view === 'home' ? 'text-chocolate font-bold' : 'text-chocolate/50'}`}>
        <Store size={24} strokeWidth={view === 'home' ? 2 : 1.5} className="mb-1" />
        <span className="text-[10px] uppercase tracking-widest font-bold">Bottega</span>
      </button>
      <button onClick={() => setView('catalog')} className={`flex flex-col items-center justify-center transition-transform active:scale-95 ${view === 'catalog' ? 'text-chocolate font-bold' : 'text-chocolate/50'}`}>
        <CakeSlice size={24} strokeWidth={view === 'catalog' ? 2 : 1.5} className="mb-1" />
        <span className="text-[10px] uppercase tracking-widest font-bold">Dolci</span>
      </button>
      <button onClick={() => setCustomCakeModalOpen(true)} className="flex flex-col items-center justify-center transition-transform active:scale-95 text-chocolate/50 hover:text-gold">
        <Sparkles size={24} strokeWidth={1.5} className="mb-1 text-gold" />
        <span className="text-[10px] uppercase tracking-widest font-bold text-gold">Torta</span>
      </button>
      <button className="flex flex-col items-center justify-center transition-transform active:scale-95 text-chocolate/50">
        <User size={24} strokeWidth={1.5} className="mb-1" />
        <span className="text-[10px] uppercase tracking-widest font-bold">Profilo</span>
      </button>
    </nav>
  );
};

export const Footer: FC = () => {
  return (
    <footer className="bg-surface-dim py-16 px-4 md:px-16 border-t border-outline/30 mt-auto">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <h4 className="font-display text-2xl text-chocolate mb-6 uppercase tracking-widest">Luigia Cake</h4>
          <p className="text-sm text-chocolate/80 mb-6 leading-relaxed">
            Pasticceria artigianale che unisce le radici irpine con il gusto raffinato di Milano. Ogni creazione è un'emozione da gustare.
          </p>
          <div className="flex gap-4 items-center">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-chocolate hover:text-gold transition-colors animate-pulse" title="Instagram">
              <Instagram size={20} strokeWidth={1.5}/>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-chocolate hover:text-gold transition-colors" title="Facebook">
              <Facebook size={20} strokeWidth={1.5}/>
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-chocolate hover:text-gold transition-colors" title="TikTok">
              <TikTokIcon />
            </a>
          </div>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-6">Prodotti</h5>
          <ul className="space-y-3 text-sm text-chocolate/80">
            <li><a href="#" className="hover:text-gold transition-colors">Offerte</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Nuovi prodotti</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Più venduti</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">I Nostri Dolci</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-6">La Nostra Azienda</h5>
          <ul className="space-y-3 text-sm text-chocolate/80">
            <li><a href="#" className="hover:text-gold transition-colors">Su di noi</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Contattaci</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Mappa del sito</a></li>
            <li><a href="#" className="hover:text-gold transition-colors">Negozi</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-xs uppercase tracking-widest font-bold text-chocolate mb-6">Informazioni</h5>
          <address className="not-italic text-sm text-chocolate/80 space-y-2">
            <p>Via Santa Maria</p>
            <p>83037 Montecalvo Irpino (AV)</p>
            <p>Italia</p>
            <p className="pt-4 flex items-center gap-2">
              <Phone size={16} strokeWidth={1.5} /> 334 791 4133
            </p>
          </address>
        </div>
      </div>
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-outline/20 flex flex-col md:flex-row justify-between items-center text-[10px] text-chocolate/60 uppercase tracking-widest font-bold">
        <p>© 2026 Luigia Cake • Tutti i diritti riservati</p>
        <p className="mt-4 md:mt-0">Design basato su Dolce Vita Heritage</p>
      </div>
    </footer>
  );
};
