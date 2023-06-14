import { Grid, Card, CardActionArea, CardMedia, CardContent, Typography, Divider, CardActions, Button } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Product } from "../interface";
import { useShoppingCartApi } from "../hooks";
import { useEffect } from 'react';


export const ProductCard = ( props: Product ) => {

  const { handleShoppingCart, checkExisting, isExisting  } = useShoppingCartApi();

  const { title, category, id, image, price } = props;

  const shoppingCart = () => {

    handleShoppingCart( props, id )

  };

  const handleClick = () => {
      location.pathname = `/product/${ props.id }`
  }

  useEffect(() => {

    checkExisting(id)
 
  }, [isExisting])
  
  

  return (

    <Grid item  xs = { 9 } sm={ 5 } lg={ 3.5 }   >

    <Card sx={{ border: '1px solid white', padding:'5px' ,'&:hover' : { border:'1px solid red ' } }}>
      <CardActionArea onClick={ handleClick } >
        <CardMedia
          component="img"
          height="250"
          image={ image ? image : '../../public/no-disponible.png' }
          alt={title}
          sx={{ objectFit:'contain' }}
        />
        <CardContent>

          <Grid  justifyContent='space-evenly' alignItems='center'>

            <Grid display='flex' justifyContent='center' gap={4} mb={1}>

                <Typography variant="body2" fontWeight='700' fontSize='15px' component="div" textAlign='center'  sx={{ padding:'5px' }}>
                  Category:
                </Typography>
                <Typography variant="body2" component="div" textAlign='center' sx={{ backgroundColor:'#f5f5f5', padding:'5px', borderRadius:'5px' }}>
                  { category }
                </Typography>

            </Grid>

            <Divider/>

            <Typography variant="h5" textTransform='capitalize' component="div" textAlign='center' mt={1}>
                { title }
            </Typography>
            <Typography variant="body1" fontWeight='bold' component="div" textAlign='center'>
                { price }$
            </Typography>

          </Grid>

        </CardContent>

      </CardActionArea>

      <CardActions>

        <Button fullWidth variant="contained" color="error" onClick={ shoppingCart } sx={{ color:'white' ,display: 'flex', justifyContent:'space-evenly', '&:hover': { backgroundColor: '#D10024', color:'white' } }}>
          {` ${ isExisting ? 'Remove from the cart' : 'Add to car' } `}
          <ShoppingCartIcon/>

        </Button>

      </CardActions>

    </Card>

  </Grid>
  )
}
