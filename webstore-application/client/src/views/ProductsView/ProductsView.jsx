import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Notification from '../../components/Notification/Notification';
import ProductService from '../../services/ProductService';
import CartService from '../../services/CartService';
import ProductTile from '../../components/ProductTile/ProductTile';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import SearchBar from '../../components/SearchBar/SearchBar';
import { UserContext } from '../../context/UserContext';

import styles from './ProductsView.module.css';

export default function ProductsView() {
  const [cardView, setCardView] = useState(true);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const {user} = useContext(UserContext);
  
  const [notification, setNotification] = useState(null);

  const [searchterm, setSearchterm] = useState('');

  function formatPrice(price) {
    return Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency',}).format(price);
  }
  function clearNotification() {
    setNotification(null);
  }

  // If there is a search term in state, filter the product list, otherwise return the full product list

  function handleSearchFilter(searchterm, products) {
    const searchtermCleanUp = searchterm?.trim().toLowerCase();
    if(!searchtermCleanUp) {
      return products;
    }
    const searchMatchList = products.filter(product => product.name.toLowerCase().includes(searchtermCleanUp));
    return searchMatchList;
    // if (searchterm !== '') {
    //   const searchMatch = products.filter(product => product.name.toLowercase().includes(searchterm.toLowerCase()));
    //   return searchMatch;
    // } else {
    //   return products;
    // }
  }

  function handleFetchProducts() {
    setLoading(true);
    ProductService.getProducts()
    .then((response) => {
      setProducts(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error loading products: ', error);
      setLoading(false);
    });
  }

  function handleAddToCart(item) {
    CartService.addProduct(item)
    .then((response) => {
      console.log('Item added successfully:', response.data);
      setNotification({
        type: 'success',
        message: `1 <${item.name}> added to cart successfully!`
      });
    })
    .catch((error) => {
        console.error('Error adding to Cart: ', error);
    });
  }

  function welcomeMessage() {
    user === null &&
    setNotification({
      type: 'info',
      message: `Welcome. You may browse anonymously as much as you wish, but you must login to add items to your shopping cart.`
    })
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {handleFetchProducts(); welcomeMessage()}, []);

  return (
    <div>
      <div className={styles.utilityBar}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <FontAwesomeIcon
            icon="fa-solid fa-grip"
            className={`${styles.viewIcon} ${cardView ? styles.active : ''}`}
            onClick={() => setCardView(true)}
            title="View tiles"
          />
          <FontAwesomeIcon
            icon="fa-solid fa-table"
            className={`${styles.viewIcon} ${!cardView ? styles.active : ''}`}
            onClick={() => setCardView(false)}
            title="View table"
          />
        </div>
        <Notification notification={notification} clearNotification={clearNotification}/>
        <SearchBar setSearchterm={setSearchterm} />
        </div>
      <div>
        {loading ? (
          <div> <LoadingSpinner/> </div>
        ) : (cardView ? (
          <>
            <h1>Solar System Geek Product Catalog</h1>
            <div className={styles.productTiles}>
              {handleSearchFilter(searchterm, products).map((product) => (
                <ProductTile key={product.productId} product={product} handleAddToCart={handleAddToCart}/>
              ))}
            </div>
          </>
        ) : (
          <div className={styles.productTable}>
            <h1>Solar System Geek Product Catalog</h1>
            <table>
              <tbody>
                {handleSearchFilter(searchterm, products).map((product) => (
                  <tr key={product.productId}>
                    <td><Link to={`/${product.productId}`}>{product.name}</Link></td>
                    <td>{product.productSku}</td>
                    <td>{formatPrice(product.price)}</td>
                    <td>
                      {user !== null && 
                        <FontAwesomeIcon 
                          icon="fa-solid fa-cart-plus"
                          className={styles.cartIcon} 
                          onClick={() => handleAddToCart(product)}
                          title="Add one to Cart"
                        />
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}
