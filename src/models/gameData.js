
export const categories = [
  {
    id: 'pokemon',
    name: 'Pokémon',
    backgroundUrl: 'https://wallpapers.com/images/hd/gengar-pictures-cklwpeqgoc8065xy.jpg',
    description: 'Cartas electrizantes y coleccionables para tu mazo competitivo.',
    accentColor: '#22d3ee',
    sections: [
      { id: 'cards', name: 'Cartas' },
      { id: 'trainer-box', name: 'Trainer Box' },
      { id: 'booster', name: 'Sobres' },
      { id: 'decks', name: 'Mazos' }
    ]
  },
  {
    id: 'dnd',
    name: 'D&D',
    backgroundUrl: 'https://techcrunch.com/wp-content/uploads/2023/01/DND_Art7.jpg',
    description: 'Aventuras épicas y accesorios para tus campañas de fantasía.',
    accentColor: '#a855f7',
    sections: [
      { id: 'books', name: 'Manuales' },
      { id: 'dice', name: 'Dados' },
      { id: 'sets', name: 'Sets' }
    ]
  },
  {
    id: 'magic',
    name: 'Magic',
    backgroundUrl: 'https://wallpapers.com/images/hd/magic-the-gathering-background-8mnyep0j0z5gh19q.jpg',
    description: 'Hechizos, criaturas y mazos arcanos de alto poder.',
    accentColor: '#f472b6',
    sections: [
      { id: 'decks', name: 'Mazos' },
      { id: 'boosters', name: 'Boosters' },
      { id: 'accessories', name: 'Accesorios' }
    ]
  },
  {
    id: 'yugioh',
    name: 'Yu-Gi-Oh!',
    backgroundUrl: 'https://wallpapers.com/images/high/yugioh-dark-magician-k0rozqigh5dlh7tx.webp',
    description: 'Duelos intensos y cartas míticas para el duelo definitivo.',
    accentColor: '#8A2BE2',
    sections: [
      { id: 'cards', name: 'Cartas' },
      { id: 'trainer-box', name: 'Deck Box' },
      { id: 'booster', name: 'Sobres' },
      { id: 'decks', name: 'Mazos' }
    ]
  },
  {
    id: 'warhammer',
    name: 'Warhammer 40K',
    backgroundUrl: 'https://www.gamewallpapers.com/wallpapers_slechte_compressie/01wallpapers/wallpaper_warhammer_40000_01_1920x1080.jpg',
    description: 'Miniaturas, campañas y todo el hobby del universo 40K.',
    accentColor: '#D9A50B',
    sections: [
      { id: 'games', name: 'Juegos' },
      { id: 'miniatures', name: 'Miniaturas' },
      { id: 'paints', name: 'Pinturas' },
      { id: 'accessories', name: 'Accesorios' }
    ]
  }
];

