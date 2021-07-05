import React from 'react';
import PosterDesignMenus from './CustomPosterMenu/PosterDesignMenus';
import PosterController from './PosterController';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../App.css';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  mainViewZone: {
    height: '100vh',
    width: '100vw',
    backgroundColor: '#FCFCFC',
    minHeight: '100vh',
    overflow: 'hidden'
  },
  splitScreen: {
    height: 'calc(100% - 102px)',
    position:'relative',
    zIndex: '1',
    width: '100%',
    overflowX: 'hidden',
    alignContent: 'center'
  },
  leftSide: {
    height: '100%',
    width: 'calc(100% - 300px)',
    position: 'absolute',
    zIndex: '1',
    top: '0',
    overflowX: 'hidden',
    left: '0',
    backgroundColor: '#DDD',
    textAlign: 'center',
    alignContent: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  rightSide:{
    height: '100%',
    width: '300px',
    position: 'absolute',
    zIndex: '1',
    top: '0px',
    overflowX: 'hidden',
    right: '0',
    backgroundColor: '#EEE',
    [theme.breakpoints.down('sm')]: {
      zIndex: '2',
      backgroundColor: 'transparent',
      pointerEvents: 'none'
    }
  },
  split:{
    height: 'calc(100% - 100px)',
    width: '100%'
  },
  posterContainer:{
    paddingTop: '20px',
    paddingLeft: '10px',
    paddingBottom: '20px',
    paddingRight: '10px',
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 40px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
});


function PosterDesignPage(props) {
  const { classes } = props;

  return (
    <div className={classes.mainViewZone}>
      <Header selectedTab={1}/>

      <div className={classes.splitScreen}>
        <div className={classes.leftSide}>
          <div className={classes.posterContainer}>
            <PosterController/>
          </div>
        </div>
        <div className={classes.rightSide}>
          <PosterDesignMenus/>
        </div>
      </div>

      <Footer/>
  </div>
  );
}

export default withStyles(styles)(PosterDesignPage);
