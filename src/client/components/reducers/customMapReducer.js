const initState = {
      map1: {x: -13000.0, y: 6710000.268977703, z: 2},
      map2: {x: -11310234.201301, y: 4481044.346190, z: 2},
      map3: {x: 14891156.102405, y: -2719935.214500, z: 2},
      map4: {x: 2622095.818295, y: 254382.430133, z: 2},
      loading_map1: false,
      loading_map2: false,
      loading_map3: false,
      loading_map4: false,
      layout: 4,
      style: "rbw",
      primaryText: "WANDERLUST",
      secondaryText: "NOT ALL THOSE WHO WANDER ARE LOST",
      primaryTextSize: 60,
      secondaryTextSize: 40,
      font: "Oswald",
      fontColor: "#333333",
      borderStyle: "double",
      borderColor: "#000000",
      size: "A4"
};

const customMapReducer = (state = initState, action)=>{
  if(action.type === 'UPDATE_CUSTOM_MAP'){
    const {key, value} = action;
    let currentMapState = {...state};
    currentMapState[key] = value;
    return currentMapState;
  }else{
    return state;
  }
}

export default customMapReducer;
