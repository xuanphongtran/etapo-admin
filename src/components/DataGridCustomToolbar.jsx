// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Search } from '@mui/icons-material'
import { IconButton, TextField, InputAdornment } from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

// eslint-disable-next-line react/prop-types
const DataGridCustomToolbar = ({ searchInput, setSearchInput, setSearch }) => {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween></FlexBetween>
        <TextField
          label="Tìm kiếm..."
          sx={{ mb: '0.5rem', width: '15rem' }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput)
                    setSearchInput('')
                  }}
                >
                  <Search />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar
