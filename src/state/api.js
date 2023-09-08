/* eslint-disable no-undef */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'adminApi',
  tagTypes: [
    'User',
    'Products',
    'Customers',
    'Orders',
    'Geography',
    'Sales',
    'Admins',
    'Performance',
    'Dashboard',
    'Categories',
    'Brands',
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => ({ url: 'client/products', method: 'GET' }),
      providesTags: ['Products'],
    }),
    getCategories: build.query({
      query: () => 'client/categories',
      providesTags: ['Categories'],
    }),
    getBrands: build.query({
      query: () => 'client/brands',
      providesTags: ['Brands'],
    }),
    getCustomers: build.query({
      query: () => 'client/customers',
      providesTags: ['Customers'],
    }),
    getOrders: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/orders',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['Orders'],
    }),
    getGeography: build.query({
      query: () => 'client/geography',
      providesTags: ['Geography'],
    }),
    getSales: build.query({
      query: () => 'sales/sales',
      providesTags: ['Sales'],
    }),
    getAdmins: build.query({
      query: () => 'management/admins',
      providesTags: ['Admins'],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ['Performance'],
    }),
    getDashboard: build.query({
      query: () => 'general/dashboard',
      providesTags: ['Dashboard'],
    }),
    createProduct: build.mutation({
      query: (data) => ({ url: 'client/products', method: 'POST', body: data }),
      invalidatesTags: ['Post'],
    }),
    updateProduct: build.mutation({
      query: (updatePostData) => {
        const { id, ...data } = updatePostData
        return { url: `client/products/${id}`, method: 'PUT', body: data }
      },
      invalidatesTags: ['Post'],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({ url: `client/products/${id}`, method: 'DELETE' }),
    }),
    createCategory: build.mutation({
      query: (data) => ({ url: 'client/categories', method: 'POST', body: data }),
      invalidatesTags: ['Post'],
    }),
    updateCategory: build.mutation({
      query: (updatePostData) => {
        const { id, ...data } = updatePostData
        return { url: `client/categories/${id}`, method: 'PUT', body: data }
      },
      invalidatesTags: ['Post'],
    }),
    deleteCategory: build.mutation({
      query: (id) => ({ url: `client/categories/${id}`, method: 'DELETE' }),
    }),
    createBrand: build.mutation({
      query: (data) => ({ url: 'client/brands', method: 'POST', body: data }),
      invalidatesTags: ['Post'],
    }),
    updateBrand: build.mutation({
      query: (updatePostData) => {
        const { id, ...data } = updatePostData
        return { url: `client/brands/${id}`, method: 'PUT', body: data }
      },
      invalidatesTags: ['Post'],
    }),
    deleteBrand: build.mutation({
      query: (id) => ({ url: `client/brands/${id}`, method: 'DELETE' }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetOrdersQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = api
