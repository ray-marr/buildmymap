import React, {Fragment} from 'react';
import { GiftIcon } from './GiftIcon';
import { FirstIcon } from './FirstIcon';
import { PaintIcon } from './PaintIcon';
import InspireIcon from './InspireIcon';
import {Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  inspireHeading:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(30),
    color: '#333',
    fontFamily: 'Helvetica',
    marginBottom: '20px'
  },
  inspireMessage:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(25),
    color: theme.palette.text.secondary,
    fontFamily: 'Helvetica'
  },
  inspireWrapper:{
    width: '800px',
    padding: '0 100px',
    margin: "auto",
    marginTop: "40px",
    marginBottom: "40px",
    textAlign: "center"
  },
  avatarCircle:{
    width: '80px',
    height: '80px',
    backgroundColor: '#f08080',
    color: '#111',
    margin: '20px',
    display: 'inline-flex'
  },
  avatarWrapper:{
    width: '1000px',
    margin: "auto",
    textAlign: "center"
  },

});



function InspireSection(props) {
  const { classes } = props;

  return (
    <Fragment>

      <div className={classes.inspireWrapper}>
        <Typography className={classes.inspireHeading}>Beautiful and unique maps.</Typography>
        <Typography className={classes.inspireMessage}>
          Create your own personalised map poster of your favourite places.
          Where you were born, where you went to school, where you met, or your favourite place in the world.
        </Typography>
      </div>

      <div  className={classes.avatarWrapper}>
        <InspireIcon icon={<FirstIcon/>} color='#f08080' title="The best quality" message="All of our prints are of the brilliant quality and resolution, allowing you to see even the finer details of your maps."/>
        <InspireIcon icon={<GiftIcon/>} color='#6ec3f5' title="Make their day!" message="The perfect gift for friends or family."/>
        <InspireIcon icon={<PaintIcon/>} color='#79d892' title="Personalised" message="Add your own message, select up to 4 locations, anywhere in the world! Choose a map style that you love."/>
      </div>
    </Fragment>
    );
    }

export default withStyles(styles)(InspireSection);
