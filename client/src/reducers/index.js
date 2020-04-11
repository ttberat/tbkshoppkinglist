import {combineReducers} from 'redux'
import listReducer from "./productlistreducer"



export default combineReducers({
    productlist:listReducer
})