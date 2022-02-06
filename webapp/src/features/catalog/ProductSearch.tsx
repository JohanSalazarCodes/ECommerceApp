import { debounce, TextField } from "@mui/material";
import { useAppSelector, useAppDispatch } from '../../app/store/configureStore';
import { setProductParams } from "./catalogSlice";
import { useState } from 'react';

export default function ProductSearch() {
    
    const { productParams } = useAppSelector(state => state.catalog);
    const [ searchTerm, setSearchTerm ] = useState(productParams.searchTerm);
    const distpatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        distpatch(setProductParams({searchTerm: event.target.value }))
    }, 1000)

    return(
        <TextField label="Search products" 
        variant="outlined" 

        fullWidth
        value = {searchTerm || ''}
        onChange={(event: any) => {
            setSearchTerm(event?.target.value);
            debouncedSearch(event);
        }}
        />     
    )
}