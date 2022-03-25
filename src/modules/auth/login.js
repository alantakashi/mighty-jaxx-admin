import React, { memo, useState, useEffect } from 'react'
import { useMutation  } from 'graphql-hooks'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  Button,
  Box,
  Container,
  CssBaseline,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Paper,
  TextField,
  Typography, 
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { SnackBar } from '@common/components'
import { ADMIN_LOGIN } from '@gql/admins'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="mailto:alantakashi@gmail.com">
        alantakashi@gmail.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles((theme) => ({
  layout: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    marginTop: theme.spacing(1),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(3),
    },
  },
  margin: {
    marginBottom: theme.spacing(2),
  },
}))

const Login = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { admin } = useSelector(state => state.admin)
  const history = useHistory()
  const [adminLogin] = useMutation(ADMIN_LOGIN)
  const [values, setValues] = useState({ email: '', password: '', showPassword: false })
  const [snack, setSnack] = useState(false)
  const [messages, setMessages] = useState('')

  useEffect(() => {
    if (admin?.token) history.push('/')
  },[admin, history])

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value })
  }

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleCloseSnack = () => {
    setSnack(false) 
  }

  const userSubmitLogin = e => {
    e.preventDefault()

    const { email, password } = values

    /* eslint-disable-next-line */
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !password) {
      setMessages('Please enter your email or password!')
      setSnack(true)
      return
    }

    if (!emailRegex.test(email)) {
      setMessages('Please enter a correct email!')
      setSnack(true)
      return
    }

    adminLogin({
      variables: {
        email,
        password
      }
    }).then( ({data, error}) => {
      if (data?.login === null) {
        setMessages(error.graphQLErrors[0].message)
        setSnack(true)
        return
      }

      dispatch({
        type: 'ADMIN_LOGIN',
        payload: data.login
      })

      history.push('/')
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.layout}>
        <Typography variant="subtitle1">The easiest way to vote</Typography>
        <Paper className={classes.paper}>
          <form className={classes.form} noValidate>
            <FormControl variant="outlined" fullWidth className={classes.margin}>
              <TextField
                variant="outlined"
                required              
                label="Email Address"
                name="email"
                autoComplete="off"
                autoFocus
                onChange={handleChange('email')}
              />
            </FormControl>
            <FormControl variant="outlined" fullWidth>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="email"
                name="email"
                type={values.showPassword ? 'text' : 'password'}
                onChange={handleChange('password')}
                value={values.password}
                autoComplete="off"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={70}
              />
            </FormControl>
            <Button fullWidth variant="outlined" className={classes.submit} onClick={userSubmitLogin}>Login</Button>
          </form>
        </Paper>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>

      <SnackBar messages={messages} open={snack} close={handleCloseSnack} />
    </Container>
  )
}

export default memo(Login)
