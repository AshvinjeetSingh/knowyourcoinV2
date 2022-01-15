import React,{useEffect,useState} from 'react'
import {useGetSuggestionQuery } from "../services/cryptoAPI";

const Exchanges = () => {
  const { data: cryptosList, isFetching } = useGetSuggestionQuery();
  const [cryptos, setCryptos] = useState();

  useEffect(() => {
      console.log("cryptosList",cryptosList)
    setCryptos(cryptosList?.data?.name);
  }, [cryptosList]);

  useEffect(()=>{
    console.log(cryptos)
  },[cryptos])

    return (
        <div>
            Exchanges
        </div>
    )
}

export default Exchanges