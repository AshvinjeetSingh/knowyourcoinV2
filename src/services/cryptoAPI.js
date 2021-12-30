import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoApiHeaders={
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
  'x-rapidapi-key': '75fe0bb675msh5fa92dbe4a8c763p1a843cjsn6c9b6ccf88e8'
}

const baseUrl= 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) =>({url,headers:CryptoApiHeaders})

export const cryptoApi= createApi({
  reducerPath:'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl}
  ),
  endpoints: (builder)=>({
    getCryptos: builder.query({
      query: (count)=>createRequest(`/coins?limit=${count}`)
    }),
    getNft: builder.query({
      query: () => createRequest('/nfts'),
    }),
  })

})
export const { useGetCryptosQuery,useGetNftQuery } = cryptoApi;
