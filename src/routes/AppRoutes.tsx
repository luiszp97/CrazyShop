import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom"

import { PublicRoutes, PrivateRoutes } from "./"
import { useAuthStore } from "../hooks/useAuthStore";

import { LoadingPage } from "../components";


export const AppRoutes = () => {

  const { checkAuthToken, status } = useAuthStore();

  useEffect(() => {
 
    checkAuthToken();
   
  }, [])

  if( status === 'checking' ) {
   
    return <LoadingPage/>
  }


  return (
    <Routes>

      {
        (status === 'authenticated')
        ?<Route path="/*" element= { <PrivateRoutes/> } />
        :<Route path="auth/*" element={ <PublicRoutes/> }/>
      }

      <Route  path="/*"  element= { <Navigate to= '/auth/'/> } />

    </Routes>
  )
}
