import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MenuExpansion from './MenuExpansion';
import FontPicker from "font-picker-react";
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux'
import { updateMapStore } from '../../components/actions/mapActions'

const styles = (theme) => ({

  inputField:{
    width: '220px',
    marginLeft: '20px',
    marginTop: '2px',
    borderRadius: '5px',
    border: '1px solid #000',
    height: '30px',
    padding: '0px 5px'
  },
  helperText:{
    position: 'absolute',
    right: '30px',
    fontSize: '10px',
    color: '#444'
  },
  errorHelperText:{
      position: 'absolute',
      right: '30px',
      fontSize: '10px',
      color: '#f44'
  },
  padme:{
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontSize: '15px'
  },
  colorPicker:{
     width: '225px',
     position: 'relative',
     left: '25px'
  },
  fontPickerWrapper:{

  },
  fontPicker:{

  },
  fontOption:{
    fontSize: '20px',
    height: '200px'
  },
  fontSelect:{
    width: '230px',
    fontSize: '20px',
    marginLeft: '20px',
    padding: '0px 5px',
    borderRadius: '5px',
    border: '1px dashed #000',
    position: 'absolute',
  },
  hidden:{
    visibility: 'hidden',
    pointerEvents: 'none',
    position: 'absolute',
    bottom: 0
  }
});

const fontFamilies = [
  'Roboto', 'Oswald', 'Amatic SC', 'Anton', 'Barlow Condensed', 'Caveat', 'Crimson Text', 'Dancing Script', 'Exo 2', 'Inconsolata', 'Indie Flower', 'Lobster',
  'Play', 'Playfair Display', 'Quicksand', 'Roboto Condensed', 'Shadows Into Light', 'Zilla Slab', 'Annie Use Your Telescope', 'Caveat Brush', 'Covered By Your Grace', 'Nanum Brush Script', 'Nanum Pen Script', 'Patrick Hand',
  'Permanent Marker', 'Allan', 'Anonymous Pro', 'Bangers', 'Concert One', 'Contrail One', 'Forum', 'Kranky', 'Love Ya Like A Sister', 'Nanum Gothic Coding', 'Seaweed Script', 'Simonetta', 'VT323'
];

const fontSizeMap = {
  'Annie Use Your Telescope' : {primary: 84, secondary: 60},
  'Allan' : {primary: 88, secondary: 60},
  'Anonymous Pro' : {primary: 76, secondary: 48},
  'Amatic SC' : {primary: 84, secondary: 76},
  'Anton' : {primary: 72, secondary: 60},
  'Barlow Condensed' : {primary: 88, secondary: 60},
  'Bangers' : {primary: 88, secondary: 60},
  'Concert One' : {primary: 60, secondary: 48},
  'Contrail One' : {primary: 80, secondary: 60},
  'Caveat Brush' : {primary: 76, secondary: 60},
  'Covered By Your Grace' : {primary: 80, secondary: 56},
  'Caveat' : {primary: 76, secondary: 60},
  'Crimson Text' : {primary: 68, secondary: 48},
  'Dancing Script' : {primary: 60, secondary: 44},
  'Exo 2' : {primary: 60, secondary: 44},
  'Forum' : {primary: 72, secondary: 48},
  'Inconsolata' : {primary: 80, secondary: 52},
  'Indie Flower' : {primary: 72, secondary: 40},
  'Kranky' : {primary: 60, secondary: 40},
  'Love Ya Like A Sister' : {primary: 80, secondary: 52},
  'Lobster' : {primary: 72, secondary: 40},
  'Nanum Brush Script' : {primary: 88, secondary: 60},
  'Nanum Gothic Coding' : {primary: 88, secondary: 48},
  'Nanum Pen Script' : {primary: 88, secondary: 60},
  'Oswald' : {primary: 60, secondary: 40},
  'Patrick Hand' : {primary: 80, secondary: 60},
  'Permanent Marker' : {primary: 64, secondary: 40},
  'Play' : {primary: 72, secondary: 48},
  'Playfair Display' : {primary: 68, secondary: 44},
  'Quicksand' : {primary: 76, secondary: 40},
  'Roboto' : {primary: 72, secondary: 44},
  'Roboto Condensed' : {primary: 72, secondary: 44},
  'Seaweed Script' : {primary: 72, secondary: 56},
  'Simonetta' : {primary: 76, secondary: 44},
  'Shadows Into Light' : {primary: 60, secondary: 44},
  'Zilla Slab' : {primary: 64, secondary: 48},
  'VT323' : {primary: 88, secondary: 60}
};

