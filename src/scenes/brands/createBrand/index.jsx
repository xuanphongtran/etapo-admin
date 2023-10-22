import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, useTheme, Grid, MenuItem } from '@mui/material'
import { useCreateBrandMutation, useUpdateBrandMutation } from 'state/api'
const BrandForm = ({ dataToEdit, isOpen, setIsOpen, refetch, setNotify }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm()
  const theme = useTheme()
  const [createBrand, createError] = useCreateBrandMutation()
  const [updateBrand, updateError] = useUpdateBrandMutation()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setValue('name', dataToEdit.name)
      setProperties(dataToEdit.properties)
    } else {
      reset()
      setProperties([])
    }
  }, [isOpen])

  const handleCreate = (data) => {
    if (!dataToEdit) {
      createBrand(data)
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
      refetch()
    } else {
      const id = dataToEdit._id
      updateBrand({ id, ...data })
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
        width: '50%',
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
        <h2>Tạo Thương Hiệu mới</h2>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Tên Thương Hiệu"
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? 'Vui lòng nhập tên Thương Hiệu' : ''}
              />
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'space-around', display: 'flex' }}>
              <Button type="submit" variant="contained">
                Tạo danh mục thương hiệu
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

export default BrandForm
