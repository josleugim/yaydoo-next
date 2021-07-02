import styles from "./ProductBox.module.scss";
import {useMutation} from "@apollo/client";
import {ADD_SHOPPING_CART} from "../constantsGQL";

function ProductBox(props) {
    const product = props.props;
    const [addProduct] = useMutation(ADD_SHOPPING_CART);
    const handleAddProduct = (productId) => {
        addProduct({
            variables: {
                productId: productId
            }
        })
            .then(() => console.log('Producto agregado'))
            .catch(err => console.log(err))
    }

    return (
        <div className={styles.product + ' box'}>
            <figure>
                <img src="https://picsum.photos/200" alt="image" />
                <figcaption className={styles.name}>{ product.name }</figcaption>
            </figure>
            <hr />
            <p className={styles.sku}><span>SKU: </span>{ product.sku }</p>
            <p className={styles.price}>${ product.price }</p>
            <button
                type="button"
                className="button is-small"
                onClick={(e) => handleAddProduct(product._id)}
            >Agregar al carrito</button>
        </div>
    )
}

export default ProductBox;
