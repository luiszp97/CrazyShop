import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { Grid, ButtonGroup, Button, ListItemButton, Paper, Popper } from '@mui/material';

import '../../index.css';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { useForm } from 'react-hook-form';
import { onQuerySearch } from '../../store/products/productSlice';


export const ListOfItems = [ 'All', 'shoes', 'clothes', 'laptops', 'phones' ];

export const FilterList = () => {

  const { pathname } = useLocation();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { register, handleSubmit } = useForm()
  const { user } = useAppSelector( state => state.auth );
  


  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };



  const onSubmit =  handleSubmit  ( async data => {

    dispatch( onQuerySearch(  Number( data.price ) ) )

} );

  return (
    <Grid container width='100%' height='50px' justifyContent='center' borderBottom='3px solid #eeeeee' padding='0 60px' sx={{ display: { xs: 'none', md:'flex' }, padding:{ sm:'0' } }} >
    <ButtonGroup sx={{ alignItems:'center' }} >

      {

        ListOfItems.map( item => (

          <ListItemButton 
            key={ item } 
            className={` ${ (pathname === `/product/${item}` || pathname === '/' && item === 'All') && 'isSelected' } `}
            href={`${ (item === 'All') ? '/' : `/products/${item}`}`}
            sx={{ borderBottom:'2px solid white', 
              fontSize:'20px', 
              fontWeight:'500',
              '&:hover': { borderBottom:'2px solid red', color:'#D10024', backgroundColor:'transparent' }, padding: '8px 20px', 
              height: 'fit-content', 
              mr:'10px'}}
          >
             { item.charAt(0).toUpperCase() + item.slice(1) }
          </ListItemButton >

        ) )

      }
      
      {

          ( id === undefined )  &&
          <ListItemButton  onClick={ handleClick } sx={{ borderBottom:'2px solid white', fontSize:'20px' ,fontWeight:'500' ,'&:hover': { borderBottom:'2px solid red', color:'#D10024', backgroundColor:'transparent' }, padding: '8px 20px', height: 'fit-content', mr:'10px'}}>
            FilterPrice
          </ListItemButton>

      }

      {
          (user.rol === 'seller') &&  
            <ListItemButton 
              className={`${ (pathname === '/new') && 'isSelected' }`}
              href='/new'
              sx={{ borderBottom:'2px solid white', 
              fontSize:'20px',
              fontWeight:'500',
              '&:hover': { borderBottom:'2px solid red', color:'#D10024', backgroundColor:'transparent' }, padding: '8px 20px', 
              height: 'fit-content', 
              mr:'10px'}}
            >
                Add new product
            </ListItemButton>

      }

      <Popper  open={open} anchorEl={anchorEl} >

        <Paper sx={{width:'100px', padding:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>

          <form onSubmit={ onSubmit } >
            <input
              type='number'
              style={ { width:'100px', textAlign:'center', display:'flex' } }
              className='input-whitout-hover'
              placeholder='Max price'
              { ...register('price') }
            />
            <Button fullWidth variant='text' type='submit' sx={{ mt: '5px',padding:'0', backgroundColor:'#D10024','&:hover': { backgroundColor: '#D10010' } ,color:'white', fontWeight: '500' }} >Apply</Button>
          </form>

        </Paper>
        
      </Popper>

    </ButtonGroup>
  </Grid>
  )
  
}
