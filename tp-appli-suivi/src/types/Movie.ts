export interface OmdbMovie {
  id: number
  title: string
  category: string
  image: string
}

export interface FavoriteMovie extends OmdbMovie {}
