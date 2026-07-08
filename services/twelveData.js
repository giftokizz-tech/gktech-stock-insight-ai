async function getStockData(symbol) {

    const url = `
    https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&outputsize=3&apikey=${process.env.TWELVE_DATA_API_KEY}
    `

    
    const response = await fetch(url)
    
    
    const data = await response.json()
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`)
    }
    
    

    const analysisData = {
       company: symbol,
       exchange: data.meta.exchange,
       currency: data.meta.currency,
       interval: data.meta.interval,

       prices: data.values.map(day =>({
          date: day.datetime,
          open: Number(day.open),
          high: Number(day.high),
          low: Number(day.low),
          close: Number(day.close),
          volume: Number(day.volume)
       }))
    }
    const prices = analysisData.prices
    const firstClose = prices[prices.length - 1].close
    const lastClose = prices[0].close
    const change = lastClose - firstClose
    const percentchange = ((change / firstClose) * 100).toFixed(2)
    const highestHigh = Math.max(...prices.map(day => day.high))
    const lowestLow = Math.min(...prices.map(day => day.low))
    const averageVolume = Math.round(
                  prices.reduce((sum, day) => sum + day.volume, 0) / prices.length)
    const trend = 
        change > 0
        ? "Bullish"
        : change < 0
        ? "Bearish"
        : "Sideways"

    analysisData.summary = {
      trend,
      highestHigh,
      lowestLow,
      averageVolume,
      percentchange
    }

    
    return analysisData
}

export default getStockData
