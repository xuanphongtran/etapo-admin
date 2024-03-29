// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
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
import Header from 'components/Header'
import { DataGrid } from '@mui/x-data-grid'
import Notification from 'components/dialog/Notification'
import { columns } from './brand.schema'
import CategotyForm from './createBrand'
import { useDeleteBrandMutation, useGetBrandsQuery } from 'state/api'
import DataGridCustomToolbar from 'components/DataGridCustomToolbar'

const Brands = () => {
  const theme = useTheme()

  // values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState('')

  const [searchInput, setSearchInput] = useState('')
  const { data, isLoading, refetch } = useGetBrandsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

  const [deleteBrand] = useDeleteBrandMutation()
  const [dataDetail, setDataDetail] = useState()
  const [isOpen, setIsOpen] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const [selectedRows, setSelectedRows] = useState([])

  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })

  const handleOpenCreate = () => {
    setDataDetail(null)
    setIsOpen(!isOpen)
  }
  const handleRefech = () => {
    refetch()
  }
  const handleUpdateCategory = () => {
    if (selectedRows.length === 1) {
      const result = data.find((e) => e._id === selectedRows[0])
      setDataDetail(result)
      setIsOpen(true)
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
  const handleDeleteCategory = () => {
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
  const handleConfirmDelete = () => {
    deleteBrand(selectedRows[0])
    setNotify({
      isOpen: true,
      message: 'Xoá thành công',
      type: 'success',
    })
    setOpenConfirm(false)
    refetch()
  }

  const onRowSelectionModelChange = (ev) => {
    setSelectedRows(ev)
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Thương Hiệu" />
      <Box m="1rem 0">
        <Button sx={{ marginRight: '1rem' }} variant="contained" onClick={handleOpenCreate}>
          Tạo Thương Hiệu Mới
        </Button>
        <Button sx={{ marginRight: '1rem' }} variant="contained" onClick={handleUpdateCategory}>
          Cập nhập Thương Hiệu
        </Button>
        <Button
          sx={{ marginRight: '1rem' }}
          variant="contained"
          color="error"
          onClick={handleDeleteCategory}
        >
          Xoá Thương Hiệu
        </Button>
        {/* Dialog Confirm */}
        <Dialog
          sx={{ backgroundColor: theme.palette.primary[700] }}
          open={openConfirm}
          onClose={() => setOpenConfirm(false)}
        >
          <DialogTitle>{'Bạn có chắc chắn sẽ xoá Thương Hiệu ?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sẽ không thể khôi phục sau khi xoá, hãy chắc chắn về điều này
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpenConfirm(false)}>
              Huỷ
            </Button>
            <Button variant="outlined" color="error" onClick={handleConfirmDelete} autoFocus>
              Xoá
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog Confirm */}
      </Box>
      <Notification notify={notify} setNotify={setNotify} />

      <CategotyForm
        dataToEdit={dataDetail}
        isOpen={isOpen}
        setIsOpen={handleOpenCreate}
        refetch={handleRefech}
        setNotify={setNotify}
      />
      <Header subtitle="Danh sách thương hiệu" />

      <Box
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
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
          rows={(data && data.brands) || []}
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
          components={{ Toolbar: DataGridCustomToolbar }}
          componentsProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
          onRowSelectionModelChange={onRowSelectionModelChange}
        />
      </Box>
    </Box>
  )
}

export default Brands
