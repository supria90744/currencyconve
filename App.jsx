import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";

function App() {
  const[amount,setAmount]=useState(1);
  const[fromcur,setFromCur]=useState("USD");
  const[tocur,setToCur]=useState("INR");
  const[conamt,setConAmt]=useState(null);
  const[exchangerate,setExchangerate]=useState(null);

  useEffect(()=>{
    const getExchangerate=async ()=>{
      try{
        let url=`https://api.exchangerate-api.com/v4/latest/${fromcur}`;

        const response=await axios.get(url);
        console.log(response);
        setExchangerate(response.data.rates[tocur]);
      }catch(error){
        console.error("Error fetching exchange rate:",error);
      }
    }
    getExchangerate();
  },[fromcur,tocur]);
  useEffect(()=>{
    if(exchangerate !== null){
      setConAmt((amount * exchangerate).toFixed(2));
    }
  },[amount,exchangerate]);

  const handleAmt =(e) =>{
    const val=parseFloat(e.target.value);
    setAmount(isNaN(val)? 0:val)
  }
  const handleFromcur=(e)=>{
    setFromCur(e.target.value);
  }
  const handleTocur=(e)=>{
    setToCur(e.target.value);
  }

  return (
    <>
      <div className="currency">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Converter</h1>
          <div className="inputs">
            <label htmlFor="amt">Amount:</label>
            <input type="number" id="amt" value={amount} onChange={handleAmt}/>
          </div>
          <div className="inputs">
            <label htmlFor="fromcur">From Currency:</label>
            <select id="fromcur" value={fromcur} onChange={handleFromcur}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japnese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="inputs">
            <label htmlFor="tocur">To Currency:</label>
            <select id="tocur" value={tocur} onChange={handleTocur}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japnese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromcur} is equal to {conamt} {tocur}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
