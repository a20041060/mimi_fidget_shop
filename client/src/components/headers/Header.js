import React, { useContext,useState } from 'react'
import Menu from './icons/menu.svg'
import Close from './icons/close.svg'
import Cart from './icons/cart.svg'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import axios from 'axios'


const Header = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userApi.isLogged;
    const [isAdmin] = state.userApi.isAdmin;
    const [cart] = state.userApi.cart
    const [menu, setMenu] = useState(false)

    const logoutUser = async ()=>{
            await axios.post('/user/logout')
            localStorage.clear()
            window.location.href="/"
    } 

    const adminRouter =()=>{
        return (
            <>
                <li><Link to="/create_product">Create Product</Link></li>
                <li><Link to="/category">Categories</Link></li>
            </>

        )
    }
    const loggedRouter =()=>{
        return (
            <>
                <li><Link to="/history">History</Link></li>
                <li><Link to="/" onClick={logoutUser}>Logout</Link></li>

            </>
        )
    }
    const styleMenu = {
        left: menu ? 0 : "-100%"
    }

    return (
    <header>
    <div className="menu" onClick={() => setMenu(!menu)}>
        <img src={Menu} alt="" width="30"/>
        </div>

        <div className='logo'>
            <h1>
                <Link to="/">{isAdmin? "Mimi's Shop" : "Mimi's Shop"}</Link>
            </h1>
        </div>

        <ul style={styleMenu}>
            <li>
                <Link to="/">{isAdmin?'Products':'Shop'}</Link>
            </li>
            {isAdmin && adminRouter()}
            {
                isLogged ? loggedRouter() : <li><Link to="/login">Login | Register</Link></li>
            }

            <li onClick={() => setMenu(!menu)}>
                <img src={Close} alt="" width="30" className='menu'/>
            </li>
        </ul>
        {
            isAdmin ? '' 
            :<div className="cart-icon">
                <span>{cart.length}</span>
                <Link to="/cart">
                    <img src={Cart} alt="" width="30" />
                </Link>
            </div>
        }
        


    </header>
  )
}

export default Header