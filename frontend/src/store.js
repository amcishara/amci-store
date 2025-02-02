import {configureStore} from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';
import  cartSliceReducer  from './slices/cartSlices';

const store =configureStore({
reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer
},
middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
DevTools: true,
});

export default store;