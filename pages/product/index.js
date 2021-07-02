import { PRODUCTS } from "../../constantsGQL";
import styles from "../../styles/Product.module.scss";
import InputLabel from "../../components/InputLabel";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/client";
import Navbar from "../../components/Navbar";
import ProductBox from "../../components/ProductBox";
import Link from "next/link";
import CartCount from "../../components/CartCount";

/*export async function getServerSideProps() {
    const { data } = await client.query({
        query: PRODUCTS
    });

    return {
        props: {
            products: data.products
        }
    }
}*/

export default function Product({token}) {
    const { handleSubmit } = useForm();
    const [productList, setProductList] = useState([]);
    const [searchForm, setSearchForm] = useState({
        name: '',
        sku: ''
    })
    const [getProducts, { loading, data, error }] = useLazyQuery(PRODUCTS, {
        variables: {
            name: searchForm.name,
            sku: searchForm.sku,
            minPrice: Number(searchForm.minPrice),
            maxPrice: Number(searchForm.maxPrice)
        }
    })

    useEffect(() => {
        if (data) {
            setProductList(data.products)
        }
    }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchForm({ ...searchForm, [name]: value })
    }
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
                <div className="column is-2">
                    <Navbar />
                </div>
                <div className="column">
                    <form
                        onSubmit={handleSubmit(getProducts)}
                    >
                        <div className="field">
                            <InputLabel text="Buscar por nombre" />
                            <div className="control">
                                <input
                                    type="text"
                                    name="name"
                                    onChange={ handleInputChange }
                                />
                            </div>
                        </div>
                        <div className="field">
                            <InputLabel text="Buscar por SKU" />
                            <div className="control">
                                <input
                                    type="text"
                                    name="sku"
                                    onChange={ handleInputChange }
                                />
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="Precio mínimo" />
                                    <div className="control">
                                        <input
                                            type="number"
                                            name="minPrice"
                                            onChange={ handleInputChange }
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="column">
                                <div className="field">
                                    <InputLabel text="Precio máximo" />
                                    <div className="control">
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            onChange={ handleInputChange }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="button">Buscar</button>
                    </form>
                    <div className="columns is-multiline">
                        {productList.map((product) => (
                            <div key={product._id} className="column">
                                <ProductBox props={product} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
