import { FC, useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Lock, User } from 'lucide-react';
import { useAppContext } from '../store';

export const AdminLoginView: FC = () => {
  const { setAdminLoggedIn, setView } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setAdminLoggedIn(true);
      setError(false);
      setView('admin-dashboard');
    } else {
      setError(true);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-32 pb-32 min-h-screen bg-cream flex justify-center items-center px-4">
      <div className="bg-white border border-outline/30 p-8 shadow-xl rounded-sm w-full max-w-sm">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-surface-low border border-outline/20 flex items-center justify-center text-chocolate">
            <Lock size={24} />
          </div>
        </div>
        <h1 className="font-display text-2xl text-chocolate text-center mb-8">Accesso Riservato</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Utente</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate/50"><User size={16} /></span>
              <input 
                type="text" 
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-cream/20 border border-outline px-10 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase font-bold tracking-wider mb-2">Password</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-chocolate/50"><Lock size={16} /></span>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-cream/20 border border-outline px-10 py-3 text-sm focus:outline-none focus:border-gold transition-colors rounded-sm"
              />
            </div>
          </div>
          
          {error && <p className="text-red-600 text-xs text-center">Credenziali non valide</p>}
          
          <button 
            type="submit"
            className="w-full bg-chocolate-deep text-white font-bold text-xs uppercase tracking-widest py-4 mt-2 rounded-sm hover:bg-chocolate transition-colors shadow-md"
          >
            Accedi
          </button>
        </form>
      </div>
    </motion.div>
  );
};
