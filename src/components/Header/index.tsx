import styles from './styles.module.scss'
import Link from "next/link"
import {FormEvent, useState} from "react";
import useRouter from 'next/router'

export function Header() {

    const router = useRouter
    const [search, setSearch] = useState('')

    function handleForm(e: FormEvent) {
        e.preventDefault()

        if(!search) {
            alert('Digite algo')
            return
        }
        router.push(`/search/${search}`)

    }

    return (
        <header className={styles.container}>
            <div className={styles.headerContent}>
                <Link href={`/`}>
                    <a>
                        <img src='/images/logo.svg' alt="Logo"/>
                    </a>
                </Link>
                <nav>
                    <form onSubmit={handleForm}>
                        <label>
                            <input
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Pesquise por nome de filme"
                            />
                        </label>
                    </form>
                </nav>
            </div>
        </header>
    )
}