export function ErrorMessage({ message }) {
  // Si pas de message, on n'affiche rien pour garder une interface propre.
  if (!message) {
    return null
  }

  // Si un message existe, on l'affiche dans un style d'erreur unique.
  return <p className="error">{message}</p>
}
