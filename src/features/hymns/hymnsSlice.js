import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const hymnsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.hymn_number.localeCompare(a.hymn_number),
});

const initialState = hymnsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHymns: builder.query({
      query: () => "/hymns",
      transformResponse: (responseData) => {
        // const loadedHymns = responseData.map((hymn) => {
        //   //hymn.hymn_text = hymn.hymn_text.split("___");
        //   return hymn;
        // });
        console.log("Transform response called");
        return hymnsAdapter.setAll(initialState, responseData);
      },
      providesTags: (result, error, arg) => {
        console.log("Result for hymns is : ", result)
        return [
          { type: "Hymn", id: "LIST" },
          ...result.ids.map((id) => ({ type: "Hmyn", id })),
        ]
      },
    }),
  }),
});

export const { useGetHymnsQuery } = extendedApiSlice;

//return query result object
export const selectHymnsResult = extendedApiSlice.endpoints.getHymns.select();

//Create memoized selector
const selectHymnsData = createSelector(
  selectHymnsResult,
  (hymnsResult) => hymnsResult.data //normalized state object with ids and entities
);


//getSelectors creates these selectors and we rename them with aliases using destructuring
// export const {
//   selectAll: selectAllHymns,
//   selectById: selectHymnById,
//   selectIds: selectHymnIds,
//   //Pass in a selector that returns a hymns slice of state
// } = hymnsAdapter.getSelectors((state) => selectHymnsData(state) ?? initialState);

export const selectAllHymns = createSelector(
    selectHymnsResult,
    hymnsResult => hymnsResult?.data ?? initialState
  )

export const selectHymnById = createSelector(
    selectAllHymns,
    (state, hymn_number) => hymn_number,
    (hymns, hymn_number) => hymns.find(hymn => hymn.hymn_number === hymn_number)
  )
