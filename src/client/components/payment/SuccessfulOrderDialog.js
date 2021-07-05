import React, {Fragment} from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import shippingIcon from '../icons/shipping.svg';
import { emptyCart }  from '../actions/mapActions';


const styles = theme => ({
  title:{
    fontFamily: 'Arial',
    fontWeight: 'bold'
  },
  message:{
      fontFamily: 'Arial'
  },
  ok:{
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#333'
  },
  successIcon:{
      width: '100px',
      height: '100px',
      display: 'block',
      margin: 'auto'
  }
});

const SuccessfulOrderDialog = (props) => {
  const {classes, setPaypalStatus, emptyCart, orderID, setOrderID} = props;

  const handleClose = () =>{
    //Empty card once order is successful
    emptyCart();
    setOrderID('');
    setPaypalStatus('')
  }

  return (
    <Dialog open={true}>
      <DialogTitle className={classes.title}><span className={classes.title}>Order complete</span></DialogTitle>
      <DialogContent>
            <span className={classes.message}>
              Order has been successfully placed!
              <br/>
              {!!orderID && <Fragment><br/><b>Your Order ID: </b>{orderID}</Fragment>}
              <img className={classes.successIcon} src={shippingIcon} alt="success icon"/>
              <br/>
              Your order will be with you soon :)
            </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <span className={classes.ok}>OK</span>
          </Button>
        </DialogActions>
    </Dialog>
  );
}

const mapDispatchToProps = (dispatch)=>{
    return{
        emptyCart: ()=>{dispatch(emptyCart())}
    }
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SuccessfulOrderDialog))
