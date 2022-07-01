import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface TokenState {
  token:string
}

const initialState: TokenState = {
  token: '',
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    changeToken: (state, action: PayloadAction<string>) => {
      state.token= action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeToken } = tokenSlice.actions

export default tokenSlice.reducer