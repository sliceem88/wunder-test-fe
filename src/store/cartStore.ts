'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import ky from "ky";
import type { CartStorageType, CartStorageResponseType } from '../types/cart';

export const useCartStorage = create<CartStorageType>()(persist((set, get) => ({
    products: [],
    rules: [],
    totalPrice: '0',
    addProduct: async (productId: number | null) => {
        const productsId = get().products.map((product) => product.id);
        const rulesId = get().rules.map((rule) => rule.id);
        productsId.push(productId || 0);
        const cartData: CartStorageResponseType = await ky.post('http://localhost:9980/cart', {
            body: JSON.stringify({
                productsId: productsId,
                rulesId
            })
        }).json();

        set({ ...cartData.data })
    },
    addRule: async (ruleId: number | null) => {
        const productsId = get().products.map((product) => product.id);
        const rulesId = get().rules.map((rule) => rule.id);
        rulesId.push(ruleId || 0)
        const cartData: CartStorageResponseType = await ky.post('http://localhost:9980/cart', {
            body: JSON.stringify({
                productsId,
                rulesId
            })
        }).json();

        set({ ...cartData.data })
    },
    removeAllProducts: () => set({ products: [], totalPrice: '0' }),
    removeAllRules: async () => {
        const addProduct = get().addProduct;
        set({ rules: [] })
        addProduct(null);
    },
}),
    {
        name: 'cart',
    }
))