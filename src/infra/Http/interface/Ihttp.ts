import { IreqParams } from "../../../domain/shared/interfaces/reqparams.interface";

export interface Ihttp {
    get: (reqParams: IreqParams)=>Promise<any>
    post: (path:string,body:Object)=>Promise<any>
}