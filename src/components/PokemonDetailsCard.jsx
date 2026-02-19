export function PokemonDetailsCard({ pokemon, onAddTeam }) {
  // Si aucune recherche valide n'a ete faite, ce composant ne rend rien.
  if (!pokemon) {
    return null
  }

  // On met la premiere lettre en majuscule pour l'affichage.
  const pokemonName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  return (
    <article className="pokemon-card">
      <div className="pokemon-head">
        <h2>{pokemonName}</h2>
        <span className="pokemon-id">#{pokemon.id}</span>
      </div>

      {pokemon.sprites?.front_default ? (
        // Image officielle de base fournie par l'API.
        <img className="pokemon-image" src={pokemon.sprites.front_default} alt={pokemon.name} width="120" height="120" />
      ) : null}

      <div className="pokemon-meta">
        <p>
          <strong>Taille:</strong> {pokemon.height}
        </p>
        <p>
          <strong>Poids:</strong> {pokemon.weight}
        </p>
      </div>

      <div className="type-row">
        {/* map() transforme la liste des types en badges visuels */}
        {pokemon.types.map((item) => (
          <span key={item.type.name} className="type-pill">
            {item.type.name}
          </span>
        ))}
      </div>

      {/* Action envoyee a la page: ajout dans le contexte equipe */}
      <button type="button" onClick={onAddTeam}>
        Ajouter a mon equipe
      </button>
    </article>
  )
}
