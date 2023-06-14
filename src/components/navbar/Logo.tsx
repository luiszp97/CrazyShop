import { Grid, Typography } from "@mui/material"
import StoreIcon from '@mui/icons-material/Store';
import CircleIcon from '@mui/icons-material/Circle';


export const Logo = () => {
  return (
    <Grid component='a' href="/" sx={{ cursor:'pointer', textDecoration:'none', color:'white' }}  display='flex' mr='10px' justifyContent='center' alignItems='flex-end'  >

          <StoreIcon  sx={{ fontSize:{ xs: '30px', sm: '35px' ,lg: '55px' } } }/>

          <Typography variant='h4' fontSize={ { sm: '25px', md: '35px', lg: '40px',  } } sx={{ display: { xs: 'none', sm: 'block' } }} >CrazyShop</Typography>
          <CircleIcon sx={{ fontSize:'15px', color: 'red', display: { xs: 'none', sm: 'block' } }} />

    </Grid>

  )
}
