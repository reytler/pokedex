import { Repository } from "./Interface/Irepository";

export class LocalStorage implements Repository{
    private expire: number;

    constructor(expire=120){
        this.expire = expire
    }

    find(key:string){
        const stored = localStorage.getItem(key.toString())
        return (this.isExpired(key) || !stored) ? null : JSON.parse(stored)
    }

    create(value: any, key:string){
        localStorage.setItem(key, JSON.stringify(value))
        localStorage.setItem(key+':ts', JSON.stringify((Date.now() + this.expire * 1000)))
    }

    delete(key:string){
        localStorage.removeItem(key)
        localStorage.removeItem(key+':ts')
    }
    
    private isExpired(key:string){
        let whenCached = localStorage.getItem(key + ':ts')
        let age = (parseInt(`${whenCached}`))
        if (age < Date.now()) {
            this.delete(key);
            return true;
        } else {
            return false;
        }
    }
}