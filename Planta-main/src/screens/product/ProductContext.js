import React, { createContext, useState } from 'react'
import { getProductForHomePage, getProductDetail, saveCart, getProductSearch, getCartHistory } from './ProductService';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props

    const [cart, setCart] = useState([])

    const onGetProductForHomePage = async () => {
        try {
            const res = await getProductForHomePage()
            if (res.error == false) {
                return res.data
            }
        } catch (error) {
            console.log('onGetProductForHomePage', error);
        }
        return []
    }

    const onGetProductDetail = async (id) => {
        try {
            const res = await getProductDetail(id)
            if (res.error == false) {
                return res.data
            }
        } catch (error) {
            console.log('onGetProductForHomePage', error);
        }
        return null
    }

    const updateCart = (product, quantity, price, checked = true) => {
        let temp = cart
        if (cart.length == 0) {
            temp.push({ product: product, quantity: quantity, price: price, checked: checked })
        } else {
            const check = cart.filter(item => item.product._id == product._id)
            if (check.length == 0) {
                temp.push({ product: product, quantity: quantity, price: price, checked: checked })
            } else {
                if (quantity <= 0) {
                    temp = temp.filter(item => item.product._id != product._id)
                } else {
                    temp = temp.map(item => {
                        if (item.product._id == product._id) {
                            item.quantity = quantity
                        }
                        return item
                    })
                }
            }
        }
        setCart([...temp])
    }

    const onSaveCart = async () => {
        try {
            let total = 0
            let products = []
            for (let index = 0; index < cart.length; index++) {
                const element = cart[index];
                total += element.quantity * element.price
                products.push({
                    product: element.product._id,
                    quantity: element.quantity,
                    price: element.price
                })
            }
            await saveCart({ total, products })
            setCart([...[]])
            return true
        } catch (error) {
            console.log('onSaveCart', error);
        }
        return false
    }

    const onGetProductSearch = async () => {
        try {
            const res = await getProductSearch()
            if (res.error == false) {
                return res.data
            }
        } catch (error) {
            console.log('onGetProductSearch ', error);
        }
        return []
    }

    const onGetCartHistory = async () => {
        const res = await getCartHistory();
        if (res.error == false){
            return res.data
        }
        return []
    }

    return (
        <ProductContext.Provider
            value={{
                onGetProductForHomePage,
                onGetProductDetail, cart, setCart, updateCart, onSaveCart,
                onGetProductSearch, onGetCartHistory
            }}>
            {children}
        </ProductContext.Provider>
    )

}