import React, { memo, useState, useEffect, useCallback } from 'react'
import { useMutation } from 'graphql-hooks'
import { useParams, NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import { SnackBar } from '@common/components'
import { SEARCH_PRODUCT_BY_ID, UPDATE_PRODUCT } from '@gql/products'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%",

    [theme.breakpoints.down('md')]: {
      width: "100%",
    }
  },
  box: {
    marginBottom: theme.spacing(2)
  },
  boxAction: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  previewImage: {
    width: "100%",
  }
}))

const UpdateProduct = () => {
  const styles = useStyles()
  const [searchProductById] = useMutation(SEARCH_PRODUCT_BY_ID)
  const [updateProduct] = useMutation(UPDATE_PRODUCT)
  const { productId } = useParams()
  const [values, setValues] = useState({sku: '', title: '', image: ''})
  const [messages, setMessages] = useState('')
  const [snack, setSnack] = useState(false)

  const searchProduct = useCallback(() => {
    searchProductById({
      variables: {
        id: productId
      }
    }).then( ({data, error}) => {
      if(error) {
        console.log(error)
      } else {
        setValues(data.getProductsById)
      }
    })
  }, [searchProductById, productId])

  useEffect(() => {
    searchProduct()
  }, [searchProduct])

  const handleUpdateProduct = () => {
    const { sku, title, image } = values

    if(!sku || !title || !image) {
      setMessages('Please enter the product information')
      setSnack(true)
      return
    }

    updateProduct({
      variables: {
        _id: productId,
        sku: sku,
        title: title,
        image: image
      }
    }).then( ({data, error}) => {
      if (error) {
        setMessages(`There is an error when updating product: ${values.sku}, please try again.`)
        setSnack(true)
      }

      setMessages(`Updated product for "${values.sku}."`)
      setSnack(true)
    })
  }

  const handleChange = e => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const handleCloseSnack = () => {
    setSnack(false) 
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
        <Typography variant="body2" color="textPrimary" component={NavLink} to="/" style={{ textDecoration: 'none' }}>Dashboard</Typography>
        <Typography variant="body2" color="textPrimary">Update Product: <b>{values?.sku}</b></Typography>
      </Breadcrumbs>
      <br/>

      <Paper className={styles.paper}>
        <Typography variant="subtitle2" gutterBottom>Updating product SKU "<b>{values?.sku}</b>" information</Typography>
        <br/>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <img src={values.image} onError={(e)=>{e.target.onerror = null; e.target.src="/image_placeholder.jpg"}} className={styles.previewImage} alt="" />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  label="SKU (read-only"
                  name="sku"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={values.sku}
                  InputProps={{
                    readOnly: true,
                  }}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Title"
                  name="title"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={values?.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  label="Image URL"
                  name="image"
                  variant="outlined"
                  margin="dense"
                  fullWidth
                  value={values?.image}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Button variant="outlined" fullWidth onClick={() => handleUpdateProduct()}>Update Product</Button>
      </Paper>

      <SnackBar messages={messages} open={snack} close={handleCloseSnack} />
    </div>
  )
}
export default memo(UpdateProduct)
