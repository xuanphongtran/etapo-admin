// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import { Search } from '@mui/icons-material'
import {
  IconButton,
  TextField,
  InputAdornment,
  FormControlLabel,
  Typography,
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
} from '@mui/material'
import { GridToolbarContainer } from '@mui/x-data-grid'
import FlexBetween from './FlexBetween'

// eslint-disable-next-line react/prop-types
const OrderGridCustomToolbar = ({ searchInput, setSearchInput, setSearch, setStatus }) => {
  const [value, setValue] = useState(1)

  const handleChange = (event) => {
    setValue(event.target.value)
    setStatus(event.target.value)
  }
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FormControl>
          <FlexBetween>
            <FormLabel sx={{ mr: '10px' }}>Trạng thái đơn hàng</FormLabel>
            <RadioGroup value={value} row onChange={handleChange}>
              <FormControlLabel value={1} control={<Radio />} label="Đang chờ xác nhận" />
              <FormControlLabel value={2} control={<Radio />} label="Đã xác nhận, chờ vận chuyển" />
              <FormControlLabel value={3} control={<Radio />} label="Đang vận chuyên" />
              <FormControlLabel value={4} control={<Radio />} label="Giao hàng thành công" />
            </RadioGroup>
          </FlexBetween>
        </FormControl>
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

export default OrderGridCustomToolbar
