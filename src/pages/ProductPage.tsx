import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { Typography, Divider, Grid } from '@mui/material';

import { useAppDispatch, useAppSelector } from '../store/hook';
import { onLoadingProducts } from '../store/products/productSlice';

import { FilterList, ProductCard, Navbar, LoadingProductSkeleton } from "../components";
import { useProductApi } from "../hooks";
import { Product } from "../interface";


export const ListOfItems = [ 'All', 'shoes', 'clothes', 'laptops', 'phones' ];

export const ProductPage = () => {

  const [data, setData] = useState<Product[]>([]);
  const { loading } = useAppSelector( state => state.product );
  const dispatch = useAppDispatch();
  const { query } = useParams();
  

  const { getAppProducts } = useProductApi()

  const getData = async () => {

    dispatch( onLoadingProducts( true ) )

    if( ListOfItems.includes( query! ) ){
      
      
      const data =  await getAppProducts( `/by-category&${query}` );
      data && setData( data )
      dispatch( onLoadingProducts( false ) )
      
      
    } else {
      
      
      const data =  await getAppProducts( `/by-title&${query}` );
      data ? setData( data ) : setData( [] )
      dispatch( onLoadingProducts( false ) )

    } 

  }
  
  useEffect(() => {
       
    getData()

  }, [ query ])


  return (
    <>
    <Navbar/>
    <FilterList/>

    <Typography textAlign='center' mt={5} variant='h5'>{query?.toUpperCase()}</Typography>
    <Divider/>

    <Grid container margin='0' mt='20px' mb='20px' justifyContent='space-around' gap={2}>
       {

          ( !loading )
          ?
           data.map( produt => (
              
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
