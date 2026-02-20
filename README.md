# Currency Converter

A currency conversion tool built with React and Vite, powered by the CurrencyBeacon API.

## Getting Started

### Prerequisites

* Node.js (v18 or above)
* A CurrencyBeacon API key

### Installation

1. Clone the repository:
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the project with CurrencyBeacon API Key:

```
VITE_API_KEY=API_KEY_HERE
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser at `http://localhost:5173`

## Project Structure

```
src/
  components/
    ui/
      CurrencyPanel.jsx
      SwapButton.jsx
  hooks/
    useCurrencies.js
    useConverter.js
  App.jsx
  main.jsx
```

## Assumptions & Decisions

### Framework

* Used React with Vite over Next.js as the project is a single-page client-side tool with no need for SSR, routing, or server-side features.
* Used Vite over CRA as CRA is deprecated.

### Architecture

* Separated API and conversion logic into two custom hooks (`useCurrencies` and `useConverter`) to keep `App.jsx` purely presentational and logic separated.
* `getExchangeRate` is wrapped in `useCallback` to maintain a stable reference and prevent an infinite loop in the `useEffect` dependency array
* Handlers in `useConverter` are wrapped in `useCallback` as they are passed as props to child components

### API

* Used the `/v1/currencies` endpoint to fetch all available currencies on load
* Used the `/v1/convert` endpoint for conversion instead of using a rates table, for better accuracy over efficiency
* Assumed the free tier API call limit is enough for the scope of this. In production, debouncing or caching would be added.

### UI & UX

* bidirectional conversion to improve UX and reduce unecessary dropdown usage for same currency pair
* Swap button doubles as a loader to not be instrusive and avoid layout shifts/unecessary components
* Assumed polling updates for rates was not needed and initial rates fetch sufficed

### Styling

* Used Tailwind CSS for styling as it allows for quick and easy UI with JSX inline.
