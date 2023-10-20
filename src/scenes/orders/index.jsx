// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Box, Button, useTheme } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useGetOrdersQuery } from 'state/api'
import Header from 'components/Header'
import { columns } from './order.schema'
import OrderGridCustomToolbar from 'components/OrderGridCustomToolbar'

const Orders = () => {
  const theme = useTheme()

  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({ field: 'createdAt', sort: 'desc' })
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState()

  const [searchInput, setSearchInput] = useState('')
  const { data, isLoading } = useGetOrdersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    status,
  })
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Đơn hàng" />
      <Box m="1rem 0">
        <Button sx={{ marginRight: '1rem' }} variant="contained">
          Xác nhận đơn hàng
        </Button>
        <Button sx={{ marginRight: '1rem' }} variant="contained">
          Cập nhập trạng thái đơn hàng
        </Button>
        <Button sx={{ marginRight: '1rem' }} variant="contained" color="error">
          Huỷ đơn hàng
        </Button>
      </Box>
      <Header subtitle="Toàn bộ danh sách đơn hàng" />

      <Box
        height="80vh"
        maxWidth="1190px"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            border: 'none',
          },
          '& .Mui-checked': {
            color: `${theme.palette.secondary[200]} !important`,
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
          rows={(data && data.orders) || []}
          columns={columns}
          checkboxSelection
          hideFooterSelectedRowCount
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(...newSortModel)}
          components={{ Toolbar: OrderGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch, status, setStatus },
          }}
        />
      </Box>
    </Box>
  )
}

export default Orders
