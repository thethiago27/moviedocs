import styles from "./styles.module.scss"
import { GetStaticProps } from "next";
import {fetcher} from "../../service/api";
import {Header} from "../../components/Header";
import {DynamicHead} from "../../components/DynamicHead";

interface MovieProps {
    movie: {
        title: string;
        rating: string;
        votes: number;
        description: string;
        popularity: string;
        image: string;
        generes: {
            type: string;
        }[]
    }
}

export default function Movie({movie}: MovieProps) {
    return (
        <>
            <Header/>
            <DynamicHead title={movie.title}/>
            <div className={styles.container}>
                <div className={styles.content}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.image}`}/>
                    <section>
                        <h1>{movie.title}</h1>
                        <p>{movie.description}</p>
                        <p>Generes: {movie.generes.map((genere) => (
                             <span key={genere.type}>{genere.type}</span>
                        ))}</p>
                    </section>
                </div>
            </div>

        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {

    const { id } = params

    const data = await fetcher({
        patch: `/movie/${id}`
    })

    const generes = data.genres.map((geners) => {
        return {
            type: geners.name
        }
    })

    const movie = {
        title: data.title,
        rating: data.vote_average,
        votes: data.vote_count,
        description: data.overview,
        popularity: data.popularity,
        image: data.poster_path,
        generes
    }

    return {
        props: {
            movie
        }
    }
}
