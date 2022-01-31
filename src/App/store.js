import { configureStore} from '@reduxjs/toolkit'
import {cryptoApi} from '../services/cryptoAPI'
import {bingNewsApi} from '../services/bingNewsAPI'
export default configureStore({
    reducer:{
        [cryptoApi.reducerPath]:cryptoApi.reducer,
        [bingNewsApi.reducerPath]:bingNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cryptoApi.middleware)
})