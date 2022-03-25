import React, { memo, useState, useEffect, useCallback } from 'react'
import { useManualQuery, useMutation } from 'graphql-hooks'
import { useHistory, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { GET_ALL_PRODUCTS, SEARCH_PRODUCT_BY_SKU, DELETE_PRODUCT_BY_ID } from '@gql/products'
import {
  SnackBar
} from '@common/components'

const useStyles = makeStyles((theme) => ({
  summary: {
    marginBottom: theme.spacing(3),
  },
  chart: {
    marginBottom: theme.spacing(3),
    height: '400px'
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  thumbnail: {
    width: '100px'
  },
  edit: {
    cursor: 'pointer'
  },
  margin: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    margin: theme.spacing(1),
  }
}))

const Home = () => {
  const styles = useStyles()
  const history = useHistory()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [getAllProducts] = useManualQuery(GET_ALL_PRODUCTS)
  const [searchProductsBySku] = useManualQuery(SEARCH_PRODUCT_BY_SKU)
  const [deleteProduct] = useMutation(DELETE_PRODUCT_BY_ID)
  const [products, setProducts] = useState(null)
  const [deleteSelectedProduct, setSelectedDeleteProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [productsCount, setProductsCount] = useState(0)
  const [messages, setMessages] = useState('')
  const [snack, setSnack] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchProducts = useCallback(() => {
    getAllProducts({
      variables: {
        page: 1,
        limit: 20
      }
    }).then( ({data, error}) => {
      if (data.getAllProducts === null) {
        setMessages('Something went wrong, please try again.')
        setSnack(true)
        return
      }
      setProducts(data.getAllProducts.products)
      setProductsCount(data.getAllProducts.totalProducts)
    })
  }, [getAllProducts])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleSearchTerm = e => {
    setSearchTerm(e.target.value)
  }

  const handleStartSearch = e => {
    if(e.key === 'Enter') {
      if (!searchTerm) {
        setMessages('Please enter a SKU to search')
        setSnack(true)
        return
      }

      searchProductsBySku({
        variables: {
          sku: searchTerm
        }
      }).then( ({data, error}) => {
        if (error) {
          setMessages('Can\'t find the product of your search, please check if you enter a valid SKU')
          setSnack(true)
          return
        }

        history.push(`/update/${data.searchProductsBySku._id}`)
      })
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleCloseSnack = () => {
    setSnack(false)  
  }

  const handleDialogOpen = (val) => {
    setSelectedDeleteProduct(val)
    setOpen(true)
  }

  const handleDialogClose = () => {
    setSelectedDeleteProduct(null)
    setOpen(false)
  }

  const handleConfirmDelete = () => {
    deleteProduct({
      variables: {
        _id: deleteSelectedProduct._id
      }
    }).then( ({data, error}) => {
      fetchProducts()
      setOpen(false)
    })
  }

  return (
    <div>
      <Grid container spancing={3}>
        <Typography variant="h6" gutterBottom>All Products</Typography>
        <Grid item xs={12} md={12}>
          <Paper className={styles.paper}>
            <TextField
              fullWidth
              margin="dense"
              label="Search by SKU (press 'Enter' to search)"
              name="searchTerm"
              variant="outlined"
              value={searchTerm}
              onChange={handleSearchTerm}
              onKeyPress={handleStartSearch}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper}>
            <Table  aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>SKU</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Thumbnail</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products && products.map((p, i) => (
                  <TableRow key={p._id}>
                    <TableCell>{p.sku}</TableCell>
                    <TableCell>{p.title}</TableCell>
                    <TableCell><img src={p.image} alt="" className={styles.thumbnail} /></TableCell>
                    <TableCell align="right">
                      <Button variant="outlined" component={NavLink} to={`/update/${p._id}`} className={styles.edit}>Edit</Button>
                      &nbsp;
                      <Button variant="outlined" color="secondary" onClick={() => handleDialogOpen(p)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={productsCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>

      <SnackBar messages={messages} open={snack} close={handleCloseSnack} />

      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle id="alert-dialog-title">Delete product {deleteSelectedProduct?.title}?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">Are you sure you want to delete this product? You will not able to undo this action.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>Confirm</Button>
        </DialogActions>
      </Dialog>

      <Fab size="medium" color="primary" aria-label="add" className={styles.margin} component={NavLink} to="/add">
        <Add />
      </Fab>
    </div>
  )
}

export default memo(Home)
