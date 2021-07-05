export const updateMapStore = (key, value)=>{
return{
    type: 'UPDATE_CUSTOM_MAP',
     key: key,
     value: value }
}

export const addItemToCart = (item) => {
return{
    type: 'ADD_ITEM_TO_CART',
     item: item
   }
}

export const removeItemFromCart = (item) => {
return{
    type: 'REMOVE_ITEM_FROM_CART',
     item: item
   }
}

export const emptyCart = () => {
return{
    type: 'EMPTY_CART'
   }
}
