import React from 'react'

export const columns = [
  {
    field: '_id',
    headerName: 'ID',
    flex: 1,
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.5,
  },

  {
    field: 'parent',
    headerName: 'Parent',
    flex: 0.5,
    renderCell: (params) => params.row.parent?.name,
  },
  {
    field: 'list',
    headerName: 'Properties',
    flex: 1,
    sortable: false,
    renderCell: (params) =>
      params.row.properties?.map(({ name }) => (
        <>
          {name}
          <br />
        </>
      )),
  },
]
