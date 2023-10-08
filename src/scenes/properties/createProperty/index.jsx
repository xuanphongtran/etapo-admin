import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, useTheme, Grid, MenuItem } from '@mui/material'
import { useCreatePropertyMutation, useUpdatePropertyMutation } from 'state/api'
const level = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
]
const PropertyForm = ({ dataToEdit, isOpen, setIsOpen, refetch, setNotify }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm()
  const theme = useTheme()
  const [createProperty, createError] = useCreatePropertyMutation()
  const [updateProperty, updateError] = useUpdatePropertyMutation()
  const [name, setName] = useState()
  const [propertyValue, setPropertyValue] = useState()

  // useEffect(() => {
  //   if (!dataToEdit) {
  //     setName('')
  //     setPropertyValue('')
  //   }
  // }, [isOpen])

  const handleCreate = (e) => {
    e.preventDefault()
    const value = propertyValue.split(',')
    if (!dataToEdit) {
      createProperty({ name, value })
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
      refetch()
    } else {
      const id = dataToEdit._id
      updateProperty({ id, value })
      setNotify({
        isOpen: true,
        message: 'Cập nhập thành công',
        type: 'success',
      })
      refetch()
    }
    setIsOpen(false)
  }

  if (!isOpen) {
    return null
  }

  return (
    <Box
      sx={{
        height: '100%',
        marginBottom: '10px',
      }}
    >
      <Box
        sx={{
          backgroundColor: theme.palette.background.alt,
          color: theme.palette.secondary[100],
          padding: '20px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <h2>Tạo thuộc tính sản phẩm mới</h2>
        <form onSubmit={handleCreate}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Tên thuộc tính"
                value={name}
                defaultValue={dataToEdit ? dataToEdit.name : ''}
                onChange={(ev) => setName(ev.target.value)}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Giá trị"
                defaultValue={dataToEdit ? dataToEdit.value?.toString() : ''}
                value={propertyValue}
                onChange={(ev) => setPropertyValue(ev.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'space-around', display: 'flex' }}>
              <Button type="submit" variant="contained">
                Tạo thuộc tính sản phẩm
              </Button>
              <Button onClick={() => setIsOpen(false)} variant="contained">
                Huỷ
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Box>
  )
}

export default PropertyForm
