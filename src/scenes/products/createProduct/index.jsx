import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  useTheme,
  Card,
  CardMedia,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  MenuItem,
  Select,
} from '@mui/material'
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from 'state/api'
const ProductForm = ({ dataToEdit, isOpen, setIsOpen, onSubmit, setNotify }) => {
  const theme = useTheme()
  const [uploadedImages, setUploadedImages] = useState([])
  const [createProduct, create] = useCreateProductMutation()
  const [updateProduct, update] = useUpdateProductMutation()
  const { data, isLoading, error } = useGetCategoriesQuery()
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    control,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setValue('name', dataToEdit.name)
      setValue('price', dataToEdit.price)
      setValue('description', dataToEdit.description)
    } else reset()
  }, [isOpen])

  const handleCreate = (data) => {
    // if (!dataToEdit) {
    //   createProduct(data)
    //   setNotify({
    //     isOpen: true,
    //     message: 'Tạo mới thành công',
    //     type: 'success',
    //   })
    // } else {
    //   updateProduct(dataToEdit._id, data)
    //   setNotify({
    //     isOpen: true,
    //     message: 'Cập nhập thành công',
    //     type: 'success',
    //   })
    // }
    // setIsOpen(false)
    console.log(data)
    onSubmit()
  }

  if (!isOpen) {
    return null
  }
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files)
    const images = files.map((file) => URL.createObjectURL(file))
    setUploadedImages(images)
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
        <h2>Tạo sản phẩm mới</h2>
        <form onSubmit={handleSubmit(handleCreate)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem', color: theme.palette.secondary[100] }}
                label="Tên sản phẩm"
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                helperText={errors.name ? 'Vui lòng nhập tên sản phẩm' : ''}
              />

              <TextField
                multiline
                rows={4}
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Mô tả"
                {...register('description')}
              />

              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                }}
                label="Giá"
                error={errors.price ? true : false}
                {...register('price')}
                helperText={errors.price ? 'Vui lòng nhập giá sản phẩm' : ''}
              />

              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                }}
                label="Giảm giá"
                {...register('discount')}
              />

              {isLoading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error: {error.message}</div>
              ) : (
                <Controller
                  name="category"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <FormControl fullWidth variant="outlined">
                      <InputLabel htmlFor="select-option">Select an option</InputLabel>
                      <Select {...field} label="Select an option" id="select-option">
                        {data.map((option) => (
                          <MenuItem key={option._id} value={option._id}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                />
              )}
            </Grid>
            {/* <Grid item xs={6}>
              <input
                type="file"
                accept="image/*"
                {...register('image', { required: true })}
                multiple
                style={{ display: 'none' }}
                id="image-input"
                onChange={handleImageUpload}
              />
              <label htmlFor="image-input">
                <Button component="span" variant="contained" color="primary">
                  Upload Images
                </Button>
              </label>
              {errors.image && <p>Image is required</p>}

              {uploadedImages.length > 0 && (
                <div>
                  <h3>Uploaded Images:</h3>
                  {uploadedImages.map((image, index) => (
                    <Card key={index}>
                      <CardMedia component="img" image={image} />
                    </Card>
                  ))}
                </div>
              )}
            </Grid> */}
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

export default ProductForm
