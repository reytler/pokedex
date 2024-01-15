import { Http } from "../../infra/Http";
import { Iresponse } from "../shared/interfaces/reponse.interface";
import { IreqParams } from "../shared/interfaces/reqparams.interface";

export class Pokemon{
    private http: Http;
    constructor(http: Http){
        this.http = http
    }

    async getPokemons(limit:number,offset:number){
        const res: Iresponse = {} as Iresponse
        const reqParams: IreqParams = {
            path: '/pokemon',
            searchParams: {limit: limit,offset: offset}
        }
        try {
            res.data = await this.http.get(reqParams)
            res.error = null
            return res        
        } catch (error) {
            res.data = null
            res.error = error
        }
    }

    async findPokemon(name: string){
        const res: Iresponse = {} as Iresponse
        const reqParams: IreqParams = {
            path: '/pokemon',
            searchParams:{},
            pathParam: '/'+name
        }
        try {
            res.data = await this.http.get(reqParams)
            res.error = null
            return res        
        } catch (error) {
            res.data = null
            res.error = error
        }
    }

}