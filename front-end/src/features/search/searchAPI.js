import { apiSlice } from "../api/apiSlice";


const searchAPI = apiSlice.injectEndpoints({
    endpoints: (builder)=>({

        getSearch : builder.query({
            query: (q)=>`search?q=${q}`
        })

    })
})

export const {useGetSearchQuery} =  searchAPI