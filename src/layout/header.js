import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Avatar,
  IconButton,
  Toolbar
} from '@material-ui/core'
import { PowerSettingsNew } from '@material-ui/icons'
import { NavLink } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
	appbar: {
  	backgroundColor: "#ffffff",
    borderBottom: "2px solid #ffd34a"
  },
  votty: {
  	display: "inline-block",
  	height: "50px",
    fontFamily: `"Pacifico", cursive`,
    fontSize: "30px",
    transform: "rotate(-10deg)",
  },
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
}))

const Header = () => {
  const styles = useStyles()
  const dispatch = useDispatch()

	const handleLogout = () => {
    dispatch({
      type: 'ADMIN_LOGOUT'
    })
  }

  return (
    <AppBar className={styles.appbar}>
      <Toolbar>
        <div className={styles.grow} />
        <NavLink to="/user/profile">
          <IconButton aria-label="show 17 new notifications" color="primary">
            <Avatar className={styles.avatar} />
          </IconButton>
        </NavLink>

        <IconButton aria-label="show 11 new notifications" color="primary" onClick={handleLogout}>
          <PowerSettingsNew />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default memo(Header)
