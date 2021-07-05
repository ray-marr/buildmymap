import React, {Fragment} from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { withStyles } from '@material-ui/core/styles';
import TextEntrySection from './TextEntrySection';

const styles = theme => ({
  root:{
    pointerEvents: 'all'
  },
  button:{
    width: '100px',
    height: '100px',
    borderWidth: '1px',
    borderRadius: '50%',
    borderColor: '#555',
    backgroundColor: '#F5f5f5',
    position: 'relative',
    right: 0,
    boxShadow: '0px 0px 5px grey'
  },
  buttonWrapper:{
    position: 'fixed',
    right: -55,
    top: 'calc(50% - 70px)',
    zIndex: 1199
  },
  backarrow:{
    marginTop: '30px',
    marginRight: '40px',
    width: '40px',
    height: '40px',
    color: 'dimgrey'
  },
  forwardarrow:{
    marginTop: '30px',
    marginRight: '50px',
    width: '40px',
    height: '40px',
    color: 'dimgrey'
  },
  expandText:{
    right: '48px',
    top: '16px',
    position: 'absolute',
    fontSize: '1em',
    textOrientation: 'upright',
    writingMode: 'vertical-rl',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'dimgrey'
  },
  hiddenText:{
    position: 'fixed',
    pointerEvents: 'none',
    visibility: 'hidden'
  }
});

function SwipeableTemporaryDrawer(props) {
  const {children, anchor, classes} = props;
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

    const expandIcon = (
    <Fragment>
      <ArrowBackIosIcon className={classes.backarrow} onClick={toggleDrawer(anchor, true)}/>
      <span className={classes.expandText}>OPEN</span>
    </Fragment>);

    const collapseIcon = (
    <Fragment>
      <ArrowForwardIosIcon className={classes.forwardarrow} onClick={toggleDrawer(anchor, true)}/>
    </Fragment>);

  return (
    <div className={classes.root}>
        <React.Fragment key={anchor}>
          <div className={classes.buttonWrapper} style={ state[anchor] === true ? {right: 240} : {}}>
            <Button>
              <div className={classes.button} onClick={toggleDrawer(anchor, true)}>
                { state[anchor] === false ? expandIcon : collapseIcon}
              </div>
            </Button>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            disableBackdropTransition={true}
            hysteresis={0.01}
            minFlingVelocity={250}
            swipeAreaWidth={20}
            disableDiscovery={true}
            transitionDuration={{enter:0, exit:0}}
          >
            {children}
          </SwipeableDrawer>
          {/*Work-around to font not updating when sidebar is collapsed, as TextEntrySection is not rendered*/}
          {!state[anchor] && <div className={classes.hiddenText}><TextEntrySection handleChange={()=>{}}/></div>}
        </React.Fragment>
    </div>
  );
}



export default withStyles(styles)(SwipeableTemporaryDrawer);
