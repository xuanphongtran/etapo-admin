import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  useTheme,
  Grid,
  InputAdornment,
  MenuItem,
  ImageList,
  ImageListItem,
} from '@mui/material'
import {
  useCreateProductMutation,
  useGetBrandsQuery,
  useGetCategoriesQuery,
  useGetPropertiesQuery,
  useUpdateProductMutation,
} from 'state/api'
import axios from 'axios'
import { productsForm } from 'constants/form'
import { NumericFormatCustom } from 'components/NumericFormatCustom'
import { DataArray } from '@mui/icons-material'
import { DeleteImg } from 'state/deleteImg'
const ProductForm = ({ dataToEdit, isOpen, setIsOpen, refetch, setNotify }) => {
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    reset,
    formState: { errors },
  } = useForm()
  const theme = useTheme()
  const [createProduct, createError] = useCreateProductMutation()
  const [updateProduct, updateError] = useUpdateProductMutation()
  const { data: categoryData, isLoading: isLoadingCate } = useGetCategoriesQuery({
    page: 0,
    pageSize: 100,
  })
  const { data: brandData, isLoading: isLoadingBrand } = useGetBrandsQuery({
    page: 0,
    pageSize: 100,
  })
  const { data: properties, isLoading: isLoadingProperties } = useGetPropertiesQuery()
  const [images, setImages] = useState([])
  const [files, setFiles] = useState([])
  const [productProperties, setProductProperties] = useState([])

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setValue('name', dataToEdit.name)
      setValue('price', dataToEdit.price.replace(/,/g, ''))
      setValue('description', dataToEdit.description)
      setValue('category', dataToEdit.category)
      setValue('discount', dataToEdit.discount)
      setProductProperties(dataToEdit.properties)
      setImages(dataToEdit.images)
    } else {
      reset(productsForm)
      setImages([])
      setFiles([])
      setProductProperties([])
    }
  }, [isOpen])

  const handleCreate = async (data) => {
    const imagesUrl = []
    if (files?.length > 0) {
      const data = new FormData()
      for (const file of files) {
        data.append('file', file)
        data.append('upload_preset', 'nbrwjjys')
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
          data,
        )
        imagesUrl.push(response.data.url)
      }
    }

    const newData = {
      ...data,
      images: imagesUrl,
      properties: productProperties,
    }
    if (!dataToEdit) {
      createProduct(newData)
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
    } else {
      const urlDeletes = dataToEdit.images?.filter((element) => !images.includes(element))
      if (urlDeletes.length > 0) {
        for (const urlDelete of urlDeletes) {
          const response = await DeleteImg(urlDelete)
        }
      }
      const id = dataToEdit._id
      const img = dataToEdit.images?.filter((element) => images.includes(element)).concat(imagesUrl)
      updateProduct({ ...newData, id, images: img })
      setNotify({
        isOpen: true,
        message: 'Cập nhập thành công',
        type: 'success',
      })
    }
    setIsOpen(false)
    refetch()
  }

  if (!isOpen) {
    return null
  }

  const handlePropertyChange = (label, value) => {
    const index = productProperties.findIndex((e) => e.label === label)
    if (index !== -1) {
      setProductProperties((prevState) => {
        const newState = [...prevState]
        newState[index] = { label, value }
        return newState
      })
    } else {
      // Nếu không tồn tại, thêm object mới vào mảng
      setProductProperties((prevState) => [...prevState, { label, value }])
    }
  }
  const handleFileChange = (ev) => {
    setImages([...images, URL.createObjectURL(ev.target.files[0])])
    setFiles([...files, ev.target.files[0]])
  }

  const handleImageDoubleClick = (index) => {
    const updatedImages = [...images]
    const updatedFiles = [...files]
    updatedImages.splice(index, 1)
    updatedFiles.splice(index, 1)
    setImages(updatedImages)
    setFiles(updatedFiles)
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
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                variant="outlined"
                InputProps={{
                  inputComponent: NumericFormatCustom,
                  endAdornment: <InputAdornment position="end">đ</InputAdornment>,
                }}
                label="Giá"
                defaultValue={dataToEdit ? dataToEdit.price : ''}
                {...register('price', { required: true })}
                error={errors.price ? true : false}
                helperText={errors.price ? 'Vui lòng nhập giá sản phẩm' : ''}
              />
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                variant="outlined"
                InputProps={{
                  endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  min: 0,
                  max: 10,
                }}
                label="Giảm giá"
                {...register('discount')}
              />
              {isLoadingBrand ? (
                <div>Loading...</div>
              ) : (
                <TextField
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  label="Thương hiệu"
                  select
                  defaultValue={dataToEdit ? dataToEdit.brand : ''}
                  {...register('brand')}
                >
                  {brandData?.brands.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {isLoadingCate ? (
                <div>Loading...</div>
              ) : (
                <TextField
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  label="Danh mục"
                  select
                  defaultValue={dataToEdit ? dataToEdit.category : ''}
                  {...register('category')}
                >
                  {categoryData?.categories.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              {isLoadingProperties ? (
                <div>Loading...</div>
              ) : (
                properties.map((pro, index) => (
                  <TextField
                    key={index}
                    sx={{ width: '100%', marginBottom: '1rem' }}
                    label={pro.name}
                    select
                    defaultValue={
                      dataToEdit
                        ? dataToEdit.properties?.find((e) => e.label == pro.name)?.value
                        : ''
                    }
                    onChange={(ev) => handlePropertyChange(pro.name, ev.target.value)}
                  >
                    {pro.value?.map((option, index) => (
                      <MenuItem key={index} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                ))
              )}
            </Grid>
            <Grid sx={{ alignItems: 'center' }} item xs={6}>
              <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: 'none' }}
                id="image-input"
                onChange={handleFileChange}
              />
              <label htmlFor="image-input">
                <Button component="span" variant="contained" color="primary">
                  Upload Images
                </Button>
              </label>
              <ImageList
                sx={{
                  'backgroundColor': theme.palette.primary[600],
                  'width': '100%',
                  'height': 342,
                  'borderRadius': '5px',
                  '&::-webkit-scrollbar': {
                    height: '6px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: theme.palette.secondary[300],
                  },
                }}
                variant="masonry"
                rowHeight={163}
              >
                {images.map((item, index) => (
                  <ImageListItem
                    key={index}
                    sx={{
                      '.MuiImageListItem-img': {
                        border: 'solid',
                        borderRadius: '5px',
                        objectFit: 'contain',
                      },
                    }}
                    onDoubleClick={() => handleImageDoubleClick(index)}
                  >
                    <img
                      src={`${item}`}
                      srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt="1"
                      loading="lazy"
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Grid>
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
