import React, { useContext, Fragment, useState } from 'react';
import { ShopContext } from '../../context/shopContext';
import { connect } from 'react-redux';
import DummyItem from '../icons/dummyItem.jpg';
import { removeItemFromCart } from '../actions/mapActions';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Divider, Grid, Tooltip, Paper } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import visa from 'payment-icons/svg/flat/visa.svg';
import paypal from 'payment-icons/svg/flat/paypal.svg';
import mastercard from 'payment-icons/svg/flat/mastercard.svg';
import amex from 'payment-icons/svg/flat/amex.svg';
import PaypalButton from './PaypalButton';
import  ProcessingOrder  from './ProcessingOrder';
import SuccessfulOrderDialog from './SuccessfulOrderDialog';

const styles = theme => ({
  root:{
    width: '300px',
    overflow: 'hidden'
  },
  cart:{
    textAlign: "left",
    fontSize: theme.typography.pxToRem(20),
    marginLeft: '10px',
    marginTop: '5px',
    color: '#333',
    fontFamily: 'Arial',
    display: 'inline-block'
  },
  close:{
    position: 'absolute',
    right: '15px',
    top: '8px',
    cursor: "pointer",
    pointerEvents: "all",
  },
  delete:{
    display: "block",
    margin: "auto",
    cursor: "pointer",
    pointerEvents: "all",
    marginTop: '10px',
    color: '#555',
    '&:hover':{
      color: '#C44'
    }
  },
  previewImage:{
    width:'100px',
    height:'141.4px',
    margin: '5px',
    display: 'inline-block'
  },
  itemTitle:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(20),
    color: '#333',
    fontFamily: 'Arial',
    margin: '10px 0px'
  },
  itemCost:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(18),
    color: '#555',
    fontFamily: 'Arial',
  },
  itemsWrapper:{
    height: 'calc(100vh - 220px)',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  fadeout:{
    position: 'absolute',
    bottom: '140px',
    width: '100%',
    height: '40px',
    pointerEvents: "none",
    background: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255,255,255,0.5), white)'
  },
  itemSize:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(18),
    color: '#555',
    fontFamily: 'Arial',
  },
  priceSummaryKey:{
    textAlign: "right",
    fontSize: theme.typography.pxToRem(18),
    color: '#111',
    fontFamily: 'Arial'
  },
  priceSummaryVal:{
    textAlign: "left",
    fontSize: theme.typography.pxToRem(18),
    color: '#555',
    fontFamily: 'Arial',
    paddingLeft: '8px'
  },
  payWrapper:{
    position: 'absolute',
    bottom: '0px',
    overflow: 'hidden',
    width:'280px',
    height: '150px',
    margin: '10px',
    backgroundColor: '#FFF'
  },
  divider:{
    margin:'0px 10px'
  },
  paymentIcon:{
    height: '20px',
    margin: '0px 5px',
    fill: '#fff',
    paddingTop:'5px',
    display: 'inline-block'
  },
  paymentIconsWrapper:{
    position: 'absolute',
    bottom: '0px',
    left: '55px'
  }
});

const Cart = (props) => {

    const { items, delivery, total, removeItemFromCart, classes } = props;
    const { isCartOpen, closeCart } = useContext(ShopContext);
    const [paypalStatus, setPaypalStatus] = useState('');
    const [orderID, setOrderID] = useState('');

    return (
      <SwipeableDrawer
        anchor={'right'}
        open={isCartOpen}
        onOpen={()=>{}}
        onClose={closeCart}
        disableSwipeToOpen
        disableBackdropTransition
        transitionDuration={{enter:0, exit:0}}
      >
        <div className={classes.root}>
          {paypalStatus === 'processingOrder' && <ProcessingOrder/>}
          {paypalStatus === 'success' && <SuccessfulOrderDialog setPaypalStatus={setPaypalStatus} orderID={orderID} setOrderID={setOrderID}/>}
          <Typography className={classes.cart}>Cart</Typography>

          <Tooltip title="Close cart" aria-label="Close cart">
            <CloseIcon className={classes.close} onClick={() => {closeCart()}}/>
          </Tooltip>
          <Divider className={classes.divider} />
          <br/>

          {items.length < 1 ?
              <Typography className={classes.cart}>Cart Is Empty</Typography>
              :
              <div className={classes.itemsWrapper}>
                <div className={classes.fadeout}/>
                <Grid container spacing={3} justify="center">
                    {items && items.map((item, index) => (
                      <Fragment key={index}>
                        <Grid item xs={4}>
                          {item.previewImage && <Paper style={{width: '110px', height:'150px', marginLeft: '15px', marginBottom: '8px'}} elevation={4}><img src={item.previewImage} className={classes.previewImage} alt="preview item"/></Paper>}
                          {!item.previewImage && <img src={DummyItem} className={classes.previewImage} alt="dummy preview"/>}
                        </Grid>
                        <Grid item xs={8}>
                          <Typography className={classes.itemTitle}>{item.title}</Typography>
                          <Typography className={classes.itemSize}>{`Size: ${item.size}`}</Typography>
                          <Typography className={classes.itemCost}>{`Price: £${item.cost}.00`}</Typography>
                          <Tooltip title="Remove item from cart" aria-label="Remove item from cart">
                            <DeleteForeverIcon className={classes.delete} onClick={() => {removeItemFromCart(item)}}/>
                          </Tooltip>
                        </Grid>

                      </Fragment>
                    ))}
                </Grid>
              </div>
          }

          {items.length > 0 &&
            <div className={classes.payWrapper}>
            <Divider className={classes.divider}/>
              <Grid style={{paddingTop: '5px'}} container spacing={1}>

                  <Grid item xs={6}>
                    <Typography className={classes.priceSummaryKey}>{"Delivery:"}</Typography>
                    <Typography className={classes.priceSummaryKey}>{"Total:"}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography className={classes.priceSummaryVal}>{`£${delivery}`}</Typography>
                    <Typography className={classes.priceSummaryVal}>{`£${total}`}</Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <PaypalButton setPaypalStatus={setPaypalStatus} setOrderID={setOrderID}/>
                  </Grid>
                   <div className={classes.paymentIconsWrapper}>
                     <img className={classes.paymentIcon} src={visa} alt="Logo" />
                     <img className={classes.paymentIcon} src={paypal} alt="Logo" />
                     <img className={classes.paymentIcon} src={mastercard} alt="Logo" />
                     <img className={classes.paymentIcon} src={amex} alt="Logo" />
                   </div>
                  </Grid>
                </div>
              }
        </div>
      </SwipeableDrawer>
    );


}


const mapStateToProps = (state) => {
  var cart = state.cart;
  return {
      items: cart.addedItems,
      lineTotal: cart.lineTotal,
      delivery: cart.delivery,
      total: cart.total,
      isCartOpen: cart.isCartOpen
      }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        removeItemFromCart: (item)=>{dispatch(removeItemFromCart(item))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Cart))
