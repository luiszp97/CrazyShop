import { useState } from 'react';
import Swal from "sweetalert2";

import shoppingCartApi from "../api/shoppingCartApi";
import { Product } from "../interface";
import { useAppDispatch } from '../store/hook';
import { onLoadingProducts } from '../store/products/productSlice';


export const useShoppingCartApi = () => {

    const [isExisting, setIsExisting] = useState(false)
    const dispatch = useAppDispatch()

    const getShoppingCardUser = async () => {

        try {
            const { data } = await shoppingCartApi.get('/');
            console.log(data, 'data')
            return data.product

        } catch (error) {
         
        }

    };

    const startAddToCar = async ( product: Product ) => {

        try {

          await shoppingCartApi.post( '/add', product );
          
        } catch (error) {
          
        }
    };

    const deleteProduct = async (id: string) => {

        try {

            await shoppingCartApi.delete( `/delete-product/${id}` )
            .then(()=>{
              dispatch( onLoadingProducts( true ) )
            })
        
        } catch (error) {
            
            
        }
    };

    const saveProduct = ( props: Product ) => {

        startAddToCar( props )
            .then( ()=>{
            Swal.fire({
                icon:'success',
                title: 'Success',
                text: 'Product add in shopping cart',
                timer: 1500,
                showConfirmButton: false
            })
            } )
    
    };


    const handleShoppingCart = async  (  product: Product, id: string ) => {

        const data = await getShoppingCardUser();
  
        if( data ){      
  
          const existingProduct = data.filter( (product: Product) => product.id === id );
          
          if( existingProduct.length !== 0  ){
              
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
                if (result.isConfirmed) {
                    
                    deleteProduct( existingProduct[0].id )

                    .then( ()=>{

                        setIsExisting(false)

                        Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )

                    } )
                }
              })
    
            
          } else {
            
            setIsExisting(true)
            saveProduct( product )
    
          }
  
        } else {
  
        setIsExisting(true)
         saveProduct( product )
  
        }
  
    };

    const checkExisting = async ( id: string  ) => {

        const data = await getShoppingCardUser();
  
        if( data ){      
  
          const existingProduct = data.filter( (product: Product) => product.id === id );
          if(existingProduct.length !== 0){

            setIsExisting( true )

          } else {

            setIsExisting( false )

          }

        }

    }

    
  return {
    isExisting,
    getShoppingCardUser,
    startAddToCar,
    deleteProduct,
    checkExisting,
    handleShoppingCart
  }
   
}
