// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useTheme,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { useAcceptOrderMutation, useCancelOrderMutation, useGetOrdersQuery } from 'state/api'
import Header from 'components/Header'
import { columns } from './order.schema'
import OrderGridCustomToolbar from 'components/OrderGridCustomToolbar'
import Notification from 'components/dialog/Notification'

const Orders = () => {
  const theme = useTheme()

  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({ field: 'createdAt', sort: 'desc' })
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState(1)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [accept, acceptError] = useAcceptOrderMutation()
  const [cancel, cancelError] = useCancelOrderMutation()

  const { data, isLoading, refetch } = useGetOrdersQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
    status,
  })
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })

  const handleAcceptOrder = (status) => {
    if (selectedRows.length === 1) {
      const result = data.orders.find((e) => e._id === selectedRows[0])
      if (result.status == status) {
        accept({ id: result._id, status: status + 1 })
        refetch()
      } else {
        setNotify({
          isOpen: true,
          message: 'Đơn hàng không ở trạng thái này này',
          type: 'error',
        })
      }
    } else if (selectedRows.length > 1) {
      setNotify({
        isOpen: true,
        message: 'Chỉ chọn một thôi',
        type: 'error',
      })
    } else {
      setNotify({
        isOpen: true,
        message: 'Cần chọn một đơn hàng',
        type: 'error',
      })
    }
  }
  const handleCancelOrder = () => {
    if (selectedRows.length === 1) {
      setOpenConfirm(true)
    } else if (selectedRows.length > 1) {
      setNotify({
        isOpen: true,
        message: 'Chọn nhiều qué',
        type: 'error',
      })
    } else {
      setNotify({
        isOpen: true,
        message: 'Chưa chọn kìa',
        type: 'error',
      })
    }
  }
  const handleConfirmCancel = () => {
    cancel({ id: selectedRows[0] })
    setNotify({
      isOpen: true,
      message: 'Huỷ đơn hàng thành công',
      type: 'success',
    })
    setOpenConfirm(false)
    refetch()
  }
  const onRowSelectionModelChange = (ev) => {
    setSelectedRows(ev)
  }
  useEffect(() => {
    refetch()
  }, [status])
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Đơn hàng" />
      <Box m="1rem 0">
        <Button
          sx={{ marginRight: '1rem' }}
          variant="contained"
          onClick={() => handleAcceptOrder(1)}
        >
          Xác nhận đơn hàng
        </Button>
        <Button
          sx={{ marginRight: '1rem' }}
          variant="contained"
          onClick={() => handleAcceptOrder(2)}
        >
          Vận chuyển đơn hàng
        </Button>
        <Button
          sx={{ marginRight: '1rem' }}
          variant="contained"
          onClick={() => handleAcceptOrder(3)}
        >
          Hoàn tất đơn hàng
        </Button>
        <Button
          sx={{ marginRight: '1rem' }}
          variant="contained"
          color="error"
          onClick={handleCancelOrder}
        >
          Huỷ đơn hàng
        </Button>
      </Box>
      {/* Dialog Confirm */}
      <Dialog
        sx={{ backgroundColor: theme.palette.primary[700] }}
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
      >
        <DialogTitle>{'Bạn có chắc chắn sẽ huỷ đơn hàng ?'}</DialogTitle>
        <DialogContent>
          <DialogContentText>Hãy chắc chắn về điều này</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirm(false)}>
            Không
          </Button>
          <Button variant="outlined" color="error" onClick={handleConfirmCancel} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog Confirm */}
      <Notification notify={notify} setNotify={setNotify} />

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
          onRowSelectionModelChange={onRowSelectionModelChange}
        />
      </Box>
    </Box>
  )
}

export default Orders
