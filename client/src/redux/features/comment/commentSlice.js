import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    comments: [],
    loading: false
}

export const createComment = createAsyncThunk('comment/createComment', async({postId, comment}) => {
    try {
        const {data} = await axios.post(`/comment/${postId}`, {
            postId, comment
        })
        return data
    } catch (e) {

    }
})

// export const getPostCommends = createAsyncThunk(comments/getPostCommends, async(postId) => {
//     try {
//         const {data} = axios.get(`/posts/comments/${postId}`)
//         return data
//     } catch (e) {
//
//     }
// })

export const commentSlice = createSlice({
    name: 'comment',
    initialState: {},
    reducers: {},
    extraReducers: {
        [createComment.pending]: (state) => {
            state.loading = true
        },
        [createComment.fulfilled]: (state, action) => {
            state.loading = false
            state.comments.push(action.payload)
        },
        [createComment.rejected]: (state) => {
            state.loading = false
        },
        // [getPostCommends.pending]: (state) => {
        //     state.loading = true
        // },
        // [getPostCommends.fulfilled]: (state, action) => {
        //     state.loading = false
        //     state.comments = action.payload
        // },
        // [getPostCommends.rejected]: (state) => {
        //     state.loading = false
        // },
    }
})

export default commentSlice.reducer
