import axios from 'axios';

export const getItems = () => dispatch => {
   dispatch(setItemsLoading())
   axios
   .get('/a')
   .then(res=>dispatch({
    type: 'GET_ITEMS',
    payload: res.data
}))
   
}
export const deleteItem = (data) => dispatch=>{
   axios
   .delete('/item/delete',{data})
   .then(res=>dispatch({
    type:'DELETE_ITEM',
    payload: res.data
}))
   
}
export const addItem = (newItem) => dispatch=> {
  
    axios
    .post('/item/add',newItem)
    .then(res=>dispatch({
        type:'ADD_ITEM',
        payload: res.data
    }))
    
}

export const setItemsLoading = () => {
    return {
        type:'ITEMS_LOADING',
        loading:true
    }
}
