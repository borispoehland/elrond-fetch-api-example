import useElrondApi, { IUseElrondApi } from '../lib/useElrondApi'
import { keys } from 'ts-transformer-keys'

export interface IEconomicsFields {
    price: number
    marketCap: number
}

type IUseElrondStatsReturnType = IUseElrondApi<IEconomicsFields>

const fields = keys<IEconomicsFields>() // ["price", "marketCap"]

export const useElrondStats = (): IUseElrondStatsReturnType => {
    return useElrondApi('/economics', { fields: ['price', 'marketCap'] })
}