export const products = [
  // Pokémon
  { id: 'p-01', category: 'pokemon', section: 'cards', type: 'card', isFoil: true, rarity: 'Ilustración Especial Rara', name: 'Charizard VMAX', description: 'Carta holográfica legendaria con brillo extremo y diseño prismático.', baseCost: 100, image: 'https://images.pokemontcg.io/swsh4/25_hires.png' },
  { id: 'p-02', category: 'pokemon', section: 'cards', type: 'card', isFoil: true, rarity: 'Secreta Rara', name: 'Mewtwo VMAX Full Holo', description: 'Carta holo completa con brillo intenso y textura táctil de colección.', baseCost: 85, image: 'https://i.etsystatic.com/22089514/r/il/a0aabd/6603356717/il_1588xN.6603356717_gtfa.jpg' },
  { id: 'p-03', category: 'pokemon', section: 'trainer-box', type: 'accessory', isFoil: false, rarity: 'Colección Limitada', name: 'Elite Trainer Box', description: 'Caja premium con sobres, protectores acrílicos y guías exclusivas.', baseCost: 85, image: 'https://m.media-amazon.com/images/I/81zpFkr9I4L._AC_UF894,1000_QL80_.jpg' },
  { id: 'p-04', category: 'pokemon', section: 'booster', type: 'accessory', isFoil: false, rarity: 'Sobre Cerrado', name: 'Sobre Scarlet & Violet', description: 'Sobre sellado original con cartas seleccionadas de la última expansión.', baseCost: 12, image: 'https://www.hobbyshop.mx/cdn/shop/files/pokemon-tcg-scarlet-violet-sobre-con-10-cartas-ingles-en-existencia-381.jpg' },

  // D&D
  { id: 'd-01', category: 'dnd', section: 'books', type: 'accessory', isFoil: false, rarity: 'Tomo de Colección', name: 'Manual del Dungeon Master', description: 'Guía oficial empastada en cuero y oro con mapas detallados de campaña.', baseCost: 150, image: 'https://m.media-amazon.com/images/I/81MC3I+iVDL._SL1500_.jpg' },
  { id: 'd-02', category: 'dnd', section: 'dice', type: 'accessory', isFoil: false, rarity: 'Reliquia Mítica', name: 'Set de Dados Metálicos', description: 'Dados de fundición de zinc con cantos dorados y estuche de exhibición.', baseCost: 68, image: 'https://tcgfactory.com/97773-thickbox_default/set-dados-metal-dnd-bandeja-2en1-edicion-coleccionista-purpura-enhance-gaming.jpg' },
  { id: 'd-03', category: 'dnd', section: 'sets', type: 'accessory', isFoil: false, rarity: 'Set Ancestral', name: 'Kit de Aventurero', description: 'Kit de inicio completo con fichas grabadas y pergamino de mapas.', baseCost: 42, image: 'https://m.media-amazon.com/images/I/61lqaVLm9BL._AC_SL1500_.jpg' },

  // Magic
  { id: 'm-01', category: 'magic', section: 'decks', type: 'accessory', isFoil: false, rarity: 'Mazo Mitológico', name: 'Mazo Planeswalker', description: 'Mazo listo para juego de alto rango competitivo con caja protectora.', baseCost: 132, image: 'https://www.magicbarcelona.net/wp-content/uploads/2020/06/M21_PW_Decks.png' },
  { id: 'm-02', category: 'magic', section: 'boosters', type: 'accessory', isFoil: false, rarity: 'Sobre Coleccionista', name: 'Booster de Expedición', description: 'Sobre con artes extendidos y cartas raras de la edición Arcana.', baseCost: 55, image: 'https://media.wizards.com/2020/znrproduct/en_znr_setbooster.png' },
  { id: 'm-03', category: 'magic', section: 'accessories', type: 'accessory', isFoil: false, rarity: 'Edición Especial', name: 'Fundas de Neón', description: 'Protectores acrílicos flexibles con reverso ilustrado en lámina de plata.', baseCost: 28, image: 'https://i.etsystatic.com/51330170/r/il/a8b998/7202882475/il_1588xN.7202882475_8cs2.jpg' },

  // Yu-Gi-Oh!
  { id: 'y-01', category: 'yugioh', section: 'cards', type: 'card', isFoil: true, rarity: 'Leyenda del Duelo', name: 'Blue-Eyes White Dragon', description: 'Carta holográfica legendaria del dragón blanco de ojos azules.', baseCost: 85, image: 'https://images.ygoprodeck.com/images/cards/89631139.jpg' },
  { id: 'y-02', category: 'yugioh', section: 'cards', type: 'card', isFoil: true, rarity: 'Ilustración Alternativa', name: 'Dark Magician Girl Holo', description: 'Maga oscura en edición foil de brillo celestial y marco dorado.', baseCost: 70, image: 'https://images.ygoprodeck.com/images/cards/38033121.jpg' },
  { id: 'y-03', category: 'yugioh', section: 'cards', type: 'card', isFoil: true, rarity: 'Mítica Sagrada', name: 'Magician of Black Chaos', description: 'Carta de duelista profesional con texturas cromadas de alto contraste.', baseCost: 62, image: 'https://static.wikia.nocookie.net/yugiohenespanol/images/9/96/Foto_mago_del_caos_negro.jpg/revision/latest/scale-to-width-down/536?cb=20250301132011&path-prefix=es' },
  { id: 'y-04', category: 'yugioh', section: 'trainer-box', type: 'accessory', isFoil: false, rarity: 'Cofre Coleccionista', name: 'Legendary Duelist Box', description: 'Caja metálica ilustrada con accesorios, cartas foil y dados especiales.', baseCost: 80, image: 'https://static.wikia.nocookie.net/yugioh/images/e/e7/LEDU-BoosterEN.png/revision/latest?cb=20170513151911' },
  { id: 'y-05', category: 'yugioh', section: 'booster', type: 'accessory', isFoil: false, rarity: 'Sobre Sellado', name: 'Sobre Phantom Rage', description: 'Sobre de cartas seleccionadas de la saga de duelo eterno.', baseCost: 5.5, image: 'https://static.wikia.nocookie.net/yugiohenespanol/images/f/fe/Cover_sobre_de_expansi%C3%B3n_ira_fantasma.jpg/revision/latest?cb=20210427235020&path-prefix=es' },
  { id: 'y-06', category: 'yugioh', section: 'decks', type: 'accessory', isFoil: false, rarity: 'Mazo de Inicio', name: 'Starter Deck', description: 'Mazo de inicio completo de 40 cartas de colección y guía de juego.', baseCost: 34, image: 'https://www.yugioh-card.com/en/wp-content/uploads/2023/07/2-Player_Starter_550.png' },

  // Warhammer
  { id: 'w-01', category: 'warhammer', section: 'games', type: 'accessory', isFoil: false, rarity: 'Edición de Lujo', name: 'Kill Team Core', description: 'Caja básica completa con reglamentos e ilustraciones de alta fantasía militar.', baseCost: 79, image: 'https://www.hangar019.cl/16338-large_default/kill-team-core-manual-espanol-citadel.jpg' },
  { id: 'w-02', category: 'warhammer', section: 'miniatures', type: 'accessory', isFoil: false, rarity: 'Gema del Taller', name: 'Space Marine Intercessor', description: 'Miniaturas de resina de alta definición listas para ensamble y pintado.', baseCost: 35, image: 'https://static.wikia.nocookie.net/warhammer40k/images/0/05/UM_Primaris_Space_Marine.jpg/revision/latest?cb=20170515153610' },
  { id: 'w-03', category: 'warhammer', section: 'paints', type: 'accessory', isFoil: false, rarity: 'Material Profesional', name: 'Citadel Base Set', description: 'Set de pigmentos profesionales acrílicos de secado rápido y alto cubrimiento.', baseCost: 28, image: 'https://m.media-amazon.com/images/I/61uyvqAg0UL._AC_UL640_QL65_.jpg' },
  { id: 'w-04', category: 'warhammer', section: 'accessories', type: 'accessory', isFoil: false, rarity: 'Tapete Imperial', name: 'Tapete de Batalla 40K', description: 'Tapete de caucho natural con costuras reforzadas e ilustraciones impresas.', baseCost: 49, image: 'https://m.media-amazon.com/images/I/81qOwBHoWdL._AC_SX679_.jpg' },
  { id: 'w-05', category: 'warhammer', section: 'miniatures', type: 'accessory', isFoil: false, rarity: 'Figura Ancestral', name: 'Necron Warrior', description: 'Miniatura oficial detallada de la dinastía robótica Necrona.', baseCost: 32, image: 'https://static.wikia.nocookie.net/warhammer40k/images/d/df/Necron_Warrior.jpg/revision/latest?cb=20110928172008' },
  { id: 'w-06', category: 'warhammer', section: 'games', type: 'accessory', isFoil: false, rarity: 'Caja Definitiva', name: 'Blackstone Fortress', description: 'Caja coleccionista de aventuras de mesa épicas con miniaturas exclusivas.', baseCost: 89, image: 'https://preview.redd.it/warhammer-quest-blackstone-fortress-v0-fiijhzbid7ee1.jpg?width=979&format=pjpg&auto=webp&s=ad9e64f3325bb9f7e5e38d3ea20376871e2b078c' }
];
