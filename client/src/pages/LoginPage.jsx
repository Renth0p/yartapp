import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkIsAuth, loginUser} from "../redux/features/auth/authSlice";
import {toast} from "react-toastify";

function LoginPage() {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const {status} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if(status) toast(status)
        if(isAuth) navigate('/')
    }, [status] )

    const handleSubmit = () => {
        try {
            dispatch(loginUser({username, password}))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()} className={'w-1/4 h-60 mx-auto mt-40'}>
            <h1 className={'text-lg text-white text-center'}>Авторизация</h1>
            <label className={'text-xs text-gray-400'}>
                Username:
                <input type="text"
                       value={username}
                       onChange={(e) => setUserName(e.target.value)}
                       placeholder={'Username'}
                       className={'mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'}
                />
            </label>
            <label className={'text-xs text-gray-400'}>
                Password:
                <input type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder={'Password'}
                       className={'mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700'}
                />
            </label>

            <div className={'flex gap-8 justify-center mt-4'}>
                <button type={'submit'} onClick={handleSubmit} className={'flex justify-center items-center text-xs bg-gray-600 py-2 text-white rounded-sm py-w px-4'}>
                    Войти
                </button>
            <Link to={'/register'}
            className={'flex justify-center items-center text-xs text-white'}>
                Нет аккаунта, зарегистрируйся?
            </Link>
            </div>

        </form>
    );
}

export default LoginPage;