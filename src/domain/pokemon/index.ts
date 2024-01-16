import { Http } from "../../infra/Http"
import { LocalStorage } from "../../infra/repository/localStorage"
import { Pokemon } from "./Pokemon"

export const URL = 'https://pokeapi.co/api/v2'
const storageCache = new LocalStorage(2)
const http = new Http(URL,{},storageCache)
const pokemons = new Pokemon(http)

export function useDomainPokemon(){
    return {
        getAll: async (limit: number,offset: number)=> pokemons.getPokemons(limit,offset),
        getOne: async (name: string)=> pokemons.findPokemon(name)        
    }
}