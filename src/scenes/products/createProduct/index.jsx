import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
} from '@mui/material'
import { useCreateProductMutation, useUpdateProductMutation } from 'state/api'
const ProductForm = ({ dataToEdit, isOpen, setIsOpen, onSubmit }) => {
  const theme = useTheme()
  const [uploadedImages, setUploadedImages] = useState([])
  const [createProduct, create] = useCreateProductMutation()
  const [updateProduct, update] = useUpdateProductMutation()

  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
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
    if (!dataToEdit) {
      createProduct(data)
    } else {
      updateProduct(dataToEdit._id, data)
    }
    setIsOpen(false)
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
                sx={{ width: '100%', marginBottom: '1rem' }}
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

              <FormControl sx={{ width: '100%', marginBottom: '1rem' }} fullWidth>
                <InputLabel htmlFor="outlined-adornment-amount">Price</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">$</InputAdornment>}
                  label="Amount"
                  {...register('price')}
                />
              </FormControl>
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
