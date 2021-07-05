import React, {Fragment, useState} from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { addItemToCart } from '../../components/actions/mapActions';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import ConfirmDialog from '../../components/ConfirmDialog';
import htmlToImage from 'html-to-image';
import Config from '../../Config.js';
const Jimp = require('jimp');

const styles = (theme) => ({
  button:{
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: theme.spacing(1),
    right: theme.spacing(1),
    width: '160px',
    borderWidth: '1px',
    borderColor: '#333',
    borderStyle: 'solid',
    boxShadow: '0 0 0 0',
    zIndex:2,
    '&:hover':{
      backgroundColor: '#FFF',
      borderColor: Config.colors.successGreen,
      boxShadow: `3px 3px ${Config.colors.successGreen}`
    }
  },
  price:{
    position: 'absolute',
    bottom: theme.spacing(1),
    left: theme.spacing(2),
    fontSize: '1.9rem',
    color: Config.colors.successGreen
  }

});

const priceMap = {
  A4: '15.00',
  A3: '20.00',
  A2: '30.00',
  A1: '40.00',
  A0: '50.00'
};

async function resizeImage(imageB64){
  let jImage = await Jimp.read(Buffer.from(imageB64.replace(/^data:image\/png;base64,/, ""), 'base64'));
  await jImage.resize(200, 200*1.414).quality(100);
  let resizedImage = await jImage.getBase64Async('image/jpeg');
  return resizedImage;
}




const generatePreviewImage = async (item) =>{
  let node = document.getElementById('custom-map-poster');
  let dataUrl = await htmlToImage.toPng(node);
  let resizedImagePromise = await resizeImage(dataUrl);
  item.previewImage = resizedImagePromise;
}



const handleAddToCart = async (customMap, addItemToCart, setRecentlyClicked, setConfirmOpen) => {
  let item = {...customMap};
  if(item.layout === 0){
    delete item.map2;
    delete item.map3;
    delete item.map4;
  }else if (item.layout === 1) {
    delete item.map3;
    delete item.map4;
  }else if (item.layout === 2) {
    delete item.map4;
  }
  item.cost = Number(priceMap[item.size]);
  item.title = 'Custom Map';

  //disables add to cart button while we generate preview image
  setRecentlyClicked(true);
  await generatePreviewImage(item);
  await addItemToCart(item);
  setRecentlyClicked(false);
  setConfirmOpen(true);
};


const AddToCartSection = (props) =>{
  const {customMap, classes, addItemToCart} = props;
  const {loading_map1, loading_map2, loading_map3, loading_map4} = customMap;
  const maploading = loading_map1 || loading_map2 || loading_map3 || loading_map4;
  const [recentlyClicked, setRecentlyClicked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const buttonText = () =>{
    let text = 'Add to Cart';
    if(maploading){
      text = 'Loading...';
    }else if(recentlyClicked){
      text = 'Adding';
    }
    return text;
  }


  return (
    <Fragment>
      <span className={classes.price}>{`£${priceMap[customMap.size]}`}</span>
      <Button disabled={recentlyClicked || maploading} variant="contained" className={classes.button} startIcon={<ShoppingBasketIcon/>} onClick={() => handleAddToCart(customMap, addItemToCart, setRecentlyClicked, setConfirmOpen)}>{buttonText()}</Button>
      <ConfirmDialog open={confirmOpen} setOpen={setConfirmOpen} dialogTitle="Item Added to Cart" dialogSubtext="We hope you enjoy your beautiful poster!" />
    </Fragment>
  );
}






const mapStateToProps = (state) => {
  return {
      customMap: state.customMap
      }
};


const mapDispatchToProps = (dispatch)=>{
    return{
        addItemToCart: (item) => {dispatch(addItemToCart(item))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddToCartSection));
