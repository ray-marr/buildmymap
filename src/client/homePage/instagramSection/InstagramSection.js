import React, {Fragment, useState} from 'react';
import { Typography, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import InstagramEmbed from 'react-instagram-embed';

const styles = theme => ({

  instagramWrapper:{
   margin: "auto",
   marginTop: "10px",
   alignContent: "center",
   width: "1000px",
   display: "block",
   position: "relative"
  },
  instaPost:{
   display: "inline-block",
   margin: '6px',
   minWidth: '320px !important',
   maxWidth: '320px !important',
   width: '320px !important',
  },
  Heading:{
    marginLeft: "20px",
    paddingTop: "5px",
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontFamily: 'arial',
    fontWeight: 'bold'
  },
  loading:{
    position: 'absolute',
    left: '160px',
    top: '217px'
  },
  loadingWrapper:{
    display: "inline-block",
    width: '320px',
    height: '435px',
    border: '1px solid #DDD'
  }
});

const instaCodes = {
  imageCode1: 'CCPGaqfgH2o',
  imageCode2: 'CCPCRcjAf7D',
  imageCode3: 'CCPGv0egFs4',
};



function InstagramSection(props) {
  const { classes } = props;
  const [loading, setLoading] = useState({imageCode1: true, imageCode2: true, imageCode3: true});

  const instaPost = (imageCodeKey) =>{
    return(
      <Fragment>
        {loading[imageCodeKey] &&
          <div className={classes.loadingWrapper}>
            <CircularProgress className={classes.loading}/>
          </div>
        }
          <InstagramEmbed
            className={classes.instaPost}
            url={'https://www.instagram.com/p/' + instaCodes[imageCodeKey]}
            onAfterRender={() => {setLoading({...loading, [imageCodeKey]: false})}}
            hideCaption={true} containerTagName='div' injectScript/>
      </Fragment>
    );
  }

  return (
    <div className={classes.instagramWrapper}>
      <Typography className={classes.Heading}>Find us on Instagram:</Typography>
        {instaPost('imageCode1')}
        {instaPost('imageCode2')}
        {instaPost('imageCode3')}
      </div>
    );
    }

export default withStyles(styles)(InstagramSection);
