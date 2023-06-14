import { useEffect, useState } from 'react';
import { Typography, Divider, IconButton } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Navbar, ShoppingCartProduct } from "../components"
import { useShoppingCartApi } from '../hooks';
import { Product } from '../interface';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hook';


export const ShoppingCart = () => {

    const [data, setData] = useState< Product[] | undefined >(undefined);
    const { loading } = useAppSelector( state => state.product )
    const navigate = useNavigate()
    

    const { getShoppingCardUser } = useShoppingCartApi();


    const getProducts = async () => {

        const data =  await getShoppingCardUser();
       
    
         if( data ){

          setData( data )
          
         }

         setData(data)

      }  
      
      useEffect(() => {
           
        getProducts()
    
      }, []);

      useEffect(() => {
           
        getProducts()
    
      }, [ loading ]);


  return (
    <>
        <Navbar/>
        <Typography textAlign='center' mb={2} variant="h5">
            Shopping Cart
        </Typography>
        <IconButton  onClick={()=> navigate('/')} sx={{ position:'absolute', left:{ sm:'30px', md: '50px'}, top:{xs:'130px', sm:'150px'} }}  >
            <ArrowBackIcon/>
        </IconButton>
        <Divider  sx={{ mb:'40px' }} />
        <Typography textAlign='center' mb={2} variant="h5" sx={{ position:'absolute', right:{ xs:'10px', md:'50px' }, top:{ xs:'130px', md:'150px' } }} >
            Total: { data ? data.reduce((prev, curr) => prev + curr.price, 0): '0'}$
        </Typography>
         {

            ( data !== undefined ) 
            ? data.map( product => (
                <ShoppingCartProduct key={product.id} { ...product } />
            ))
            : <Typography textAlign='center' variant='h5'>No products in shopping cart...</Typography>

         }
    </>
  )
}
