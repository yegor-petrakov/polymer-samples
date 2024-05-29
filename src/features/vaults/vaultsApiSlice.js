import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const vaultsAdapter = createEntityAdapter({})

const initialState = vaultsAdapter.getInitialState()

export const vaultsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getVaults: builder.query({
            query: () => ({
                url: '/vaults',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Vault', id })),
                        { type: 'Vault', id: 'LIST' },
                    ]
                    : [{ type: 'Vault', id: 'LIST' }],
        }),
        getVaultById: builder.query({
            query: (id) => ({
                url: `/vaults/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Vault', id })),
                        { type: 'Vault', id: 'LIST' },
                    ]
                    : [],

        }),


        updateVault: builder.mutation({
            query: (vault) => ({
                url: `/vaults/${vault.id}`,
                method: 'PUT',
                body: vault,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Vault', id: arg.id },
                { type: 'Vault', id: 'LIST' },
            ],
        }),
        deleteVault: builder.mutation({
            query: ({ id }) => ({
                url: `/vaults/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Vault', id: arg.id }
            ]
        }),
        addNewVault: builder.mutation({
            query: initialVault => ({
                url: '/vaults',
                method: 'POST',
                body: {
                    ...initialVault,
                }
            }),
            invalidatesTags: [
                { type: 'Vault', id: "LIST" }
            ]
        }),
    }),
})

export const {
    useGetVaultsQuery,
    useGetVaultByIdQuery,
    useUpdateVaultMutation,
    useDeleteVaultMutation,
    useAddNewVaultMutation
} = vaultsApiSlice





// // returns the query result object
// export const selectVaultsResult = vaultsApiSlice.endpoints.getVaults.select()

// // creates memoized selector
// const selectVaultsData = createSelector(
//     selectVaultsResult,
//     vaultsResult => vaultsResult.data // normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllVaults,
//     selectById: selectVaultById,
//     selectIds: selectVaultIds
//     // Pass in a selector that returns the vaults slice of state
// } = vaultsAdapter.getSelectors(state => selectVaultsData(state) ?? initialState)