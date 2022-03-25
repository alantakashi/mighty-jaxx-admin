import React, { memo, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory, NavLink } from 'react-router-dom'
import {
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Paper
} from '@material-ui/core'
import { NavigateNext } from '@material-ui/icons'
import { useMutation } from 'graphql-hooks'
import { CREATE_PRODUCT } from '@gql/products'
import { SnackBar } from '@common/components'

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%"
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

const AddNewProduct = () => {
  const styles = useStyles()
  const history = useHistory()
  const [createProduct] = useMutation(CREATE_PRODUCT)
  const [snack, setSnack] = useState(false)
  const [messages, setMessages] = useState('')
  const [values, setValues] = useState({sku: '', title: '', image: ''})

  const handleChange = e => {
    const {name, value} = e.target
    setValues({...values, [name]: value})
  }

  const handleCloseSnack = () => {
    setSnack(false) 
  }

  const handleAddProduct = () => {
    const { sku, title, image } = values

    if(!sku || !title || !image) {
      setMessages('Please enter the product information')
      setSnack(true)
      return
    }

    createProduct({
      variables: {
        sku,
        title,
        image
      }
    }).then( ({data, error}) => {
      if (error) {
        setMessages('Error in create new product, please try again.')
        setSnack(true)
      }

      setMessages(`Created product for "${values.sku}."`)
      setSnack(true)
      setTimeout(() => {
        history.push('/')
      }, 1500)
    })
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNext fontSize="small" />}>
        <Typography variant="body2" color="textPrimary" component={NavLink} to="/" style={{ textDecoration: 'none' }}>Dashboard</Typography>
        <Typography variant="body2" color="textPrimary">Create new product</Typography>
      </Breadcrumbs>
      <br/>

      <Paper className={styles.paper}>
        <Typography variant="subtitle1" gutterBottom>Create new product</Typography>
        <br/>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <img src={values.image} onError={(e)=>{e.target.onerror = null; e.target.src="/image_placeholder.jpg"}} className={styles.previewImage} alt="" />
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  label="SKU"
                  name="sku"
                  variant="outlined"
                  value={values.sku}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  label="Title"
                  name="title"
                  variant="outlined"
                  value={values.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  fullWidth
                  margin="dense"
                  label="Image URL"
                  name="image"
                  variant="outlined"
                  value={values.image}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </Grid>
          <Button variant="outlined" fullWidth onClick={() => handleAddProduct()}>Create product</Button>
        </Grid>
      </Paper>

      <SnackBar messages={messages} open={snack} close={handleCloseSnack} />
    </div>
  )
}

export default memo(AddNewProduct)
