export interface IConfig {
    port: number;
}

export interface User {
    id: string;
    name: string;
    age: number;
}

export interface CreateUserDto {
    name: string;
    age: number;
}