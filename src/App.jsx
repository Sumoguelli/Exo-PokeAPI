import { useEffect, useState } from 'react'
import './App.css'
import { PokemonProvider } from './context/PokemonContext.jsx'
import { PokemonSearchPage } from './pages/PokemonSearchPage.jsx'
import { MyTeamPage } from './pages/MyTeamPage.jsx'
import { Navigation } from './components/Navigation.jsx'

function App() {
  // URL courante (routage "maison" simple, sans react-router).
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    // Si l'utilisateur clique "precedent/suivant", on resynchronise l'ecran.
    const onPopState = () => setPathname(window.location.pathname)
    window.addEventListener('popstate', onPopState)

    // Nettoyage quand le composant se detruit.
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = (path) => {
    // pushState change l'URL sans recharger tout le site.
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
      // On met a jour le state pour afficher la bonne page.
      setPathname(path)
    }
  }

  const renderPage = () => {
    // Route 1: page de recherche.
    if (pathname === '/' || pathname === '/search-pokemons') {
      return <PokemonSearchPage />
    }

    // Route 2: page equipe.
    if (pathname === '/mon-equipe') {
      return <MyTeamPage />
    }

    // Fallback si URL inconnue.
    return (
      <section className="page-card">
        <h1>Page introuvable</h1>
        <p>Utilisez la navigation pour acceder aux pages disponibles.</p>
      </section>
    )
  }

  return (
    // Provider global: tout ce qu'il contient peut utiliser PokemonContext.
    <PokemonProvider>
      <main className="app-shell">
        <header className="app-header">
          <p className="app-kicker">Carnet du dresseur</p>
          <h1>Pokemon Manager</h1>
          <p className="app-subtitle">Recherche un pokemon, consulte sa fiche et construis ton equipe.</p>
        </header>

        {/* Boutons de navigation entre les routes */}
        <Navigation onNavigate={navigate} currentPath={pathname} />

        {/* Zone centrale qui affiche la page choisie */}
        <section className="app-content">{renderPage()}</section>
      </main>
    </PokemonProvider>
  )
}

export default App
