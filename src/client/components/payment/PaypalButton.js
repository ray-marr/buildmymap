import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { PayPalButton } from "react-paypal-button-v2";
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';


const styles = theme => ({
  loading:{
    marginLeft: '120px'
  }
});

const removeUnrequiredData = (items) =>{
  var itemsInfo = [];

  for(var item of items){
    let cloneItem = {...item};
    delete cloneItem.loading_map1;
    delete cloneItem.loading_map2;
    delete cloneItem.loading_map3;
    delete cloneItem.loading_map4;
    delete cloneItem.previewImage;
    itemsInfo.push(cloneItem);
  }
  return itemsInfo;
}

const PaypalButton = (props) => {

    const { items, delivery, total, classes, setPaypalStatus, setOrderID} = props;
    const [buttonReady, setButtonReady] = useState(false);
    const itemsInfo = removeUnrequiredData(items);

    return (
            <Fragment>
              <script src="https://www.paypal.com/sdk/js?client-id=sb&currency=GBP" />
              {!buttonReady && <CircularProgress className={classes.loading} color="primary" />}
              <div style={{visibility: (buttonReady ? 'visible' : 'hidden')}}>
                <PayPalButton amount={total} currency='GBP'
                  style={{
                    label: 'checkout',
                    layout: 'horizontal',
                    color: 'gold'
                  }}
                  onButtonReady={()=>{setButtonReady(true)}}
                  onError={()=>{console.log('Checkout error');}}
                  catchError={()=>{console.log('Checkout error');}}
                  onCancel={() =>  {setPaypalStatus('') }}
                  onClick={() => {setPaypalStatus('processingOrder');}}
                  onSuccess={async (details, data) => {
                    await fetch("api/completeOrder", {
                      method: "post",
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        details: details,
                        items: itemsInfo,
                        orderStatus: 'processing'
                      })
                    }
                   );

                   if(!!details.id){
                     setOrderID(details.id);
                   }
                   setPaypalStatus('success');
                   }}
                   options={{
                     //TODO: use production credentials
                     clientId: "AZs2RIZjIQ0UgjQ_OeIxSR5JXmBZKsIZZ9ghgObQDYitbL5U0J9ZQFlShQhE_jlJiYKuDIGz4wx6EOSo"
                   }}
                   />
                </div>
              </Fragment>
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
};



export default connect(mapStateToProps)(withStyles(styles)(PaypalButton))
