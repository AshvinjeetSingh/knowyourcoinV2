import React,{useEffect,useState} from 'react'
import {useGetExchangesQuery} from "../services/cryptoAPI";

const Exchanges = () => {
  const { data: exchangesList, isFetching,isLoading,isSuccess,isError } = useGetExchangesQuery();
  const [exchanges, setExchanges] = useState();

  useEffect(() => {
      console.log("exchangeList",exchangesList)
    setExchanges(exchangesList?.data);
  }, [exchangesList]);

  useEffect(()=>{
    console.log(exchanges)
  },[exchanges])

    return (
        <div>
            Exchanges
        </div>
    )
}

export default Exchanges