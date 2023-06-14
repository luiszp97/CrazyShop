import { useState } from "react";
import { Avatar, Button, Grid, MenuItem, MenuList, Paper, Popper  , Divider } from "@mui/material"

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../hooks/useAuthStore";
import { useAppSelector } from "../../store/hook";
import { ListOfItems } from '../filterList/FilterList'


export const Utils = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
   
    const { user } = useAppSelector( state => state.auth );
    const { startLogout }= useAuthStore();
    const navigate = useNavigate()

    

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(anchorEl ? null : event.currentTarget);
    };
  
    const open = Boolean(anchorEl);
    
    const handleLogout = () =>{
      startLogout()
    }; 


  return (
    
    <Grid display='flex' >

          <Button onClick={ ()=> navigate( '/cart' ) }  sx={{ marginLeft:'10px',color:'white', marginRight:'10px',borderRadius: '50%',padding: '10px', minWidth:'0px', minHeight:'0px', display:{ xs:'none', sm:'flex' } }} >

            <ShoppingCartIcon/>

          </Button>

          <Button sx={{ padding: '0px' }} onClick={ handleClick } >

            <Avatar
              sx={{ width: { xs: '38px' }, display: { xs:'none', sm: 'none', md:'flex' } }}
              
            />

            <MenuIcon
              sx={{ display: { md:'none', sm:'flex' }, color:'white' }}
            />

          </Button>

          <Popper  open={ open } anchorEl={ anchorEl }  >
            <Paper>

              <MenuList autoFocusItem ={ open }>

                <MenuItem onClick={ ()=> navigate( '/cart' ) } sx={{ display: { xs:'flex', sm:'none' } }} >ShoppingCard</MenuItem>

                {
                  ( user.rol === 'seller' ) &&
                  <MenuItem onClick={ ()=> navigate('/new' ) } >Add New Product</MenuItem>
                }

              
                {
                  ListOfItems.map( item => (
                    <MenuItem key={item} onClick={ ()=> navigate(`/products/${item === 'All'? '/' : item }` ) }  sx={{display: { xs:'flex', md:'none' }}} >{item}</MenuItem>
                  ) )

                }
                <Divider sx={{ display:{ md:'none' } }} />
                <MenuItem onClick={ handleLogout } >Logout</MenuItem>
              </MenuList>
            </Paper>
          </Popper>

        </Grid>
  )
}
