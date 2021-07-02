import styles from './Navbar.module.scss';
import Link from 'next/link'
import {AUTH_TOKEN, ROLE} from "../constants";
import { useRouter } from "next/router";

function Navbar() {
    let role = '';
    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem(ROLE);
    }
    const router = useRouter();

    return (
        <aside className={styles.nav}>
            <ul>
                <li>
                    <Link href={role === 'customer' ? '/product' : '/product/list'}>
                        <a>Product</a>
                    </Link>
                </li>
                <li>
                    <Link href="/product/create">
                        <a>Crear producto</a>
                    </Link>
                </li>
                <li>
                    <a
                        className="is-link"
                        onClick={() => {
                            sessionStorage.removeItem(AUTH_TOKEN);
                            sessionStorage.removeItem(ROLE);
                            router.push('/login');
                        }}
                    >Cerrar sesión</a>
                </li>
            </ul>
        </aside>
    )
}

export default Navbar
