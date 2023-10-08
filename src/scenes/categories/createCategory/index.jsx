import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, useTheme, Grid, MenuItem } from '@mui/material'
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from 'state/api'
const level = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
]
const CategotyForm = ({ dataToEdit, isOpen, setIsOpen, refetch, setNotify }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm()
  const theme = useTheme()
  const [createCategory, createError] = useCreateCategoryMutation()
  const [updateCategory, updateError] = useUpdateCategoryMutation()
  const { data, isLoading } = useGetCategoriesQuery()

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setValue('name', dataToEdit.name)
      setValue('parent', dataToEdit.category)
    } else {
      reset()
    }
  }, [isOpen])

  const handleCreate = (data) => {
    if (!dataToEdit) {
      createCategory(data)
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
      refetch()
    } else {
      const id = dataToEdit._id
      updateCategory({ id, ...data })
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
        <h2>Tạo danh mục sản phẩm mới</h2>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Tên danh mục"
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? 'Vui lòng nhập tên danh mục' : ''}
              />
            </Grid>
            <Grid item xs={4}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <TextField
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  label="Danh mục cha"
                  select
                  defaultValue=""
                  {...register('parent')}
                >
                  {data.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Grid item xs={4}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Cấp bậc"
                select
                defaultValue=""
                {...register('level')}
              >
                {level.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sx={{ justifyContent: 'space-around', display: 'flex' }}>
              <Button type="submit" variant="contained">
                Tạo danh mục sản phẩm
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

export default CategotyForm
