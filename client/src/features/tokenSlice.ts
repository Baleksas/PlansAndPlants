import { createSlice } from '@reduxjs/toolkit'

export interface TokenState {
  token:string,
  userId: string
}

const initialState: TokenState = {
  token: '',
  userId: ''
}

export const tokenSlice = createSlice({
  name: 'tokenData',
  initialState,
  reducers: {
    changeToken: (state, action) => {
      state.token= action.payload.token
      state.userId= action.payload.userId
    }
  },
})

// Action creators are generated for each case reducer function
export const { changeToken } = tokenSlice.actions

export default tokenSlice.reducer