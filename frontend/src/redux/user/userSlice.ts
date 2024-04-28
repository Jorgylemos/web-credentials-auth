import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface StateProps {
    isAuth: boolean;
    user: any;
}

const initialState: StateProps = {
    isAuth: false,
    user: null
}


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ auth: boolean; user: any; }>) => {
            const { auth, user } = action.payload

            state.isAuth = auth
            state.user = user
        }
    }
})

export const { setAuth } = userSlice.actions
export default userSlice.reducer