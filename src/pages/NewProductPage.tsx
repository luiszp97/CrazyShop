import { useForm } from "react-hook-form";
import { Navbar } from "../components"
import { FilterList } from "../components/filterList/FilterList"
import { Grid, Typography, TextField, InputLabel, Select, MenuItem, Alert, Button } from '@mui/material';
import { FromDataProduct, newProductShema } from "../auth/schema";
import { useProductApi } from "../hooks/useProductApi";
import { yupResolver } from "@hookform/resolvers/yup";


export const NewProductPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm<FromDataProduct>({resolver: yupResolver( newProductShema )});

  const { startPostNewProduct } = useProductApi()


  const onSubmit =  handleSubmit  ( async data => {

    const price = Number( data.price );

    startPostNewProduct( {...data, price} )
    

} );

  return (
    <>
      <Navbar/>
      <FilterList/>

      <Grid container
        justifyContent='center'
        alignItems='center'
        width='100%'
        mb={2}
        sx = {{
                backgroundColor: 'white', 
                padding : 3, 
                borderRadius: 2,
                height: { md:'calc( 100vh - 150px )' }
              }}
        >
          <Grid item xs={11.5} md={ 6 } className = 'box-shadow' sx={{ padding:'20px' }}>

            <Typography variant="h5" sx={{mb:1}} color='black' textAlign='center'>Add new Product</Typography>

            <form style={{ display:'flex', justifyContent:'center', flexDirection:'column' }} onSubmit={ onSubmit } >

              <Grid display='flex' justifyContent='space-between' sx={{ flexDirection:{ xs:'column', sm:'row' } }} mt={3}>

                <Grid sx={{ width:{ xs:'100%', sm:'48%' } }} mb={1}>
                  <TextField
                    type="text"
                    label= 'Product title'
                    color="error"
                    sx={{ width:'100%' }}
                    { ...register('title') }
                  />
                  { errors.title && <Alert severity="error" sx={{mt: 1}}>{ errors.title?.message }</Alert> }
                </Grid>

                <Grid sx={{ width:{ xs:'100%', sm:'48%' } }} mb={1}>
                  <TextField
                    type="number"
                    label= 'Product price'
                    color="error"
                    sx={{ width:'100%' }}
                    { ...register('price') }
                  />
                  { errors.price && <Alert severity="error" sx={{mt: 1}}>{ errors.price?.message }</Alert> }
                </Grid>

              </Grid>

              <TextField
                  type="text"
                  label= 'Url image product'
                  color="error"
                  sx={{ mt: '10px' }}
                  { ...register('image') }
              />
              { errors.image && <Alert severity="error" sx={{mt: 1}}>{ errors.image?.message }</Alert> }
              <TextField
                  type="text"
                  label= 'Description product'
                  color="error"
                  sx={{ mt:'10px' }}
                  multiline
                  minRows={3}
                  { ...register('description') }
              />
              { errors.description && <Alert severity="error" sx={{mt: 1}}>{ errors.description?.message }</Alert> }

              <InputLabel sx={{ mt:'10px' }}>Categories</InputLabel>

                  <Select
                    fullWidth
                    color="error"
                    defaultValue={ 'clothes' }
                    { ...register('category') }
                  >
                    <MenuItem value = 'clothes' >Clothes</MenuItem>
                    <MenuItem value = 'shoes'>Shoes</MenuItem>
                    <MenuItem value = 'laptops'>Laptops</MenuItem>
                    <MenuItem value = 'phones'>Phones</MenuItem>

                  </Select>
                  { errors.category && <Alert severity="error" sx={{mt: 1}}>{ errors.category?.message }</Alert> }

                  <Button type="submit" variant="contained" color="error" sx={{ mt:'10px' }}>Add New</Button>


            </form>
          </Grid>
 
        </Grid>
    </>
  )
}
