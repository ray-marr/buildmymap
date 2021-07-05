import React from 'react';
import Config from '../Config';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import visa from 'payment-icons/svg/mono/visa.svg';
import paypal from 'payment-icons/svg/mono/paypal.svg';
import mastercard from 'payment-icons/svg/mono/mastercard.svg';
import amex from 'payment-icons/svg/mono/amex.svg';

const styles = theme => ({
  footer:{
    height: '50px',
    width: '100%',
    color: Config.colors.lightgreytext,
    fontSize: '12px',
    borderTop: '1px solid #CCC',
    overflow: 'hidden'
  },
  paddedDiv:{
    padding: theme.spacing(1)
  },
  paymentIcon:{
    height: '20px',
    margin: '0px 2px',
    fill: '#fff'
  },
  paymentMessage:{
    position: 'relative',
    bottom: '4px',
    left: 'calc(50% - 90px)',
    fontSize: '10px',
    color: '#444'
  }
});


function Footer(props) {
  const { classes } = props;
  const sep = <span style={{color:"#000", display: 'inline'}}> | </span>;

  return (
    <div className={classes.footer}>
      <div className={classes.paddedDiv}>
        <Grid container spacing={2} alignContent='center'>
          <Grid item xs={4} align='left'>contact us: <a className={classes.email} href='mailto:info@buildmymap.com'>info@buildmymap.com</a></Grid>
          <Grid item xs={4} align='center'>
            <img className={classes.paymentIcon} src={visa} alt="Logo" />
            <img className={classes.paymentIcon} src={paypal} alt="Logo" />
            <img className={classes.paymentIcon} src={mastercard} alt="Logo" />
            <img className={classes.paymentIcon} src={amex} alt="Logo" />
          </Grid>
          <Grid item xs={4} align='right'>
            <a href='https://www.facebook.com/buildmymap-104644061318234' rel="noopener noreferrer" target="_blank">facebook</a>
            {sep}
            <a href='https://www.instagram.com/buildmymap' rel="noopener noreferrer" target="_blank">instagram</a>
            {sep}
            <a href='https://www.pinterest.co.uk/buildmymap' rel="noopener noreferrer" target="_blank">pinterest</a>
          </Grid>
        </Grid>
        <span className={classes.paymentMessage}>Credit/Debit cards and Paypal accepted.</span>
      </div>
    </div>
  );
}

export default withStyles(styles)(Footer);
