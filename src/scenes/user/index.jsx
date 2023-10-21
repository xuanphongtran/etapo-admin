import React from 'react'
import { Box, useTheme } from '@mui/material'
import { useGetUsersQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'

const User = () => {
  const theme = useTheme()
  const { data, isLoading } = useGetUsersQuery()

  const columns = [
    {
      field: '_id',
      headerName: 'ID',
      flex: 0.7,
    },
    {
      field: 'name',
      headerName: 'Tên',
      flex: 0.5,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 0.6,
    },
    {
      field: 'phoneNumber',
      headerName: 'Số điện thoại',
      flex: 0.5,
    },
    {
      field: 'address',
      headerName: 'Địa chỉ',
      flex: 0.4,
    },
    {
      field: 'ward',
      headerName: 'Phường/xá',
      flex: 0.5,
    },
    {
      field: 'district',
      headerName: 'Quận/huyện',
      flex: 0.5,
    },
    {
      field: 'province',
      headerName: 'Tỉnh/thành phố',
      flex: 0.5,
    },
    {
      field: 'orders',
      headerName: 'Số đơn hàng đã đặt',
      flex: 0.6,
    },
  ]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Người dùng" subtitle="Quản lý người dùng và danh sách người dùng" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: theme.palette.primary.light,
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: 'none',
          },
          '& .MuiDataGrid-toolbarContainer .MuiButton-text': {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </Box>
  )
}

export default User
