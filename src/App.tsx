/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ReactNode } from 'react';
import { AnimatePresence } from 'motion/react';
import { AppProvider, useAppContext } from './store';
import { TopBar, MobileNav, Footer, SocialShortcuts } from './components/Navigation';
import { CustomCakeModal } from './components/CustomCakeModal';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductView } from './views/ProductView';
import { CartView } from './views/CartView';
import './index.css';

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <MobileNav />
      <SocialShortcuts />
      <CustomCakeModal />
    </div>
  );
}

function AppRouter() {
  const { view } = useAppContext();

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        {view === 'home' && <HomeView key="home" />}
        {view === 'catalog' && <CatalogView key="catalog" />}
        {view === 'product' && <ProductView key="product" />}
        {view === 'cart' && <CartView key="cart" />}
      </AnimatePresence>
    </MainLayout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

