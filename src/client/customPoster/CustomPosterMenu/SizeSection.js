import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import MenuExpansion from './MenuExpansion';
import { updateMapStore } from '../../components/actions/mapActions';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = (theme) => ({
  root:{
    width: '100%',
    maxWidth: '280px',
  },
  avatar:{
    marginRight: '10px'
  }
});

const options = [
  {size: 'A4', price: '15.00', dimensions: '21.0 × 29.7cm', color: '#133337'},
  {size: 'A3', price: '20.00', dimensions: '29.7 x 42.0cm', color: '#065535'},
  {size: 'A2', price: '30.00', dimensions: '42.0 x 59.4cm', color: '#ffa500'},
  {size: 'A1', price: '40.00', dimensions: '59.4 x 84.1cm', color: '#008080'},
  {size: 'A0', price: '50.00', dimensions: '84.1 x 118.9cm', color: '#420420'}
];



const SizeSection = (props) =>{
  const {classes, expanded, handleChange, updateMapStore, customMapSize} = props;
  const [selectedOption, setSelectedOption] = React.useState(customMapSize);

  const handleSizeClick = (size, setSelectedChipColor) => {
    setSelectedOption(size);
    updateMapStore("size", size);
  };


  return(
    <MenuExpansion heading='Size' subHeading='Poster Size' panelName='panel5' expanded={expanded} handleChange={handleChange}>
      <div className={classes.root} >
        <List>
          {options.map(option => { return(
            <ListItem button
              style={{backgroundColor: option.size === selectedOption ? '#d3ffce' : ''}}
              onClick={() => handleSizeClick(option.size)}>
              <Avatar className={classes.avatar} style={{backgroundColor: option.color}}>{option.size}</Avatar>
              <ListItemText primary={`£${option.price}`} secondary={option.dimensions} />
            </ListItem>
            );
          })}
        </List>
      </div>
    </MenuExpansion>
  );
}




const mapStateToProps = (state) => {
  var customMap = state.customMap;
  return {
      customMapSize: customMap.size
      }
};


const mapDispatchToProps = (dispatch)=>{
    return{
        updateMapStore: (key, value)=>{dispatch(updateMapStore(key, value))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SizeSection));
