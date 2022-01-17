import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bingNewsHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-key': process.env.REACT_APP_API_NEWS_KEY,
    'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
}
const createRequest = (url) =>({url,headers:bingNewsHeaders})

export const bingNewsApi= createApi({
  reducerPath:'bingNewsApi',
  baseQuery: fetchBaseQuery({baseUrl:process.env.REACT_APP_NEWS_RAPIDAPI_BASEURL}
  ),
  endpoints: (builder)=>({
    getBingNews: builder.query({
      query: ({newsCategory,count})=>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })

})
export const {useGetBingNewsQuery} = bingNewsApi;
