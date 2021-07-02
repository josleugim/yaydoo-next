import Navbar from "../../components/Navbar";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {PRODUCTS} from "../../constantsGQL";
import {ROLE} from "../../constants";
import InputLabel from "../../components/InputLabel";

function List() {
    let role = '';
    if (typeof window !== 'undefined') {
        role = sessionStorage.getItem(ROLE);
    }
    const [productList, setProductList] = useState([]);
    const { loading, error, data } = useQuery(PRODUCTS, {
        errorPolicy: 'all'
    });

    useEffect(() => {
        if (data) {
            setProductList(data.products);
        }

    }, [data])

    const handleOnChangeVendorName = (data) => {
        console.log(data)
    }

    return (
        <div className="container">
            <div className="columns">
                <div className="column is-2">
                    <Navbar />
                </div>
                <div className="column">
                    <div className="columns">
                        <div className="column">
                            <h3 className="title">Listado de productos</h3>
                        </div>
                    </div>
                    <form>
                        <div className="field">
                            <InputLabel text="Filtrar por vendedor" />
                            <div className="control">
                                <input className="input" type="text" name="vendorName" onChange={(event) => handleOnChangeVendorName(event.target.value)} />
                            </div>
                        </div>
                    </form>
                    <table className="table">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Sku</th>
                            <th>Cantidad</th>
                            <th>Precio</th>
                            {
                                role === 'admin' && (
                                    <th>Vendedor</th>
                                )
                            }
                            <th>Opciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            productList.map((product, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{ index + 1 }</td>
                                        <td>{ product.name }</td>
                                        <td>{ product.sku }</td>
                                        <td>{ product.quantity }</td>
                                        <td>{ product.price }</td>
                                        {
                                            role === 'admin' && (
                                                <th>{ product.vendor.name }</th>
                                            )
                                        }
                                        <td></td>
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default List;
