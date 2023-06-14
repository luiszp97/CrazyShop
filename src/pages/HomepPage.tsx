import { useEffect, useState } from 'react';
import { Grid, Typography, Divider } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/hook';
import { onLoadingProducts } from '../store/products/productSlice';

import { FilterList, Navbar, ProductCard, LoadingProductSkeleton  } from '../components'
import { useProductApi } from '../hooks/useProductApi';

import { Product } from '../interface/apiResponses';



export const HomepPage = () => {

  const [data, setData] = useState<Product[]>([]);

  const { querySearch, loading } = useAppSelector( state => state.product );
  const dispatch = useAppDispatch();

  const { getAppProducts } = useProductApi()



  const getData = async ( price?: number ) => {

    dispatch( onLoadingProducts( true ) )

     const data =  await getAppProducts( '/', price );
     
     if( data ){

      setData( data )
      dispatch( onLoadingProducts( false ) )

     }

  }
  
  useEffect(() => {
       
    getData()

  }, [])

  useEffect(() => {
       
    getData( Number(querySearch) )

  }, [querySearch])

  

  return (
    <>
      <Navbar/>
      <FilterList/>

      <Typography textAlign='center' mt={5} variant='h5'>All Products </Typography>
      <Divider/>

      <Grid container margin='0' mt='20px' mb='20px' justifyContent='space-around' gap={2}>
         {

            ( !loading )
            ?
              data.reverse().map( produt => (
                
                <ProductCard key={ produt.id } { ...produt } />
          
              ) )
            :
              <>
                <LoadingProductSkeleton/>  
                <LoadingProductSkeleton/>  
                <LoadingProductSkeleton/>  
              </>

         }
      </Grid>
    </>
   
  )
}