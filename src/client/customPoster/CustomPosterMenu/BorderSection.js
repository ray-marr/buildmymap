import React from 'react';
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import MenuExpansion from './MenuExpansion';
import { ChromePicker } from 'react-color';
import { updateMapStore } from '../../components/actions/mapActions';
const styles = (theme) => ({
  chip:{
    margin: '2px',
    paddingBottom: '3px',
    background: '#eee',
    width: '100%',
    height: '20px',
    border: '1px solid #000',
    borderRadius: '12px',
    textAlign: 'center',
    cursor: "pointer",
    pointerEvents: "all",
    '&:hover':{
      transform: 'scale(1.05)'
    }
  },
  selectedChip:{
    margin: '2px',
    paddingBottom: '3px',
    background: '#cbf9d9',
    width: '100%',
    height: '20px',
    border: '1px dashed #000',
    borderRadius: '12px',
    textAlign: 'center',
    cursor: "pointer",
    pointerEvents: "all",
  },
  subHeading:{
    marginBottom: theme.spacing(1),
    fontSize: '1rem'
  },
  paddedWrapper:{
    marginBottom: theme.spacing(2),
    width: '100%'
  },
  colorPicker:{
     width: '225px',
     position: 'relative',
     left: '25px'
  },
  bordersWrapper:{
    display: 'grid',
    position: 'relative',
    left: '25px'
  }
});

const BorderSection = (props) =>{
  const {classes, expanded, handleChange, borderColor, updateMapStore, borderStyle} = props;

  const borderOption = (label) =>{
    let selected = label === borderStyle;
    return <div className={selected ? classes.selectedChip : classes.chip} onClick={() => updateMapStore("borderStyle", label)}>{label}</div>
  }

  return(
    <MenuExpansion heading='Border' subHeading='Add your finishing touch' panelName='panel4' expanded={expanded} handleChange={handleChange}>
        <div>
          <div className={classes.paddedWrapper}>
            <div className={classes.subHeading}>Style</div>
              <div className={classes.bordersWrapper}>
                {borderOption('none')}
                {borderOption('double')}
                {borderOption('solid')}
              </div>
            </div>
          <div className={classes.subHeading}>Color</div>
        <ChromePicker className={classes.colorPicker} disableAlpha color={borderColor} onChangeComplete={(e) => {updateMapStore("borderColor", e.hex)}}/>
        </div>
    </MenuExpansion>
  );
}




const mapStateToProps = (state) => {
  var customMap = state.customMap;
  return {
      borderColor: customMap.borderColor,
      borderStyle: customMap.borderStyle
      }
};


const mapDispatchToProps = (dispatch)=>{
    return{
        updateMapStore: (key, value)=>{dispatch(updateMapStore(key, value))}
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BorderSection));
