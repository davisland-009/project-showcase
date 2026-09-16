import axios from "axios";

export default {

    getCart() {
        return axios.get('/cart')
    },

    addProduct(product) {
        const cartItem = {
            "quantity": 1,
            "productId": product.productId
        }
        return axios.post('/cart/items', cartItem)
    },

    removeProduct(id) {
        return axios.delete(`/cart/items/${id}`)
    },

    clearCart() {
        return axios.delete('/cart')
    }
}