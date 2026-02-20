import { useState, useCallback } from 'react'

const useConverter = (getExchangeRate) => {
  const [fromCurrency, setFromCurrency] = useState('GBP')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromAmount, setFromAmount] = useState(null)
  const [toAmount, setToAmount] = useState(null)

  const handleAmountChange = useCallback(async (value, direction) => {
    if (direction === 'from') {
      setFromAmount(value)
      const result = await getExchangeRate(fromCurrency, toCurrency, value)
      setToAmount(result)
    } else {
      setToAmount(value)
      const result = await getExchangeRate(toCurrency, fromCurrency, value)
      setFromAmount(result)
    }
  }, [fromCurrency, toCurrency, getExchangeRate])

  const handleSelectChange = useCallback(async (value, direction) => {
    if (direction === 'from') {
      setFromCurrency(value)
      const result = await getExchangeRate(value, toCurrency, fromAmount || 1)
      setToAmount(result)
    } else {
      setToCurrency(value)
      const result = await getExchangeRate(fromCurrency, value, fromAmount || 1)
      setToAmount(result)
    }
  }, [fromCurrency, toCurrency, fromAmount, getExchangeRate])

  const handleSwap = useCallback(() => {
    const tempCurrency = fromCurrency
    const tempAmount = fromAmount
    setFromCurrency(toCurrency)
    setToCurrency(tempCurrency)
    setFromAmount(toAmount)
    setToAmount(tempAmount)
  }, [fromCurrency, toCurrency, fromAmount, toAmount])

  return { fromCurrency, toCurrency, toAmount, fromAmount, handleAmountChange, handleSelectChange, handleSwap }
}

export default useConverter