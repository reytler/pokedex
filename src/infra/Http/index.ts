import { Repository } from "../repository/Interface/Irepository";

export class Http {
    private url: string
    private config: Object;
    private storageCache: Repository;
    constructor(url:string,config={},storageCache: Repository){
        this.url = url;
        this.config = config;
        this.storageCache = storageCache;
    }

    async get(params: Object){
        const urlWithParams = new URL(this.url)
        //@ts-ignore
        Object.keys(params).forEach(key => urlWithParams.searchParams.append(key,params[key]))
        
        if(this.storageCache.find(urlWithParams.toString()) !== null){
            return this.storageCache.find(urlWithParams.toString())
        }
        const res =  await fetch(urlWithParams,this.config)
        const resJSON = await res.json()
        this.storageCache.create(resJSON,urlWithParams.toString())
        return resJSON
    }

    async post(body:Object){
        return await fetch(this.url,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}