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
import { set } from 'react-hook-form'
import Notification from 'components/dialog/Notification'

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
  handleDeleteProduct,
  handleEditProduct,
}) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = (a) => {
    handleDeleteProduct(a)
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
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: '1.5rem' }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>

        <Button
          sx={{ mt: '1rem', mr: '1rem' }}
          variant="contained"
          size="small"
          onClick={() => handleEditProduct(_id)}
        >
          Edit
        </Button>
        <Button
          sx={{ mt: '1rem' }}
          variant="outlined"
          color="error"
          size="small"
          onClick={() => setOpen(true)}
        >
          Delete
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
          See More
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
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}</Typography>
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
    const result = data.find((e) => e._id === a)
    setDataDetail(result)
    setIsOpen(true)
  }
  const handleOpenCreate = () => {
    setDataDetail(null)
    setIsOpen(!isOpen)
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <Button sx={{ margin: '1rem 0' }} variant="contained" onClick={handleOpenCreate}>
        Tạo sản phẩm mới
      </Button>
      <Notification notify={notify} setNotify={setNotify} />

      <ProductForm
        dataToEdit={dataDetail}
        isOpen={isOpen}
        setIsOpen={handleOpenCreate}
        refetch={() => refetch()}
        setNotify={setNotify}
      />

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
          {data.map(({ _id, name, description, price, rating, category, supply, stat }) => (
            <Product
              key={_id}
              _id={_id}
              name={name}
              description={description}
              price={price}
              rating={rating}
              category={category}
              supply={supply}
              stat={stat}
              handleDeleteProduct={handleDeleteProduct}
              handleEditProduct={handleEditProduct}
            />
          ))}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  )
}

export default Products
