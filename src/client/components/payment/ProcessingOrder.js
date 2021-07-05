import React, { Fragment, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress, Typography } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';


const styles = theme => ({
  blackout:{
    position: 'fixed',
    left: '0px',
    top: '0px',
    zIndex: '1000',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    textAlign: 'center'
  },
  loadingWrapper:{
    margin: 'auto',
    marginTop: '35vh',
    width: '300px'
  },
  loadingtext:{
    color: '#FFF',
    fontSize: '1.2rem'
  },
  loadingIcon:{
    marginBottom: '20px'
  }
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFF',
    }
  }
});


const ProcessingOrder = (props) => {
    const {classes} = props;

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.blackout}>
          <div className={classes.loadingWrapper}>
            <CircularProgress className={classes.loadingIcon} color='primary'/>
            <Typography className={classes.loadingtext} paragraph={true}>
              We are processing your order :)
            </Typography>
            <Typography className={classes.loadingtext} paragraph={true}>
              Do not close this page
            </Typography>
          </div>
        </div>
      </ThemeProvider>
    );
}



export default withStyles(styles)(ProcessingOrder)
