import { Repository } from "./Interface/Irepository";

export class DisabledCache implements Repository{
    private expire: number;

    constructor(expire=120){
        this.expire = expire
    }

    find(key:string){
        console.log('Retornando cache')
        console.log('Key: ',key)
        return null
    }

    create(value: any, key:string){
        console.log('Salvando cache')
        console.log('Key: ',key)
    }

    delete(key:string){
        console.log('Deletando cache')
        console.log('Key: ',key)
    }
    
}