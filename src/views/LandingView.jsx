'use client';

import { useState, useRef } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { 
  ShoppingCart, 
  X, 
  CreditCard, 
  Percent, 
  ShieldCheck, 
  Truck, 
  Award, 
  Sparkles, 
  ChevronDown, 
  Compass,
  Layers,
  HelpCircle
} from 'lucide-react';
import { useStoreController } from '../controllers/useStoreController';
import GameCard from '../components/GameCard';
import ProductViewerModal from '../components/ProductViewerModal';
import Image from 'next/image';

const LandingView = () => {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  // Referencia al contenedor principal para calcular el scroll
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax y Opacidad del fondo fijo al hacer scroll
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.15]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 0.35, 0.2]);

  // Navegación fluida entre secciones
  const handleNavigate = (action) => {
    setMobileMenuOpen(false);
    if (action === 'ofertas') {
      setOffersOpen(true);
    } else if (action === 'features' || action === 'lore') {
      document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'coleccion') {
      document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' });
      if (sections && sections.length > 0) {
        changeSection(sections[0].id);
      }
    } else if (action === 'tienda' || action === 'explorar') {
      document.getElementById('tienda')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Consumir la URL externa del fondo directamente sin fallbacks locales inexistentes que provoquen 404
  const bgUrl = currentCategory.backgroundUrl || `/imagenes/fondos/${currentCategory.id}.jpg`;

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-100 select-none antialiased font-sans"
    >
      {/* ========================================================
          1. FONDO GLOBAL DINÁMICO (Scroll Global de Cristal)
          ======================================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Imagen de Fondo Dinámica con next/image optimizada por GPU */}
        <motion.div
          key={currentCategory.id}
          style={{
            scale: bgScale,
            opacity: bgOpacity,
          }}
          className="absolute inset-0 h-full w-full transition-opacity duration-1000 ease-out"
        >
          <Image
            src={bgUrl}
            alt="TCG Premium Atmosphere"
            fill
            priority={true}
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Gradientes de Fusión Atmosférica y Neblinas de Luz */}
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/75 to-neutral-950" />
        <motion.div 
          className="absolute inset-0 opacity-25 blur-[120px] transition-colors duration-1000"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${currentCategory.accentColor} 0%, transparent 60%)`
          }}
        />
        {/* Patrón de Rejilla de Malla Dorada Premium y Sutil */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(rgba(217, 165, 11, 0.15) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      {/* ========================================================
          NAVBAR FLOTANTE GILDED (Glassmorphism de Alta Costura)
          ======================================================== */}
      <nav className="fixed top-5 left-4 right-4 z-[60] flex items-center justify-between gap-4 px-6 py-4 rounded-[1.8rem] border bg-neutral-950/40 shadow-[0_20px_60px_rgba(0,0,0,0.9)] backdrop-blur-2xl transition-all duration-500"
        style={{
          borderColor: 'rgba(255, 255, 255, 0.08)',
          boxShadow: `0 20px 60px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.05)`
        }}
      >
        {/* Identificador izquierdo */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div 
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 transition-all duration-500 group-hover:scale-105"
            style={{ 
              borderColor: 'rgba(217, 165, 11, 0.25)',
              boxShadow: `0 0 15px rgba(217, 165, 11, 0.1)` 
            }}
          >
            <Award className="h-5 w-5 text-yellow-500/90" />
          </div>
          <span className="font-sans text-sm font-semibold uppercase tracking-[0.25em] text-white group-hover:text-neutral-300 transition-colors">
            nexus <span className="text-yellow-500/90 font-light">collector</span>
          </span>
        </div>

        {/* Links Centrales Premium */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/5 rounded-full px-2 py-1.5 backdrop-blur-md">
          <button 
            type="button"
            onClick={() => handleNavigate('features')}
            className="text-neutral-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full cursor-pointer"
          >
            garantía
          </button>
          <button 
            type="button"
            onClick={() => handleNavigate('coleccion')}
            className="text-neutral-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full cursor-pointer"
          >
            colecciones
          </button>
          <button 
            type="button"
            onClick={() => handleNavigate('ofertas')}
            className="text-neutral-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full cursor-pointer"
          >
            beneficios
          </button>
          <button 
            type="button"
            onClick={() => handleNavigate('tienda')}
            className="text-neutral-300 hover:text-white transition-colors text-xs font-semibold uppercase tracking-wider px-5 py-2 rounded-full cursor-pointer"
          >
            vitrina
          </button>
        </div>

        {/* Botón CTA Derecho */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => handleNavigate('explorar')}
            className="hidden sm:inline-flex rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 text-neutral-950 text-xs font-bold uppercase tracking-widest px-6 py-3.5 hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_15px_rgba(217,165,11,0.25)] cursor-pointer"
          >
            ingresar al salón
          </button>

          {/* Menú Móvil */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden h-10 w-10 items-center justify-center rounded-full bg-neutral-900/60 border border-white/10 text-white cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <span className="text-[10px] font-bold uppercase">menu</span>}
          </button>
        </div>
      </nav>

      {/* Menú Desplegable Móvil Premium */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 left-4 right-4 z-[55] flex flex-col gap-2 rounded-3xl border bg-neutral-950/95 p-6 shadow-2xl backdrop-blur-3xl md:hidden"
            style={{ borderColor: 'rgba(217, 165, 11, 0.2)' }}
          >
            <button 
              type="button"
              onClick={() => handleNavigate('features')}
              className="w-full text-left py-3 border-b border-white/5 text-neutral-300 font-sans text-xs uppercase tracking-widest"
            >
              garantías de autenticidad
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('coleccion')}
              className="w-full text-left py-3 border-b border-white/5 text-neutral-300 font-sans text-xs uppercase tracking-widest"
            >
              salón de cartas
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('ofertas')}
              className="w-full text-left py-3 border-b border-white/5 text-neutral-300 font-sans text-xs uppercase tracking-widest"
            >
              descuentos coleccionista
            </button>
            <button 
              type="button"
              onClick={() => handleNavigate('tienda')}
              className="w-full text-left py-3 text-neutral-300 font-sans text-xs uppercase tracking-widest"
            >
              vitrina comercial
            </button>
            
            <button 
              type="button"
              onClick={() => handleNavigate('explorar')}
              className="w-full rounded-2xl bg-yellow-500 text-neutral-950 font-bold uppercase tracking-wider text-center py-3 text-xs mt-3 shadow-lg"
            >
              ingresar al salón
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          SECCIÓN 1: HERO (High-Fantasy Epic Presentation)
          ======================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-36 pb-16 px-6 md:px-12 z-10 bg-transparent">
        
        {/* Cabecera Clásica */}
        <div className="absolute top-28 left-6 md:left-12 flex items-center gap-2.5 font-sans text-[10px] uppercase text-neutral-400 tracking-[0.25em]">
          <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/80 animate-pulse" />
          <span>garantía certificada</span>
          <span className="text-white/20">|</span>
          <span>curaduría internacional</span>
        </div>

        {/* Tipografía Monumental Gilded */}
        <div className="flex-grow flex flex-col justify-center gap-2 max-w-7xl mx-auto w-full select-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="flex flex-col"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase opacity-75 mb-1.5" style={{ color: currentCategory.accentColor }}>
              descubre el valor de lo mítico
            </span>
            <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] font-extrabold lowercase leading-none tracking-tighter text-white drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              colecciona
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-end md:mr-20"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase opacity-75 mb-1.5 text-yellow-500/80">
              adquiere piezas arcanas
            </span>
            <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] font-light lowercase leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-500 drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              intercambia
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-col items-center md:items-start md:pl-[12%]"
          >
            <span className="text-xs font-semibold tracking-[0.3em] uppercase opacity-75 mb-1.5 text-neutral-400">
              domina la mesa de combate
            </span>
            <h1 className="text-[10vw] sm:text-[9vw] md:text-[8vw] font-extrabold lowercase leading-none tracking-tighter drop-shadow-[0_15px_50px_rgba(0,0,0,0.95)]"
              style={{
                color: currentCategory.accentColor,
                textShadow: `0 0 50px ${currentCategory.accentColor}30`
              }}
            >
              combate
            </h1>
          </motion.div>

          {/* Gran Botón de Acción Principal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col items-center justify-center mt-12 gap-4"
          >
            <button
              type="button"
              onClick={() => handleNavigate('tienda')}
              className="group relative flex items-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.25em] text-neutral-950 transition-all hover:scale-[1.03] active:scale-95 cursor-pointer overflow-hidden shadow-2xl"
              style={{
                backgroundColor: currentCategory.accentColor,
                backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 100%)`,
                boxShadow: `0 20px 50px ${currentCategory.accentColor}35, inset 0 1px 1px rgba(255,255,255,0.4)`
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                ver vitrina de reliquias <Sparkles className="h-4 w-4 text-neutral-950 animate-pulse" />
              </span>
            </button>
            
            <button
              type="button"
              onClick={() => handleNavigate('features')}
              className="flex items-center gap-2 text-[10px] text-neutral-400 uppercase tracking-widest hover:text-white transition-colors cursor-pointer"
            >
              garantías de la casa <ChevronDown className="h-4 w-4 animate-bounce text-yellow-500/80" />
            </button>
          </motion.div>
        </div>

        {/* Bloques de Estadísticas (Acrílicos protectores de datos) */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-2 gap-4 md:flex md:items-center md:justify-between border-t border-white/10 pt-8 mt-10">
          <div className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900/35 backdrop-blur-md px-6 py-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition duration-500 hover:border-white/20">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">+1.5M</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mt-1">piezas indexadas</span>
          </div>

          <div className="flex flex-col rounded-2xl border border-white/10 bg-neutral-900/35 backdrop-blur-md px-6 py-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition duration-500 hover:border-white/20">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">Grado 10</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mt-1">inspección garantizada</span>
          </div>

          <div className="flex flex-col col-span-2 md:col-span-1 rounded-2xl border border-white/10 bg-neutral-900/35 backdrop-blur-md px-6 py-4 shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition duration-500 hover:border-white/20 text-center md:text-left">
            <span className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: currentCategory.accentColor }}>Curaduría</span>
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-widest mt-1">del más alto nivel</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECCIÓN 2: FEATURES/LORE (Acrylic Protectors & Gilded badging)
          ======================================================== */}
      <section 
        id="features" 
        className="relative z-10 px-6 py-28 md:px-12 bg-neutral-950/25 backdrop-blur-xl border-y border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
      >
        <div className="mx-auto max-w-7xl">
          {/* Header de Sección */}
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span 
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase font-bold tracking-[0.25em]"
              style={{ 
                color: currentCategory.accentColor,
                borderColor: 'rgba(217, 165, 11, 0.25)',
                backgroundColor: 'rgba(217, 165, 11, 0.04)'
              }}
            >
              <Compass className="h-3.5 w-3.5" />
              Sello del Coleccionista
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl lowercase leading-none text-white">
              estándar de excelencia en <span className="text-yellow-500/90 font-light">nexus</span>
            </h2>
            <p className="text-xs text-neutral-400 font-sans tracking-wide">
              Cada adquisición se entrega bajo estrictos protocolos de protección de grado de coleccionista.
            </p>
          </div>

          {/* Grid de Beneficios Premium (Acrílicos protectores de cartas reales) */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1: Grado Certificado */}
            <div className="group relative rounded-[2rem] border border-white/10 bg-neutral-950/30 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:bg-neutral-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.03)]">
              <div 
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{
                  background: `radial-gradient(circle at top left, ${currentCategory.accentColor}06, transparent 65%)`
                }}
              />
              <div 
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border text-white transition-all duration-500 group-hover:scale-105"
                style={{
                  borderColor: 'rgba(217,165,11,0.25)',
                  color: 'rgba(217,165,11,0.9)',
                  boxShadow: `0 0 15px rgba(217,165,11,0.1)`
                }}
              >
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">grados de gracia 10</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Evaluación física rigurosa y encapsulado de seguridad hermético para preservar la perfecta conservación y el valor histórico de cada pieza.
              </p>
              <div className="mt-5 text-[9px] text-yellow-500/80 uppercase tracking-widest font-semibold">// Inspección de Calidad de Grado 10</div>
            </div>

            {/* Card 2: Logística Custodiada */}
            <div className="group relative rounded-[2rem] border border-white/10 bg-neutral-950/30 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:bg-neutral-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.03)]">
              <div 
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{
                  background: `radial-gradient(circle at top left, ${currentCategory.accentColor}06, transparent 65%)`
                }}
              />
              <div 
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border text-white transition-all duration-500 group-hover:scale-105"
                style={{
                  borderColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                  boxShadow: `0 0 15px rgba(255,255,255,0.05)`
                }}
              >
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">logística custodiada</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Envío asegurado en cajas rígidas herméticas con tracking de alta precisión a nivel nacional, garantizando que tu reliquia arribe sin rasguños.
              </p>
              <div className="mt-5 text-[9px] text-neutral-400 uppercase tracking-widest font-semibold">// Despacho Inmediato Protegido</div>
            </div>

            {/* Card 3: Autenticidad Absoluta */}
            <div className="group relative rounded-[2rem] border border-white/10 bg-neutral-950/30 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-yellow-500/30 hover:bg-neutral-950/60 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.03)]">
              <div 
                className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" 
                style={{
                  background: `radial-gradient(circle at top left, ${currentCategory.accentColor}06, transparent 65%)`
                }}
              />
              <div 
                className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border text-white transition-all duration-500 group-hover:scale-105"
                style={{
                  borderColor: 'rgba(217,165,11,0.25)',
                  color: 'rgba(217,165,11,0.9)',
                  boxShadow: `0 0 15px rgba(217,165,11,0.1)`
                }}
              >
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3 tracking-wide">autenticidad absoluta</h3>
              <p className="text-xs leading-relaxed text-neutral-400">
                Inspección experta directa para garantizar piezas 100% legítimas libres de adulteración, reempaquetados o falsificaciones del mercado.
              </p>
              <div className="mt-5 text-[9px] text-yellow-500/80 uppercase tracking-widest font-semibold">// Garantía de Autenticidad Perpetua</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECCIÓN 3: VITRINA COMERCIAL (Crystal Glassmorphism Grid)
          ======================================================== */}
      <section 
        id="tienda" 
        className="relative z-10 px-6 py-28 md:px-12 bg-neutral-950/20 backdrop-blur-md min-h-screen"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 0%, ${currentCategory.accentColor}08, transparent 60%)`,
          transition: 'all 1s ease'
        }}
      >
        <div className="mx-auto max-w-7xl space-y-16">
          
          {/* Panel de Control de Vitrina */}
          <div className="flex flex-col gap-8 rounded-[2.5rem] border border-white/10 bg-neutral-950/40 p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.03)] backdrop-blur-2xl"
            style={{
              borderColor: 'rgba(255,255,255,0.08)'
            }}
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              
              {/* Información de la Categoría */}
              <div className="space-y-4 max-w-2xl">
                <span 
                  className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[10px] uppercase font-bold tracking-[0.25em] transition duration-500"
                  style={{ 
                    color: currentCategory.accentColor,
                    borderColor: `${currentCategory.accentColor}25`,
                    backgroundColor: `${currentCategory.accentColor}05`
                  }}
                >
                  <Sparkles className="h-3 w-3 text-yellow-500/80" />
                  Salón {currentCategory.name}
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lowercase leading-none">
                  universo <span className="font-light italic" style={{ color: currentCategory.accentColor, transition: 'color 1s ease' }}>{currentCategory.name}</span>
                </h2>
                <p className="text-xs leading-relaxed text-neutral-400">
                  {currentCategory.description} Explora nuestra refinada selección de piezas con valores actualizados en moneda nacional.
                </p>
              </div>

              {/* Selector de Categorías (Píldoras Gilded) - Desplazable horizontalmente en móviles */}
              <div className="overflow-x-auto max-w-full pb-1 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <div className="flex sm:flex-wrap gap-2.5 rounded-2xl bg-neutral-950/60 p-2 border border-white/5 shadow-inner min-w-max sm:min-w-0">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => changeCategory(category.id)}
                      className="relative rounded-xl px-5 py-3 text-[11px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer select-none"
                      style={{
                        backgroundColor: currentCategory.id === category.id ? category.accentColor : 'transparent',
                        color: currentCategory.id === category.id ? '#0a0a0a' : 'rgba(255,255,255,0.65)',
                        boxShadow: currentCategory.id === category.id ? `0 4px 20px ${category.accentColor}30` : 'none',
                        fontWeight: currentCategory.id === category.id ? '800' : '500'
                      }}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selector de Subsecciones */}
            <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              <div className="flex min-w-max gap-3 rounded-2xl bg-neutral-900/20 p-2 border border-white/5 backdrop-blur-md">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    type="button"
                    onClick={() => changeSection(section.id)}
                    className="min-w-[125px] rounded-xl py-3.5 text-[10px] font-sans font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer border border-transparent"
                    style={{
                      backgroundColor: currentSection?.id === section.id ? 'rgba(255,255,255,0.06)' : 'transparent',
                      color: currentSection?.id === section.id ? '#ffffff' : 'rgba(255,255,255,0.45)',
                      borderColor: currentSection?.id === section.id ? 'rgba(255,255,255,0.1)' : 'transparent'
                    }}
                  >
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid de Productos Premium */}
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
                  onView={() => {
                    setSelectedProduct(product);
                    setViewerOpen(true);
                  }} 
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================
          CARRITO FLOTANTE PREMIUM GILDED
          ======================================================== */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setCheckoutOpen(true)}
          className="relative flex items-center gap-3 rounded-full border bg-neutral-950/80 px-6 py-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.9)] backdrop-blur-xl transition hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            borderColor: 'rgba(255,255,255,0.1)',
            boxShadow: `0 20px 50px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.05), 0 0 20px ${currentCategory.accentColor}20`
          }}
        >
          <ShoppingCart className="h-5 w-5" style={{ color: currentCategory.accentColor }} />
          <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">mi cofre</span>
          {cartCount > 0 && (
            <span 
              className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-neutral-950 shadow-md animate-pulse"
              style={{ backgroundColor: currentCategory.accentColor }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* ========================================================
          MODALES DE SISTEMA PREMIUM GILDED
          ======================================================= */}
      
      {/* Modal de Ofertas Premium */}
      <AnimatePresence>
        {offersOpen && (
          <motion.div 
            className="fixed inset-0 z-[70] overflow-y-auto bg-neutral-950/90" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-md">
              <motion.div 
                className="relative w-full max-w-lg rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-neutral-950/95 p-6 md:p-8 shadow-2xl text-center" 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }} 
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  borderColor: 'rgba(217, 165, 11, 0.25)',
                  boxShadow: `0 30px 100px rgba(0,0,0,0.9), 0 0 35px ${currentCategory.accentColor}10`
                }}
              >
                <button 
                  type="button" 
                  onClick={() => setOffersOpen(false)} 
                  className="absolute right-6 top-6 rounded-full bg-white/5 border border-white/10 p-3 text-white transition hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div 
                  className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900 border text-white" 
                  style={{ 
                    color: currentCategory.accentColor, 
                    borderColor: 'rgba(217, 165, 11, 0.25)' 
                  }}
                >
                  <Percent className="h-6 w-6 text-yellow-500" />
                </div>

                <h2 className="text-2xl font-extrabold tracking-tight lowercase text-white">cédula de cortesía</h2>
                
                <div className="mt-6 rounded-3xl border border-white/5 bg-white/5 p-6 space-y-4">
                  <p className="text-xs leading-relaxed text-neutral-300">
                    Desbloquea el valor de la vitrina. Aplica este código exclusivo de cortesía de la casa para descontar un **20%** en tus adquisiciones.
                  </p>

                  <div 
                    className="rounded-2xl border py-4 text-2xl font-sans font-bold tracking-[0.25em] select-text text-neutral-950 cursor-pointer"
                    style={{
                      backgroundColor: currentCategory.accentColor,
                      borderColor: currentCategory.accentColor,
                      boxShadow: `0 0 15px ${currentCategory.accentColor}20`
                    }}
                  >
                    NEXUS20
                  </div>

                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-sans font-medium">
                    Válido en todo el Salón Nexus
                  </p>
                </div>

                <button 
                  type="button" 
                  onClick={() => setOffersOpen(false)} 
                  className="mt-6 w-full rounded-2xl border border-white/10 bg-white/5 py-4 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-white/10 cursor-pointer"
                >
                  cerrar cédula
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Finalización de Compra (Checkout) */}
      <AnimatePresence>
        {checkoutOpen && (
          <motion.div 
            className="fixed inset-0 z-[70] overflow-y-auto bg-neutral-950/90" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <div className="flex min-h-full items-center justify-center p-4 backdrop-blur-md">
              <motion.div 
                className="relative w-full max-w-2xl rounded-3xl md:rounded-[2.5rem] border border-white/10 bg-neutral-950/95 p-6 md:p-10 shadow-2xl" 
                initial={{ scale: 0.95, opacity: 0 }} 
                animate={{ scale: 1, opacity: 1 }} 
                exit={{ scale: 0.95, opacity: 0 }} 
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}
              >
                <button 
                  type="button" 
                  onClick={() => setCheckoutOpen(false)} 
                  className="absolute right-6 top-6 rounded-full bg-white/5 border border-white/10 p-3 text-white transition hover:bg-white/10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight lowercase text-white">adquirir lote</h2>
                    <p className="mt-1.5 text-xs text-neutral-400 font-sans font-medium">resumen de piezas arcanas seleccionadas</p>
                  </div>
                  <span 
                    className="inline-flex rounded-2xl border px-5 py-3 text-sm font-sans font-bold tracking-wider"
                    style={{
                      borderColor: 'rgba(217, 165, 11, 0.25)',
                      color: 'rgba(217, 165, 11, 0.9)',
                      backgroundColor: 'rgba(217, 165, 11, 0.02)'
                    }}
                  >
                    total: {cartTotal} Bs.
                  </span>
                </div>

                {purchaseComplete ? (
                  <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 animate-pulse">
                      <CreditCard className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold lowercase text-white">adquisición completada</h3>
                    <p className="text-xs leading-relaxed text-neutral-400 max-w-md mx-auto">
                      Tu orden de adquisición en Bolivianos (Bs.) ha sido procesada correctamente en modalidad de simulación. Tu lote ha sido resguardado.
                    </p>
                    <button 
                      type="button" 
                      onClick={() => { setPurchaseComplete(false); setCheckoutOpen(false); }} 
                      className="rounded-2xl bg-white text-neutral-950 px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition hover:bg-neutral-200"
                    >
                      volver al salón
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {/* Lista de Artículos */}
                    <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
                      {cartItems.length ? cartItems.map((item) => (
                        <div key={item.id} className="rounded-2xl border border-white/5 bg-white/5 p-4 flex items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-white lowercase">{item.name}</p>
                            <p className="text-[10px] text-neutral-400 mt-1 font-sans">
                              {item.quantity} unidades × {item.precioVenta} Bs.
                            </p>
                          </div>
                          <p className="text-sm font-bold text-white">
                            {(item.quantity * item.precioVenta).toFixed(2)} Bs.
                          </p>
                        </div>
                      )) : (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-neutral-900/40 p-8 text-center text-xs text-neutral-500 font-sans">
                          No hay piezas resguardadas en tu cofre actualmente.
                        </div>
                      )}
                    </div>

                    {/* Botón de Pago */}
                    {cartItems.length > 0 && (
                      <button 
                        type="button" 
                        onClick={() => setPurchaseComplete(true)} 
                        className="w-full rounded-2xl py-4 text-xs font-bold uppercase tracking-widest text-neutral-950 transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer"
                        style={{
                          backgroundColor: currentCategory.accentColor,
                          boxShadow: `0 0 20px ${currentCategory.accentColor}25`
                        }}
                      >
                        adquirir lote completo
                      </button>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visor 3D de Productos de Alta Inmersión TCG Pocket */}
      <ProductViewerModal
        isOpen={viewerOpen}
        onClose={() => setViewerOpen(false)}
        product={selectedProduct}
        accentColor={currentCategory.accentColor}
        onAdd={() => addToCart(selectedProduct)}
      />
    </div>
  );
};

export default LandingView;
