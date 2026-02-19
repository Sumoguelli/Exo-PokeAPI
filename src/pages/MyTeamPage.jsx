import { useContext } from 'react'
import PokemonContext from '../context/PokemonContext.jsx'
import { TeamList } from '../components/TeamList.jsx'

export function MyTeamPage() {
  // Lecture de l'equipe globale depuis le contexte.
  const { team } = useContext(PokemonContext)

  return (
    <section className="page-card">
      <h2>Mon equipe</h2>
      {/* Petit compteur pour voir rapidement combien de places sont prises */}
      <p className="page-intro">
        {team.length} / 6 pokemon{team.length > 1 ? 's' : ''}
      </p>

      {/* Liste reutilisable qui gere aussi le cas "equipe vide" */}
      <TeamList team={team} />
    </section>
  )
}
