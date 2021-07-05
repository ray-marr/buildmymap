import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import View from 'ol/View';
import olMap from 'ol/Map';
import Tile from 'ol/layer/Tile';
import {fromLonLat} from 'ol/proj';
import XYZ from 'ol/source/XYZ';
import {defaults as defaultInteractions} from 'ol/interaction';
import '../App.css';
import Config from '../Config.js';
import { updateMapStore } from '../components/actions/mapActions';
import withWidth from '@material-ui/core/withWidth';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Zoom from 'ol/control/Zoom';
require('ol/ol.css');



 class MapView extends React.Component {

  state = {
     coords: {x: 0, y: 0, z: 0},
     customMapStyle: 'rbw',
     layout: 4,
     input: '',
     inputFocused: true,
     locations: [],
     posterScale: 1,
     searchFocused: false
   };

  storeMapState(prevProps){
      const view = this.map.getView();
      const currentCoords = {x: view.getCenter()[0], y: view.getCenter()[1], z: view.getZoom()};
      if(this.state.coords.x !== currentCoords.x | this.state.coords.y !== currentCoords.y | this.state.coords.z !== currentCoords.z ){
        prevProps.updateMapStore(this.props.mapKey, currentCoords);
        this.setState({coords: currentCoords});
      }
  }

//Sets store state loading_map1, loading_map2 etc, while maps are loading
  addSourceListeners(props, source){
    source.on('tileloadstart', function() {
      props.updateMapStore('loading_' + props.mapKey, true);
    });
  };


  updateMapStyle(prevProps){
    if(this.state.customMapStyle !== this.props.customMapStyle){
      const layer = this.map.getLayers().getArray()[0];
      const mapboxUrl = '/api/map?style='
                          + Config.maps[this.props.customMapStyle]
                          + '&x={x}&y={y}&z={z}';

      this.source = new XYZ({url: mapboxUrl, crossOrigin: "Anonymous"});

      this.addSourceListeners(prevProps, this.source);

      layer.setSource(this.source);
      this.setState({customMapStyle: this.props.customMapStyle});
    }
  }

  resizeMapToWrapper(prevProps){
     if(this.props.layout !== this.state.layout){
       this.map.updateSize();
       this.setState({layout: this.props.layout});
     }
   }

    constructor(props) {
        super(props);

        var {x, y, z} = props[props.mapKey];
        this.setState({coords: {x, y, z}});
        this.state.customMapStyle = props.customMapStyle;
        this.state.layout = props.layout;

        if(!this.view){
          this.view = new View({
            center: [x, y],
            zoom: z,
            minZoom: 0,
            maxZoom: 13,
            enableRotation: false
          });
        }

        const mapboxUrl = '/api/map?style='
                            + Config.maps[this.props.customMapStyle]
                            + '&x={x}&y={y}&z={z}';

        this.source = new XYZ({url: mapboxUrl, crossOrigin: "Anonymous"});
        this.addSourceListeners(props, this.source);
};


    componentDidMount(props) {
      this.map = new olMap({
        interactions: defaultInteractions({mouseWheelZoom:false, zoomDuration: 0, pinchZoom: false}),
        controls: [
          new Zoom({duration: 800})
        ],
        layers: [
          new Tile({source: this.source})
        ],
        target: this.refs.mapContainer,
        view: this.view
      });

      //sets loading_map1, loading_map2 etc to false when map is fully loaded
      this.map.on('rendercomplete', () => {
        this.props.updateMapStore('loading_' + this.props.mapKey, false);
        this.storeMapState(this.props);
      });

    }

    componentDidUpdate(prevProps){
      this.storeMapState(prevProps);
      this.updateMapStyle(prevProps);
      this.resizeMapToWrapper(prevProps);
    }

    handleKeyPress = (event) =>{
      let search = event.target.value;
      this.setState({
        input: search
      });
      if(search.length >= 2){
        let locationUrl = '/api/location?location=' + search;

        fetch(locationUrl)
          .then(res => res.json())
          .then((data) => {
            this.setState({ locations: data.features })
          })
          .catch(console.log)

      } else{
        this.setState({ locations: [] })
      }
    }




    handleLocationClick = (location) => {
      let center = location.center;
      let placeType = location.place_type;
      let zoomLevel = 5;

      switch(placeType[0]) {
        case 'country':
          zoomLevel = 4;
          break;
        case 'region':
          zoomLevel = 7;
          break;
        case 'district':
          zoomLevel = 9;
          break;
        case 'place':
          zoomLevel = 10;
          break;
        case 'locality':
          zoomLevel = 13;
          break;
        case 'postcode':
          zoomLevel = 14;
          break;
        case 'neighborhood':
          zoomLevel = 14;
          break;
        case 'address':
          zoomLevel = 14;
          break;
        case 'poi':
          zoomLevel = 14;
          break;
        default:
          break;
      }

      this.view.setZoom(zoomLevel);
      this.view.setCenter(fromLonLat(center));
      this.setState({
        input: '',
        locations: []
      });
    };

  locationList = (scale) => {
    //scales locationlist inversly to posterscaling (to stop unreadable text on smaller displays)
    //A dampening factor is applied so the list does not scale up or down too much
    const dampeningFactor = 0.8;
    let locationScale = 1/(1-((1 - scale)*dampeningFactor));

      return(
        <div style={{position: 'absolute', zIndex: 4, top: '70px', right: '50px', width: '200px', height: '10px', transform: `scale(${locationScale})`}}>
          <List style={{padding:0, margin: 0, background: 'white'}} component="nav" aria-label="List of search locations">
            {this.state.locations.map((location, index) =>{
              return(
                <Fragment key={index}>
                  <ListItem button onClick={() => this.handleLocationClick(location)}>
                    <ListItemText primary={location.place_name} />
                  </ListItem>
                  <Divider/>
                </Fragment>
              );
            })}
          </List>
        </div>
      );
    }

    render(prevProps) {
        //delay to allow clicking of location before it disappears onBlur
        const handleLoseFocus = () =>{
          setTimeout(() => {
            this.setState({searchFocused: false});
          }, 200);
        };

        const handleEnter = (event) =>{
          if (event.key === "Enter" && this.state.locations.length > 0) {
            this.handleLocationClick(this.state.locations[0]);
            this.inputDom.blur();


          }
        };



        return (
              <div className={this.props.className} style={this.props.style} ref="mapContainer">
                <input type="search" style={{position: 'absolute', zIndex: 2, top: '20px', right: '10px', width: '300px', height: '50px', fontSize: '1.5em', border: '0px solid #333', borderRadius: '6px', paddingLeft:10, paddingRight:10}}
                  placeholder='Search for a location...'
                  value={this.state.input}
                  onChange={this.handleKeyPress}
                  onFocus={ () => this.setState({searchFocused: true})}
                  onBlur={ handleLoseFocus }
                  onKeyPress={ handleEnter }
                  autocomplete='off'
                  ref={(inputDom) =>{this.inputDom = inputDom}}
                  />
                { this.state.searchFocused && this.state.locations.length > 0 && this.locationList(this.props.posterScale)}
              </div>
        );
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        updateMapStore: (key, value)=>{dispatch(updateMapStore(key, value))}
    }
};

const mapStateToProps = (state) => {
  var customMap = {...state.customMap};
  return {
      map1: customMap.map1,
      map2: customMap.map2,
      map3: customMap.map3,
      map4: customMap.map4,
      customMapStyle: customMap.style,
      layout: customMap.layout
      }
};

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(MapView));
