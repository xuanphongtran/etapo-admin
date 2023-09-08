import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { TextField, Button, Box, useTheme, Grid, MenuItem } from '@mui/material'
import { useUpdateBrandMutation } from 'state/api'
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
  // const { data, isLoading } = useGetCategoriesQuery()
  const [properties, setProperties] = useState([])

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setValue('name', dataToEdit.name)
      // setValue('parent', dataToEdit.category)
      setProperties(dataToEdit.properties)
    } else {
      reset()
      setProperties([])
    }
    console.log(properties)
  }, [isOpen])

  const handleCreate = (data) => {
    const newData = { ...data, properties }
    if (!dataToEdit) {
      createBrand(newData)
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
      refetch()
    } else {
      const id = dataToEdit._id
      updateBrand({ id, ...newData })
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

  // const addProperty = () => {
  //   setProperties((prev) => {
  //     return [...prev, '']
  //   })
  // }

  // const handlePropertyNameChange = (index, property, newName) => {
  //   setProperties((prev) => {
  //     const properties = [...prev]
  //     properties[index] = newName
  //     return properties
  //   })
  // }

  // const removeProperty = (indexToRemove) => {
  //   setProperties((prev) => {
  //     return [...prev].filter((p, pIndex) => {
  //       return pIndex !== indexToRemove
  //     })
  //   })
  // }

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
            {/* <Button sx={{ margin: '0.5rem 0' }} variant="contained" onClick={addProperty}>
              Thêm thuộc tính
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
                    sx={{ width: 500, marginRight: 5 }}
                    label="Tên thuộc tính"
                    value={property}
                    onChange={(ev) => handlePropertyNameChange(index, property, ev.target.value)}
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
              ))} */}
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
