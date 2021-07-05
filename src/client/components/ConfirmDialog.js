import React, { useContext }  from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import {ShopContext} from '../context/shopContext';

export default function SimpleDialogDemo(props) {
  const {open, setOpen, dialogTitle, dialogSubtext} = props;
  const { openCart } = useContext(ShopContext);


  const handleClose = () => {
    setOpen(false);
  };

  const handleGoCheckout = () => {
    setOpen(false);
    openCart();
  };



  return (
    <Dialog onClose={handleClose} aria-labelledby="added-to-cart-confirmation-box" open={open}>
      <DialogTitle id="confirmation-title">{dialogTitle}</DialogTitle>
      <DialogContent>
          <DialogContentText id="alert-dialog-description">{dialogSubtext}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Continue Shopping
          </Button>
          <Button onClick={handleGoCheckout} color="primary" autoFocus>
            Go to checkout
          </Button>
        </DialogActions>
    </Dialog>
  );
}


SimpleDialogDemo.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogSubtext: PropTypes.string
};
