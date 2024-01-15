import { useCallback, useEffect } from "react"
import { Pokemon } from "../../domain/pokemon/Pokemon"
import { Http } from "../../infra/Http"
import { LocalStorage } from "../../infra/repository/localStorage"

export function Pokemons(){
    const storageCache = new LocalStorage(2)
    const http = new Http('https://pokeapi.co/api/v2',{},storageCache)
    const pokemons = new Pokemon(http)

    

    const load = useCallback(async ()=>{
        const res = await pokemons.getPokemons(20,0)
        console.log('Res: ',res)
    },[pokemons])

    const loadOne = useCallback(async ()=>{
        const res = await pokemons.findPokemon('1')
        console.log('ResOne: ',res)
    },[pokemons])

    useEffect(()=>{
        load()
        loadOne()
    },[load])

    return(
        <h1>Pokemons</h1>
    )
}