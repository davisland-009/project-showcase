import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import Notification from "../../components/Notification/Notification";
import ProductService from '../../services/ProductService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserContext } from "../../context/UserContext";
import CartService from "../../services/CartService";

import styles from './ProductDetailsView.module.css'

export default function ProductDetailsView() {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState();
    const {user} = useContext(UserContext);

    const [notification, setNotification] = useState(null);
    
    function formatPrice(price) {
        return Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency',}).format(price);
    }
  function clearNotification() {
    setNotification(null);
  }

    function handleFetchProduct(id) {
        setLoading(true);
        ProductService.getProductById(id)
        .then((response) => {
            setProduct(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error loading product: ', error);
            setLoading(false);
        });
    }

    function handleAddToCart(product) {
        CartService.addProduct(product)
        .then((response) => {
            console.log('Item added successfully:', response.data);
      setNotification({
        type: 'success',
        message: `1 <${product.name}> added to cart successfully!`
      });
        })
        .catch((error) => {
            console.error('Error adding to Cart: ', error);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {handleFetchProduct(id)}, []);

    return (
        <div>
            {loading ? (
                <div> <LoadingSpinner/> </div>
            ) : (
                <>
                <div className={styles.notification}>
                    <Notification notification={notification} clearNotification={clearNotification}/>
                </div>
                <div className={styles.productImage} key={product.productId}>
                    <h2 className={styles.name}>{product.name}</h2>
                    <h3 className={styles.sku}>{product.productSku}</h3>
                    <img src={`${product.imageName}`} alt={`${product.name}`} />
                    <p className={styles.description}>{product.description}</p>
                    <div className={styles.price}>
                        <h3>{formatPrice(product.price)}
                        {user !== null && 
                            <FontAwesomeIcon 
                                icon="fa-solid fa-cart-plus"
                                className={styles.cartIcon}
                                onClick={() => handleAddToCart(product)}
                                title="Add one to Cart"
                            />
                        }
                        </h3>
                    </div>
                </div>
                </>
            )}
        </div>
    )
}