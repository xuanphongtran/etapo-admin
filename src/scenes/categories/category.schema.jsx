import React from 'react'

export const columns = [
  {
    field: '_id',
    headerName: 'Số Hiệu Sản Phẩm',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Tên sản phẩm',
    flex: 0.5,
  },
  {
    field: 'list',
    headerName: 'Chi tiết sản phẩm',
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      params.row.properties?.map((a) => (
        <>
          {a}
          <br />
        </>
      )),
  },
]
