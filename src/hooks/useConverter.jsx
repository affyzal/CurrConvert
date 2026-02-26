import { useState, useCallback, useEffect, useRef } from 'react'
import { useDebounce } from 'use-debounce'

const useConverter = (getExchangeRate) => {
  const [fromCurrency, setFromCurrency] = useState('GBP')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [activeDirection, setActiveDirection] = useState(null)
  const [debouncedFromAmount] = useDebounce(fromAmount, 500)
  const [debouncedToAmount] = useDebounce(toAmount, 500)
  const [rate, setRate] = useState(null)
  const hasFetched = useRef(false)

  useEffect(() => {
    if (hasFetched.current) return
    hasFetched.current = true
    const fetchRate = async () => {
      const result = await getExchangeRate(fromCurrency, toCurrency, 1)
      setRate(result)
    }
    fetchRate()
  }, [fromCurrency, toCurrency, getExchangeRate])

  useEffect(() => {
    if (!debouncedFromAmount || activeDirection !== 'from') return
    const fetch = async () => {
      const result = await getExchangeRate(fromCurrency, toCurrency, debouncedFromAmount)
      setToAmount(result ? parseFloat(result).toFixed(2) : '')
    }
    fetch()
  }, [debouncedFromAmount, fromCurrency, toCurrency, getExchangeRate, activeDirection])

  useEffect(() => {
    if (!debouncedToAmount || activeDirection !== 'to') return
    const fetch = async () => {
      const result = await getExchangeRate(toCurrency, fromCurrency, debouncedToAmount)
      setFromAmount(result ? parseFloat(result).toFixed(2) : '')
    }
    fetch()
  }, [debouncedToAmount, fromCurrency, toCurrency, getExchangeRate, activeDirection])

  const handleAmountChange = useCallback((value, direction) => {
    setActiveDirection(direction)
    if (direction === 'from') {
      setFromAmount(value)
    } else {
      setToAmount(value)
    }
  }, [])

  const handleSelectChange = useCallback(async (value, direction) => {
    if (direction === 'from') {
      setFromCurrency(value)
      const result = await getExchangeRate(value, toCurrency, fromAmount || 1)
      setToAmount(result ? parseFloat(result).toFixed(2) : '')
    } else {
      setToCurrency(value)
      const result = await getExchangeRate(fromCurrency, value, fromAmount || 1)
      setToAmount(result ? parseFloat(result).toFixed(2) : '')
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

  return { fromCurrency, toCurrency, toAmount, fromAmount, handleAmountChange, handleSelectChange, handleSwap, rate }
}

export default useConverter