import type { ResponseType } from './response';

export type ProductType = {
    id: number
    name: string
    price: number
    type: string
    created: string
}

export type ResponseProductType = ResponseType & {
    data: ProductType[]
}