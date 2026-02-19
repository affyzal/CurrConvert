import { useState, useEffect } from 'react'
import useCurrencies from './hooks/useCurrency'
import useConverter from './hooks/useConverter'
import SwapButton from './components/ui/SwapButton'
import CurrencyPanel from './components/ui/CurrencyPanel'


function App() {
  const { currencies, converting, error, getExchangeRate } = useCurrencies()
  const { fromCurrency, toCurrency, toAmount, fromAmount, handleAmountChange, handleSelectChange, handleSwap } = useConverter(getExchangeRate)
  const [rate, setRate] = useState(null)

  useEffect(() => {
    const fetchRate = async () => {
      const result = await getExchangeRate(fromCurrency, toCurrency, 1)
      setRate(result)
    }
    fetchRate()
  }, [fromCurrency, toCurrency, getExchangeRate])

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-5xl w-full">

        <h1 className="text-5xl font-bold mb-4 text-center">
          {
            error ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">{error}</span>
            ) : (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Currency Converter
              </span>
            )
          }
        </h1>
        <p className="text-center text-gray-400 mb-12 text-lg">
          Live exchange rates
        </p>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8">
          <div className="flex items-center gap-4">

            <CurrencyPanel
              title="From"
              amount={fromAmount}
              currency={fromCurrency}
              onAmountChange={handleAmountChange}
              onCurrencyChange={handleSelectChange}
              currencies={currencies}
              direction="from"
              placeholder="1"
             />

            <SwapButton onClick={handleSwap} converting={converting} />     

            <CurrencyPanel
              title="To"
              amount={toAmount}
              currency={toCurrency}
              onAmountChange={handleAmountChange}
              onCurrencyChange={handleSelectChange}
              currencies={currencies}
              direction="to"
              placeholder={rate}
             />
            

          </div>

          <p className="text-gray-500 text-sm text-center mt-6">1 {fromCurrency} = {rate} {toCurrency}</p>

        </div>
      </div>
    </main>
  )
}

export default App