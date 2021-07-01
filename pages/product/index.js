import { PRODUCTS } from "../../constantsGQL";
import client from "../../apollo-client";
import styles from "../../styles/Home.module.scss";

export async function getServerSideProps() {
    const { data } = await client.query({
        query: PRODUCTS
    });

    return {
        props: {
            products: data.products
        }
    }
}

export default function Product({products}) {
    return (
        <div className={styles.grid}>
            {products.map((product) => (
                <div key={product._id} className={styles.card}>
                    <h3>{product.name}</h3>
                    <p>
                        {product.sku} - {product.price}
                    </p>
                </div>
            ))}
        </div>
    )
}
