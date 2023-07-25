import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, useTheme, Grid, MenuItem } from '@mui/material'
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from 'state/api'
const CategotyForm = ({ dataToEdit, isOpen, setIsOpen, refetch, setNotify }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    control,
    reset,
    formState: { errors },
  } = useForm()
  const theme = useTheme()
  const [createCategory, createError] = useCreateCategoryMutation()
  const [updateCategory, updateError] = useUpdateCategoryMutation()
  const { data, isLoading } = useGetCategoriesQuery()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setValue('name', dataToEdit.name)
      setValue('parent', dataToEdit.category)
      setProperties(dataToEdit.properties)
    } else {
      reset()
      setProperties([])
    }
  }, [isOpen])

  const handleCreate = async (data) => {
    const newData = { ...data, properties }
    if (!dataToEdit) {
      createCategory(newData)
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
      refetch()
    } else {
      const id = dataToEdit._id
      updateCategory({ id, ...newData })
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

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: '', values: '' }]
    })
  }

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev]
      properties[index].name = newName
      return properties
    })
  }

  const handlePropertyValuesChange = (index, property, newValues) => {
    setProperties((prev) => {
      const properties = [...prev]
      properties[index].values = newValues
      return properties
    })
  }

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      return [...prev].filter((p, pIndex) => {
        return pIndex !== indexToRemove
      })
    })
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
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
        <h2>Tạo Danh mục mới</h2>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Tên Danh Mục"
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? 'Vui lòng nhập tên danh mục' : ''}
              />
            </Grid>
            <Grid item xs={6}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <TextField
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  label="Parent"
                  select
                  control={control}
                  {...register('parent', { required: true })}
                  // error={errors.parent ? true : false}
                  // helperText={errors.parent ? 'Vui lòng nhập chọn danh mục cha' : ''}
                >
                  {data.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Grid>
            <Button sx={{ margin: '0.5rem 1rem' }} variant="contained" onClick={addProperty}>
              Thêm thuộc tính sảng phẩm
            </Button>
            {properties.length > 0 &&
              properties.map((property, index) => (
                <Grid
                  key={index}
                  item
                  xs={12}
                  sx={{ justifyContent: 'space-between', display: 'flex' }}
                >
                  <TextField
                    sx={{ width: 500 }}
                    label="Tên thuộc tính"
                    value={property.name}
                    onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
                  />
                  <TextField
                    sx={{ width: 500 }}
                    label="Giá trị"
                    value={property.values}
                    onChange={(ev) => handlePropertyValuesChange(index, property, ev.target.value)}
                  />
                  <Button
                    onClick={() => removeProperty(index)}
                    variant="contained"
                    color="error"
                    height={20}
                  >
                    Xoá
                  </Button>
                </Grid>
              ))}
            <Grid item xs={12} sx={{ justifyContent: 'space-around', display: 'flex' }}>
              <Button type="submit" variant="contained">
                Tạo sản phẩm
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
