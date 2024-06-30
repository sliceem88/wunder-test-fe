import type { ProductType } from "./product"
import type { RuleType } from "./rule"
import type { ResponseType } from './response';

export type CartStorageType = {
    products: ProductType[],
    rules: RuleType[],
    totalPrice: string
    addProduct: (productId: number|null) => void
    addRule: (ruleId: number) => void
    removeAllProducts: () => void
    removeAllRules: () => void
}

export type CartStorageItemsType = {
    products: ProductType[],
    rules: RuleType[],
    totalPrice: string
}

export type CartStorageResponseType = ResponseType & {
    data: CartStorageItemsType
}