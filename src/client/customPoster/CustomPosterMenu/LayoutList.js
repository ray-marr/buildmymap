import React from 'react';
import { connect } from 'react-redux'
import {ListItem, List, ListItemText, ListItemIcon} from '@material-ui/core';
import Crop32Icon from '@material-ui/icons/Crop32';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import DehazeIcon from '@material-ui/icons/Dehaze';
import ReorderIcon from '@material-ui/icons/Reorder';
import BorderAllIcon from '@material-ui/icons/BorderAll';
import MenuExpansion from './MenuExpansion';
import { updateMapStore } from '../../components/actions/mapActions';



const LayoutList = (props) =>{
  const {expanded, handleChange, updateMapStore, layout} = props;

  const handleListItemClick = async (event, index) => {
    updateMapStore('layout', index);
  };

    return (
      <MenuExpansion heading='Layout' subHeading='How many maps?' panelName='panel1' expanded={expanded} handleChange={handleChange}>
        <List style={{width:'100%'}} component="nav">
          {[{index:0, icon: <Crop32Icon/>, text: 'Single Map'},
            {index:1, icon: <ViewStreamIcon/>, text: '2 Maps'},
            {index:2, icon: <DehazeIcon/>, text: '3 Maps'},
            {index:3, icon: <ReorderIcon/>, text: '4 Maps (Stacked)'},
            {index:4, icon: <BorderAllIcon/>, text: '4 Maps (Grid)'}].map((option)=>{
              let selected = layout === option.index;
              return(
                <ListItem key={option.index} style={selected ? {background: 'rgb(211, 255, 206)'}:{}} button selected={selected} onClick={event => handleListItemClick(event, option.index)} >
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.text} />
                </ListItem>
              );
          })}
        </List>
      </MenuExpansion>
    );
}


const mapDispatchToProps= (dispatch)=>{
    return{
        updateMapStore: (key, value)=>{dispatch(updateMapStore(key, value))}
    }
};

const mapStateToProps = (state) => {
  var customMap = state.customMap;
  return {
      layout: customMap.layout
      }
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutList);
