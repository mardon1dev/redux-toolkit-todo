import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const crudApi = createApi({
  reducerPath: "crudApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
  tagTypes: ["Todos"],
  endpoints: (builder) => ({
    getData: builder.query({
      query: () => "/todos",
      providesTags: (result) =>
        result
          ? [...result.map(() => ({ type: "Todos" })), { type: "Todos" }]
          : [{ type: "Todos" }],
    }),
    addData: builder.mutation({
      query: (newData) => ({
        url: "/todos",
        method: "POST",
        body: newData,
      }),
      invalidatesTags: ["Todos"],
    }),
    removeData: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todos"],
    }),
    updateData: builder.mutation({
      query: (updatedData) => ({
        url: `/todos/${updatedData.id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Todos", id }],
    }),
  }),
});

export const {
  useGetDataQuery,
  useAddDataMutation,
  useRemoveDataMutation,
  useUpdateDataMutation,
} = crudApi;
