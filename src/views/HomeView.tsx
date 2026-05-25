import { FC, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ArrowRight, ArrowLeft, Plus, Truck, Leaf, Mail } from 'lucide-react';
import { useAppContext } from '../store';

export const HomeView: FC = () => {
  const { setView, products } = useAppContext();
  const popularProducts = products.filter(p => p.isPopular);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 380;
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pb-16 pt-20">
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=2665&auto=format&fit=crop" 
            alt="Chef Luigia" 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/90"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mt-12 md:mt-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-xs uppercase tracking-[0.3em] font-bold text-gold mb-6 block"
          >
            Tradizione Irpina • Cuore Milanese
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="font-display text-4xl md:text-6xl text-chocolate mb-6 leading-tight"
          >
            L'Arte della Pasticceria<br className="hidden md:block"/> Montecalvese
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-chocolate/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Torte artigianali create con ingredienti selezionati, portando l'eleganza del gusto direttamente alla vostra tavola.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
            className="flex flex-col md:flex-row gap-4 justify-center"
          >
            <button onClick={() => setView('catalog')} className="bg-chocolate-deep text-white px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-chocolate transition-all hover:scale-[1.02] shadow-xl">
              Ordina le Tue Torte
            </button>
            <button onClick={() => setView('catalog')} className="bg-white/80 backdrop-blur border-none text-chocolate px-10 py-5 text-xs uppercase tracking-widest font-bold hover:bg-white transition-all hover:scale-[1.02]">
              Esplora il Catalogo
            </button>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-chocolate/50">
          <ChevronDown size={32} strokeWidth={1} />
        </div>
      </section>

      {/* Le Nostre Collezioni (Bento Grid) */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h3 className="font-display text-4xl text-chocolate mb-4">Le Nostre Collezioni</h3>
          <div className="w-16 h-px bg-gold mx-auto mb-6"></div>
          <p className="text-chocolate/70 italic text-lg opacity-80">L'eccellenza in ogni creazione</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-auto md:h-[700px]">
          <div onClick={() => setView('catalog')} className="md:col-span-8 md:row-span-1 relative group overflow-hidden bg-surface-dim rounded-sm cursor-pointer aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=2574&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Torte" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="font-display text-3xl mb-2">Torte Signature</h4>
              <p className="text-white/80 mb-4 max-w-sm">Capolavori di freschezza e design per i tuoi momenti indimenticabili.</p>
              <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white pb-1">Scopri la collezione</span>
            </div>
          </div>
          <div onClick={() => setView('catalog')} className="md:col-span-4 md:row-span-2 relative group overflow-hidden bg-surface-dim rounded-sm cursor-pointer min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1621251347072-1b1e220bed78?q=80&w=2574&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Biscotti Tradizionali" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10"></div>
            <div className="absolute top-8 left-8">
              <h4 className="font-display text-3xl text-white mb-3">Biscotti<br/>Tradizionali</h4>
              <span className="text-[10px] uppercase font-bold bg-gold/90 text-white px-3 py-1.5 rounded-sm tracking-widest">La Storia</span>
            </div>
            <div className="absolute bottom-8 left-8">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white border-b border-white pb-1">Esplora i biscotti</span>
            </div>
          </div>
          <div onClick={() => setView('catalog')} className="md:col-span-4 md:row-span-1 relative group overflow-hidden bg-surface-dim rounded-sm cursor-pointer aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1601314212814-11f8b4d8d1e2?q=80&w=2574&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Eventi e Buffet" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="font-display text-2xl mb-3">Eventi & Buffet</h4>
              <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white pb-1">Organizza</span>
            </div>
          </div>
          <div onClick={() => setView('catalog')} className="md:col-span-4 md:row-span-1 relative group overflow-hidden bg-surface-dim rounded-sm cursor-pointer aspect-square md:aspect-auto">
            <img 
              src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=2640&auto=format&fit=crop" 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Idee Regalo" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h4 className="font-display text-2xl mb-3">Idee Regalo</h4>
              <span className="text-[10px] uppercase tracking-widest font-bold border-b border-white pb-1">Regala un'emozione</span>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products Slider */}
      <section className="py-24 bg-surface-low border-y border-outline/20">
        <div className="px-4 md:px-16 max-w-7xl mx-auto mb-12 flex justify-between items-end">
          <div>
            <h3 className="font-display text-4xl text-chocolate mb-2">I Più Amati</h3>
            <p className="text-chocolate/70 italic text-lg opacity-80">I gusti che hanno conquistato i nostri clienti</p>
          </div>
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-outline flex items-center justify-center text-chocolate hover:bg-chocolate hover:text-white transition-all"
              title="Precedente"
            >
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-outline flex items-center justify-center text-chocolate hover:bg-chocolate hover:text-white transition-all"
              title="Successivo"
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pb-12 px-4 md:px-16 scroll-pl-16 snap-x snap-mandatory hide-scrollbar"
        >
          {popularProducts.map(product => (
            <div key={product.id} className="min-w-[280px] md:min-w-[340px] bg-white group border border-outline/20 rounded-sm overflow-hidden snap-start cursor-pointer transition-shadow hover:shadow-xl" onClick={() => setView('product', product.id)}>
              <div className="relative overflow-hidden aspect-[4/3] bg-surface-dim">
                <img src={product.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={product.name}/>
              </div>
              <div className="p-6 md:p-8">
                <span className="text-[10px] uppercase tracking-widest font-bold text-sage mb-3 block">{product.category}</span>
                <h5 className="font-display text-2xl text-chocolate mb-4 leading-tight">{product.name}</h5>
                <div className="flex justify-between items-center mt-6 pt-6 border-t border-outline/20">
                  <span className="text-xs uppercase tracking-wider text-gold font-bold">Su Prenotazione</span>
                  <button className="text-chocolate-deep font-bold flex items-center gap-2 group/btn hover:text-gold transition-colors">
                    <span className="text-[10px] uppercase tracking-widest">Scopri</span>
                    <Plus size={16} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-gold/10 z-0 hidden md:block"></div>
            <img 
              src="https://lh3.googleusercontent.com/aida/ADBb0ujXHASB0zYrXoB-ZxbiWlzjhy-GRVFe3_Go-KK2HfZLd-Gq-NxzILrCKfp9euNVzHlRwhNijQ4LHdydO10TFOnN6hBpwOkRse1_LrtAbQ3RNtu97inxODP9AT9zguWh6AtOBZGpwtVDYVWvoMSsWoVl0BMYST-bHNI7L43TDpGNkngkcwSB4PQ2pgy_vX_Kz4rBIwD_YYpQmtdCnQ4kWeumV2XMETLA2D8piOsmb3XtC5TqhMuEjz2slMM" 
              className="relative z-10 w-full aspect-[4/5] object-cover border border-outline/20 shadow-xl rounded-sm"
              alt="Baking process"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 border border-outline/30 z-20 shadow-2xl hidden md:block max-w-[280px]">
              <p className="font-display text-3xl text-gold italic leading-tight">"Senza magazzino, solo freschezza."</p>
            </div>
          </div>
          <div className="w-full md:w-1/2 pt-8 md:pt-0">
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gold block mb-6">La Nostra Filosofia</span>
            <h3 className="font-display text-4xl md:text-5xl text-chocolate mb-8 leading-tight">Eccellenza in ogni ingrediente</h3>
            <p className="text-lg text-chocolate/80 mb-10 leading-relaxed">
              Lavorazione esclusivamente artigianale. Non abbiamo nessuna forma di magazzino: i prodotti vengono realizzati con ingredienti freschi e selezionati per ogni ordine ricevuto. Così riusciamo a garantire la massima fragranza e quel gusto autentico che solo un dolce appena sfornato può regalare.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 border-t border-outline/30 pt-10">
              <div>
                <Truck className="text-sage mb-4" size={28} strokeWidth={1.5} />
                <h6 className="text-xs uppercase font-bold tracking-widest text-chocolate mb-2">Consegna Fresca</h6>
                <p className="text-sm text-chocolate/70 leading-relaxed">Dalla cucina alla tua porta in tempi record.</p>
              </div>
              <div>
                <Leaf className="text-sage mb-4" size={28} strokeWidth={1.5} />
                <h6 className="text-xs uppercase font-bold tracking-widest text-chocolate mb-2">Ingredienti DOC</h6>
                <p className="text-sm text-chocolate/70 leading-relaxed">Solo il meglio della nostra terra e selezione globale.</p>
              </div>
            </div>
            <button className="bg-chocolate text-white px-10 py-5 text-[10px] uppercase font-bold tracking-widest hover:bg-gold transition-colors">
              Scopri di Più Su Di Noi
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-chocolate-deep py-24 px-4 text-center mt-12 mx-4 md:mx-16 rounded-sm shadow-2xl">
        <div className="max-w-2xl mx-auto text-white">
          <Mail className="mx-auto text-gold mb-8" size={40} strokeWidth={1} />
          <h3 className="font-display text-4xl mb-6">Resta aggiornato sulle novità</h3>
          <p className="mb-10 text-white/70 text-lg">Ricevi le nostre novità e le offerte speciali direttamente nella tua casella di posta. Puoi annullare l'iscrizione in ogni momento.</p>
          <form className="flex flex-col sm:flex-row gap-4 px-4">
            <input 
              type="email" 
              placeholder="Il tuo indirizzo email" 
              className="flex-grow bg-white/5 border border-white/20 text-white px-6 py-4 focus:outline-none focus:border-gold transition-colors placeholder:text-white/40"
            />
            <button type="button" className="bg-gold text-chocolate px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
              Iscriviti
            </button>
          </form>
        </div>
      </section>

    </motion.div>
  );
};
