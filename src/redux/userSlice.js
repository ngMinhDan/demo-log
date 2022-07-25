import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie, STORAGEKEY } from '../utils/storage'

const initialState = {
    user: {},
    message: '',
    loading: true,
    isAuthenticated: false
}

const token = getCookie(STORAGEKEY.ACCESS_TOKEN)
const config = {
    headers: {
        'Authorization': `Bearer + ${token}`
    }
}
export const getUserInfo = createAsyncThunk(
    'user/getInfo',
    async () => {
        return await axios.get('accountService/accounts/profile/current-profile', config)
    }
)

const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    extraReducers: {
        // get user info
        [getUserInfo.pending]: (state, action) => {
            state.message = 'loading'
        },
        [getUserInfo.fulfilled]: (state, action) => {
            state.user = action.payload.data
            state.isAuthenticated = true
            state.loading = false
            state.message = 'success'
        },
        [getUserInfo.rejected]: (state, action) => {
            state.message =
                'Get user info fail ! Please try again. If still fail, please contact to admin@demo.com'
            state.isAuthenticated = false
        }
    },
    reducers: {
        resetUserInfo: (state, { payload }) => {
            return initialState
        }
    }
})

export const { reducer, actions } = userSlice
export const { resetUserInfo } = actions
export default reducer
