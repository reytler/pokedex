import { useCallback, useEffect, useState } from "react"
import { useDomainPokemon } from "../../domain/pokemon"
import { IPokemon } from "../../domain/pokemon/pokemon.model"
import { GridView } from "../components/GridView"

enum View {
    Grid,
    Mono
}

export function Pokemons(){
    const {getAll} = useDomainPokemon()
    const [pokemons,setPokemons] = useState<IPokemon[]>()
    const [limit,setLimit] = useState<number>(5)
    const [offset,setOffset] = useState<number>(0)
    const [view,setview] = useState<View>(View.Grid)

    const loadPokemons = useCallback(async (limit:number, offset: number)=>{
        const res = await getAll(limit,offset)
        setPokemons(res?.data.results)
    },[])

    useEffect(()=>{
        loadPokemons(limit,offset)
    },[limit,offset])

    return(
        <>
            {view === View.Grid 
            ? (
                <GridView pokemons={pokemons}/>
            ) 
            : null
            }
        </>
    )
}