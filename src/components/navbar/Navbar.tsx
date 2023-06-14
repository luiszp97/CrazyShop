import { AppBar, Toolbar} from '@mui/material';

import { Logo, Utils, SearchBar } from './';

import '../../index.css';

export const Navbar = ()=> {

  return (
    <AppBar sx={{ zIndex:'0', backgroundColor:'black', borderBottom: '3px solid red', position:'relative', mb: '10px' }}>

      <Toolbar sx={{justifyContent:"space-between", height:{ xs:'64px' }}}>

        <Logo/>
      
        <SearchBar/>

        <Utils/>

      </Toolbar>
    </AppBar>
  );

}
