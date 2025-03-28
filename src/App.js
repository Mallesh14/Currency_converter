// import logo from './logo.svg';
import './App.css';
import {useCallback, useEffect,useMemo,useState} from 'react';
import { useRef } from 'react';
// import {const [state, setstate] = useState(initialState)}
const API_URL="https://api.exchangerate-api.com/v4/latest/";
function App() {
  const [amount,setAmount]=useState("");
  const[fromCurrency,setfromCurrency]=useState("USD");
  const[toCurrency,setToCurrency]=useState("INR");
  const[exchangeRates,setExchangeRates]=useState({});
  const [convertedAmount,setConvertedAmount]=useState(null);
  const inputRef=useRef();
 useEffect(()=>{
  fetch(`${API_URL}${fromCurrency}`)
  .then((res) =>res.json())
  .then((data)=>setExchangeRates(data.rates))
  .catch((err)=>console.error("FAIled to fetch data"))
 },[fromCurrency]);
 //console.log(exchangeRates);
 useEffect(()=>{
  inputRef.current.focus();
 })

const availableCurrencies=useMemo(
  ()=> Object.keys(exchangeRates),
  [exchangeRates]
);
const convert=useCallback(()=>{
  if(exchangeRates[toCurrency])
  {
    const rate=exchangeRates[toCurrency];
    setConvertedAmount((amount*rate).toFixed(2));
  }
},[amount,toCurrency,exchangeRates])


 //console.log(convertedAmount);

  return (
    <div className="App">
      <h1>CURRENCY CONVERTER</h1>
      <div>
        <input type="number" ref={inputRef} value={amount} onChange={(e)=>setAmount(e.target.value)}
        />
        <select value={fromCurrency} 
        onChange={(e)=>setfromCurrency(e.target.value)}>
         { availableCurrencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <span>TO</span>
        <select value={toCurrency} 
        onChange={(e)=>setToCurrency(e.target.value)}>
         { availableCurrencies.map((cur) => (
            <option key={cur} value={cur}>{cur}</option>
          ))}
        </select>
        <button onClick={convert}>CONVERT</button>

        {convertedAmount&&(
          <h2>{amount} {fromCurrency}={convertedAmount} {toCurrency}</h2>
        )}
      </div>


    </div>
    
   

  );
}

export default App;
