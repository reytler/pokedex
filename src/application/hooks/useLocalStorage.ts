import { useEffect, useState } from "react";
import { Repository } from "../../infra/repository/Interface/Irepository";

export function useLocalStorage<T>(key: string, fallbackValue: T,storageInstance: Repository){

    const [state, setState] = useState(()=>{
        const storeData = storageInstance.find(key)
        if(storeData){
            return storeData
        }
        return fallbackValue
    })

    useEffect(()=>{
        storageInstance.create(state,key)
    },[key, storageInstance, state])

    return [state, setState] 
}