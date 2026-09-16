import { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from '../../components/Notification/Notification';
import CartService from '../../services/CartService';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { UserContext } from '../../context/UserContext';

import styles from './CartView.module.css';

export default function CartView() {
    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext);
    const [cart, setCart] = useState({});

    const [notification, setNotification] = useState(null);

    function formatPrice(price) {
        return Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency',}).format(price);
    }
    function clearNotification() {
    setNotification(null);
    }

    function handleFetchCart() {
        setLoading(true);
        CartService.getCart()
        .then((response) => {
            setCart(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error loading Cart: ', error);
            setLoading(false);
        });
    }

    function handleRemoveItem(item, id) {
        const deletedItem = item;
        CartService.removeProduct(id)
        .then(() => {
            setNotification({
                type: 'info',
                message: `<${deletedItem.product.name}> removed from cart`
            });
            handleFetchCart();
        })
        .catch((error) => {
            console.error('Error removing item from Cart: ', error);
        });
    }

    function handleDeleteCart() {
        CartService.clearCart()
        .then(() => {
            setNotification({
                type: 'info',
                message: 'Cart emptied successfully'
            });
            handleFetchCart();
        })
        .catch((error) => {
            console.error('Error clearing Cart: ', error);
        });
    }

    useEffect(() => {handleFetchCart()}, []);

    return (
        <div>
            <div className={styles.notification}>
                <Notification notification={notification} clearNotification={clearNotification}/>
            </div>
            {loading ? (
                <div> <LoadingSpinner/> </div>
            ) : (
            <div className={styles.cartView}>
                <h2>Hello {user.name}, here is your cart:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Remove?</th>
                            <th>Product Name</th>
                            <th>Sku Number</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.items.map((item) => (
                            <tr key={item.cartItemId}>
                                <td className={styles.center}><FontAwesomeIcon 
                                    icon="fa-solid fa-xmark" 
                                    className={styles.xmarkIcon} 
                                    onClick={() => handleRemoveItem(item, item.cartItemId)}
                                    title="Remove Line Item"/>
                                </td>
                                <td className={styles.left}>{item.product.name}</td>
                                <td className={styles.center}>{item.product.productSku}</td>
                                <td>{formatPrice(item.product.price)}</td>
                                <td>{item.quantity}</td>
                                <td>{formatPrice(item.quantity * item.product.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={styles.space}></div>
                <section>
                    <p>Sub: {formatPrice(cart.itemSubtotal)}</p>
                    <p>Tax: {formatPrice(cart.tax)}</p>
                    <p>Tot: {formatPrice(cart.total)}</p>
                </section>
                <FontAwesomeIcon 
                    icon="fa-solid fa-trash-can" 
                    className={styles.trashCanIcon} 
                    onClick={() => handleDeleteCart()}
                    title="Clear Cart"
                />
            </div>
            )}
        </div>
    );
}