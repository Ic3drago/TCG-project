
import './globals.css'

export const metadata = {
  title: 'TCG Nexus Store',
  description: 'Tienda virtual de cartas y juegos de mesa con Dark Mode y cálculo de precios en Bs.'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
