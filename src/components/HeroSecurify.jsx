"use client"

import React from 'react'
import Image from 'next/image'

export default function HeroSecurify({ onNavigate = () => {}, accentColor = '#22d3ee' }) {
  return (
    <header className="relative h-screen w-full overflow-hidden bg-black select-none antialiased">
      {/* Fondo Dinámico TCG de Alto Impacto con next/image y fill */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/tcg_hero_bg.png"
          alt="TCG Cyberpunk Arena"
          fill
          priority={true} // Al ser el fondo principal y candidate LCP, se prioriza la carga inmediata
          sizes="100vw"
          className="object-cover opacity-50 transition-transform duration-[20000ms] ease-out scale-110"
          style={{
            animation: 'slowZoom 20s infinite alternate'
          }}
        />
        {/* Overlays para inmersión y fundido inferior */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/25 to-black" />
        <div 
          className="absolute inset-0 opacity-15 transition-opacity duration-1000" 
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor}, transparent 70%)`
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.04),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.02),_transparent_35%)]" />
      </div>

      {/* Estilos locales para animación de zoom lento */}
      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          100% { transform: scale(1.15); }
        }
        .hero-img {
          animation: slowZoom 20s infinite alternate;
        }
      `}</style>

      {/* Navbar Flotante (Glassmorphism Suave) */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 pt-6 flex items-center justify-between gap-4">
        {/* Píldora Izquierda */}
        <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md border border-white/5 rounded-full pl-4 pr-6 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <svg viewBox="0 0 256 256" className="h-5 w-5" fill="#ffffff" xmlns="http://www.w3.org/2000/svg">
            <path d="M 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 128 L 64 128 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z M 128 64 L 128 128 L 64.5 128 L 32 95 L 0 64 L 0 0 L 64 0 Z M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 128 0 L 192 0 Z" />
          </svg>
          <span className="text-white text-sm font-semibold tracking-wide lowercase">nexus tcg</span>
        </div>

        {/* Píldora Central (Oculta en móvil) */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900/80 backdrop-blur-md border border-white/5 rounded-full px-3 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <a 
            href="#coleccion" 
            onClick={(e) => { e.preventDefault(); onNavigate('coleccion'); }}
            className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full cursor-pointer font-medium lowercase"
          >
            colección
          </a>
          <a 
            href="#ediciones" 
            onClick={(e) => { e.preventDefault(); onNavigate('ediciones'); }}
            className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full cursor-pointer font-medium lowercase"
          >
            ediciones
          </a>
          <a 
            href="#ofertas" 
            onClick={(e) => { e.preventDefault(); onNavigate('ofertas'); }}
            className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full cursor-pointer font-medium lowercase"
          >
            ofertas
          </a>
          <a 
            href="#tienda" 
            onClick={(e) => { e.preventDefault(); onNavigate('tienda'); }}
            className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full cursor-pointer font-medium lowercase"
          >
            tienda
          </a>
        </div>

        {/* Botón Derecho */}
        <button 
          type="button"
          onClick={() => onNavigate('explorar')}
          className="rounded-full bg-white text-black text-sm font-semibold px-6 py-3 hover:bg-neutral-200 transition-colors shadow-lg lowercase cursor-pointer"
        >
          explorar
        </button>
      </nav>

      {/* Tipografía Gigante Escalonada en Español */}
      <div className="relative w-full h-full z-10 pointer-events-none select-none">
        {/* colecciona (arriba izquierda) */}
        <h1 className="hero-title absolute text-white font-medium text-[10vw] md:text-[11vw] left-[6%] md:left-[8%] top-[18%] lowercase leading-none tracking-tighter opacity-90 drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          colecciona
        </h1>

        {/* intercambia (centro derecha) */}
        <h1 className="hero-title absolute text-white font-medium text-[10vw] md:text-[11vw] right-[6%] md:right-[8%] top-[42%] lowercase leading-none tracking-tighter opacity-90 drop-shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
          intercambia
        </h1>

        {/* combate (abajo centro) */}
        <h1 className="hero-title absolute text-white font-medium text-[10vw] md:text-[11vw] left-1/2 -translate-x-1/2 bottom-[24%] md:bottom-[22%] lowercase leading-none tracking-tighter opacity-95 drop-shadow-[0_15px_50px_rgba(0,0,0,0.7)]">
          combate
        </h1>
      </div>

      {/* Bloques de Estadísticas (Glassmorphism suave y en Español) */}
      <div className="absolute left-6 md:left-12 bottom-12 z-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.4)] transition hover:border-white/20">
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">+1.5b</div>
        <div className="text-[10px] md:text-xs font-semibold text-white/60 uppercase tracking-widest mt-0.5">cartas coleccionadas</div>
      </div>

      <div className="absolute right-6 md:right-12 bottom-12 z-20 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-5 py-3 shadow-[0_10px_35px_rgba(0,0,0,0.4)] text-right transition hover:border-white/20">
        <div className="text-2xl md:text-3xl font-bold tracking-tight text-white">+300k</div>
        <div className="text-[10px] md:text-xs font-semibold text-white/60 uppercase tracking-widest mt-0.5">mazos vendidos</div>
      </div>
    </header>
  )
}
