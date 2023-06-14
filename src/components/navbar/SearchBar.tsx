import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';



export const SearchBar = () => {

  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit =  handleSubmit  ( async data => {

    navigate(`/products/${ data.search }`)  
 
 } );

  return (
    <Grid item width={ {xs: '50%', md: '35%'} } height='50%' display='flex' justifyContent='center' >

        <form style={{ height:'100%', width:'100%' ,display:'flex', justifyContent:'center', alignItems:'center' }}  onSubmit={ onSubmit }>
          
            <input
                  type='text'
                  placeholder='Search product...'
                  style={{ height:'calc(100% - 10px)',  width:'calc(85% - 10px)', borderRadius: '5px 0 0 5px', padding: '5px', border:'0px', overflow:'hidden'}}
                  className='input-whitout-hover'
                  { ...register('search') }
            />

            <Box component='button' type='submit'  height='100%' display='flex' alignItems='center' sx={{ width: { sm: '20%', md: '15%' },backgroundColor:'white', borderRadius: '0 5px 5px 0', padding:'0', border: '0', cursor:'pointer', display:'inline' }}>

              <SearchIcon sx={{ color:'black', }} />

            </Box>
              
        </form>
          
    </Grid>
  )
}
