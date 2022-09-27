import useSWR from 'swr'

type IQueryParams = Record<
    string,
    undefined | string | number | string[] | number[]
>

interface IUseElrondApiOptions {
    fetchOnlyIf?: boolean
    timeout?: number
}

export interface IUseElrondApi<T = {}> {
    data: T
    isLoading: boolean // true when the API returned us some data already
    isReFetching: boolean // true when the app RE-FETCHES data in the background
    isInactive: boolean // true when the "fetchOnlyIf" option is false, hence no fetch is happening
    error: IError
}

export interface IError {
    info: string
    status: number
}

const fetchElrondApi = async (
    endpoint: string,
    queryParams: IQueryParams,
    options: IUseElrondApiOptions
) => {
    // make sure that the request aborts after a certain timeout
    const { timeout } = options
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), timeout)

    // convert args
    const hasParams = Boolean(Object.keys(queryParams).length)
    const mappedParams: Record<string, string> = Object.fromEntries(
        Object.entries(queryParams).map(([k, v]) => [
            k,
            Array.isArray(v) ? v.join(',') : String(v),
        ])
    )

    const response = await fetch(
        `https://api.elrond.com${endpoint}${
            hasParams ? `?${new URLSearchParams(mappedParams).toString()}` : ''
        }`,
        {
            ...options,
            signal: controller.signal,
        }
    )
    clearTimeout(id)

    if (!response.ok) {
        const error = await response.json()
        console.error(error)
        throw {
            info: JSON.stringify(error),
            status: response.status,
        } as IError
    }

    return response.json()
}

const defaultOptions: IUseElrondApiOptions = {
    fetchOnlyIf: true,
    timeout: 10000, // 10 seconds
}

function useElrondApi<T>(
    endpoint: string,
    args: IQueryParams = {},
    propOptions: IUseElrondApiOptions = {}
): IUseElrondApi<T> {
    // define the options
    const options = { ...defaultOptions, ...propOptions }
    const { fetchOnlyIf } = options

    const { data, isValidating, error } = useSWR(
        fetchOnlyIf ? [endpoint, args, options] : null,
        fetchElrondApi
    )

    const isInactive = !fetchOnlyIf
    const isLoading = isInactive ? false : data === undefined && !error

    return {
        data: data as T,
        isLoading,
        isReFetching: isValidating && !isLoading,
        isInactive,
        error,
    }
}

export default useElrondApi
