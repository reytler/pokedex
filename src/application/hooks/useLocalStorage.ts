import { useEffect, useState } from "react";
import { LocalStorage } from "../../infra/repository/localStorage";

export function useLocalStorage<T>(key: string, fallbackValue: T){
    const localStorageinstance = new LocalStorage(1000)

    const [state, setState] = useState(()=>{
        const storeData = localStorageinstance.find(key)
        if(storeData){
            return storeData
        }
        return fallbackValue
    })

    useEffect(()=>{
        localStorageinstance.create(state,key)
    },[key,state])

    return [state, setState] 
}