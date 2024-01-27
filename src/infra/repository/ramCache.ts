import { Repository } from "./Interface/Irepository";

export class RamStorage implements Repository{
    private expire: number;
    private cache: {[key: string]:any} = {}

    constructor(expire=120){
        this.expire = expire
    }

    find(key: string){
        const stored = this.cache[key]
        return (this.isExpired(key) || !stored) ? null : JSON.parse(stored)
    }

    create(value: any, key: string){
        this.cache[key] = JSON.stringify(value)
        this.cache[`${key}:ts`] = JSON.stringify((Date.now() + this.expire * 1000))
    }

    delete(key: string){
        delete this.cache[key]
        delete this.cache[`${key}:ts`]
    }

    private isExpired(key:string){
        key = key+':ts'
        const whenCached = this.cache[key]
        const age = (parseInt(whenCached))
        if (age < Date.now()) {
            this.delete(key);
            return true;
        } else {
            return false;
        }
    }
    
}