'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ShoppingCart, X, CreditCard, Percent } from 'lucide-react';
import { useStoreController } from '../controllers/useStoreController';
import GameCard from '../components/GameCard';
import HeroSecurify from '../components/HeroSecurify';

const StoreView = () => {
  const {
    categories,
    currentCategory,
    currentSection,
    sections,
    products,
    cartCount,
    cartTotal,
    cartItems,
    changeCategory,
    changeSection,
    addToCart
  } = useStoreController();

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [offersOpen, setOffersOpen] = useState(false);

  // Lógica de navegación reactiva desde el navbar de la Hero Section
  const handleNavigate = (action) => {
    if (action === 'ofertas') {
      setOffersOpen(true);
    } else if (action === 'coleccion') {
      document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' });
      if (sections && sections.length > 0) {
        changeSection(sections[0].id);
      }
    } else if (action === 'ediciones') {
      document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' });
      if (sections && sections.length > 1) {
        changeSection(sections[1].id);
      } else if (sections && sections.length > 0) {
        changeSection(sections[0].id);
      }
    } else if (action === 'tienda' || action === 'explorar') {
      document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-black text-white select-none antialiased">
      {/* PARTE 1: HERO SECTION INMERSIVA Y DINÁMICA */}
      <HeroSecurify onNavigate={handleNavigate} accentColor={currentCategory.accentColor} />

      {/* BOTÓN FLOTANTE DEL CARRITO (Estilo Glassmorphism y Neón Dinámico) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setCheckoutOpen(true)}
          className="relative flex items-center gap-3 rounded-full border bg-neutral-950/80 px-6 py-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl transition hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            borderColor: `${currentCategory.accentColor}30`,
            boxShadow: `0 20px 50px rgba(0,0,0,0.8), 0 0 25px ${currentCategory.accentColor}25`
          }}
        >
          <ShoppingCart className="h-5 w-5" style={{ color: currentCategory.accentColor }} />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">mi carrito</span>
          {cartCount > 0 && (
            <span 
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-black shadow-md animate-pulse"
              style={{ backgroundColor: currentCategory.accentColor }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* PARTE 2: TIENDA FUNCIONAL Y PATRÓN MVC (Debajo del Hero) */}
      <section 
        id="tienda" 
        className="relative z-10 px-6 py-24 md:px-12 bg-black min-h-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, ${currentCategory.accentColor}0e, transparent 55%)`,
          transition: 'all 1s ease'
        }}
      >
        {/* Fondo sutil decorativo en la tienda */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.01),_transparent_25%),radial-gradient(circle_at_top_right,_rgba(255,255,255,0.01),_transparent_25%)]" />

        <div className="mx-auto max-w-7xl space-y-16">
          
          {/* Encabezado y Selector de Categorías Flotante en Píldora */}
          <div className="flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-neutral-950/40 p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              
              {/* Información */}
              <div className="space-y-4 max-w-2xl">
                <span 
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase font-bold tracking-[0.3em] transition duration-500"
                  style={{ 
                    color: currentCategory.accentColor,
                    borderColor: `${currentCategory.accentColor}30`,
                    backgroundColor: `${currentCategory.accentColor}0a`
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full animate-ping" style={{ backgroundColor: currentCategory.accentColor }} />
                  tienda virtual tcg
                </span>
                <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lowercase leading-none">
                  universo <span style={{ color: currentCategory.accentColor, transition: 'color 1s ease' }}>{currentCategory.name}</span>
                </h2>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {currentCategory.description} Rediseñado bajo el patrón MVC con cálculo financiero automatizado de ganancias y efecto cristal premium.
                </p>
              </div>

              {/* Selector de Categorías (Píldoras Gilded) - Desplazable horizontalmente en móviles */}
              <div className="overflow-x-auto max-w-full pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex sm:flex-wrap gap-2.5 rounded-3xl bg-black/60 p-2 border border-white/5 shadow-inner min-w-max sm:min-w-0">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => changeCategory(category.id)}
                      className="relative rounded-2xl px-5 py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-300 select-none cursor-pointer"
                      style={{
                        backgroundColor: currentCategory.id === category.id ? category.accentColor : 'transparent',
                        color: currentCategory.id === category.id ? '#000' : 'rgba(255,255,255,0.6)',
                        boxShadow: currentCategory.id === category.id ? `0 4px 20px ${category.accentColor}40` : 'none'
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selector de Subsecciones (Píldora Desplazable) */}
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="flex min-w-max gap-3 rounded-2xl bg-neutral-900/40 p-2 border border-white/5 backdrop-blur-md">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => changeSection(section.id)}
                    className="min-w-[125px] rounded-xl py-3 text-[10px] font-bold uppercase tracking-widest transition-all duration-300"
                    style={{
                      backgroundColor: currentSection?.id === section.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                      color: currentSection?.id === section.id ? '#fff' : 'rgba(255,255,255,0.45)',
                      border: currentSection?.id === section.id ? '1px solid rgba(255,255,255,0.15)' : '1px solid transparent'
                    }}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de Productos (Cards) */}
          <AnimatePresence mode="popLayout">
            <motion.div 
              key={`${currentCategory.id}-${currentSection?.id || ''}`}
              className="grid gap-6 grid-cols-1 max-w-md mx-auto sm:max-w-none sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {products.map((product) => (
                <GameCard 
                  key={product.id} 
                  product={product} 
                  accentColor={currentCategory.accentColor} 
                  onAdd={() => addToCart(product)} 
                  onView={() => {}} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Modal de Ofertas TCG de Temporada (Glassmorphism Premium) */}
      <AnimatePresence>
        {offersOpen && (
          <motion.div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/85" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-md">
              <motion.div 
                className="relative w-full max-w-lg rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-neutral-950/95 p-6 md:p-8 shadow-2xl shadow-black/85 text-center" 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }} 
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  borderColor: `${currentCategory.accentColor}30`,
                  boxShadow: `0 30px 100px rgba(0,0,0,0.8), 0 0 35px ${currentCategory.accentColor}15`
                }}
              >
                {/* Botón de Cerrar */}
                <button 
                  type="button" 
                  onClick={() => setOffersOpen(false)} 
                  className="absolute right-6 top-6 rounded-full bg-white/5 border border-white/10 p-3 text-white transition hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border border-white/10 text-white" style={{ color: currentCategory.accentColor, borderColor: `${currentCategory.accentColor}40` }}>
                  <Percent className="h-6 w-6 animate-pulse" />
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight lowercase">ofertas de temporada</h2>
                
                <div className="mt-6 rounded-3xl border border-white/5 bg-white/5 p-6 space-y-4">
                  <p className="text-sm leading-relaxed text-neutral-300">
                    ¡Desbloquea el máximo potencial de tu mazo! Usa este código promocional exclusivo al momento de pagar y obtén un descuento del **20%** en todas las cartas y manuales.
                  </p>

                  <div 
                    className="rounded-2xl border py-4 text-2xl font-black tracking-[0.25em] select-text text-black cursor-pointer"
                    style={{
                      backgroundColor: currentCategory.accentColor,
                      borderColor: currentCategory.accentColor,
                      boxShadow: `0 0 15px ${currentCategory.accentColor}30`
                    }}
                  >
                    NEXUS20
                  </div>

                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">
                    Válido por tiempo limitado en Pokémon, Magic, Yu-Gi-Oh! y D&D.
                  </p>
                </div>

                <button 
                  type="button" 
                  onClick={() => setOffersOpen(false)} 
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10 cursor-pointer"
                >
                  entendido, ¡a comprar!
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Finalización de Compra (Checkout con Diseño Glassmorphism Premium) */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div 
            className="fixed inset-0 z-50 overflow-y-auto bg-black/80" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-md">
              <motion.div 
                className="relative w-full max-w-2xl rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-neutral-950/95 p-6 md:p-10 shadow-2xl shadow-black/80" 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }} 
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                {/* Botón de Cerrar */}
                <button 
                  type="button" 
                  onClick={() => setCheckoutOpen(false)} 
                  className="absolute right-6 top-6 rounded-full bg-white/5 border border-white/10 p-3 text-white transition hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Cabecera del Modal */}
                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight lowercase">finalizar compra</h2>
                    <p className="mt-2 text-xs text-neutral-400">Total acumulado de tus artículos de TCG</p>
                  </div>
                  <span 
                    className="inline-flex rounded-2xl border px-5 py-3 text-sm font-extrabold tracking-wider"
                    style={{
                      borderColor: `${currentCategory.accentColor}30`,
                      color: currentCategory.accentColor,
                      backgroundColor: `${currentCategory.accentColor}0a`
                    }}
                  >
                    total: {cartTotal} Bs.
                  </span>
                </div>

                {/* Contenido */}
                {purchaseComplete ? (
                  <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold lowercase">compra completada exitosamente</h3>
                    <p className="mt-3 text-xs leading-relaxed text-neutral-400 max-w-md mx-auto">
                      Tu pedido en Bolivianos (Bs.) ha sido procesado de forma simulada. La paleta de neón de la tienda se mantiene sincronizada con tu juego favorito.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => { setPurchaseComplete(false); setCheckoutOpen(false); }} 
                      className="mt-6 rounded-2xl bg-white text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition hover:bg-neutral-200"
                    >
                      cerrar ventana
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {/* Lista de Artículos */}
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                      {cartItems.length ? cartItems.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-white lowercase">{item.name}</p>
                            <p className="text-[10px] text-neutral-400 mt-1 uppercase tracking-wider">{item.quantity} unidad(es) × {item.precioVenta} Bs.</p>
                          </div>
                          <p className="text-sm font-extrabold" style={{ color: currentCategory.accentColor }}>
                            {(item.quantity * item.precioVenta).toFixed(2)} Bs.
                          </p>
                        </div>
                      )) : (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-xs text-neutral-400">
                          El carrito se encuentra vacío. ¡Añade algunas cartas y mazos de neón!
                        </div>
                      )}
                    </div>

                    {/* Botón de Pago */}
                    {cartItems.length > 0 && (
                      <button 
                        type="button" 
                        onClick={() => setPurchaseComplete(true)} 
                        className="w-full rounded-2xl py-4 text-xs font-bold uppercase tracking-widest text-black transition-all hover:scale-[1.02] active:scale-[0.98]"
                        style={{
                          backgroundColor: currentCategory.accentColor,
                          boxShadow: `0 0 20px ${currentCategory.accentColor}40`
                        }}
                      >
                        confirmar y pagar
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StoreView;
