import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Divider, Button, IconButton } from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Navbar, FilterList, LoadingPage } from '../components';
import { Product } from '../interface';
import { useProductApi, useShoppingCartApi } from '../hooks';

import '../index.css';

export const ProductDetails = () => {

    const [data, setData] = useState<Product>();

    const { id } = useParams();
    const navigate = useNavigate();

    const { getAppProducts } = useProductApi();
    const { handleShoppingCart, checkExisting, isExisting  } = useShoppingCartApi();

    const getData = async () => {

        const data =  await getAppProducts( `/by-id&${ id }` );
   
        if( data ){
         setData( data )
        }
   
     }

    const shoppingCart = () => {

        if( data!== undefined ){
            
            handleShoppingCart( data, id! )
        }

    };
     
     useEffect(() => {
          
       getData()
   
     }, [])

     useEffect(() => {

        checkExisting(id!)
     
      }, [isExisting])
     

  return (
    <>
        {

            (data === undefined)
            ?<LoadingPage/>
            :<>
                <Navbar/>
                <FilterList/>
                <Grid container  sx={{ padding:'30px' }} justifyContent='center' alignItems='center' >

                    <IconButton onClick={ ()=> navigate( -1 ) } sx={{ position: 'absolute', left: {xs:'10px', sm: '50px', lg:'89px'}, top:{xs :'65px',sm: '120px', md:'170px'} }} >
                        <ArrowBackIcon/>
                    </IconButton>
        
                    <Grid item md={ 9 } xs={ 12 } className='box-shadow' padding={2} sm={ 9 } height='100%' borderRadius={5} display='flex' alignItems='center' >
        
                    <Grid container sx= {{ flexDirection:{ xs:'colum', md:'row' }, height:{ xs: 'auto', md: '100%' } }}>
                                
                    <Grid item xs={12} md={ 5.9 } sx={{ height:{ md:'auto' } }} display='flex' justifyContent='center' >
        
                            <Grid className='box-shadow' display='flex' justifyContent='center' margin={1} alignItems='center' sx={{objectFit:{xs:'contain'}, width:{xs: '170px', sm:'200px', md:'100%'}, border:'1px solid black', borderRadius:'5px' }}>
        
                                <img style={{ width:'100%' }} src={ data.image } />
        
                            </Grid>
        
                            </Grid>
        
                            <Grid item xs={12} md={ 5.9 } display='flex' flexDirection='column' sx={{ paddingLeft:{ sm:'0', md:'20px' } }}>
        
                            <Typography textAlign='center' variant= 'h3' sx={{ fontSize:{ xs:'25px', md: '35px' }, mt:{xs:'10px',md:'20px', lg:'50px'} }} color='#D10024' fontWeight='bold'>{ data.title.charAt(0).toUpperCase() + data.title.slice(1)  }</Typography>
        
                            <Divider/>
        
                            <Typography mt={2} variant='body2' fontWeight='bold' sx={{ fontSize:{ xs:'15px', md:'18px' } }} > Category: {data.category} </Typography>
        
                            <Typography mt={2} variant='h5' textAlign='center' fontWeight='bold' color='#D10024' sx={{ fontSize:{ xs:'18px', md:'20px' } }} > { data.price } $ </Typography>
        
                            <Typography textAlign='justify' sx={{fontSize:{ xs:'13px' } ,mt:{ xs:'5px',md:'20px' ,lg:'45px' }, padding:{ md:'0 5px', lg:'0 30px' } }}>{data.description}</Typography>
        
        
                            <Button  onClick={ shoppingCart } variant='contained' color='error' sx={{ mt:{xs:'10px', md:'30px', lg:'45px'}}}>{ isExisting ? 'Remove shopping cart' : 'Add to cart' }</Button>
        
                            </Grid>
        
        
        
        
                    </Grid>
        
                    </Grid>
        
                </Grid>

            </>
        }
  </>
  )
}


