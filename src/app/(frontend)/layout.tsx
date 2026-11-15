import React from 'react'
import './styles.css'
import Link from "next/link"

export const metadata = {
  description: 'Filmen er slutt. Smatalen begynner. Artikle, filmanmeldelser og filmkvelder.',
  title: 'Filmklubben Rulletekst',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="nb">
      <body>
        <header className='site-header'>
          <Link href="/">Flimklubben Rulletekst</Link>
          <p>Filmen er slutt. Samtalen begynner.</p>

          <nav className='site-nav' aria-label="Hovednavigasjon">
            <Link href="/"> Forside</Link>
            <Link href="/articles">Artikler</Link>
            <Link href="/reviews">Filmanmeldelser</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  )
}
