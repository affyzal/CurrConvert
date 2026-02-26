import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [converting, setConverting] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get('https://api.currencybeacon.com/v1/currencies', {
          params: { api_key: API_KEY }
        })
        setCurrencies(response.data.response)
      } catch (error) {
        setError('Failed to fetch currencies')
        console.error('Error fetching currencies:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCurrencies()
  }, [])

  const getExchangeRate = useCallback(async (from, to, amount) => {
    try {
      setError(null)
      setConverting(true)
      const response = await axios.get('https://api.currencybeacon.com/v1/convert', {
        params: {
          api_key: API_KEY,
          from,
          to,
          amount
        }
      })
      return response.data.response.value
    } catch (error) {
      setError('Failed to fetch exchange rate')
      console.error('Error fetching exchange rate:', error)
      return null
    } finally {
      setConverting(false)
    }
  }, [API_KEY])

  return { currencies, loading, error, getExchangeRate, converting }
}

export default useCurrencies