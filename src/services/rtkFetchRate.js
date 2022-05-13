// Need to use the React-specific entry point to import createApi
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const exchangeApi = createApi({
  reducerPath: 'exchangeApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.exchangerate-api.com/v4',
  }),
  endpoints: builder => ({
    getRateByCurrency: builder.query({
      query: currency => `latest/${currency}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetRateByCurrencyQuery} = exchangeApi;
