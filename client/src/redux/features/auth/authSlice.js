import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk('auth/registerUser', async({username, password}) => {
    try {
        const {data} = await axios.post('/auth/register', {
            username,
            password
        })
        if(data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data;
    } catch (e) {
        console.log(e)
    }
})

export const loginUser = createAsyncThunk('auth/loginUser', async({username, password}) => {
    try {
        const {data} = await axios.post('/auth/login', {
            username,
            password
        })
        if(data.token) {
            window.localStorage.setItem('token', data.token)
        }
        return data;
    } catch (e) {
        console.log(e)
    }
})

export const getMe = createAsyncThunk('auth/getMe', async() => {
    try {
        const {data} = await axios.get('/auth/me')
        return data;
    } catch (e) {
        console.log(e)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
                state.user = null
                state.token = null
                state.isLoading = false
                state.status = null
        }
    },
    extraReducers: {
        // Register
        [registerUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        }, // запрос отправляется
        [registerUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        }, // полный запрос отправлен
        [registerUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }, // ошибка при запросе
        // Login
        [loginUser.pending]: (state) => {
            state.isLoading = true
            state.status = null
        }, // запрос отправляется
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
        }, // полный запрос отправлен
        [loginUser.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }, // ошибка при запросе
        //  GetMe (Проверка авторизации)
        [getMe.pending]: (state) => {
            state.isLoading = true
            state.status = null
        }, // запрос отправляется
        [getMe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
        }, // полный запрос отправлен
        [getMe.rejected]: (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
        }, // ошибка при запросе

    },
})

export const checkIsAuth = state => Boolean(state.auth.token)

export const {logout} = authSlice.actions
export default authSlice.reducer