import React from 'react';
import CustomMapsBanner from './banner_1_overlay.jpg';
import Header from '../components/Header';
import Footer from '../components/Footer';

import '../App.css';
import { withStyles } from '@material-ui/core/styles';
import { Divider } from '@material-ui/core';
import InspireSection from './inspireSection/InspireSection';
import PreviewSection from './previewSection/PreviewSection';
import InstagramSection from './instagramSection/InstagramSection';

const styles = theme => ({
  mainViewZone: {
   height: '100%',
   width: '100%',
   backgroundColor: '#FCFCFC',
   minHeight: '100vh',
   overflow: 'hidden'
  },
  mainBodyWrapper:{
    width: "100%",
    height: "100%",
    marginTop: "8px",
    alignContent: "center"
  },
  customMapsBannerOuterWrapper:{
    width: "1000px",
    height: "calc(1000px * 0.4906)",
    overflow: 'hidden',
    margin: "auto"
  },
  customMapsBanner:{
    backgroundImage: `url(${CustomMapsBanner})`,
    backgroundSize: 'cover',
    width: "1000px",
    height: "calc(1000px * 0.4906)",
    cursor: "pointer",
    pointerEvents: "all",
    transition: 'transform 0.5s, filter 0.5s',
    '&:hover':{
      transform: 'scale(1.10) rotate(0.3deg)',
      filter: 'brightness(105%)'
    }
  },
  divider:{
    margin: "40px 0px"
  }
});


function Home(props) {
  const { classes } = props;

  const banner = (
      <div className={classes.customMapsBannerOuterWrapper}>
        <a href="/customMap" style={{display: 'contents'}}><div className={classes.customMapsBanner}/></a>
      </div>
  );

  return (
    <div className={classes.mainViewZone}>
      <Header selectedTab={0}/>
      <div className={classes.mainBodyWrapper}>
        {banner}
        <Divider className={classes.divider}/>
        <InspireSection/>
        <Divider className={classes.divider}/>
        <PreviewSection/>
        <Divider className={classes.divider}/>
        <InstagramSection/>
      </div>
      <Footer/>
    </div>
  );
}

export default withStyles(styles)(Home);
