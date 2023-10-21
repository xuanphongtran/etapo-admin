import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'dark',
  userId: '64ad05f558e0b2545927c405',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { setMode } = globalSlice.actions

export default globalSlice.reducer
