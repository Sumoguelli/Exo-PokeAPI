import { createContext, useState } from 'react'

// Ce contexte est un "stockage global" partage entre toutes les pages.
// L'objectif: eviter de passer les donnees d'equipe en props partout.
const PokemonContext = createContext()

export function PokemonProvider({ children }) {
  // "team" contient la liste des pokemons deja ajoutes.
  const [team, setTeam] = useState([])
  // "teamError" affiche un message clair a l'utilisateur en cas de probleme.
  const [teamError, setTeamError] = useState('')

  // Fonction appelee quand on clique "Ajouter a mon equipe".
  function addPokemonToTeam(pokemon) {
    // Regle metier: une equipe pokemon contient maximum 6 membres.
    if (team.length >= 6) {
      setTeamError('Votre equipe est deja complete (6 pokemons maximum).')
      return
    }

    // On cree un NOUVEAU tableau avec l'ancien contenu + le nouveau pokemon.
    // (bonne pratique React: ne jamais modifier le state directement)
    setTeam([...team, pokemon])

    // Si l'ajout reussit, on vide l'erreur precedente.
    setTeamError('')
  }

  return (
    <PokemonContext.Provider
      value={{
        // Donnees partagees
        team,
        // Actions partagees
        addPokemonToTeam,
        teamError,
        setTeamError,
      }}
    >
      {/* Toutes les pages/composants enfants pourront lire le contexte */}
      {children}
    </PokemonContext.Provider>
  )
}

export default PokemonContext
