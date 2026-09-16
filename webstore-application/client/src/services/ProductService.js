import axios from "axios";

export default {

    getProducts() {
        return axios.get('/products')
    },

    getProductById(id) {
        return axios.get(`/products/${id}`)
    }
}