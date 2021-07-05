import React, {Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import MapView from './MapView';
import Config from '../Config';
import { connect } from 'react-redux';
// import Snackbar from '@material-ui/core/Snackbar';
// import MuiAlert from '@material-ui/lab/Alert';
import classNames from 'classnames/bind';
import useWindowDimensions from '../components/utils/useWindowDimensions';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';

const useStyles = makeStyles(theme => ({
    map0:{
      position: 'absolute',
      width: '950px',
      height: '1200px',
      top: 20,
      left: 24
    },
    map1:{
      position: 'absolute',
      width: '950px',
      height: '580px'
    },
    map1_1:{ top: 20, left: 20},
    map1_2:{ top: 620, left: 20},
    map2:{
      position: 'absolute',
      width: '950px',
      height: '380px'
    },
    map2_1:{ top: 20, left: 20},
    map2_2:{ top: 420, left: 20},
    map2_3:{ top: 820, left: 20},
    map3:{
      position: 'absolute',
      width: '950px',
      height: '280px'
    },
    map3_1:{ top: 20, left: 20},
    map3_2:{ top: 320, left: 20},
    map3_3:{ top: 620, left: 20},
    map3_4:{ top: 920, left: 20},
    map4:{
      position: 'absolute',
      width: '460px',
      height: '580px',
    },
    map4_1:{ top: 20, left: 20},
    map4_2:{ top: 20, right: 20},
    map4_3:{ top: 624, left: 20},
    map4_4:{ top: 624, right: 20},
    paper: {
      position: 'absolute',
      width: '1000px',
      height:'1414px'
    },
    textWrapper:{
      height: '170px',
      width: '100%',
      position: 'absolute',
      zIndex: 2,
      bottom: 20,
      alignContent: 'center'
    },
    primaryTextWrap:{
      height: '90px',
      width: '100%',
      display: 'inline-block',
      textTransform: 'uppercase',
      overflow: 'hidden'
    },
    secondaryTextWrap:{
      height: '80px',
      width: '100%',
      display: 'inline-block',
      textTransform: 'uppercase',
      overflow: 'hidden'
    }
}));

// function Alert(props) {
//   return <MuiAlert elevation={6} variant="filled" {...props} />;
// }

export const GetPosterScale = (width) => {

  const { windowHeight, windowWidth } = useWindowDimensions();
  var defaultPosterSize = {w: 1000, h: 1414};
  var sideBarSize = isWidthDown('sm', width) ? 0 : 300;
  var availableWidth = windowWidth - sideBarSize - 20; //20 padding on poster container, 300 width of sideMenu
  var availableHeight = windowHeight - Config.headerHeight - Config.footerHeight - 40; //40 padding on poster container

  var scaleX = availableWidth / defaultPosterSize.w;
  var scaleY = availableHeight / defaultPosterSize.h;

  //return the smallest scale required to fit available space
  var posterScale = scaleX < scaleY ? scaleX : scaleY;

  return posterScale;

};

const PosterController = ({style, layout, primaryText, secondaryText, mapSaveBool, borderStyle, setBorderStyle, borderColor, font, fontColor, primaryTextSize, secondaryTextSize, faded, width}) => {
  const classes = useStyles();
  // const [open, setopen] = React.useState(true);

const mapStyle = {
  borderColor: borderStyle === 'none' ? Config.colors.white : borderColor,
  ...Config.borders[borderStyle]
};

let posterScale =  GetPosterScale(width);


  const getMaps = () =>{
    if(layout === 0){
      return(
        <MapView className={classes.map0} style={mapStyle} layout={layout} mapKey='map1'/>
      );
    }else if (layout === 1){
      return(
        <Fragment>
          <MapView className={classNames(classes.map1, classes.map1_1)} style={mapStyle} layout={layout} mapKey='map1'/>
          <MapView className={classNames(classes.map1, classes.map1_2)} style={mapStyle} layout={layout} mapKey='map2'/>
        </Fragment>
      );
    }else if (layout === 2){
      return (
        <Fragment>
          <MapView className={classNames(classes.map2, classes.map2_1)} style={mapStyle} layout={layout} mapKey='map1'/>
          <MapView className={classNames(classes.map2, classes.map2_2)} style={mapStyle} layout={layout} mapKey='map2'/>
          <MapView className={classNames(classes.map2, classes.map2_3)} style={mapStyle} layout={layout} mapKey='map3'/>
        </Fragment>
      );
    }else if(layout === 3){
      return(
        <Fragment>
          <MapView className={classNames(classes.map3, classes.map3_1)} style={mapStyle} layout={layout} mapKey='map1'/>
          <MapView className={classNames(classes.map3, classes.map3_2)} style={mapStyle} layout={layout} mapKey='map2'/>
          <MapView className={classNames(classes.map3, classes.map3_3)} style={mapStyle} layout={layout} mapKey='map3'/>
          <MapView className={classNames(classes.map3, classes.map3_4)} style={mapStyle} layout={layout} mapKey='map4'/>
        </Fragment>
      );
    }else if(layout === 4){
      return(
        <Fragment>
          <MapView className={classNames(classes.map4, classes.map4_1)} posterScale={posterScale} style={mapStyle} layout={layout} mapKey='map1'/>
          <MapView className={classNames(classes.map4, classes.map4_2)} posterScale={posterScale} style={mapStyle} layout={layout} mapKey='map2'/>
          <MapView className={classNames(classes.map4, classes.map4_3)} posterScale={posterScale} style={mapStyle} layout={layout} mapKey='map3'/>
          <MapView className={classNames(classes.map4, classes.map4_4)} posterScale={posterScale} style={mapStyle} layout={layout} mapKey='map4'/>
        </Fragment>
      );
    }
  };


  const getTextOverlay = () =>{
    return(
        <div className={classes.textWrapper}>
          <div className={classes.primaryTextWrap} style={{color: fontColor, fontSize: primaryTextSize}}>
            <div className='apply-font'>{primaryText}</div>
          </div>
          <div className={classes.secondaryTextWrap} style={{color: fontColor, fontSize: secondaryTextSize}}>
            <div className='apply-font'>{secondaryText}</div>
          </div>
        </div>
    );
  };

  return(
    <Fragment>
      <Paper className={classes.paper} elevation={5} style={{transform: `scale(${GetPosterScale(width)})`}}>
        <div id="custom-map-poster" style={{width:'100%', height:'100%', backgroundColor:'#FFF'}}>
          {getMaps()}
          {getTextOverlay()}
        </div>
      </Paper>
      {/*<Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} autoHideDuration={6000} onClose={(event, reason)=>{reason === 'timeout' && setopen(false) }}>
        <Alert severity="info" onClose={()=>{setopen(false)}}>You can change the map view by draging to a new location or using the zoom buttons.</Alert>
      </Snackbar>*/}
    </Fragment>
    );
}

const mapStateToProps = (state) => {
  var customMap = state.customMap;
  var faded = customMap.borderStyle === 'faded';
  return {
      primaryTextSize: customMap.primaryTextSize,
      secondaryTextSize: customMap.secondaryTextSize,
      primaryText: customMap.primaryText,
      secondaryText: customMap.secondaryText,
      font: customMap.font,
      fontColor: customMap.fontColor,
      style: customMap.style,
      layout: customMap.layout,
      borderStyle: customMap.borderStyle,
      borderColor: customMap.borderColor,
      faded: faded
      }
}


export default connect(mapStateToProps)(withWidth()(PosterController));
