import { useCallback, useEffect, useState } from "react"
import { useDomainPokemon } from "../../../domain/pokemon"
import { IPokemon } from "../../../domain/pokemon/pokemon.model"
import './style.css'
import { IDataPokemon } from "../../../domain/pokemon/dataPokemon.model"
import { SpritesCarrossel } from "../SpritesCarrossel"
interface propsPokemon {
    pokemon: IPokemon
}

export function Pokemon({pokemon}:propsPokemon){
    const {getOne} = useDomainPokemon()
    const [dataPokemon,setDataPokemon] = useState<IDataPokemon>()
    const [loading,setLoading] = useState<boolean>(false)

    const load = useCallback(async (name: string)=>{
        setLoading(true)
        const res = await getOne(name)
        setDataPokemon(res?.data)
        setLoading(false)
    },[])

    useEffect(()=>{
        load(pokemon.name)
    },[pokemon])

    if(loading){
        return(<h1>Loading...</h1>)
    }
    
    return(
        <div className="cardPokemon">
            <h1 className="titlePokemon">{pokemon.name}</h1>
            {dataPokemon?.sprites && (<SpritesCarrossel sprites={dataPokemon?.sprites}/>)}
        </div>
    )
}