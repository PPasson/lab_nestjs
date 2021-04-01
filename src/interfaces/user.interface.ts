export interface User {
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    
}

export interface ICreateUsers extends User {
    id: number,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
}
export interface RespUsers {
    id: number | string,
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    
}
