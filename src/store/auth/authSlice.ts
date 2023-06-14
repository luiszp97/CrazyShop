import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthState {
    status: string;
    user: {
        name?: string;
        uid?: string;
        rol?: string
    };
    errorMessage : string | undefined;
}

interface OnLogin {
    
        name    : string;
        email?  : string;
        uid     : string;
        rol     : string
    
}

const INITIAL_STATE : AuthState = {

    status : 'checking',
    user: {},
    errorMessage: undefined

}



export const authSlice = createSlice({
    name: 'auth',
    initialState: INITIAL_STATE,
   reducers: {

        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },

        onLogin: ( state, { payload }: PayloadAction< OnLogin >) =>{
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, {payload}: PayloadAction< string | undefined > ) =>{
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) =>{
            state.errorMessage = undefined;
        },
}
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;