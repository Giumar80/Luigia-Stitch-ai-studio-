import { FC, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogOut, Plus, Trash2, Edit2, Image as ImageIcon } from 'lucide-react';
import { useAppContext, Category, Product } from '../store';

export const AdminDashboardView: FC = () => {
  const { products, isAdminLoggedIn, setView, setAdminLoggedIn, addProduct, updateProduct, deleteProduct } = useAppContext();
  
  if (!isAdminLoggedIn) {
    setView('admin-login');
    return null;
  }

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form state
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('Torte');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  const handleLogout = () => {
    setAdminLoggedIn(false);
    setView('home');
  };

  const startEditing = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setCategory(p.category);
    setPrice(p.price.toString());
    setDescription(p.description);
    setImageUrl(p.image);
    setIsPopular(p.isPopular);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProduct = (e: FormEvent) => {
    e.preventDefault();
    
    const newProduct: Product = {
      id: editingId || name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      category,
      price: parseFloat(price) || 0,
      description,
      image: imageUrl || "https://images.unsplash.com/photo-1551404973-7bb6afce14c5?q=80&w=2665&auto=format&fit=crop", // fallback image
      tags: editingId ? (products.find(p => p.id === editingId)?.tags || []) : ["Novità"],
      isPopular
    };

    if (editingId) {
      updateProduct({ ...newProduct, id: editingId });
    } else {
      addProduct(newProduct);
    }
    
    // Reset form
    setEditingId(null);
    setName('');
    setPrice('');
    setDescription('');
    setImageUrl('');
    setIsPopular(false);
    setIsAdding(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-28 pb-32 min-h-screen bg-cream px-4 md:px-16">
      
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 pb-6 border-b border-outline/20 gap-4">
          <div>
            <h1 className="font-display text-4xl text-chocolate mb-2">Bottega Admin</h1>
            <p className="text-sm text-chocolate/70">Gestisci i dolci proposti in catalogo</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-chocolate hover:text-red-700 transition-colors"
          >
            <LogOut size={16} /> Esci
          </button>
        </header>

        <div className="mb-8">
          <button 
            onClick={() => {
              if (isAdding) {
                setIsAdding(false);
                setEditingId(null);
                setName('');
                setPrice('');
                setDescription('');
                setImageUrl('');
                setIsPopular(false);
              } else {
                setIsAdding(true);
              }
            }}
            className="bg-chocolate text-white px-6 py-4 text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors flex items-center gap-2 rounded-sm shadow-md"
          >
            <Plus size={16} /> {isAdding ? 'Annulla' : 'Aggiungi Nuovo Dolce'}
          </button>
        </div>

        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <div className="bg-white border border-outline/30 rounded-sm p-6 sm:p-8 shadow-lg">
                <h2 className="font-display text-2xl text-chocolate mb-6">
                  {editingId ? 'Modifica Dolce' : 'Dettagli Nuova Creazione'}
                </h2>
                
                <form onSubmit={handleAddProduct} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Nome Prodotto *</label>
                      <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface-low border border-outline/50 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Categoria *</label>
                      <select required value={category} onChange={e => setCategory(e.target.value as Category)} className="w-full bg-surface-low border border-outline/50 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm cursor-pointer">
                        <option value="Torte">Torte</option>
                        <option value="Biscotti">Biscotti</option>
                        <option value="Eventi">Eventi</option>
                        <option value="Idee Regalo">Idee Regalo</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Prezzo (€) *</label>
                      <input type="number" step="0.50" required value={price} onChange={e => setPrice(e.target.value)} className="w-full bg-surface-low border border-outline/50 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm" />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-2">Immagine Prodotto <ImageIcon size={12} className="text-chocolate/50"/></label>
                      
                      {imageUrl && imageUrl.startsWith('data:') ? (
                        <div className="relative w-full h-24 bg-surface-dim border border-outline/50 rounded-sm mb-2 overflow-hidden flex items-start justify-between p-2">
                          <img src={imageUrl} alt="Preview" className="h-full w-20 object-cover rounded-sm shadow-sm" />
                          <button type="button" onClick={() => setImageUrl('')} className="text-xs font-bold uppercase tracking-widest text-red-600 hover:text-red-700">Rimuovi</button>
                        </div>
                      ) : (
                        <input type="text" placeholder="Incolla URL immagine..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-surface-low border border-outline/50 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm mb-3" />
                      )}

                      <div className="flex items-center gap-3 bg-surface-low p-2 rounded-sm border border-outline/30">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-chocolate/60 pl-2">Oppure carica:</span>
                        <input type="file" accept="image/*" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setImageUrl(reader.result as string);
                            };
                            reader.readAsDataURL(file);
                          }
                        }} className="text-[10px] uppercase tracking-widest file:mr-3 file:py-2 file:px-4 file:rounded-sm file:border-0 file:font-bold file:bg-chocolate file:text-white hover:file:bg-gold transition-colors cursor-pointer w-full" />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Breve Descrizione *</label>
                      <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-surface-low border border-outline/50 px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm resize-y" />
                    </div>
                    <div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input type="checkbox" checked={isPopular} onChange={e => setIsPopular(e.target.checked)} className="w-4 h-4 text-gold" />
                        <span className="text-[10px] uppercase font-bold tracking-wider">Mostra in "Le Nostre Specialità" (Home)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-4">
                    <button type="button" onClick={() => {
                      setIsAdding(false);
                      setEditingId(null);
                    }} className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate hover:bg-surface-low transition-colors">Annulla</button>
                    <button type="submit" className="px-8 py-4 bg-chocolate-deep text-white text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors rounded-sm shadow-md">
                      {editingId ? 'Aggiorna Prodotto' : 'Salva Prodotto'}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-white border border-outline/30 rounded-sm shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-low text-[10px] uppercase tracking-widest text-chocolate/70">
                <tr>
                  <th className="px-6 py-4 font-bold">Prodotto</th>
                  <th className="px-6 py-4 font-bold">Categoria</th>
                  <th className="px-6 py-4 font-bold">Prezzo</th>
                  <th className="px-6 py-4 font-bold">In Evidenza</th>
                  <th className="px-6 py-4 font-bold text-right">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/10 text-chocolate">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-surface-dim transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-sm overflow-hidden bg-surface-dim flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sage font-bold text-[10px] uppercase tracking-wider">{product.category}</td>
                    <td className="px-6 py-4 font-bold">€{product.price.toFixed(2)}</td>
                    <td className="px-6 py-4">{product.isPopular ? '✓' : '-'}</td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => startEditing(product)}
                        className="text-chocolate/40 hover:text-gold transition-colors inline-block mr-4"
                        title="Modifica prodotto"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm(`Sei sicuro di voler eliminare ${product.name}?`)) {
                            deleteProduct(product.id);
                          }
                        }}
                        className="text-chocolate/40 hover:text-red-600 transition-colors inline-block"
                        title="Elimina prodotto"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-chocolate/50">Nessun prodotto presente nel catalogo.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
    </motion.div>
  );
};
