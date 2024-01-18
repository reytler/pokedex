import { Repository } from "./Interface/Irepository";

export class RamStorage implements Repository{
    private expire: number;
    private cache: Object = {}

    constructor(expire=120){
        this.expire = expire
    }

    find(key: string){
        //@ts-ignore
        const stored = this.cache[key]
        console.log('RAM CACHE: ', this.cache)
        return (this.isExpired(key) || !stored) ? null : JSON.parse(stored)
    }

    create(value: any, key: string){
        //@ts-ignore
        this.cache[key] = JSON.stringify(value)
        //@ts-ignore
        this.cache[`${key}:ts`] = JSON.stringify((Date.now() + this.expire * 1000))
    }

    delete(key: string){
        //@ts-ignore
        delete this.cache[key]
        //@ts-ignore
        delete this.cache[`${key}:ts`]
    }

    private isExpired(key:string){
        key = key+':ts'
        //@ts-ignore
        let whenCached = this.cache[key]
        let age = (parseInt(whenCached))
        if (age < Date.now()) {
            this.delete(key);
            return true;
        } else {
            return false;
        }
    }
    
}