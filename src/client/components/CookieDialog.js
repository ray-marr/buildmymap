import React from 'react';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import { acceptCookies }  from './actions/cookieActions';
import cookieIcon from './icons/cookie.svg';


const styles = theme => ({
  title:{
    fontFamily: 'Arial',
    fontWeight: 'bold'
  },
  message:{
      fontFamily: 'Arial'
  },
  accept:{
      fontFamily: 'Arial',
      fontWeight: 'bold',
      color: '#333'
  },
  cookieIcon:{
      width: '100px',
      height: '100px',
      display: 'block',
      margin: 'auto'
  }
});

const CookieDialog = (props) => {
  const {acceptCookies, classes} = props;

  return (
    <Dialog aria-labelledby="cookie-dialog" open={true}>
      <DialogTitle className={classes.title} id="cookie-dialog-title"><span className={classes.title}>We use cookies.</span></DialogTitle>
      <DialogContent>
            <span className={classes.message}>
              We only store information which is <i>absolutely</i> required for the site to function.
              <br/>
              <img className={classes.cookieIcon} src={cookieIcon} alt="cookie icon"/>
              <br/>
              Such as:
              <ol>
                <li>Remembering what is in your shopping cart.</li>
                <li>Knowing how you've designed your map.</li>
              </ol>
            </span>
        </DialogContent>
        <DialogActions>
          <Button onClick={acceptCookies} color="primary">
            <span className={classes.accept}>Accept</span>
          </Button>
        </DialogActions>
    </Dialog>
  );
}



const mapDispatchToProps = (dispatch)=>{
    return{
        acceptCookies: ()=>{dispatch(acceptCookies())}
    }
};



export default connect(null, mapDispatchToProps)(withStyles(styles)(CookieDialog));
