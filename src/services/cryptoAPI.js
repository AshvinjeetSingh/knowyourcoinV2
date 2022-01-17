import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const CryptoApiHeaders={
  'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_API_CRYPTO_KEY
}

const baseUrl= 'https://coinranking1.p.rapidapi.com'
const createRequest = (url) =>({url,headers:CryptoApiHeaders})

export const cryptoApi= createApi({
  reducerPath:'cryptoApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_CRYPTO_RAPIDAPI_BASEURL}
  ),
  endpoints: (builder)=>({
    getCryptos: builder.query({
      query: (count)=>createRequest(`/coins?limit=${count}`)
    }),
    getCryptoOffset:builder.query({
      query: (count)=>createRequest(`/coins?offset=${count}`)
    }),
    getSuggestion: builder.query({
      query: (value) => createRequest(`/search-suggestions?query=${value}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest('/exchanges'),
    }),
    getCryptoDetails: builder.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),

    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => createRequest(`coin/${coinId}/history?timeperiod=${timeperiod}`),
    }),
  })

})
export const { useGetCryptosQuery,useGetSuggestionQuery,useGetCryptoOffsetQuery,useGetExchangesQuery,useGetCryptoDetailsQuery,useGetCryptoHistoryQuery } = cryptoApi;
