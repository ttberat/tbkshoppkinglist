import React from 'react'
import './App.css'
import AppNavbar from './components/appNavbar'
import MyListsPage from './components/myListsPage'
import {Provider} from 'react-redux'
import {store} from './store'



export default ()=> {
  return(
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <MyListsPage/>
      </div>
    </Provider>
)}

