import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bingNewsHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': '75fe0bb675msh5fa92dbe4a8c763p1a843cjsn6c9b6ccf88e8'
}

const baseUrl= 'https://bing-news-search1.p.rapidapi.com/news'
const createRequest = (url) =>({url,headers:bingNewsHeaders})

export const bingNewsApi= createApi({
  reducerPath:'bingNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}
  ),
  endpoints: (builder)=>({
    getBingNews: builder.query({
      query: (val)=>createRequest(`/search/${val}`)
    })
  })

})
export const { useGetBingNewsQuery} = bingNewsApi;
