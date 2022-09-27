import BackgroundLoadingSpinner from '../src/components/BackgroundLoadingSpinner'
import Card from '../src/components/Card'
import ErrorCard from '../src/components/ErrorCard'
import LoadingSpinner from '../src/components/LoadingSpinner'
import { useElrondStats } from '../src/hooks/useElrondStats'
import { formatNumber } from '../src/services/number.service'

const Home = (): JSX.Element => {
    const {
        data: elrondStats,
        isLoading: isElrondStatsLoading,
        isReFetching: isElrondStatsReFetching,
        error: elrondStatsError,
    } = useElrondStats()

    if (isElrondStatsLoading) {
        return <LoadingSpinner />
    }

    if (elrondStatsError) {
        return <ErrorCard {...elrondStatsError} />
    }

    const { price, marketCap } = elrondStats

    return (
        <div className="flex-center flex-column gap-4">
            {isElrondStatsReFetching && <BackgroundLoadingSpinner />}
            <Card
                title="Current Elrond Price"
                text={formatNumber(price, {
                    style: 'currency',
                    currency: 'USD',
                    currencyDisplay: 'narrowSymbol',
                })}
            />
            <Card
                title="Current Elrond Market Cap"
                text={formatNumber(marketCap, {
                    style: 'currency',
                    currency: 'USD',
                    currencyDisplay: 'narrowSymbol',
                })}
            />
        </div>
    )
}

export default Home
