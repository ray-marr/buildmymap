const initState = {
    addedItems:[],
    lineTotal: 0,
    delivery: 5,
    total: 5,
    isCartOpen: false
};

const cartReducer = (state = initState, action)=>{
  if(action.type === 'ADD_ITEM_TO_CART'){
    const {item} = action;
    let currentCartState = {...state};
    item.cartIndex = currentCartState.addedItems.length + 1;
    currentCartState.addedItems.push(item);
    currentCartState.lineTotal += item.cost;
    currentCartState.total += item.cost;
    return currentCartState;
  }
  else if(action.type === 'REMOVE_ITEM_FROM_CART') {
    const {item} = action;
    let currentCartState = {...state};
    for(let i = 0; i < currentCartState.addedItems.length; i++){
      if(currentCartState.addedItems[i] === item){
        currentCartState.lineTotal -= item.cost;
        currentCartState.total -= item.cost;
        delete currentCartState.addedItems[i];

        break;
      }
    }
    let newState = {...currentCartState}
    newState.addedItems = [];
    for(let i = 0; i < currentCartState.addedItems.length; i++){
      if(!!currentCartState.addedItems[i]){
        newState.addedItems.push(currentCartState.addedItems[i]);
      }
    }
    return newState;
  }
  else if(action.type === 'EMPTY_CART'){
    return initState;
  }
  else{
    return state;
  }
}

export default cartReducer;
