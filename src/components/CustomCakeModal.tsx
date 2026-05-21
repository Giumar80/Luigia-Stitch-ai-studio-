import { FC, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, FileText, CheckCircle2, Award, Heart, Sparkles, MessageSquare } from 'lucide-react';
import { useAppContext } from '../store';

export const CustomCakeModal: FC = () => {
  const { isCustomCakeModalOpen, setCustomCakeModalOpen } = useAppContext();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    data: '',
    invitati: '10-15',
    tipoFiesta: 'Compleanno',
    forma: 'Rotonda',
    impasto: 'Pan di Spagna Tradizionale',
    ripieno: 'Crema Chantilly e Fragole',
    dedica: '',
    dettagli: ''
  });

  if (!isCustomCakeModalOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.nome || !formData.email || !formData.telefono) {
      alert("Per favore, compila i dati di contatto principali (Nome, Email, Telefono)");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const handleClose = () => {
    setCustomCakeModalOpen(false);
    // Debounce resetting submitted state to avoid flicker while closing
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        nome: '',
        email: '',
        telefono: '',
        data: '',
        invitati: '10-15',
        tipoFiesta: 'Compleanno',
        forma: 'Rotonda',
        impasto: 'Pan di Spagna Tradizionale',
        ripieno: 'Crema Chantilly e Fragole',
        dedica: '',
        dettagli: ''
      });
    }, 300);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="relative bg-cream max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-sm border border-outline/30 shadow-2xl z-10 flex flex-col"
        >
          {/* Header */}
          <div className="p-6 md:p-8 border-b border-outline/20 flex justify-between items-center bg-chocolate text-white">
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-gold flex items-center gap-1.5 mb-1">
                <Sparkles size={12} /> Creazione Unica
              </span>
              <h3 className="font-display text-2xl md:text-3xl">Richiedi la tua Torta</h3>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 text-white/80 hover:text-gold transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6 flex-grow text-chocolate">
              
              <div className="bg-surface-low p-4 border border-gold/10 rounded-sm text-sm italic text-chocolate/80 mb-4 flex items-start gap-3">
                <Heart size={20} className="text-gold shrink-0 mt-0.5" />
                <span>
                  Disegniamo e realizziamo torte interamente su misura per i vostri eventi speciali. Raccontaci l'occasione e i tuoi gusti preferiti, e ti ricontatteremo per perfezionare la composizione!
                </span>
              </div>

              {/* Contatti */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold tracking-widest border-b border-outline/20 pb-2 text-gold">1. Dati Personali</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Nome Completo *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.nome}
                      onChange={e => setFormData({...formData, nome: e.target.value})}
                      placeholder="es. Mario Rossi" 
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="es. nome@esempio.it" 
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Cellulare / WhatsApp *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.telefono}
                      onChange={e => setFormData({...formData, telefono: e.target.value})}
                      placeholder="es. 333 1234567" 
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Dettagli Evento */}
              <div className="space-y-4 pt-4">
                <h4 className="text-xs uppercase font-bold tracking-widest border-b border-outline/20 pb-2 text-gold">2. Dettagli della Festa</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Tipo di Evento</label>
                    <select 
                      value={formData.tipoFiesta}
                      onChange={e => setFormData({...formData, tipoFiesta: e.target.value})}
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Compleanno">Compleanno</option>
                      <option value="Matrimonio">Matrimonio / Anniversario</option>
                      <option value="Laurea">Laurea</option>
                      <option value="Battesimo">Battesimo / Comunione</option>
                      <option value="Cerimonia">Cerimonia Aziendale</option>
                      <option value="Altro">Altro Evento Speciale</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                      <Calendar size={12} /> Data dell'Evento
                    </label>
                    <input 
                      type="date" 
                      value={formData.data}
                      onChange={e => setFormData({...formData, data: e.target.value})}
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                      <Users size={12} /> Numero Ospiti (Fette)
                    </label>
                    <select 
                      value={formData.invitati}
                      onChange={e => setFormData({...formData, invitati: e.target.value})}
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="6-8">6 - 8 persone</option>
                      <option value="10-15">10 - 15 persone</option>
                      <option value="15-20">15 - 20 persone</option>
                      <option value="20-30">20 - 30 persone</option>
                      <option value="30-50">30 - 50 persone</option>
                      <option value="50+">Più di 50 persone (Multipiano)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Preferenze Torta */}
              <div className="space-y-4 pt-4">
                <h4 className="text-xs uppercase font-bold tracking-widest border-b border-outline/20 pb-2 text-gold">3. Gusti e Personalizzazione</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Forma Desiderata</label>
                    <select 
                      value={formData.forma}
                      onChange={e => setFormData({...formData, forma: e.target.value})}
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Rotonda">Rotonda Classica</option>
                      <option value="Rettangolare">Rettangolare da Taglio</option>
                      <option value="Cuore">Cottura a Cuore</option>
                      <option value="Multipiano">Multipiano Monumentale</option>
                      <option value="LetteraNumero">Lettera o Numero (Cream Tart)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Base Impasto</label>
                    <select 
                      value={formData.impasto}
                      onChange={e => setFormData({...formData, impasto: e.target.value})}
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Pan di Spagna Tradizionale">Pan di Spagna Soffice</option>
                      <option value="Base Chiffon Cake">Soffice Chiffon Cake</option>
                      <option value="Base Frolla fine">Pasta Frolla Fragrante</option>
                      <option value="Sfoglia caramellata">Millefoglie Caramellata</option>
                      <option value="Pan di spagna Al Cioccolato">Pan di Spagna al Kakao</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Opzione Ripieno</label>
                    <select 
                      value={formData.ripieno}
                      onChange={e => setFormData({...formData, ripieno: e.target.value})}
                      className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer"
                    >
                      <option value="Crema Chantilly e Fragole">Crema Chantilly & Fragoline</option>
                      <option value="Cioccolato e Nocciola">Cioccolato Intenso e Nocciola</option>
                      <option value="Crema al Pistacchio e Lampone">Pistacchio Artigianale & Lamponi</option>
                      <option value="Crema limone e Frutti di bosco">Diplomatica al Limone & Frutti di Bosco</option>
                      <option value="Amarena e Crema pasticcera">Amarena Irpina & Crema Gialla</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Dedica e Dettagli */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                    <Award size={12} /> Dedica da Scrivere
                  </label>
                  <input 
                    type="text" 
                    value={formData.dedica}
                    onChange={e => setFormData({...formData, dedica: e.target.value})}
                    placeholder="es. 'Buon Compleanno Sofia!' o '25 Anni Insieme'" 
                    className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-1">
                    <FileText size={12} /> Note sul Design e Allergie
                  </label>
                  <textarea 
                    value={formData.dettagli}
                    onChange={e => setFormData({...formData, dettagli: e.target.value})}
                    placeholder="es. decorazione floreale rosa, intolleranza al lattosio..." 
                    rows={1}
                    className="w-full bg-white border border-outline px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm resize-none"
                  />
                </div>
              </div>

              {/* Bottoni d'azione */}
              <div className="pt-6 flex justify-end gap-4 border-t border-outline/20">
                <button 
                  type="button" 
                  onClick={handleClose}
                  className="px-6 py-4 border border-outline text-chocolate hover:border-chocolate text-xs font-bold uppercase tracking-widest rounded-sm transition-colors"
                >
                  Annulla
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-10 py-4 bg-chocolate text-white text-xs font-bold uppercase tracking-widest hover:bg-chocolate-deep transition-all shadow-md relative overflow-hidden"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Invio in corso...
                    </span>
                  ) : (
                    "Invia Richiesta"
                  )}
                </button>
              </div>

            </form>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-12 text-center text-chocolate flex-grow flex flex-col justify-center items-center"
            >
              <CheckCircle2 size={80} className="text-sage mb-6 animate-pulse" strokeWidth={1} />
              <h4 className="font-display text-3xl mb-4 text-chocolate-deep">Richiesta Ricevuta!</h4>
              <p className="text-base text-chocolate/80 max-w-md mx-auto leading-relaxed mb-10">
                Grazie, <span className="font-bold text-chocolate-deep">{formData.nome}</span>. La tua richiesta per una torta personalizzata è stata inviata con successo.
                <br/><br/>
                Il nostro laboratorio a <span className="font-semibold text-chocolate-deep">Montecalvo Irpino</span> analizzerà le tue indicazioni per creare qualcosa di straordinario. Un pasticcere ti ricontatterà via WhatsApp al numero <span className="font-semibold">{formData.telefono}</span> o via email nelle prossime ore per proporre un preventivo personalizzato e definire il design!
              </p>
              <button 
                onClick={handleClose}
                className="bg-chocolate text-white px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors shadow-lg"
              >
                Torna in Bottega
              </button>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
