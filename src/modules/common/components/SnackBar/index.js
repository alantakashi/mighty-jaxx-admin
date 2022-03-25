import React, { Fragment, memo } from 'react'
import { IconButton, Snackbar } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const SnackBar = ({ open, close, messages }) => {
	return (
		<Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={open}
      onClose={close}
      message={messages}
      action={
        <Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
            <Close fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
	)
}

export default memo(SnackBar)
