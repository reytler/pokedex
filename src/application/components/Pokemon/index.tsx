import { useCallback, useEffect, useState } from "react"
import { useDomainPokemon } from "../../../domain/pokemon"
import { IPokemon } from "../../../domain/pokemon/pokemon.model"
import './style.css'
import { IDataPokemon } from "../../../domain/pokemon/dataPokemon.model"
import { SpritesCarrossel } from "../SpritesCarrossel"
import { Loader } from "../Loader"
interface propsPokemon {
    pokemon: IPokemon
    width: number
    heigth: number
}

export function Pokemon({pokemon,heigth, width}:propsPokemon){
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
        return(
            <div className="cardPokemon" style={{
                    width: width, 
                    height: heigth,
                    display:'flex', 
                    justifyContent:'center'
                }}>
                <Loader/>
            </div>
        )
    }
    
    return(
        <div className="cardPokemon" style={{width: width, height: heigth}}>
            <h1 className="titlePokemon">{pokemon.name}</h1>
            {dataPokemon?.sprites && <SpritesCarrossel sprites={dataPokemon?.sprites} pixels={width <= 300 ? 96 : 250}/>}
        </div>
    )
}