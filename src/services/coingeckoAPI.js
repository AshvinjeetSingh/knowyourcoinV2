import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const coinGeckoApiHeaders={
  'x-rapidapi-host': process.env.REACT_APP_GECKO_RAPIDAPI_HOST,
  'x-rapidapi-key': process.env.REACT_APP_API_GECKO_KEY
}

const createRequest = (url) =>({url,headers:coinGeckoApiHeaders})

export const coinGeckoApi= createApi({
  reducerPath:'coinGeckoApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_GECKO_RAPIDAPI_BASEURL}
  ),
  endpoints: (builder)=>({
    getMarketData: builder.query({
      query: ({id,currency,time})=>createRequest(`coins/${id}/market_chart?vs_currency=${currency}&days=${time}`)
    }),
  })

})
export const { useGetMarketDataQuery } = coinGeckoApi;
