// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Search } from '@mui/icons-material'
import {
  IconButton,
  TextField,
  InputAdornment,
  FormControlLabel,
  FormGroup,
  Checkbox,
  Typography,
} from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

// eslint-disable-next-line react/prop-types
const OrderGridCustomToolbar = ({ searchInput, setSearchInput, setSearch, status, setStatus }) => {
  const [checkboxState, setCheckboxState] = useState({
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  })
  const parseStatus = Object.keys(checkboxState).filter((key) => checkboxState[key])
  const handleCheckboxChange = (name) => (event) => {
    setCheckboxState({ ...checkboxState, [name]: event.target.checked })
  }
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <Typography sx={{ mt: '5px', mr: '10px' }} variant="h6" gutterBottom>
            Trạng thái đơn hàng
          </Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxState.checkbox1}
                  onChange={handleCheckboxChange('checkbox1')}
                />
              }
              label="Checkbox 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxState.checkbox2}
                  onChange={handleCheckboxChange('checkbox2')}
                />
              }
              label="Checkbox 2"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxState.checkbox3}
                  onChange={handleCheckboxChange('checkbox3')}
                />
              }
              label="Checkbox 3"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkboxState.checkbox4}
                  onChange={handleCheckboxChange('checkbox4')}
                />
              }
              label="Checkbox 4"
            />
          </FormGroup>
        </FlexBetween>
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
                    setStatus(parseStatus)
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

export default OrderGridCustomToolbar
