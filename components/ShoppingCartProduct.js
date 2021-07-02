import styles from "./ShoppingCartProduct.module.scss";
import Image from 'next/image'
import {useMutation} from "@apollo/client";
import {DELETE_SHOPPING_CART, MY_SHOPPING_CART} from "../constantsGQL";

function ShoppingCartProduct(props) {
    const product = props.props.productId;
    const quantity = props.props.quantity;
    const id = props.props._id;
    const [deleteShoppingCart] = useMutation(DELETE_SHOPPING_CART, {
        refetchQueries: [{
            query: MY_SHOPPING_CART
        }]
    })

    const handleRemoveItem = () => {
        deleteShoppingCart({
            variables: {
                id: id
            }
        })
            .then(() => console.log('Producto eliminado'))
            .catch(err => console.log(err))
    }

    return (
        <div className="box">
            <figure>
                <Image src="https://picsum.photos/200" alt="image" width={200} height={200} />
                <figcaption className={styles.name}>{ product.name }</figcaption>
            </figure>
            <hr className={styles.hr} />
            <p className={styles.sku}><span>SKU: </span>{ product.sku }</p>
            <p className={styles.price}>${ product.price }</p>
            <p className={styles.quantity}>cantidad: <span>{quantity}</span></p>
            <button
                type="button"
                className="button is-small is-warning"
                onClick={handleRemoveItem}
            >Quitar del carrito</button>
        </div>
    )
}

export default ShoppingCartProduct;
