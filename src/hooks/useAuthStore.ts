import Swal from "sweetalert2";

import authApi from "../api/authApi";

import { clearErrorMessage, onLogin, onLogout } from "../store";
import { useAppDispatch, useAppSelector } from "../store/hook";

import { LoginUserResponse, RegisterUserResponse, renewJwtResponse } from "../interface";
import { SubmitProps } from "../auth/pages/LoginPage";

interface RegisterInfo {
    name    : string;
    email   : string;
    password: string;
    rol     : string;
}

export const useAuthStore = () => {

    const { status, errorMessage } = useAppSelector( state => state.auth )

    const dispatch = useAppDispatch();


    //? Methods

    const startRegisterUser = async ( data:RegisterInfo ) => {

        try {
            
            const { data : resp } = await authApi.post< RegisterUserResponse >( '/register', data );
            
            if( resp.ok ){
                
                
                Swal.fire({
                    icon:'success',
                    title: `Exito`,
                    text : 'Ha sido registrado con exito!!',
                    timer: 1500,
                    showConfirmButton: false
                }).then( ()=> {
                    
                    localStorage.setItem('__x-Token__', resp.token );
                    dispatch( onLogin( resp ) )
    
                } )

            }

        } catch (error:any) {

            const msgError = error.response.data.msg;
            
            Swal.fire({
                icon:'error',
                title: `OOOOOPS `,
                text : msgError,
            }). then(()=> {
                dispatch( onLogout() )
            })

        }        
    }

    const startLoginUser = async ( user: SubmitProps ) => {
           
            try {
                
                const { data } = await authApi.post< LoginUserResponse >('/login', user);
                localStorage.setItem( '__x-Token__', data.token );
                dispatch( onLogin( data ) )
                

            } catch ( error: any ) {

                
                const msError = error.response.data.msg;
                dispatch( onLogout( msError ) )

                Swal.fire({
                    icon: 'error',
                    title: 'Oooops ha ocurrido un error',
                    text: msError,
                }). then(()=> {

                    dispatch( clearErrorMessage() );

                })
              

            }


    }

    const checkAuthToken = async () =>{

        const token = localStorage.getItem('__x-Token__');

        if( !token )return dispatch( onLogout() );

        try {
            
            const { data } = await authApi.get< renewJwtResponse >('/renew');
            localStorage.setItem('__x-Token__', data.token);

            dispatch( onLogin( { name: data.name, uid: data.uid, rol: data.rol } ) )

        } catch ( error: any ) {

            const msError = error.response.data.msg;
            console.log( msError )

            localStorage.clear()
            dispatch( onLogout( msError as string ) )

        }

    };



    const startLogout = ()=>{

        localStorage.removeItem('__x-Token__')
        
        dispatch( onLogout() )

    }


  return {
    status,
    errorMessage,
    startLoginUser,
    startRegisterUser,
    checkAuthToken,
    startLogout

  }
}
