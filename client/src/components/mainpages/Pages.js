import React, { useContext } from 'react'
import {  Route,Routes } from 'react-router-dom'
import Products from './products/Products'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import NotFound from './utils/NotFound/NotFound'
import DetailProduct from './detailProduct/DetailProduct'
import OrderHistory from './history/OrderHistory'
import OrderDetails from './history/OrderDetails'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'


import { GlobalState } from '../../GlobalState'


const Pages = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userApi.isLogged
  const [isAdmin] = state.userApi.isAdmin
  return (
    <Routes>
        <Route exact path='/'  element={<Products/>}/>
        <Route exact path="/detail/:id" element={<DetailProduct/>}/>

        <Route exact path='/login'  element={isLogged? <NotFound/>:<Login/>}/>
        <Route exact path='/register'  element={isLogged? <NotFound/>: <Register/>}/>

        <Route exaxt path='/category' element={isAdmin? <Categories/>: <NotFound/>}/>
        <Route exaxt path='/create_product' element={isAdmin? <CreateProduct/>: <NotFound/>}/>   
        <Route exact path='/edit_product/:id' element={isAdmin? <CreateProduct/>: <NotFound/>}/>     

        <Route exact path='/history' element={isLogged? <OrderHistory/>:<NotFound/>}/>
        <Route exact path='/history/:id' element={isLogged? <OrderDetails/>:<NotFound/>}/>
        
        <Route exact path='/cart'  element={<Cart/>}/>

        <Route path="*" exact element={<NotFound/>}/>
    </Routes>
    
  )
}

export default Pages