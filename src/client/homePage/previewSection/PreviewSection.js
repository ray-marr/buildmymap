import React, {Fragment} from 'react';
import {Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames/bind';
import PreviewImg1 from './prev_1.png';
import PreviewImg2 from './prev_2.png';
import PreviewImg3 from './prev_3.png';
import PreviewImg4 from './prev_4.png';



import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  previewGrid:{
    margin: "auto",
    marginTop: "10px",
    padding: "5px",
    width: "1000px",
    backgroundColor: "#EAEAEA",
    borderRadius: 5
  },
  previewGridHeading:{
    marginLeft: "20px",
    paddingTop: "5px",
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    fontFamily: 'arial',
    fontWeight: 'bold'
  },
  previewImg:{
    backgroundSize: 'cover',
    height: 280,
    width: 200,
    margin: "10px 0px",
    display: "inline-block",
    whiteSpace: "no-wrap",
    transition: 'transform 1s',
    cursor: "pointer",
    pointerEvents: "all",
    '&:hover': {
      transform: 'scale(1.05)'
    }
  },
  largeImg:{
    backgroundSize: 'cover',
    height: 560,
    width: 400,
    margin: "10px 0px",
    display: "inline-block",
    whiteSpace: "no-wrap",
    boxShadow: '0px 0px 10px #BBB'
  },
  previewImg1:{
      backgroundImage: `url(${PreviewImg1})`
  },
  previewImg2:{
      backgroundImage: `url(${PreviewImg2})`
  },
  previewImg3:{
      backgroundImage: `url(${PreviewImg3})`
  },
  previewImg4:{
      backgroundImage: `url(${PreviewImg4})`
  },
  root: {
   flexGrow: 1,
   whiteSpace: "no-wrap"
 },
 button:{
   fontFamily: 'Helvetica',
   fontWeight: 'bold'
 }

});



function PreviewSection(props) {
  const { classes } = props;


  const Image = (value) =>{
    const [open, setOpen] = React.useState(false);

    return (
      <Fragment key={value}>
        <Grid item>
          <div onClick={() => setOpen(!open)} className={classNames(classes[value], classes.previewImg)}/>
        </Grid>
        {open && (
            <Dialog onClose={() => setOpen(false)} open={open}>
                <DialogContent>
                  <div  className={classNames(classes[value], classes.largeImg)}/>
                </DialogContent>
                <DialogActions>
                  <Button className={classes.button} onClick={() => setOpen(false)}  autoFocus>
                    Close
                  </Button>
                </DialogActions>
            </Dialog>
          )}
        </Fragment>
    );
  }

  return (
    <div className={classes.previewGrid}>
      <Typography className={classes.previewGridHeading}>Customizable Artwork of your favourite places!</Typography>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={4}>
            {["previewImg1", "previewImg2", "previewImg3", "previewImg4"].map(value => (
              Image(value)
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
    );
    }

export default withStyles(styles)(PreviewSection);
