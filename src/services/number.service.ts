export const formatNumber = (
    num: number,
    options: Intl.NumberFormatOptions = {}
) => {
    const numberFormatter = new Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2,
        ...options,
    })
    return numberFormatter.format(num)
}

/*
    Usage example
    const number = 1100000000
    const formattedNumber = formatNumber(number, {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
    })
    console.log(formattedNumber) // $1.10B
*/
