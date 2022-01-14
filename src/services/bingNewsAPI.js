import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const bingNewsHeaders={
    'x-bingapis-sdk': 'true',
    'x-rapidapi-key': '75fe0bb675msh5fa92dbe4a8c763p1a843cjsn6c9b6ccf88e8'
}

const baseUrl= 'https://bing-news-search1.p.rapidapi.com'
const createRequest = (url) =>({url,headers:bingNewsHeaders})

export const bingNewsApi= createApi({
  reducerPath:'bingNewsApi',
  baseQuery: fetchBaseQuery({baseUrl}
  ),
  endpoints: (builder)=>({
    getBingNews: builder.query({
      query: ({newsCategory,count})=>createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
    })
  })

})
export const {useGetBingNewsQuery} = bingNewsApi;
