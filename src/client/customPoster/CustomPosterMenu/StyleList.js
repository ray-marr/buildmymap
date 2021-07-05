import React, {useState} from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import classNames from 'classnames/bind';
import { withStyles } from '@material-ui/core/styles';
import Config from '../../Config';
import AzuleMapIcon from '../../components/icons/azule_map.png';
import SandstoneMapIcon from '../../components/icons/sandstone_map.png';
import NightMapIcon from '../../components/icons/night_map.png';
import BlueprintMapIcon from '../../components/icons/blueprint_map.png';
import CartoonMapIcon from '../../components/icons/cartoon_map.png';
import FrankMapIcon from '../../components/icons/frank_map.png';
import MineralMapIcon from '../../components/icons/mineral_map.png';
import PosterMapIcon from '../../components/icons/poster_map.png';
import RBWMapIcon from '../../components/icons/rbw_map.png';
import TreasureMapIcon from '../../components/icons/treasure_map.png';
import WesternIcon from '../../components/icons/western_map.png';
import ComicIcon from '../../components/icons/comic_map.png';
import MenuExpansion from './MenuExpansion';
import { updateMapStore } from '../../components/actions/mapActions';


const styles = (theme) => ({
  styleIcon:{
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    backgroundSize: 'cover',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: `${Config.colors.white}`,
    filter: 'drop-shadow(3px 3px 3px rgba(0,0,0,0.3))',
    '&:hover':{
      borderColor: Config.colors.successGreen,
      filter: 'drop-shadow(0 0 5px rgba(0,200,80,0.7))'
    }
  },
  highlightedIcon:{
    borderColor: Config.colors.successGreen,
    filter: 'drop-shadow(0 0 5px rgba(0,200,80,0.7))'
  },
  azule:{
    backgroundImage: `url(${AzuleMapIcon})`
  },
  sandstone:{
    backgroundImage: `url(${SandstoneMapIcon})`
  },
  night:{
    backgroundImage: `url(${NightMapIcon})`
  },
  blueprint:{
    backgroundImage: `url(${BlueprintMapIcon})`
  },
  poster:{
    backgroundImage: `url(${PosterMapIcon})`
  },
  frank:{
    backgroundImage: `url(${FrankMapIcon})`
  },
  treasure:{
    backgroundImage: `url(${TreasureMapIcon})`
  },
  cartoon:{
    backgroundImage: `url(${CartoonMapIcon})`
  },
  mineral:{
    backgroundImage: `url(${MineralMapIcon})`
  },
  rbw:{
    backgroundImage: `url(${RBWMapIcon})`
  },
  western:{
    backgroundImage: `url(${WesternIcon})`
  },
  comic:{
    backgroundImage: `url(${ComicIcon})`
  },
});

const StyleList = (props) =>{
  const {classes, expanded, handleChange, updateMapStore, selectedStyle} = props;
  const [disableButtons, setDisableButtons] = useState(false);

  const handleStyleClick = (style, font, color, primaryTextSize, secondaryTextSize) => {

    //disable all buttons for 1 second after a click to stop rapidly changing styles, and bug with fonts not loading
    if(!disableButtons){
      setDisableButtons(true);
      updateMapStore("style", style);
      updateMapStore("font", font);
      updateMapStore("fontColor", color);
      updateMapStore("primaryTextSize", primaryTextSize);
      updateMapStore("secondaryTextSize", secondaryTextSize);
      setTimeout(function() {
        setDisableButtons(false);
      }, 1000);

    }
  };

  const styleButton = (style, font, color, primaryTextSize, secondaryTextSize) =>{
    const buttonSelected = style === selectedStyle;
    const highlightStyling = buttonSelected ? classes.highlightedIcon : {};
    const handleButtonClick = buttonSelected ? null : () => handleStyleClick(style, font, color, primaryTextSize, secondaryTextSize);

    return <Grid item xs={4}>
            <div id={style}
              onClick={handleButtonClick}
              className={classNames(classes.styleIcon, classes[style], highlightStyling)}/>
          </Grid>
  };

        return (
          <MenuExpansion heading='Style' subHeading='Choose your map designs' panelName='panel2' expanded={expanded} handleChange={handleChange}>
            <Grid container spacing={1}>
              {styleButton('rbw', 'Oswald', '#333333', 60, 40)}
              {styleButton('treasure', 'Permanent Marker', '#9F0500', 64, 40)}
              {styleButton('azule', 'Amatic SC', '#000000', 84, 76)}
              {styleButton('mineral', 'Bangers', '#0C797D', 88, 60)}
              {styleButton('blueprint', 'Annie Use Your Telescope', '#0062B1', 84, 60)}
              {styleButton('poster', 'Barlow Condensed', '#D33115', 88, 60)}
              {styleButton('frank', 'Quicksand', '#000000', 76, 40)}
              {styleButton('sandstone', 'Nanum Brush Script', '#0062B1', 88, 60)}
              {styleButton('cartoon', 'Love Ya Like A Sister', '#0C797D', 80, 52)}
              {styleButton('night', 'Zilla Slab', '#000000', 64, 48)}
              {styleButton('western', 'Playfair Display', '#4D4D4D', 68, 44)}
              {styleButton('comic', 'Bangers', '#D33115', 88, 60)}
            </Grid>
          </MenuExpansion>
        );
}


const mapDispatchToProps= (dispatch)=>{
    return{
        updateMapStore: (key, value)=>{dispatch(updateMapStore(key, value))}
    }
}
const mapStateToProps = (state) => {
  return {
      selectedStyle: state.customMap.style
      }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StyleList));
