const initState = {
    allowed: false
};


const cookieReducer = (state = initState, action)=>{

  if(action.type === 'ACCEPT_COOKIES'){
    let currentCartState = {...state};
    currentCartState.allowed = true;
    return currentCartState;
  }else{
    return state;
  }

}

export default cookieReducer;
