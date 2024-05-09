import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const usersAdapter = createEntityAdapter({})

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => ({
                url: '/users',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'User', id })),
                        { type: 'User', id: 'LIST' },
                    ]
                    : [{ type: 'User', id: 'LIST' }],
        }),
        getUserById: builder.query({
            query: (id) => ({
                url: `/users/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'User', id })),
                        { type: 'User', id: 'LIST' },
                    ]
                    : [{ type: 'User', id: 'LIST' }],
        }),
        addNewUser: builder.mutation({
            query: initialVault => ({
                url: '/users',
                method: 'POST',
                body: {
                    ...initialVault,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useAddNewUserMutation
} = usersApiSlice

