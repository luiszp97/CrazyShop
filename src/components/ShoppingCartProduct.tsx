import { Grid, IconButton, Typography, ImageListItem } from "@mui/material"
import ClearIcon from '@mui/icons-material/Clear';

import { Product } from "../interface";
import { useShoppingCartApi } from "../hooks";


export const ShoppingCartProduct = ( data:Product ) => {

    const { handleShoppingCart } = useShoppingCartApi();


    const onClick = () => {

        handleShoppingCart( data, data.id )
    }


  return (
    <div style={{ marginBottom:'30px' }}>
        <Grid container justifyContent='center' gap={4} margin='0'>
            
            <Grid item className="box-shadow" minHeight={150} xs={ 10 } sm={ 9 } md={ 7 } display='flex' padding={1} justifyContent='space-between'sx={{ flexDirection:{ xs:'column', sm:'row' } }}>

                <Grid  sx={{ width:{ xs:'100%', sm:'150px' }, alignItems:{ xs:'center' }, justifyContent:{xs:'center'} }} display='flex'>
                    <ImageListItem sx={{ width: { sm:'100%', xs:'50%' } }} >
                        <img src={` ${ data.image ? data.image : '../../public/no-disponible.png' } `} />
                    </ImageListItem>
                </Grid>

                <Grid justifyContent='center' sx={{ width:{ xs:'100%', sm:'75%' } }} alignItems='center' padding='0 15px'>

                    <Grid display='flex' justifyContent='space-between'alignItems='center'>
                        <Typography textAlign='center' variant="h6" textTransform='capitalize' >{data.title}</Typography>
                        <Typography textAlign='center' variant="h6">{data.price}$</Typography>

                        <IconButton onClick={ onClick } sx={{position: { xs:'absolute', sm:'static' }, top:'170px', right:'40px' }} >
                            <ClearIcon sx={{ color:'red', }} />
                        </IconButton>

                    </Grid>

                    <Typography textAlign='justify' variant="body2">{ data.description }</Typography>
                </Grid>
                
            </Grid>      
               
        </Grid>

    </div>
  )
}
