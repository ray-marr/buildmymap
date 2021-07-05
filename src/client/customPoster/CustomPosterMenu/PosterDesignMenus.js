import React, {Fragment} from 'react';
import LayoutList from './LayoutList';
import StyleList from './StyleList';
import TextEntrySection from './TextEntrySection';
import BorderSection from './BorderSection';
import SizeSection from './SizeSection';
import AddToCartSection from './AddToCartSection';
import SwipeableDrawer from './SwipeableDrawer';
import { withStyles } from '@material-ui/core/styles';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const styles = theme => ({
  root: {
    width: '100%',
    height: 'calc(100% - 5px)',
    paddingTop: '5px',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
      pointerEvents: 'all'
    }
  },
  sections: {
    width: '100%',
    height: 'calc(100% - 55px)',
    overflowY: 'auto'
  }
});

const PosterDesignMenus = (props) =>{
  const {classes, width} = props;

  const [expanded, setExpanded] = React.useState('panel1');
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

const sidebarContent = () =>{
  return(
    <div className={classes.root}>
      <div className={classes.sections}>
        <LayoutList handleChange={handleChange} expanded={expanded}/>
        <StyleList handleChange={handleChange} expanded={expanded} />
        <TextEntrySection handleChange={handleChange} expanded={expanded}/>
        <BorderSection handleChange={handleChange} expanded={expanded}/>
        <SizeSection handleChange={handleChange} expanded={expanded}/>
        <AddToCartSection/>
      </div>
    </div>
  );
};


  return (
    <Fragment>
    {isWidthDown('sm', width) ?
      <SwipeableDrawer anchor='right'>
        {sidebarContent()}
      </SwipeableDrawer>
    :
    sidebarContent()
   }
   </Fragment>
  );
}

export default withWidth()(withStyles(styles)(PosterDesignMenus));