const TextEntrySection = (props) =>{
  const {classes, primaryText, secondaryText, expanded, handleChange, font, fontColor, updateMapStore} = props;
  const [primaryTextError, setPrimaryTextError] = React.useState(false);
  const [secondaryTextError, setSecondaryTextError] = React.useState(false);

  const primaryTextHandler = (e) =>{
    if(e.target.value.length <= 30){
      updateMapStore("primaryText", e.target.value);
      setPrimaryTextError(false);
    }else{
      setPrimaryTextError(true);
    }
  };

  const secondaryTextHandler = (e) =>{
    if(e.target.value.length <= 35){
      updateMapStore("secondaryText", e.target.value);
      setSecondaryTextError(false);
    }else{
      setSecondaryTextError(true);
    }
  };

const handleFontChange = (event) =>{
  if(event.target){
    let nextFont = event.target.value;
    if(!!nextFont){
      updateMapStore("primaryTextSize", fontSizeMap[nextFont].primary);
      updateMapStore("secondaryTextSize", fontSizeMap[nextFont].secondary);
      updateMapStore("font", nextFont);
    }
  }
};

const inputField = (heading, text, helperText, error, onChangeHandler) =>{

  return(
    <div>
      <label for="fname">{heading}</label>
      <br/>
      <input className={classes.inputField} type="text" value={text} onChange={onChangeHandler}/>
      <br/>
      <span className={error ? classes.errorHelperText : classes.helperText}>{helperText}</span>
    </div>
  );
};



  return(
    <MenuExpansion heading='Text' subHeading='What do you want to say?' panelName='panel3' expanded={expanded} handleChange={handleChange}>
      <div>
        {inputField('Primary Text:', primaryText, 'Max 30 characters.', primaryTextError, primaryTextHandler)}
        <br/>
        {inputField('Secondary Text:', secondaryText, 'Max 35 characters.', secondaryTextError, secondaryTextHandler)}
        <br/>
        <div className={classes.padme}>Font:</div>
        <div className={classes.fontPickerWrapper}>
          <select onChange={handleFontChange} className={classes.fontSelect} name="fonts" id="fonts">
            {fontFamilies.sort().map((font)=>{
              return (<option className={classes.fontOption} value={font} style={{fontFamily: font}}>{font}</option>)
            })}
          </select>
        </div>
      <br/>
      <br/>
        <div className={classes.hidden}>
          <FontPicker apiKey="AIzaSyDGU7qe4Y7KQx3175juEKXuqesf3TXzI7s" activeFontFamily={font} onChange={handleFontChange} limit={100} families={fontFamilies}/>
        </div>
        <div className={classes.padme}>Color:</div>
        <ChromePicker disableAlpha className={classes.colorPicker} color={fontColor} onChangeComplete={(e) => {updateMapStore("fontColor", e.hex);}} width='225px'/>
      </div>
    </MenuExpansion>
  );
}


const mapStateToProps = (state) => {
  var customMap = state.customMap;
  return {
      primaryText: customMap.primaryText,
      secondaryText: customMap.secondaryText,
      font: customMap.font,
      fontColor: customMap.fontColor
      }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        updateMapStore: (key, value)=>{dispatch(updateMapStore(key, value))}
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TextEntrySection));
