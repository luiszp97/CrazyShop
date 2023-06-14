import { Grid, Skeleton, Stack } from "@mui/material"


export const LoadingProductSkeleton = () => {
  return (
    <Stack spacing={4} direction='row' >
        <Grid width={ 300 }  height={ 300 }>
             
            <Stack spacing={1} >
                <Skeleton variant='rectangular' height={150} animation='pulse' />
                <Skeleton variant='text'  height={ 10 } animation='pulse'/>
                <Skeleton variant='rectangular' height={ 80 } animation='pulse'/>
                <Skeleton variant='rectangular' height={ 30 } animation='pulse'/>
            </Stack>
      
        </Grid>
             
    </Stack>
  )
}
