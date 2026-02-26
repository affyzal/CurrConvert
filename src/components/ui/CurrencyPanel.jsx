const CurrencyPanel = ({ title, amount, currency, onAmountChange, onCurrencyChange, currencies, direction, placeholder }) => {
  return (
    <div className="flex-1 bg-slate-800 rounded-xl p-4 flex flex-col gap-2 border border-transparent hover:border-white focus-within:border-white transition overflow-hidden">
      <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{title}</span>
      <div className="flex items-center gap-3">
        <input
          value={amount}
          onKeyDown={(e) => {
            if (e.key === 'e' || e.key === '-' || e.key === '+') {
              e.preventDefault()
            }
          }}
          onChange={(e) => {
            const value = e.target.value
            if (value === '' || parseFloat(value) >= 0) {
              onAmountChange(value, direction)
            }
          }}
          type="number"
          placeholder={placeholder}
          min={0}
          className="bg-transparent text-2xl font-bold text-blue-400 focus:outline-none flex-[2] min-w-0 placeholder-slate-600"
        />
        <div className="w-px h-6 bg-slate-600 shrink-0" />
        <select
          value={currency}
          onChange={(e) => onCurrencyChange(e.target.value, direction)}
          className="flex-[1] bg-slate-800 text-sm text-gray-300 focus:outline-none cursor-pointer min-w-0"
        >
          {currencies.map((currency) => (
            <option key={currency.short_code} value={currency.short_code}>
              {currency.short_code} - {currency.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CurrencyPanel