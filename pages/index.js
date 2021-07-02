import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import {AUTH_TOKEN, ROLE} from "../constants";
import Navbar from "../components/Navbar";
import {useState} from "react";
import Link from 'next/link'
import CartCount from "../components/CartCount";

export async function getInitialProps(props) {
    let token = '';
    let role = '';
    if (sessionStorage) {
        token = sessionStorage.getItem(AUTH_TOKEN);
        role = sessionStorage.getItem(ROLE);
    }

    return {
        token,
        role
    }
}

export default function Home({token, role}) {
    if (typeof window !== 'undefined') {
        token = sessionStorage.getItem(AUTH_TOKEN);
        role = sessionStorage.getItem(ROLE);
    }
    const [isModalActive, setIsModalActive] = useState(false);
    const handleRegisterClick = (e) => {
        e.preventDefault();
        setIsModalActive(!isModalActive);
    }

    return (
        <div className="container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-end">
                        {
                            token && role === 'customer' && (
                                <Link href="/cart">
                                    <a className="navbar-item">
                                        Carrito
                                    </a>
                                </Link>
                            )
                        }
                        <Link href="/create-account">
                            <a className="navbar-item">
                                Registrate
                            </a>
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="columns">
                {
                    token && (
                        <div className="column is-2">
                            <Navbar />
                        </div>
                    )
                }
                <div className="column">
                    <div className={styles.container}>
                        <main className={styles.main}>
                            <h1 className={styles.title}>
                                Welcome to <a href="https://nextjs.org">Next.js!</a>
                            </h1>
                        </main>
                        <div className="box">
                            <p>
                                Para navegar
                                <Link href="/login">
                                    <a className="is-link"> inicia sesión </a>
                                </Link> o
                                <Link href="/create-account">
                                    <a className="is-link"> regístrate</a>
                                </Link>
                            </p>
                        </div>
                        <footer className={styles.footer}>
                            <a
                                href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Powered by{' '}
                                <span className={styles.logo}>
                                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                                </span>
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
            <div className={isModalActive ? 'modal is-active' : 'modal'}>
                <div className="modal-background" />
                <div className="modal-content"></div>
                <button
                    className="modal-close is-large"
                    aria-label="close"
                    onClick={handleRegisterClick}
                />
            </div>
        </div>
    )
}
