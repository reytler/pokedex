import { IreqParams } from "../../domain/shared/interfaces/reqparams.interface";
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

    async get(reqParams: IreqParams){
        const urlWithParams = reqParams.pathParam ? new URL(this.url+reqParams.path+reqParams.pathParam) : new URL(this.url+reqParams.path)
        const {searchParams} = reqParams

        //@ts-ignore
        Object.keys(searchParams).forEach(key => urlWithParams.searchParams.append(key,searchParams[key]))
        
        if(this.storageCache.find(urlWithParams.toString()) !== null){
            return this.storageCache.find(urlWithParams.toString())
        }
        const res =  await fetch(urlWithParams,this.config)
        const resJSON = await res.json()
        this.storageCache.create(resJSON,urlWithParams.toString())
        return resJSON
    }

    async post(path:string,body:Object){
        return await fetch(this.url+path,{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(body)
        })
    }
}