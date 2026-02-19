import { useContext, useState } from 'react'
import PokemonContext from '../context/PokemonContext.jsx'
import { SearchPokemonForm } from '../components/SearchPokemonForm.jsx'
import { ErrorMessage } from '../components/ErrorMessage.jsx'
import { PokemonDetailsCard } from '../components/PokemonDetailsCard.jsx'

export function PokemonSearchPage() {
  // Valeur tapee dans l'input.
  const [search, setSearch] = useState('')
  // Donnees du pokemon recupere via l'API (null = rien affiche).
  const [pokemon, setPokemon] = useState(null)
  // Permet d'afficher "Recherche..." pendant l'appel reseau.
  const [loading, setLoading] = useState(false)
  // Erreur liee a la recherche (nom vide, pokemon introuvable, etc.).
  const [fetchError, setFetchError] = useState('')
  // Donnees/fonctions globales venant du contexte.
  const { addPokemonToTeam, teamError, setTeamError } = useContext(PokemonContext)

  const onSubmit = async (event) => {
    // On empeche le comportement HTML par defaut (rechargement page).
    event.preventDefault()

    // On nettoie le texte (espaces) et on force en minuscule pour l'API.
    const name = search.trim().toLowerCase()

    // Si champ vide, on affiche une erreur claire et on stoppe.
    if (!name) {
      setFetchError('Entrez un nom de pokemon.')
      setPokemon(null)
      return
    }

    // Etat de depart avant requete.
    setLoading(true)
    setFetchError('')
    setPokemon(null)

    try {
      // Appel PokeAPI avec le nom saisi.
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

      // Si 404 ou autre erreur HTTP, on force le passage dans catch.
      if (!response.ok) {
        throw new Error('not_found')
      }

      // JSON de la reponse => objet pokemon.
      const data = await response.json()
      setPokemon(data)

      // Si une erreur equipe existait, on la nettoie.
      setTeamError('')
    } catch {
      // Message utilisateur simple (on n'affiche pas l'erreur technique brute).
      setFetchError('Pokemon introuvable.')
    } finally {
      // Toujours execute, succes ou erreur.
      setLoading(false)
    }
  }

  function onAddTeam() {
    // On enregistre seulement les infos utiles au lieu de stocker tout l'objet API.
    if (pokemon) {
      addPokemonToTeam({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites?.front_default || '',
        types: pokemon.types.map((item) => item.type.name),
      })
    }
  }

  return (
    <section className="page-card">
      <h2>Recherche Pokemon</h2>
      <p className="page-intro">Tape un nom exact (ex: pikachu, bulbasaur, charizard).</p>
      {/* Formulaire controle: la valeur vient du state React */}
      <SearchPokemonForm search={search} setSearch={setSearch} onSubmit={onSubmit} loading={loading} />

      {/* Deux erreurs possibles: recherche et equipe */}
      <ErrorMessage message={fetchError} />
      <ErrorMessage message={teamError} />

      {/* La carte n'apparait que si "pokemon" contient un resultat */}
      <PokemonDetailsCard pokemon={pokemon} onAddTeam={onAddTeam} />
    </section>
  )
}
