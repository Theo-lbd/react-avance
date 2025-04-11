import { render, screen, fireEvent } from '@testing-library/react'
import MovieCard from '../MovieCard'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const mockMovie = {
  Title: 'Inception',
  Poster: 'https://image.tmdb.org/t/p/inception.jpg',
  Year: '2010',
  Type: 'movie',
  imdbID: 'tt1375666'
}

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

beforeEach(() => {
  // On vide le localStorage entre chaque test
  localStorage.clear()
})

test('affiche les infos du film', () => {
  renderWithRouter(<MovieCard movie={mockMovie} />)

  expect(screen.getByText(/Inception/i)).toBeInTheDocument()
  expect(screen.getByAltText(/Inception/i)).toHaveAttribute('src', mockMovie.Poster)
  expect(screen.getByText(/2010 - movie/)).toBeInTheDocument()
  expect(screen.getByRole('button', { name: /ajouter aux favoris/i })).toBeInTheDocument()
  expect(screen.getByText(/voir les détails/i)).toHaveAttribute('href', `/movie/${mockMovie.imdbID}`)
})

test('ajoute et retire un film des favoris au clic', () => {
  renderWithRouter(<MovieCard movie={mockMovie} />)

  const button = screen.getByRole('button', { name: /ajouter aux favoris/i })
  fireEvent.click(button)

  expect(screen.getByRole('button', { name: /supprimer des favoris/i })).toBeInTheDocument()

  fireEvent.click(button)
  expect(screen.getByRole('button', { name: /ajouter aux favoris/i })).toBeInTheDocument()
})