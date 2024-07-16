import React, { useState, useEffect } from 'react';
import { getData } from './apiConfig';


const Converter: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [input1,setInput1] = useState<number>(1)
  const [input2,setInput2] = useState<number>(1)
  const [currency1,setCurrecny1] = useState('EUR')
  const [currency2,setCurrecny2] = useState('RUB')
  const [currentExchangeRate, setCurrentExchangeRate] = useState<any>(null);  // Текущие курсы валют
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);  // ID интервала ,для остановки обновлений 



  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getData({ defaultCurrecy: currency1}); 
      console.log(res)
      setCurrentExchangeRate(res);
    } catch (error) {
      setError('Failed to fetch currency rate');
    } finally {
      setLoading(false);
    }
  };

  const change1 = (value:any) => {
    setInput1(value)   
    const currentRate = currentExchangeRate[currency2]
    console.log(currentRate)
    setInput2((value * currentRate))
  };

  const change2 = (value:any) => {
    setInput2(value)   
    const currentRate = currentExchangeRate[currency2]
    console.log(currentRate)
    setInput1((value / currentRate))
  };

  useEffect(() => {
    fetchData();  /// 
    if(intervalId){
        clearInterval(intervalId)
    }
    const intervalID = setInterval(fetchData, 20000); // Обновление каждые 20 секунд
    setIntervalId(intervalID)

    return () => clearInterval(intervalID); // Очистка интервала при размонтировании компонента
  }, [currency1,currency2]);
  

  useEffect(() => { 
    if(!currentExchangeRate){
        return
    }
    const currentRate = currentExchangeRate[currency2]
    setInput2((input1 * currentRate))
  },[currentExchangeRate])


    return(
        <div className="converter">
            <div className="converter-input-wrapper">
                <input value={input1}  onChange={(e:React.ChangeEvent<HTMLInputElement>) => change1(e.target.value)} type="number" />
                <div className="input-currency">
                    <select onChange={(e) => setCurrecny1(e.target.value)}>
                        <option value={'EUR'} >EUR</option>    
                        <option value={'USD'} >USD</option>    
                        <option value={'RUB'} >RUB</option>    
                    </select>
                </div>
                
            </div>

            <div className="converter-input-wrapper">
                <input value={input2} onChange={(e:React.ChangeEvent<HTMLInputElement>) =>change2(Number(e.target.value))} type="number" />
                <div className="input-currency">
                <select onChange={(e) => setCurrecny2(e.target.value)}>
                        <option value={'RUB'} >RUB</option>    
                        <option value={'EUR'} >EUR</option>    
                        <option value={'USD'} >USD</option>    
                    </select>
                </div>
            </div>

           {currentExchangeRate && 
                        <div className="converter-rates">
                            1 {currency1} = {currentExchangeRate[currency2].toFixed(2)}{' '}{currency2}
                        </div>}

            {loading && 
                <div className="converter-loading">
                    Loading...
                </div>}

            {error && 
                <div className="converter-loading">
                   ERROR - check api url
                </div>}
        </div>
    )
}

export default Converter