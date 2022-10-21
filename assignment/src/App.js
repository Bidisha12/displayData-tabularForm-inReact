import './App.css';
import React, { useEffect, useState} from 'react';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems([result['Time Series (5min)']]);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

 

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
              <table>
              <thead>
              <tr>
                <th>DateTime</th>
                <th>Open</th>          
                <th >High</th>
                <th >Low</th>
                <th >Close</th>
                <th >Volume</th>
              </tr>
              </thead>
              <tbody>
              {
                Object.entries(items[0]).map(([key,value],index)=>{
                   return (
                   <tr> 
                      <td>{key}</td>
                      {Object.values(value).map(x => <td>{x}</td>)}
                   </tr>
                   )
                })  
              }
              </tbody>
            </table>
            
      </>
    );
  }
}

export default App;
