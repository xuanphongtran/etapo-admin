/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import { Box, Typography, useTheme } from '@mui/material'

const Header = ({ title, subtitle }) => {
  const theme = useTheme()
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary[100]}
        fontWeight="bold"
        sx={{ mb: '2px' }}
      >
        {title}
      </Typography>{' '}
      <Typography variant="h5" color={theme.palette.secondary[300]}>
        {subtitle}
      </Typography>
    </Box>
  )
}

export default Header
