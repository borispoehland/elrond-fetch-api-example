import { Address } from '@elrondnetwork/erdjs/out'
import { useEffect, useState } from 'react'
import useElrondApi, { IError, IUseElrondApi } from '../lib/useElrondApi'

type INFTType = 'NonFungibleESDT' | 'SemiFungibleESDT' | 'MetaESDT'

const wantedTypes: INFTType[] = ['NonFungibleESDT', 'SemiFungibleESDT']

type IFileType =
    | 'image/avif'
    | 'image/bmp'
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/svg+xml'
    | 'image/webp'
    | 'video/mp4'
    | 'video/mpeg'
    | 'video/ogg'
    | 'video/mp2t'
    | 'video/webm'
    | 'video/3gpp'

export interface INFT {
    identifier: string
    collection: string
    attributes: string
    nonce: number
    type: INFTType
    name: string
    creator: string
    royalties: number
    uris: string[]
    url: string
    media: {
        url: string
        originalUrl: string
        thumbnailUrl: string
        fileType: IFileType
        fileSize: number
    }[]
    isWhitelistedStorage: boolean
    thumbnailUrl: string
    tags: string[]
    metadata: Record<string, string>
    ticker: string
    isNsfw: boolean
}

export interface IUseUserNFTsReturnType
    extends IUseElrondApi<{ nfts: INFT[]; count: number }> {}

export const useUserNFTs = (address?: string): IUseUserNFTsReturnType => {
    const [addressError, setAddressError] = useState<IError>()
    const [checkedAddress, setCheckedAddress] = useState<string>()
    const isAddressValid = address === checkedAddress

    useEffect(() => {
        setCheckedAddress(undefined)
        setAddressError(undefined)
        if (!address) return
        try {
            new Address(address) // if the address has invalid format, this will throw an error
            setCheckedAddress(address)
        } catch (error) {
            // thrown when user enters invalid address
            console.error(error)
            setAddressError({
                info: 'Error parsing Elrond address',
                status: 400,
            })
        }
    }, [address])

    const {
        data: nftCount,
        isLoading: isNFTCountLoading,
        isReFetching: isNFTCountReFetching,
        isInactive: isNFTCountInactive,
        error: nftCountError,
    } = useElrondApi<number>(
        `/accounts/${address}/nfts/count`,
        { type: wantedTypes },
        {
            fetchOnlyIf: isAddressValid,
        }
    )

    const isCountFetched = Boolean(nftCount)

    const {
        data: nfts,
        isLoading: isNFTsLoading,
        isReFetching: isNFTsReFetching,
        isInactive: isNFTsInactive,
        error: nftsError,
    } = useElrondApi<INFT[]>(
        `/accounts/${address}/nfts`,
        { size: nftCount, type: wantedTypes },
        { fetchOnlyIf: isCountFetched }
    )

    return {
        data: {
            nfts: nfts ?? [],
            count: nftCount ?? 0,
        },
        isLoading: isNFTCountLoading ?? isNFTsLoading,
        isReFetching: isNFTCountReFetching ?? isNFTsReFetching,
        isInactive: isNFTCountInactive ?? isNFTsInactive,
        error: addressError ?? nftCountError ?? nftsError,
    }
}
