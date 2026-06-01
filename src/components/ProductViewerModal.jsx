'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Award } from 'lucide-react';
import Image from 'next/image';

const ProductViewerModal = ({ isOpen, onClose, product, accentColor = '#22d3ee', onAdd }) => {
  // Bloquear el scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Motion values para el seguimiento del cursor
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuración de resortes (Physics Engine para efecto TCG Pocket)
  const springConfig = { stiffness: 120, damping: 18, mass: 0.8 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);

  // Efecto de brillo de refracción metálica (Holografía Foil)
  const foilBg = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(255, 255, 255, 0.35) 0%, rgba(217, 165, 11, 0.15) 20%, rgba(138, 43, 226, 0.18) 40%, rgba(0, 255, 255, 0.15) 60%, transparent 80%)`
  );

  if (!isOpen || !product) return null;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalizar coordenadas en el rango [-0.5, 0.5]
    const x = (clientX / width) - 0.5;
    const y = (clientY / height) - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Retornar suavemente al punto cero
    mouseX.set(0);
    mouseY.set(0);
  };

  // Consumir directamente la URL externa proporcionada en el modelo
  const imageSrc = product.image || `/assets/cartas/${product.id}.png`;

  return (
    <AnimatePresence>
      {/* Fondo oscuro: Reducimos el desenfoque anidado pesado de backdrop-blur-2xl a backdrop-blur-md y aumentamos opacidad bg-black/90 para ahorrar GPU en Firefox */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10 overflow-y-auto bg-black/90 backdrop-blur-md">
        
        {/* Fondo oscuro cerrable */}
        <div 
          onClick={onClose} 
          className="absolute inset-0 z-0 cursor-zoom-out"
        />

        {/* Botón flotante superior de cierre dorado */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-50 rounded-full border border-white/10 bg-neutral-900/60 p-3.5 text-neutral-300 hover:text-white hover:border-yellow-500/40 transition-colors shadow-lg cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Contenedor del Modal Premium Gilded
            Optimización: Removemos el costoso backdrop-blur-xl redundante porque ya está encima de una capa opaca/borrosa.
            Esto previene que Firefox dibuje doble pasada de desenfoque de píxeles superpuestos. */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl rounded-[3rem] border border-white/10 bg-neutral-950/95 shadow-2xl overflow-hidden p-6 md:p-10 grid gap-8 lg:grid-cols-12"
          style={{
            borderColor: 'rgba(255, 255, 255, 0.08)',
            boxShadow: `0 35px 80px rgba(0,0,0,0.95), inset 0 1px 1px rgba(255,255,255,0.05), 0 0 40px ${accentColor}10`
          }}
        >
          
          {/* ========================================================
              COLUMNA IZQUIERDA: VISOR INTERACTIVO 3D TCG POCKET
              ======================================================== */}
          <div className="lg:col-span-6 flex items-center justify-center min-h-[350px] md:min-h-[500px]">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[320px] aspect-[2.5/3.5] rounded-3xl cursor-grab active:cursor-grabbing select-none"
              style={{
                transformStyle: 'preserve-3d',
                perspective: 1200,
                rotateX: rotateX,
                rotateY: rotateY,
                boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.85)`,
                willChange: 'transform'
              }}
            >
              
              {/* Estuche protector acrílico imantado premium */}
              <div className="absolute inset-0 rounded-[1.8rem] border border-white/15 bg-neutral-950/30 z-10 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 0 10px rgba(0,0,0,0.8)'
                }}
              />

              {/* Tornillo imantado superior decorativo */}
              <div className="absolute top-3.5 left-1/2 -translate-x-1/2 h-3.5 w-3.5 rounded-full border border-white/20 bg-neutral-800 shadow-inner z-30 flex items-center justify-center">
                <div className="h-1 w-1 rounded-full bg-yellow-500/80" />
              </div>

              {/* RENDERIZADO CONDICIONAL: Capa holográfica Foil de refracción prismática */}
              {product.isFoil && (
                <motion.div 
                  className="absolute inset-2 rounded-2xl pointer-events-none z-20 transition-opacity duration-300"
                  style={{
                    background: foilBg,
                    mixBlendMode: 'color-dodge',
                    opacity: 0.85,
                    willChange: 'background'
                  }}
                />
              )}

              {/* Brillo lineal exterior de estuche acrílico */}
              <div className="absolute inset-0 rounded-[1.8rem] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none z-20" />

              {/* Imagen del Producto en Inspección con next/image y fill */}
              <div className="absolute inset-2 overflow-hidden rounded-2xl bg-neutral-950 border border-white/5 shadow-inner">
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover"
                  priority={true} // El visor del modal es de máxima prioridad
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none z-10" />
              </div>
            </motion.div>
          </div>

          {/* ========================================================
              COLUMNA DERECHA: CARACTERÍSTICAS Y COMPRA PREMIUM
              ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6 select-text text-left">
            
            {/* Cabecera Informativa */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/5 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-neutral-400 border border-white/10">
                  {product.section.toUpperCase()}
                </span>
                
                {/* Placa Dorada de Rareza */}
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-yellow-500/10 to-yellow-600/15 border border-yellow-500/20 px-4 py-1.5 text-[9px] font-bold text-yellow-500 tracking-widest uppercase shadow-sm">
                  <Award className="h-3 w-3" />
                  {product.rarity}
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white capitalize leading-tight">
                {product.name}
              </h1>

              <p className="text-sm leading-relaxed text-neutral-300 font-light max-w-lg">
                {product.description}
              </p>
            </div>

            {/* Ficha Técnica de Coleccionista */}
            <div className="rounded-2xl border border-white/10 bg-neutral-950/50 p-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-500/90 font-sans border-b border-white/10 pb-2">
                Ficha Técnica Curatorial
              </h3>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-sans">
                <div className="text-neutral-400">Estado de Conservación:</div>
                <div className="text-white font-semibold text-right">Perfect 10 (Garantizado)</div>

                <div className="text-neutral-400">Tipo de Artículo:</div>
                <div className="text-white font-semibold text-right">
                  {product.type === 'card' ? 'Carta Holográfica Foil' : 'Accesorio de Colección'}
                </div>

                <div className="text-neutral-400">Sello de Autenticidad:</div>
                <div className="text-emerald-400 font-semibold text-right flex items-center justify-end gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Legítimo 100%
                </div>
              </div>
            </div>

            {/* REGLA ESTRICTA DE PRECIOS: Ocultar costo base, mostrar solo Precio Final en hermoso diseño comercial */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
              <div className="space-y-1">
                <span className="text-[10px] text-neutral-400 font-sans tracking-[0.15em] uppercase font-semibold">
                  Valor Coleccionista
                </span>
                <div className="text-3xl font-extrabold text-neutral-100 font-sans tracking-tight flex items-baseline gap-1">
                  {product.precioVenta.toFixed(2)}
                  <span className="text-sm font-bold text-yellow-500/80 ml-0.5">Bs.</span>
                </div>
              </div>

              {/* Botón de Adquisición Directa */}
              <button
                type="button"
                onClick={() => {
                  onAdd();
                  onClose();
                }}
                className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 text-neutral-950 text-sm font-bold uppercase tracking-widest px-8 py-4.5 hover:brightness-110 active:scale-95 transition-all shadow-[0_10px_25px_rgba(217,165,11,0.25)] cursor-pointer w-full sm:w-auto"
              >
                adquirir pieza
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProductViewerModal;
