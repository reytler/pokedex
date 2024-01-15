import { Http } from "../../infra/Http";
import { Iresponse } from "../shared/interfaces/reponse.interface";

export class Pokemon{
    private http: Http;

    constructor(http: Http){
        this.http = http
    }

    async getPokemons(limit:number,offset:number){
        const res: Iresponse = {} as Iresponse
        try {
            res.data = await this.http.getWithParams({limit: limit,offset: offset})
            res.error = null
            return res        
        } catch (error) {
            res.data = null
            res.error = error
        }
    }

    async findPokemons(name: string){
        const res: Iresponse = {} as Iresponse
        try {
            res.data = await this.http.getWithParams({name: name})
            res.error = null
            return res        
        } catch (error) {
            res.data = null
            res.error = error
        }
    }

}