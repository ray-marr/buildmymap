import React, {useContext} from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab , Badge} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Config from '../Config';
import { withStyles } from '@material-ui/core/styles';
import { ShopContext } from '../context/shopContext'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { grey } from '@material-ui/core/colors';

const styles = theme => ({
  header:{
    height: '45px',
    width: '100%',
    backgroundColor: '#FCFCFC',
    borderBottom: '1px solid #CCC',
    zIndex: 2,
    paddingTop: '5px'
  },
  company:{
    fontFamily:'chunkFiveReg',
    color: Config.colors.greytext,
    fontSize: '1.8rem',
    marginLeft: 20,
  },
  navigation:{
    height: '50px',
    width: 'calc(100%-240px)',
    position: 'absolute',
    zIndex: '1',
    top: '0',
    overflowX: 'hidden',
    right: '0',
    textAlign: 'center',
    alignContent: 'center'
  },
  tabs:{
    height: '50px',
  },
  tab:{
    fontWeight: 'bold',
    fontFamily: 'arial'
  },
  cart:{
    fontSize: "1.8rem",
    marginTop: "10px",
    marginRight: "10px",
    color: grey[800],
    cursor: "pointer"
  },
  badge:{
    position: 'absolute',
    right: '15px',
    top: '15px',
    zIndex: '2',
    transform: 'scale(0.7)',
    cursor: "pointer",
  }
});


function Header(props) {
  const { classes, selectedTab, numItems } = props;
  const { openCart } = useContext(ShopContext)

  return (
      <div className={classes.header}>
        <Typography component='div' className={classes.company}><a href="/">buildmymap</a></Typography>
        <div className={classes.navigation}>
            <Tabs className={classes.tabs} value={selectedTab} indicatorColor='primary' centered>
              <a href="/"><Tab className={classes.tab} label="Home" /></a>
              <a href="/customMap"><Tab className={classes.tab} label="Custom Map" /></a>
              <Badge className={classes.badge} color="secondary" badgeContent={numItems}  onClick={() => openCart()}/>
              <ShoppingCartIcon className={classes.cart} onClick={() => openCart()}/>
            </Tabs>
        </div>
      </div>
  );
}

const mapStateToProps = (state) => {
  var cart = state.cart;

  return {
      numItems: cart.addedItems.length
      }
};

export default connect(mapStateToProps)(withStyles(styles)(Header));
