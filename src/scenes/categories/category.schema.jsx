export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Tên',
    flex: 1,
  },

  {
    field: 'parent',
    headerName: 'Danh mục cha',
    flex: 1,
    renderCell: (params) => params.row?.parent?.name,
  },
  {
    field: 'level',
    headerName: 'Cấp bậc',
    flex: 1,
  },
]
