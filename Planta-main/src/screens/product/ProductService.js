import axiosInstance from "../../utils/axios";

export const getProductForHomePage = async () => {
    const res = await axiosInstance.get('/api/products/get-for-home-page')
    return res
}

export const getProductDetail = async (id) => {
    const res = await axiosInstance.get(`/api/products/${id}/view`)
    return res
}

export const saveCart = async (cart) => {
    const res = await axiosInstance.post('/api/carts', cart);
    return res;
}

export const getProductSearch = async () => {
    const res = await axiosInstance.get('/api/products/search?name=')
    return res
}

export const getCartHistory = async () => {
    const res = await axiosInstance.get('/api/carts/get-all')
    return res
}