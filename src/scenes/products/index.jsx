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

        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous location data to
              Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Disagree</Button>
            <Button onClick={() => handleDelete(_id)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
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
  const [deleteProduct, re] = useDeleteProductMutation()
  const isNonMobile = useMediaQuery('(min-width: 1000px)')
  const [isOpen, setIsOpen] = useState(false)
  const [dataDetail, setDataDetail] = useState()
  const handleDeleteProduct = (a) => {
    deleteProduct(a)
    refetch()
  }
  const handleEditProduct = (a) => {
    const result = data.find((e) => e._id === a)
    setDataDetail(result)
    setIsOpen(true)
  }
  const handleOpenCreate = () => {
    setDataDetail(null)
    console.log(dataDetail)
    setIsOpen(!isOpen)
  }
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      <Button sx={{ margin: '1rem 0' }} variant="contained" onClick={handleOpenCreate}>
        Tạo sản phẩm mới
      </Button>
      <ProductForm
        dataToEdit={dataDetail}
        isOpen={isOpen}
        setIsOpen={handleOpenCreate}
        onSubmit={() => refetch()}
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
