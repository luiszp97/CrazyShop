import * as Yup from 'yup';


export const newProductShema = Yup.object({

    title:          Yup.string()
                        .required('The title is required')
                        .min(4, 'The title must have at least 2 characters'),
    image:          Yup.string()
                        .url('Typing a valid url')
                        .min(4,'Typing a valid url')
                        .required('The url is required'),
    description:    Yup.string()
                        .required('The decription is required')
                        .min(20, 'The description mus have at least 20 characters'),
    price:          Yup.number()
                        .required('The price is required'),
    category:       Yup.string()
                        .required('The category is required')
    
});

export type FromDataProduct = Yup.InferType<typeof newProductShema>