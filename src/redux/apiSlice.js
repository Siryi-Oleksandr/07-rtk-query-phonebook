import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contacts',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://642278cc77e7062b3e1a616c.mockapi.io/api/v1',
  }),
  tagTypes: ['Contact'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts`,
      providesTags: ['Contact'],
    }),
    addContact: builder.mutation({
      query: ({ name, number }) => ({
        url: `/contacts`,
        method: 'POST',
        body: { name, number },
      }),
      invalidatesTags: ['Contact'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/contacts/${id}`,
        method: 'DELETE',
      }),
      // Invalidates all queries that subscribe to this Post `id` only.
      invalidatesTags: ['Contact'],
    }),
    editContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `/contacts/${id}`,
        method: 'PUT',
        body: { name, number },
      }),
      invalidatesTags: ['Contact'],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
  useEditContactMutation,
} = contactsApi;
