import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { toast } from 'react-toastify'

const initialState = {
    user: null,
    token: null,
    isAuth: false,
    isLoading: false,
    error: null,
}
//lsdjf
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoading = false
            state.isAuth = true
            state.user = action?.payload?.user
            state.token = action?.payload?.token
            toast.success('Login Success')


        })
        builder.addCase(login.rejected, (state, action) => {
            state.isLoading = false
            state.error = action?.payload

        })
        builder.addCase(logout.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoading = false
            state.isAuth = false
            state.user = null
            state.token = null
            toast.success('Logout Success')



        })
        builder.addCase(logout.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload
            toast.error(action.payload.message)
        })


    },
})


export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post('https://taskmanagement-7yjx.onrender.com/api/auth/login', data, { withCredentials: true })
             
            return res.data
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)




export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.post('https://taskmanagement-7yjx.onrender.com/api/auth/logout',{}, { withCredentials: true })
         
            return res.data

        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const checkTokenInCookies = createAsyncThunk('auth/checkTokenInCookies', async (_, { dispatch }) => {
    try {
        const res = await axios.get('https://taskmanagement-7yjx.onrender.com/api/auth/checkTokenInCookies', { withCredentials: true });
        const { user, token } = res.data;
        dispatch(login.fulfilled({ user, token })).then().catch(err => console.log(err) )
    } catch (err) {
        navigator('/login');
    }
});

export default authSlice.reducer;


