import { Grid, CircularProgress, Typography } from "@mui/material"


export const LoadingPage = () => {
  return (
    <Grid container width='100vw' height='100vh' justifyContent= 'center' alignItems='center'>

        <Grid item xs={12} display='flex' alignItems='center' justifyContent='center'  flexDirection='column'>
            <CircularProgress/>
            <Typography mt={4} variant="h5">Cargando....</Typography>
        </Grid>

    </Grid>
  )
}
