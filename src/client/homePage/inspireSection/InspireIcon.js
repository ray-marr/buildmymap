import React from 'react';
import {Typography, Avatar} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  inspireIconWrapper:{
    width: '200px',
    height: '250px',
    display: 'inline-block',
    margin: '0 15px',
    overflow: 'hidden'
  },
  title:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(20),
    color: '#333',
    fontFamily: 'Helvetica',
    marginBottom: '5px'
  },
  message:{
    textAlign: "center",
    fontSize: theme.typography.pxToRem(16),
    color: theme.palette.text.secondary,
    fontFamily: 'Helvetica'
  },
  avatarCircle:{
    width: '80px',
    height: '80px',
    color: '#111',
    margin: '5px',
    display: 'inline-flex'
  }
});



const InspireIcon = (props) => {

  const {icon, title, message, color, classes} = props;

  return (
        <div className={classes.inspireIconWrapper}>
          <Avatar className={classes.avatarCircle} style={{backgroundColor: color}}>{icon}</Avatar>
          <Typography className={classes.title}>{title}</Typography>
          <Typography className={classes.message}>{message}</Typography>
        </div>
  );
};



export default withStyles(styles)(InspireIcon);
