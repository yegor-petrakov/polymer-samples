import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'DELETE',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    // console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    // console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {

                try {
                    // console.log("----------------- onQueryStarted -----------------")
                    const { data } = await queryFulfilled
                    // console.log(data)
                    const { accessToken } = data
                    // console.log(data)
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    // console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authApiSlice 