export function TeamList({ team }) {
  // Cas 1: equipe vide.
  if (team.length === 0) {
    return <p className="empty-text">Votre equipe est vide.</p>
  }

  // Cas 2: on affiche toutes les cartes de l'equipe.
  return (
    <div className="team-grid">
      {/* Un map pour afficher une carte par pokemon */}
      {team.map((pokemon, index) => (
        <article className="pokemon-card" key={`${pokemon.id}-${index}`}>
          <div className="pokemon-head">
            <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <span className="pokemon-id">#{pokemon.id}</span>
          </div>
          {/* Position dans l'equipe (de 1 a 6) */}
          <p className="slot-text">Slot {index + 1}</p>
          {pokemon.image ? <img className="pokemon-image" src={pokemon.image} alt={pokemon.name} width="96" height="96" /> : null}
          <div className="type-row">
            {/* Chaque type devient un badge */}
            {pokemon.types.map((typeName) => (
              <span key={`${pokemon.id}-${typeName}`} className="type-pill">
                {typeName}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
