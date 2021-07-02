import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {MY_SHOPPING_CART} from "../constantsGQL";
import styles from './CartCount.module.scss';

function CartCount() {
    const [products, setProducts] = useState(0);
    const { loading, data, error } = useQuery(MY_SHOPPING_CART);

    useEffect(() => {
        if (data) {
            setProducts(data.myShoppingCart.length)
        }
    }, [data])

    return (
        <div className={styles.circle}>
            <span className={styles.count}>{products}</span>
        </div>
    )
}

export default CartCount;
