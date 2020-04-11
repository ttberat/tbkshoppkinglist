
const initialState ={
    items:[],
    loading:false
}

export default (state = initialState, action) =>{
    switch (action.type) {
        case 'GET_ITEMS':
            return {
                ...state,
                items: [...action.payload],
                loading: false
            }
        case 'DELETE_ITEM':
            return {
               ...state,
                items: state.items.map((lists)=> lists._id === action.payload._id ? action.payload : lists)
            }
        case 'ADD_ITEM':
            return {
                ...state,
                items: [action.payload,...state.items]//state.items.concat(action.payload)
            }
        case 'ITEMS_LOADING':
            return {
                ...state,
                loading: true
            }
        default:
            return state
                
        }
    }