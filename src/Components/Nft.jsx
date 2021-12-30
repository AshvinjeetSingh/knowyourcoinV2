import React from 'react'
import { useGetNftQuery } from '../services/cryptoAPI';
const Nft = () => {
  const { data, isFetching } = useGetNftQuery();
    if(isFetching) return "Loding..."

    console.log(data)
    return (
        <div>
            NFT
        </div>
    )
}

export default Nft
