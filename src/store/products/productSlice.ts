import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface QuerySearch {
    
    querySearch: number | null;
    loading: boolean;
}

const INITIAL_STATE : QuerySearch = {

    querySearch: null,
    loading: true

}



export const productSlice = createSlice({
    name: 'product',
    initialState: INITIAL_STATE,
   reducers: {

        onQuerySearch: ( state, { payload }: PayloadAction< number >   ) => {
            state.querySearch = payload;
        },

        onLoadingProducts: ( state, { payload }: PayloadAction< boolean >   ) => {
            state.loading = payload;
        },

}
});

export const { onQuerySearch, onLoadingProducts } = productSlice.actions;