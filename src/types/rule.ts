import type { ResponseType } from './response';

export type RuleType = {
    id: number
    name: string
    discount: number
    type: string
    group: string
}

export type ResponseRuleType = ResponseType & {
    data: RuleType[]
}