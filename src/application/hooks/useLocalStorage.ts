import { useEffect, useMemo, useState } from "react";
import { LocalStorage } from "../../infra/repository/localStorage";

export function useLocalStorage<T>(key: string, fallbackValue: T){
    const localStorageinstance = useMemo(()=>new LocalStorage(1000),[])

    const [state, setState] = useState(()=>{
        const storeData = localStorageinstance.find(key)
        if(storeData){
            return storeData
        }
        return fallbackValue
    })

    useEffect(()=>{
        localStorageinstance.create(state,key)
    },[key, localStorageinstance, state])

    return [state, setState] 
}