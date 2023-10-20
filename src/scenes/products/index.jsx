/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material'
// import Header from 'components/Header'
import { useDeleteProductMutation, useGetProductsQuery } from 'state/api'
import Header from 'components/Header'
import ProductForm from './createProduct'
import Notification from 'components/dialog/Notification'
import { DeleteImg } from 'state/deleteImg'

const Product = ({
  _id,
  name,
  images,
  description,
  price,
  rating,
  category,
  brand,
  handleDeleteProduct,
  handleEditProduct,
}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [open, setOpen] = useState(false)
  const handleDelete = async (a) => {
    handleDeleteProduct(a)
    for (const a of images) {
      await DeleteImg(a)
    }
    setOpen(false)
  }

  return (
    <Card
      sx={{
        backgroundImage: 'none',
        backgroundColor: theme.palette.background.alt,
        borderRadius: '0.55rem',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
          {_id}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ m: '0.5rem 0' }} color={theme.palette.secondary[400]}>
          {price} đ
        </Typography>
        <Rating value={rating} readOnly />

        <Typography
          sx={{
            maxHeight: '88px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
          }}
          variant="body2"
        >
          {description}
        </Typography>

        <Button
          sx={{ mt: '1rem', mr: '1rem' }}
          variant="contained"
          size="small"
          onClick={() => handleEditProduct(_id)}
        >
          Chỉnh sửa
        </Button>
        <Button
          sx={{ mt: '1rem' }}
          variant="outlined"
          color="error"
          size="small"
          onClick={() => setOpen(true)}
        >
          Xoá sản phẩm
        </Button>
        {/* Dialog Confirm */}
        <Dialog
          sx={{ backgroundColor: theme.palette.primary[700] }}
          open={open}
          onClose={() => setOpen(false)}
        >
          <DialogTitle>{'Bạn có chắc chắn sẽ xoá sản phẩm ?'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Sẽ không thể khôi phục sau khi xoá, hãy chắc chắn về điều này
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Huỷ
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(_id)} autoFocus>
              Xoá
            </Button>
          </DialogActions>
        </Dialog>
        {/* Dialog Confirm */}
      </CardContent>
      <CardActions>
        <Button
          sx={{ position: 'block' }}
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Xem thêm
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>Danh mục: {category}</Typography>
          <Typography>Thương hiệu: {brand}</Typography>
          {/* {properties &&
            Object.keys(properties).forEach((key) => (
              <Typography>
                {key}: {properties[key]}
              </Typography>
            ))} */}
          {/* {keyValueElements} */}
          {/* <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  )
}

const Products = () => {
  const { data, isLoading, refetch } = useGetProductsQuery()
  const [deleteProduct] = useDeleteProductMutation()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const [isOpen, setIsOpen] = useState(false)
  const [dataDetail, setDataDetail] = useState()
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: 'info' })

  const handleDeleteProduct = (a) => {
    deleteProduct(a)
    setNotify({
      isOpen: true,
      message: 'Xoá thành công',
      type: 'error',
    })
    refetch()
  }
  const handleEditProduct = (a) => {
    const result = data.productWithStats.find((e) => e._id === a)
    setDataDetail(result)
    setIsOpen(true)
  }
  const handleOpenCreate = () => {
    setDataDetail(null)
    setIsOpen(!isOpen)
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="SẢN PHẨM" />
      <Button sx={{ margin: '1rem 0' }} variant="contained" onClick={handleOpenCreate}>
        Tạo sản phẩm mới
      </Button>
      <Notification notify={notify} setNotify={setNotify} />

      <ProductForm
        dataToEdit={dataDetail}
        isOpen={isOpen}
        setIsOpen={handleOpenCreate}
        refetch={refetch}
        setNotify={setNotify}
      />
      <Header subtitle="Danh sách sản phẩm" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          {data.productWithStats.map(
            ({
              _id,
              name,
              images,
              description,
              price,
              rating,
              category,
              brand,
              supply,
              stat,
              properties,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                properties={properties}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
                images={images}
                handleDeleteProduct={handleDeleteProduct}
                handleEditProduct={handleEditProduct}
              />
            ),
          )}
        </Box>
      ) : (
        <>Đang tải...</>
      )}
    </Box>
  )
}

export default Products
