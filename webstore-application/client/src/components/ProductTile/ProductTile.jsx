import { Link } from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import CartService from '../../services/CartService';
import styles from './ProductTile.module.css'

export default function ProductTile({product, handleAddToCart}) {
    const {user} = useContext(UserContext);

    function formatPrice(price) {
        return Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency',}).format(price);
    }

    // function handleAddToCart(product) {
    //     CartService.addProduct(product)
    //     .then((response) => {
    //         console.log('Item added successfully:', response.data);
    //     })
    //     .catch((error) => {
    //         console.error('Error adding to Cart: ', error);
    //     });
    // }

    return (
        <div className={`${styles.productTile} animate__animated animate__zoomIn`}>
            <h2 className={styles.productName}>{product.name}</h2>
            <div className={styles.productImage}>
                <Link to={`/${product.productId}`}>
                    <img src={`${product.imageName}`} />
                </Link>
            </div>
            <h3 className={styles.sku}>{product.productSku}</h3>
            <h3 className={styles.price}>{formatPrice(product.price)}</h3>
            <div className={styles.cart}>
                {user !== null && 
                    <FontAwesomeIcon icon="fa-solid fa-cart-plus" 
                        className={styles.cartIcon} 
                        onClick={() => handleAddToCart(product)}
                        title="Add one to Cart"/>
                }
            </div>
        </div>
    );
}