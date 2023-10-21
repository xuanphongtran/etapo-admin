import { Tooltip } from '@mui/material'
import React from 'react'
const status = [
  { value: 1, label: 'Đang chờ xác nhận' },
  { value: 2, label: 'Đã xác nhận, chờ vận chuyển' },
  { value: 3, label: 'Đang vận chuyên' },
  { value: 4, label: 'Giao hàng thành công' },
]
export const columns = [
  //   {
  //     field: '_id',
  //     headerName: 'ID',
  //     flex: 1,
  //   },
  // {
  //   field: 'userId',
  //   headerName: 'Id Khách Hàng',
  //   flex: 1,
  // },
  {
    field: 'fullName',
    headerName: 'Tên Khách Hàng',
    width: 150,
    renderCell: (params) => (params.row.fullName ? params.row.fullName : params.row.userId),
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    width: 180,
  },
  {
    field: 'paid',
    headerName: 'Phương thức thanh toán',
    width: 180,
    renderCell: (params) => (params.row.paid === false ? 'COD' : 'VNPAY'),
  },
  {
    field: 'status',
    headerName: 'Trạng thái đơn hàng',
    width: 180,
    renderCell: (params) => status.find((e) => e.value == params.row.status).label,
  },
  {
    field: 'products',
    headerName: 'Số sản phẩm',
    width: 100,

    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: 'cost',
    headerName: 'Tổng tiền',
    width: 150,
    renderCell: (params) => `${params.value.toLocaleString()}đ`,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    sortable: false,
    width: 400,

    renderCell: (params) => (
      <Tooltip
        title={`${params.row?.address || ''}, ${params.row?.ward || ''}, ${
          params.row?.district || ''
        }, ${params.row?.province || ''}`}
        arrow
      >
        <div>{`${params.row?.address || ''}, ${params.row?.ward || ''}, ${
          params.row?.district || ''
        }, ${params.row?.province || ''}`}</div>
      </Tooltip>
    ),
  },
  {
    field: 'list',
    headerName: 'Sản phẩm',
    width: 200,
    sortable: false,
    renderCell: (params) =>
      params.row.products?.map((l) => (
        <>
          {l?.name} x{l?.quantity}
          <br />
        </>
      )),
  },
]
