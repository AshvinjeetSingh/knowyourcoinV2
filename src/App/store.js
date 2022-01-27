import { configureStore} from '@reduxjs/toolkit'
import {cryptoApi} from '../services/cryptoAPI'
import {bingNewsApi} from '../services/bingNewsAPI'
import {coinGeckoApi} from '../services/coingeckoAPI'
export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [bingNewsApi.reducerPath]:bingNewsApi.reducer,
        [coinGeckoApi.reducerPath]:coinGeckoApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware)
})