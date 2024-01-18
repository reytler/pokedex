import { Http } from "../../infra/Http"
import { RamStorage } from "../../infra/repository/ramCache"
import { Pokemon } from "./Pokemon"

export const URL = 'https://pokeapi.co/api/v2'
const storageCache = new RamStorage(2)
const http = new Http(URL,{},storageCache)
const pokemons = new Pokemon(http)

export function useDomainPokemon(){
    return {
        getAll: async (limit: number,offset: number)=> pokemons.getPokemons(limit,offset),
        getOne: async (name: string)=> pokemons.findPokemon(name)        
    }
}