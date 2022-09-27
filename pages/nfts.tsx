import { useState } from 'react'
import BackgroundLoadingSpinner from '../src/components/BackgroundLoadingSpinner'
import Card from '../src/components/Card'
import ErrorCard from '../src/components/ErrorCard'
import LoadingSpinner from '../src/components/LoadingSpinner'
import { useUserNFTs } from '../src/hooks/useUserNFTs'
import { HiOutlineBan } from 'react-icons/hi'

const NFTsPage = (): JSX.Element => {
    const [address, setAddress] = useState<string>('')

    const {
        data: { nfts, count },
        error,
        isLoading,
        isReFetching: isFetching,
    } = useUserNFTs(address)

    return (
        <>
            {isFetching && <BackgroundLoadingSpinner />}
            <div className="w-100 flex-center flex-column gap-3">
                <div className="mb-3">
                    <label htmlFor="addressInput" className="form-label">
                        Enter valid erd address:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="addressInput"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="erd1..."
                    />
                </div>
                {(() => {
                    if (!address) {
                        return (
                            <Card
                                title="Get Started"
                                text="Please enter an address above"
                            />
                        )
                    }
                    if (error) {
                        return <ErrorCard {...error} />
                    }
                    if (isLoading) {
                        return <LoadingSpinner />
                    }
                    if (!count) {
                        return (
                            <Card
                                icon={HiOutlineBan}
                                title="No NFTs found"
                                text="This address does not hold any NFTs"
                            />
                        )
                    }

                    return (
                        <div className="nft-grid">
                            {nfts.map((nft) => {
                                const thumbnailUrl = nft.media[0].thumbnailUrl
                                return (
                                    <div key={nft.identifier} className="mb-2">
                                        <Card
                                            title={nft.name}
                                            imgSrc={thumbnailUrl}
                                            text={
                                                nft.metadata?.description ??
                                                'No description provided'
                                            }
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )
                })()}
            </div>
        </>
    )
}

export default NFTsPage
