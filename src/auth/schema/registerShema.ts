import * as Yup from 'yup';

export const registerSchema = Yup.object({

    name:       Yup.string()
                    .required('The name is required')
                    .matches( /^[a-zA-Z\s]+$/i, 'Typing a valid name' )
                    .min(2, 'The name must have at least 2 characters'),
    rol:        Yup.string()
                   .required(),
    email:      Yup.string()
                    .email( 'Typing a valid email' )
                    .required( 'The email is required' ),
    password1:  Yup.string()
                    .required('Enter you password')
                    .min( 7, ' The password must have at least 2 characters '),
    password2:  Yup.string()
                    .oneOf( [Yup.ref('password1')], 'The password does not match' )
                    .required('Repeat your password')

});

export type FromData = Yup.InferType<typeof registerSchema>