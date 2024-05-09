import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const codeVaultAdapter = createEntityAdapter({})

const initialState = codeVaultAdapter.getInitialState()

export const codeVaultApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCodeVaultByVaultId: builder.query({
            query: (vaultId) => ({
                url: `/code_vault/${vaultId}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'CodeVault', id })),
                        { type: 'CodeVault', id: 'LIST' },
                    ]
                    : [{ type: 'CodeVault', id: 'LIST' }],
        }),
        addNewCodeVault: builder.mutation({
            query: initialCodeVault => ({
                url: '/code_vault',
                method: 'POST',
                body: {
                    ...initialCodeVault,
                }
            }),
            invalidatesTags: [
                { type: 'Vault', id: "LIST" },
                { type: 'CodeVault', id: "LIST" },
            ]
        }),
        deleteCodeVault: builder.mutation({
            query: ({ id }) => ({
                url: `/code_vault/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: [
                { type: 'Vault', id: "LIST" },
                { type: 'CodeVault', id: "LIST" },
            ]
        }),
    }),
})

export const {
    useGetCodeVaultByVaultIdQuery,
    useAddNewCodeVaultMutation,
    useDeleteCodeVaultMutation
} = codeVaultApiSlice