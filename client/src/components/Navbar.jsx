import React from 'react';
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, logout} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";

function Navbar() {

    const isAuth = useSelector(checkIsAuth);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const activeStyles = {
        color: 'white'
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast('Вы вышли из системы')
        navigate('/login')
    }

    return (
        <div className={'flex py-4 justify-between items-center'}>
            <span className={'flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'}>Y</span>

            {
                isAuth && (
                    <ul className={'flex gap-8'}>
                        <li>
                            <NavLink to={'/'} style={({isActive}) => isActive ? activeStyles : undefined} className={'text-base text-gray-400 hover:text-white'}>Главная</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/posts'} style={({isActive}) => isActive ? activeStyles : undefined} className={'text-base text-gray-400 hover:text-white'}>Мои посты</NavLink>
                        </li>
                        <li>
                            <NavLink to={'/new'} style={({isActive}) => isActive ? activeStyles : undefined} className={'text-base text-gray-400 hover:text-white'}>Добавить посты</NavLink>
                        </li>
                    </ul>
                )
            }

            <div className={'flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'}>
                {
                    isAuth ? (
                        <button onClick={logoutHandler}>Выйти</button>
                    ) : (
                        <Link to={'/login'}>Войти</Link>
                    )
                }
            </div>
        </div>
    );
}

export default Navbar;