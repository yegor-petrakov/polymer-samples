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
            // providesTags: (result) =>
            //     result
            //         ? [
            //             ...result.map(({ id }) => ({ type: 'User', id })),
            //             { type: 'User', id: 'LIST' },
            //         ]
            //         : [{ type: 'User', id: 'LIST' }],
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
        // updateUser: builder.mutation({
        //     query: initialUser => ({
        //         url: `/users`,
        //         method: 'PUT',
        //         body: {
        //             ...initialUser,
        //         }

        //     }),
        //     invalidatesTags: (result, error, arg) => [
        //         { type: 'User', id: 'LIST' }
        //     ]
        // }),
        updateUser: builder.mutation({
            query: (user) => ({
                url: `/users/${user.id}`,
                method: 'PUT',
                body: user,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
    })
})

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = usersApiSlice

