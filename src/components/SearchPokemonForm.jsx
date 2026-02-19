export function SearchPokemonForm({ search, setSearch, onSubmit, loading }) {
  // Composant "presentational": il affiche juste le formulaire.
  // Toute la logique (API, erreurs, state) reste dans la page parente.
  return (
    <form onSubmit={onSubmit} className="search-form">
      <label htmlFor="pokemon-name">Nom du pokemon</label>
      <input
        id="pokemon-name"
        type="text"
        placeholder="Ex: pikachu"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />
      {/* Le bouton est desactive pendant la requete pour eviter les doubles clics */}
      <button type="submit" disabled={loading}>
        {loading ? 'Recherche...' : 'Rechercher'}
      </button>
    </form>
  )
}
