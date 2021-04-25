import styles from './home.module.scss'
import { GetServerSideProps } from "next";
import { fetcher } from "../service/api";
import {Header} from "../components/Header";
import Link from "next/link"

type Movie = {
  title: string;
  popularity: number;
  release: number;
  vote: number;
  vote_count: number;
  image: string;
  id: number;
}

interface MovieInterface {
  movies: Movie[];
}

export default function Home({ movies }: MovieInterface) {
  return (
    <>
      <Header/>
      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {movies.map((movie) => (
              <Link key={movie.id} href={`/movie/${movie.id}`}>
                <a>
                  <img
                      src={`https://image.tmdb.org/t/p/w500${movie.image}`}
                      alt={movie.title}
                  />
                </a>
              </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {

  const data = await fetcher({
    patch: `/movie/top_rated`
  })

  const movies = data.results.map(movie => {
    return {
      title: movie.title,
      popularity: movie.vote_average,
      release: movie.release_date,
      vote: movie.vote_average,
      vote_count: movie.vote_count,
      image: movie.poster_path,
      id: movie.id
    }
  })

  return {
    props: {
      movies
    }
  }
}