import React from 'react'

export const columns = [
  //   {
  //     field: '_id',
  //     headerName: 'ID',
  //     flex: 1,
  //   },
  {
    field: 'userId',
    headerName: 'Id Khách Hàng',
    flex: 1,
  },
  {
    field: 'fullName',
    headerName: 'Tên Khách Hàng',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Ngày tạo',
    flex: 1,
  },
  {
    field: 'products',
    headerName: 'Số sản phẩm',
    flex: 0.5,
    sortable: false,
    renderCell: (params) => params.value.length,
  },
  {
    field: 'cost',
    headerName: 'Tổng tiền',
    flex: 0.5,
    renderCell: (params) => `${Number(params.value).toFixed(2)}đ`,
  },
  {
    field: 'address',
    headerName: 'Địa chỉ',
    sortable: false,
    flex: 1,
    valueGetter: (params) =>
      `${params.row?.address || ''} ${params.row?.ward || ''} ${params.row?.district || ''}${
        params.row?.province || ''
      }`,
  },
  {
    field: 'list',
    headerName: 'Sản phẩm',
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      params.row.products?.map((l) =>
        l.price_data ? (
          <>
            {l?.price_data?.product_data.name} x{l?.quantity}
            <br />
          </>
        ) : (
          <></>
        ),
      ),
  },
  {
    field: 'paid',
    headerName: 'Phương thức thanh toán',
    flex: 1,
  },
  {
    field: 'status',
    headerName: 'Trạng thái đơn hàng',
    flex: 1,
  },
]
