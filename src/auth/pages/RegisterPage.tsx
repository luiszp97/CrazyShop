import { Alert, Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { FromData, registerSchema } from "../schema";

import { AuthLayuout } from "../layout/AuthLayout";
import { useAuthStore } from "../../hooks/useAuthStore";



export const RegisterPage = () => {

    const {  handleSubmit, register, formState: { errors } } = useForm<FromData>({resolver: yupResolver(registerSchema) })
    const { startRegisterUser } = useAuthStore();


    const onSubmit =  handleSubmit  ( async data => {

        const { name, email, password1, rol } = data;
        const newData = {name, email, password: password1, rol}

        startRegisterUser( newData )

    } );

  return (
    <AuthLayuout title="Create Account">
         <>
            <form onSubmit={ onSubmit } > 

                <Grid container justifyContent='space-between'>

                    <Grid  item xs = { 12 } mt={2}>
                        <TextField
                            label = "Nombre"
                            color="error"
                            type="name"
                            placeholder="Your name"
                            fullWidth
                            { ...register('name' ) }  
                        />
                        { errors.name && <Alert severity="error" sx={{mt: 1}}>{ errors.name?.message }</Alert> }
                        
                    </Grid>
                    <Grid  item xs = { 12 } mt={2}>
                        
                        <InputLabel>Rol</InputLabel>
                        <Select
                            fullWidth
                            color="error"
                            defaultValue={ 'user' }
                            { ...register('rol') }
                        >
                            <MenuItem value = 'seller' >Vendedor</MenuItem>
                            <MenuItem value = 'user'>Comprador</MenuItem>

                        </Select>
                        
                    </Grid>
                    <Grid  item xs = { 12 } mt={2}>
                        <TextField
                            label = "Email"
                            color="error"
                            type="email"
                            placeholder="Example@example.com"
                            fullWidth
                            { ...register('email') }  
                        />
                        { errors.email && <Alert severity="error" sx={{mt: 1}}>{errors.email?.message}</Alert>  }
                        
                    </Grid>

                    <Grid item xs = {12} mt={2}>
                        <TextField
                            label = "Password"
                            color="error"
                            type="password"
                            placeholder="*******"
                            fullWidth
                            { ...register( 'password1', {  } ) }
                        />
                        { errors.password1 && <Alert severity="error" sx={{mt: 1}}>{errors.password1?.message}</Alert>  }
                    </Grid>
                    <Grid item xs = {12} mt={2}>
                        <TextField
                            label = "Repeat Password"
                            color="error"
                            type="password"
                            placeholder="*******"
                            fullWidth
                            { ...register( 'password2', { minLength: 5,  } ) }
                        />
                        { errors.password2 && <Alert severity="error" sx={{mt: 1}}>{ errors.password2?.message }</Alert>  }
                    </Grid>

                    <Grid item xs={ 12 } >
                        <Button variant="contained" sx= {{mt: '15px', backgroundColor: '#D10024', '&:hover': { backgroundColor: '#bd001f' }}} fullWidth type="submit" >Register</Button>
                    </Grid>

                </Grid>

                <Grid container direction='row' justifyContent='end' mt={1}>
                    <Typography variant="caption" component='a' color='black' href="/login" sx={{cursor: 'pointer'}}>
                        tienes una cuenta? 
                    </Typography>
                </Grid>

            </form>
        </>
    </AuthLayuout>
  )
}
