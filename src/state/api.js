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
    'Sales',
    'Admins',
    'Performance',
    'Dashboard',
    'Categories',
    'Brands',
    'Properties',
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ['User'],
    }),
    getProducts: build.query({
      query: () => ({ url: 'product', method: 'GET' }),
      providesTags: ['Products'],
    }),
    getProperties: build.query({
      query: () => ({ url: 'product/properties', method: 'GET' }),
      providesTags: ['Properties'],
    }),
    getCategories: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/categories',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
      providesTags: ['Categories'],
    }),
    getBrands: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: 'client/brands',
        method: 'GET',
        params: { page, pageSize, sort, search },
      }),
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
      query: (data) => ({ url: 'product', method: 'POST', body: data }),
      invalidatesTags: ['Post'],
    }),
    updateProduct: build.mutation({
      query: (updatePostData) => {
        const { id, ...data } = updatePostData
        return { url: `product/${id}`, method: 'PUT', body: data }
      },
      invalidatesTags: ['Post'],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({ url: `product/${id}`, method: 'DELETE' }),
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
    createProperty: build.mutation({
      query: (data) => ({ url: 'product/property', method: 'POST', body: data }),
      invalidatesTags: ['Post'],
    }),
    updateProperty: build.mutation({
      query: (updatePostData) => {
        const { id, ...data } = updatePostData
        return { url: `product/property/${id}`, method: 'PUT', body: data }
      },
      invalidatesTags: ['Post'],
    }),
    deleteProperty: build.mutation({
      query: (id) => ({ url: `product/property/${id}`, method: 'DELETE' }),
    }),
  }),
})

export const {
  useGetUserQuery,
  useGetCategoriesQuery,
  useGetBrandsQuery,
  useGetProductsQuery,
  useGetPropertiesQuery,
  useGetCustomersQuery,
  useGetOrdersQuery,
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
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} = api
