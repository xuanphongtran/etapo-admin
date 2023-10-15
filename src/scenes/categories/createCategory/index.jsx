import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  TextField,
  Button,
  Box,
  useTheme,
  Grid,
  MenuItem,
  ImageList,
  ImageListItem,
} from '@mui/material'
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from 'state/api'
import { DeleteImg } from 'state/deleteImg'
import axios from 'axios'
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
  const { data, isLoading } = useGetCategoriesQuery({
    page: 0,
    pageSize: 100,
  })
  const [image, setImage] = useState()
  const [file, setFile] = useState()

  useEffect(() => {
    if (dataToEdit) {
      setFocus('name')
      setImage(dataToEdit?.image)
    } else {
      setImage()
      setFile()
      reset()
    }
  }, [isOpen])

  const handleCreate = async (data) => {
    let imageUrl
    if (file) {
      const imageData = new FormData()
      imageData.append('file', file)
      imageData.append('upload_preset', 'nbrwjjys')
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload`,
        imageData,
      )
      imageUrl = response.data.url
    }
    if (!dataToEdit) {
      createCategory({ ...data, image: imageUrl })
      setNotify({
        isOpen: true,
        message: 'Tạo mới thành công',
        type: 'success',
      })
      refetch()
    } else {
      if (dataToEdit?.image && image !== dataToEdit?.image) {
        await DeleteImg(dataToEdit.image)
      }
      const id = dataToEdit._id
      updateCategory({ id, ...data, image: imageUrl })
      setNotify({
        isOpen: true,
        message: 'Cập nhập thành công',
        type: 'success',
      })
      refetch()
    }
    setIsOpen(false)
    refetch()
  }
  const handleFileChange = (ev) => {
    setImage(URL.createObjectURL(ev.target.files[0]))
    setFile(ev.target.files[0])
  }
  const handleImageDoubleClick = () => {
    setImage()
    setFile()
  }
  if (!isOpen) {
    return null
  }
  return (
    <Box
      sx={{
        width: '70%',
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
            <Grid item xs={6}>
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Tên danh mục"
                {...register('name', { required: true })}
                error={errors.name ? true : false}
                defaultValue={dataToEdit ? dataToEdit.name : ''}
                helperText={errors.name ? 'Vui lòng nhập tên danh mục' : ''}
              />
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <TextField
                  sx={{ width: '100%', marginBottom: '1rem' }}
                  label="Danh mục cha"
                  select
                  defaultValue={dataToEdit ? dataToEdit?.parent?._id : null}
                  {...register('parent')}
                >
                  {data?.categories.map((option, index) => (
                    <MenuItem key={index} value={option._id}>
                      {option.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
              <TextField
                sx={{ width: '100%', marginBottom: '1rem' }}
                label="Cấp bậc"
                select
                defaultValue={dataToEdit ? dataToEdit?.level : ''}
                {...register('level')}
              >
                {level.map((option, index) => (
                  <MenuItem key={index} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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
                  Đăng tải hình ảnh
                </Button>
              </label>
              {image && (
                <ImageListItem
                  sx={{
                    'mt': '5px',
                    '.MuiImageListItem-img': {
                      objectFit: 'contain',
                      maxHeight: '152px',
                    },
                  }}
                  onDoubleClick={() => handleImageDoubleClick(index)}
                >
                  <img
                    src={`${image}`}
                    srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt="1"
                    loading="lazy"
                  />
                </ImageListItem>
              )}
            </Grid>
            <Grid item xs={10} sx={{ justifyContent: 'space-around', display: 'flex' }}>
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
