import { 
    apiSlice 
} from "../../app/api/apiSlice"

export const codesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCodes: builder.query({
            query: () => ({
                url: '/codes',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Code', id })),
                        { type: 'Code', id: 'LIST' },
                    ]
                    : [{ type: 'Code', id: 'LIST' }],
        }),
        getCodeById: builder.query({
            query: (id) => ({
                url: `/codes/${id}`,
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                },
            }),
        }),
        addNewCode: builder.mutation({
            query: code => ({
                url: '/codes',
                method: 'POST',
                body: code
            }),
            invalidatesTags: [
                { type: 'Code', id: "LIST" }
            ]
        }),
        updateCode: builder.mutation({
            query: (code) => ({
                url: `/codes/${code.id}`,
                method: 'PUT',
                body: code
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Code', id: arg.id },
                { type: 'Code', id: 'LIST' }
            ]
        }),
        deleteCode: builder.mutation({
            query: ({ id }) => ({
                url: `/codes/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Code', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetCodesQuery,
    useGetCodeByIdQuery,
    useAddNewCodeMutation,
    useUpdateCodeMutation,
    useDeleteCodeMutation,
} = codesApiSlice






// // returns the query result object
// export const selectCodesResult = codesApiSlice.endpoints.getCodes.select()

// // creates memoized selector
// const selectCodesData = createSelector(
//     selectCodesResult,
//     codesResult => codesResult.data // normalized state object with ids & entities
// )

// //getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//     selectAll: selectAllCodes,
//     selectById: selectCodeById,
//     selectIds: selectCodeIds
//     // Pass in a selector that returns the codes slice of state
// } = codesAdapter.getSelectors(state => selectCodesData(state) ?? initialState)