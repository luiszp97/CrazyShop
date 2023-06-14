export interface renewJwtResponse {
    ok      : boolean;
    token   : string;
    uid     : string
    name    : string;
    rol     : string
}

export interface LoginUserResponse {
    ok      : boolean;
    uid     : string;
    name    : string;
    rol     : string;
    token   : string;
}


export interface RegisterUserResponse {
    ok      :    boolean;
    uid     :   string;
    name    :  string;
    rol     :   string;
    token   : string;
}

export interface Product {
    title       : string;
    category    : string;
    description : string;
    id          : string;
    image       : string;
    price       : number;
    user        : string

}

