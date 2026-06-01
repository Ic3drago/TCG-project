/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pokemontcg.io',
      },
      {
        protocol: 'https',
        hostname: 'i.etsystatic.com',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hobbyshop.mx',
      },
      {
        protocol: 'https',
        hostname: 'tcgfactory.com',
      },
      {
        protocol: 'https',
        hostname: 'www.magicbarcelona.net',
      },
      {
        protocol: 'https',
        hostname: 'media.wizards.com',
      },
      {
        protocol: 'https',
        hostname: 'images.ygoprodeck.com',
      },
      {
        protocol: 'https',
        hostname: 'static.wikia.nocookie.net',
      },
      {
        protocol: 'https',
        hostname: 'www.yugioh-card.com',
      },
      {
        protocol: 'https',
        hostname: 'www.hangar019.cl',
      },
      {
        protocol: 'https',
        hostname: 'preview.redd.it',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com',
      },
      {
        protocol: 'https',
        hostname: 'techcrunch.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gamewallpapers.com',
      },
    ],
  },
};

export default nextConfig;
