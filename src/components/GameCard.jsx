"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const GameCard = ({ product, accentColor = '#22d3ee', onAdd, onView }) => {
  const [hovered, setHovered] = useState(false);
  const [coords, setCoords] = useState({ x: 0.5, y: 0.5 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  // Mapear identificadores de sección a nombres premium
  const getSectionLabel = (sec) => {
    switch (sec) {
      case 'cards': return 'Carta Única';
      case 'trainer-box': return 'Colección Especial';
      case 'booster': return 'Sobre Cerrado';
      case 'decks': return 'Mazo de Colección';
      case 'books': return 'Tomo Arcana';
      case 'dice': return 'Dados Ancestrales';
      case 'sets': return 'Set de Inicio';
      case 'boosters': return 'Boosters';
      case 'accessories': return 'Accesorios';
      case 'games': return 'Juego de Mesa';
      case 'miniatures': return 'Miniatura de Resina';
      case 'paints': return 'Pintura Acrílica';
      default: return sec;
    }
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Coordenadas normalizadas de 0 a 1
    const xPct = mouseX / width;
    const yPct = mouseY / height;
    
    // Rotaciones elegantes (máximo 8 grados para evitar distorsión exagerada)
    const rotateX = (yPct - 0.5) * -8;
    const rotateY = (xPct - 0.5) * 8;

    setCoords({ x: xPct, y: yPct });
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setRotate({ x: 0, y: 0 });
    setCoords({ x: 0.5, y: 0.5 });
  };

  // Consumir directamente la URL externa proporcionada en el modelo
  const imageSrc = product.image || `/assets/cartas/${product.id}.png`;

  return (
    <motion.article
      onClick={onView}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1200,
        rotateX: rotate.x,
        rotateY: rotate.y,
        // Mantener sombras estáticas base súper ligeras para evitar re-pintados pesados en el contenedor
        boxShadow: '0 10px 25px -10px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.03)',
        transition: 'rotateX 0.15s cubic-bezier(0.25, 1, 0.5, 1), rotateY 0.15s cubic-bezier(0.25, 1, 0.5, 1)',
        willChange: 'transform'
      }}
      // Optimización de Firefox: Usar backdrop-blur-md (más liviano) con bg-neutral-950/85 (más opaco) para reducir el procesamiento compositor de pixeles detrás de la tarjeta.
      className="relative flex flex-col h-full cursor-pointer overflow-hidden rounded-[2.2rem] border border-white/5 bg-neutral-950/85 p-5 backdrop-blur-md select-none"
    >
      {/* CAPA DE SOMBRA Y BORDE GLOW DE HOVER OPTIMIZADA:
          En lugar de transicionar box-shadow y border-color en el elemento principal (lo que fuerza repintado completo),
          animamos únicamente la OPACIDAD de este contenedor absoluto que corre 100% sobre la GPU. */}
      <div 
        className="absolute inset-0 rounded-[2.2rem] pointer-events-none z-0 transition-opacity duration-500 ease-out border border-amber-500/35"
        style={{
          boxShadow: `0 30px 60px -15px rgba(0, 0, 0, 0.9), 0 0 30px ${accentColor}20`,
          opacity: hovered ? 1 : 0,
          willChange: 'opacity'
        }}
      />

      {/* 1. Capa Holográfica Premium (Efecto Reflejo de Prisma Fino) */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background: `radial-gradient(circle at ${coords.x * 100}% ${coords.y * 100}%, rgba(255, 255, 255, 0.15) 0%, rgba(217, 165, 11, 0.08) 25%, rgba(138, 43, 226, 0.08) 50%, transparent 80%)`,
          opacity: hovered ? 0.9 : 0,
          mixBlendMode: 'overlay',
          transition: 'opacity 0.4s ease',
          willChange: 'opacity, background'
        }}
      />
      
      {/* Brillo reflectivo lineal de estuche acrílico */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-700" 
        style={{
          background: `linear-gradient(${120 + (coords.x - 0.5) * 35}deg, rgba(255, 255, 255, 0.04) 0%, transparent 50%, rgba(255, 255, 255, 0.02) 100%)`,
          opacity: hovered ? 0.8 : 0.4
        }}
      />

      {/* Halo Místico de Resplandor de Fondo */}
      <div 
        className="absolute -bottom-10 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full blur-[70px] pointer-events-none z-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(circle, ${accentColor} 0%, transparent 70%)`,
          opacity: hovered ? 0.25 : 0.1
        }}
      />

      <div className="relative z-10 flex h-full flex-col gap-4">
        {/* Cabecera de la Tarjeta */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
          <span className="text-white/50">{getSectionLabel(product.section)}</span>
          <span 
            className="rounded-full bg-white/5 px-2.5 py-1 text-[9px] tracking-wider border border-white/10 text-neutral-300 transition-colors duration-300"
            style={{
              borderColor: hovered ? 'rgba(217, 165, 11, 0.3)' : 'rgba(255,255,255,0.05)'
            }}
          >
            Edición Arcana
          </span>
        </div>

        {/* Imagen del Producto (Uso correcto del componente <Image> de Next.js con fill) */}
        <div className="relative overflow-hidden rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.6)] border border-white/5 aspect-[4/3] bg-neutral-950">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-[1000ms] ease-out"
            style={{
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              willChange: 'transform'
            }}
            priority={product.section === 'cards'} // Carga con fetchpriority alta a las cartas principales
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-85" />
        </div>

        {/* Textos Informativos */}
        <div className="space-y-1.5 mt-1 flex-grow">
          <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-300" style={{ color: hovered ? '#ffffff' : '#f5f5f7' }}>
            {product.name}
          </h3>
          <p className="text-xs leading-relaxed text-neutral-400 line-clamp-2 min-h-[2rem]">
            {product.description}
          </p>
        </div>

        {/* REGLA ESTRICTA DE PRECIOS: Ocultar costo base. Mostrar solo precio final calculado en elegante diseño Premium */}
        <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[10px] text-neutral-400 font-sans tracking-[0.15em] uppercase font-semibold">Valor Colector</span>
          <span className="text-xl font-extrabold text-neutral-100 font-sans tracking-tight flex items-baseline gap-0.5">
            {product.precioVenta.toFixed(2)}
            <span className="text-xs font-bold text-yellow-500/80 ml-0.5">Bs.</span>
          </span>
        </div>

        {/* Botón de Compra Gilded Premium */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
          className="mt-2 w-full rounded-xl py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-neutral-950 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{
            backgroundColor: accentColor,
            backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)`,
            boxShadow: hovered 
              ? `0 12px 25px -5px ${accentColor}50, inset 0 1px 1px rgba(255,255,255,0.3)` 
              : `inset 0 1px 1px rgba(255,255,255,0.2)`
          }}
        >
          adquirir pieza
        </button>
      </div>
    </motion.article>
  );
};

export default GameCard;
