
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const FinanceNewsApiheader = {
    'x-rapidapi-key': '42c742b1d5mshff7cd18abc4be25p188548jsn8134a3265b3f',
    'x-rapidapi-host': 'real-time-finance-data.p.rapidapi.com'
};

const baseUrl = "https://real-time-finance-data.p.rapidapi.com";

const createRequest = (url) => ({ url, headers: FinanceNewsApiheader });

export const FinanceNewsApi = createApi({
    reducerPath: "FinanceNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getFinanceNews: builder.query({
            query: () =>
                createRequest(
                    `/stock-news?symbol=AAPL%3ANASDAQ&language=en'`
                ),
        }),
    }),
});

export const { useGetFinanceNewsQuery } = FinanceNewsApi;