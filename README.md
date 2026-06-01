# TCG Store

Este proyecto es una tienda web de cartas coleccionables (TCG) construida con **Next.js**, **React** y **Tailwind CSS**. La aplicación tiene un estilo oscuro, ciberpunk y neon con efectos de glassmorphism y una experiencia inmersiva para presentar categorías, secciones, productos y precios en bolivianos.

## Qué es la página

La página funciona como una tienda de cartas y accesorios de juegos de mesa y TCG, con categorías como:

- Pokémon
- Dungeons & Dragons
- Magic the Gathering
- Yu-Gi-Oh!
- Warhammer

El diseño muestra un `Hero` llamativo con fondo dinámico y texto grande estilo neon, seguido por una tienda con selección de categorías, secciones scrollables y un catálogo de productos estilizado en tarjetas 3D.

## Funcionalidades principales

- Navegación por categorías de productos
- Filtro por secciones dentro de cada categoría
- Carrito de compras con conteo de artículos
- Cálculo automático de precio de venta en Bs. con +20% de ganancia
- Estilo inmersivo con fondo visible, blur y efectos neon
- Modal de checkout para revisar el carrito y completar la compra

## Qué se modificó

### `src/components/HeroSecurify.jsx`

- Se cambió el hero original tipo SaaS por un hero orientado a tienda TCG.
- Se agregó un overlay de fondo oscuro y gradientes radiales para mayor ambientación.
- Se ajustó el contenido para mostrar un mensaje de tienda neon y métricas estilizadas.
- Se renombró de `.tsx` a `.jsx` y se removió la tipificación TypeScript para que funcione con la configuración JS del proyecto.

### `src/views/StoreView.jsx`

- Se mejoró el layout del storefront, enfocando el contenido en la tienda.
- Se cambió la sección de navegación de secciones a una barra horizontal scrollable.
- Se eliminaron los elementos tipo footer que daban apariencia de resumen poco estética.
- Se agregó un panel principal con borde, blur y descripción de la tienda.
- Se mantuvo la lógica de carrito, categorías, secciones y productos.

### `src/components/GameCard.jsx`

- Se rediseñaron las tarjetas de producto con un estilo más 3D y hover marcado.
- Se mejoró la presentación de imagen con sombras, degradados y un contenedor glass.
- Se conservó la información de `baseCost`, `montoLabel` y `precioVenta`.
- Se mantuvo el botón de agregar al carrito y el cálculo de ganancia.

### `tsconfig.json`

- Se añadió `"ignoreDeprecations": "6.0"` para evitar que TypeScript 7 detuviera la compilación por una advertencia de `moduleResolution=node10`.

## Estructura principal del proyecto

- `app/`
  - `layout.jsx` - Layout global de Next.js
  - `page.jsx` - Página principal que renderiza la vista de tienda
  - `globals.css` - Estilos globales
- `src/components/`
  - `HeroSecurify.jsx` - Hero principal del sitio
  - `GameCard.jsx` - Tarjeta de producto
- `src/controllers/`
  - `useStoreController.js` - Lógica de estado y controlador de tienda
- `src/models/`
  - `gameData.js` - Datos de categorías y productos
  - `ProfitCalculator.js` - Cálculo de precio final en Bs.
- `src/views/`
  - `StoreView.jsx` - Vista principal de la tienda con layout y filtros

## Cómo ejecutar

Instalar dependencias:

```bash
npm install
```

Ejecutar en modo desarrollo:

```bash
npm run dev
```

Construir para producción:

```bash
npm run build
```

Iniciar servidor de producción:

```bash
npm run start
```

## Tecnología usada

- Next.js 14
- React 18
- Tailwind CSS 3
- Framer Motion
- Lucide React

## Notas

- La tienda usa datos internos de productos y no está conectada a una base de datos externa.
- El cálculo de precio final aplica un margen de ganancia del 20% y formatea el valor en bolivianos.
- El estilo busca ser visualmente atractivo con efectos de neón, vidrio y profundidad.
