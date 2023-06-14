import { useForm } from "react-hook-form";

import { Alert, Grid, TextField,Typography } from "@mui/material";
import Button from '@mui/material/Button';

import { useAuthStore } from "../../hooks/useAuthStore";

import { AuthLayuout } from "../layout/AuthLayout";



export interface SubmitProps {
    email: string;
    password: string;
};



export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<SubmitProps>();
    const { startLoginUser } = useAuthStore();

    const onSubmit = handleSubmit( async data => {
    
        await startLoginUser( data )
         
    } );

    

  return (
    <AuthLayuout title="Login">
        <>
            <form onSubmit={ onSubmit  } > 

                <Grid container alignItems='center'>

                    <Grid  item xs = { 12 } mt={2}>
                        <TextField
                            label = "Email"
                            color="error"
                            type="email"
                            placeholder="Example@example.com"
                            fullWidth
                            { ...register('email', { pattern: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i, required: true } ) }  
                        />
                        { errors.email && <Alert severity="error" sx={{mt: 1}}>Introduce un email valido</Alert>  }
                    </Grid>

                    <Grid item xs = {12} mt={2}>
                        <TextField
                            label = "Password"
                            color="error"
                            type="password"
                            placeholder="*******"
                            fullWidth
                            { ...register( 'password', { minLength: 5 } ) }
                        />
                        { errors.password && <Alert severity="error" sx={{mt: 1}}> El password debe ser de al menos 8 digitos </Alert>  }
                    </Grid>

                    <Grid item xs={ 12 } >
                        <Button variant="contained" sx= {{mt: '15px', backgroundColor: '#D10024', '&:hover': { backgroundColor: '#bd001f' }}} fullWidth type="submit" >Login</Button>
                    </Grid>

                </Grid>

                <Grid container direction='row' justifyContent='end' mt={1}>
                    <Typography variant="caption" component='a' color='black' href="register" sx={{cursor: 'pointer'}}>
                        No tienes una cuenta? 
                    </Typography>
                </Grid>

            </form>
        </>
    </AuthLayuout>
  )
}
