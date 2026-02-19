export function Navigation({ onNavigate, currentPath }) {
  // Deux boutons simples qui changent l'URL de la SPA.
  return (
    <header className="header">
      {/* "is-active" permet de styliser le bouton de la page courante */}
      <button
        type="button"
        className={currentPath === '/search-pokemons' || currentPath === '/' ? 'is-active' : ''}
        onClick={() => onNavigate('/search-pokemons')}
      >
        Rechercher un pokemon
      </button>
      <button
        type="button"
        className={currentPath === '/mon-equipe' ? 'is-active' : ''}
        onClick={() => onNavigate('/mon-equipe')}
      >
        Mon equipe
      </button>
    </header>
  )
}
