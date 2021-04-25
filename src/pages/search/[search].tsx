import styles from '../home.module.scss'
import {GetServerSideProps} from "next";
import {fetcher} from "../../service/api";
import {Header} from "../../components/Header";
import Link from "next/link";
import {useEffect, useState} from "react";

interface SearchInterface {
    search: SearchProps[];
    paginationLimit: number;
    toSearch: string;
}

type SearchProps = {
    result: {
        image: string;
        id: string;
        title: string;
    }
}


export default function Search({search}) {

    const [limit, setLimit] = useState(1)
    const [movies, setMoreMovies] = useState([])
    const [isEnd, setIsEnd] = useState(false)

    useEffect(() => {
        setMoreMovies(search.result)
    }, [])

    async function getMoreMovie() {

        if (limit === search.paginationLimit) {
            setIsEnd(true)
            return
        }
        setLimit(limit + 1)
        const data = await fetcher({
            patch: `/search/movie/`,
            query: `query=${search.toSearch}&page=${limit}`
        })
        const result = data.results.map((movie) => {
            return {
                image: movie.poster_path,
                id: movie.id,
                title: movie.title
            }
        })
        setMoreMovies([...movies, ...result])
    }

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
                {
                    isEnd ?
                        (<p>Fim dos resultados</p>)
                        :
                        (<button onClick={() => getMoreMovie()}>
                            Get More Movies
                        </button>)
                }
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({params}) => {

    const {search} = params

    const data = await fetcher({
        patch: `/search/movie`,
        query: `query=${search}`
    })

    const paginationLimit = data.total_pages

    const result = data.results.map(movie => {
        return {
            image: movie.poster_path,
            id: movie.id,
            title: movie.title
        }
    })

    return {
        props: {
            search: {
                result,
                paginationLimit,
                toSearch: search
            }
        }
    }
}
