import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Toolbar, useMediaQuery } from '@material-ui/core'
import Header from './header'

const useStyles =  makeStyles(theme => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',      
    height: '100vh',
  },
  wrapper: {
    flex: 1,
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingLeft: theme.spacing(3),
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  paper: {
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.paper,
    height: '100%'
  }
}))

const Layout = ({ children, header }) => {
  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <div className={styles.root}>
      { (header) ? <Header /> : ''}
      <Toolbar id="back-to-top-anchor" />

      <div className={styles.wrapper}>
        <Grid container spacing={3} className={styles.grid}>
        	
          <Grid item xs={12} sm={12} md={12} style={{paddingBottom: isMobile ? '72px' : ''}}>
            
            { children }
            
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}

export default memo(Layout)
