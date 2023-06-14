import { Navigate, Route, Routes } from "react-router-dom"

import { HomepPage, ProductPage, NewProductPage, ProductDetails, ShoppingCart } from "../pages"

import { useAppSelector } from "../store/hook"



export const PrivateRoutes = () => {

  const { user } = useAppSelector( state => state.auth );
  const rol = user.rol

  return (

    <Routes>

        // Rutas para todos los usuarios

        <Route path="/" element={ <HomepPage/> } />
        <Route path="/cart" element={ <ShoppingCart/> } />
        <Route path="/products/:query" element={ <ProductPage/> } />
        <Route path="/product/:id" element={ <ProductDetails/> } />

        // Ruta privada solo para usuarios con rol 'seller'

        { ( rol === 'seller' )  && <Route path="/new" element={ <NewProductPage/> } />}
        
        
        <Route path="*" element={ <Navigate to='/' /> } />
       
    </Routes>

  )
}
