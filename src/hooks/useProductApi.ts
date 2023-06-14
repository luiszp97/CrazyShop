import { useState } from 'react';
import Swal from "sweetalert2";

import productsApi from "../api/productsApi"
import { FromDataProduct } from "../auth/schema"
import { Product } from '../interface';



export const useProductApi = () => {

  const [filterPrice, setFilterPrice] = useState('');



  const getAppProducts = async ( endPoint: string, price? : number ) => {
    
    const { data } = await productsApi( `${endPoint}` );

    if( price ){

      const filterData = data.product.filter( (product: Product) => product.price <= price );
      return filterData

    }

    if ( data.product ) {

      return data.product

    }

    return data.products
   

  };

  const startPostNewProduct = async (product: FromDataProduct )=> {

    try {
      
      const { data } = await productsApi.post( '/new', product );

      if( data.ok ){
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The product was added successfully',
          timer: 1500,
          showConfirmButton: false
        }).then( ()=> {

          location.href = '/'

        } )
      }

    } catch (error: any) {

      const msgError = error.response.data.msg;
            
            Swal.fire({
                icon:'error',
                title: `OOOOOPS `,
                text : msgError,
            })
 
    }

  };

  const startFilterByPrice = ( price:string ) => {
      setFilterPrice( price )
  }


    
  return {
    filterPrice,
    getAppProducts,
    startPostNewProduct,
    startFilterByPrice
  }
}
