import Link from "next/link";
import CartCount from "../components/CartCount";
import Navbar from "../components/Navbar";
import {AUTH_TOKEN} from "../constants";
import {useQuery} from "@apollo/client";
import {MY_SHOPPING_CART} from "../constantsGQL";
import {useEffect, useState} from "react";
import ShoppingCartProduct from "../components/ShoppingCartProduct";

function Cart({token}) {
    if (typeof window !== 'undefined' && !token) {
        token = sessionStorage.getItem(AUTH_TOKEN);
    }
    const [products, setProducts] = useState([]);
    const { loading, data, error } = useQuery(MY_SHOPPING_CART);

    useEffect(() => {
        if (data) {
            setProducts(data.myShoppingCart)
        }
    }, [data])

    return (
        <div className="container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <Link href="/cart">
                            <a className="navbar-item">
                                Carrito
                                <CartCount />
                            </a>
                        </Link>
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
                    <div className="columns is-multiline">
                        {products.map((item) => (
                            <div key={item._id} className="column">
                                <ShoppingCartProduct props={item} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
