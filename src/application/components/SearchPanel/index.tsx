import { useState } from "react"
import { IPokemon } from "../../../domain/pokemon/pokemon.model"
import { Loader } from "../Loader"
import { useDomainPokemon } from "../../../domain/pokemon"
import './style.css'

interface SearchPanelProps{
    loading: boolean
    pokemons: Array<IPokemon> | undefined
    setPokemons: (value: Array<IPokemon>) => void
    setModal: (value: boolean) => void
}

export function SearchPanel({loading, pokemons,setPokemons,setModal}:SearchPanelProps){
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [loadingOne,setLoadingone] = useState<boolean>(false)
    const {getOne} = useDomainPokemon()

    async function handleSearch(event:React.FormEvent<HTMLFormElement>){
        setLoadingone(true)
        event.preventDefault()
        const res = await getOne(searchTerm)
        setPokemons([{
            name: res.data.name,
            url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`
        }])
        setLoadingone(false)
        setModal(false)
    }
    
    if(loading || loadingOne){
        return(
            <div 
                className="loading-search-panel"
            >
                <Loader/>
            </div>
        )
    }

    return(
        <form
            className="form-search-panel"
            onSubmit={(event: React.FormEvent<HTMLFormElement>)=>handleSearch(event)}
        >
            <div 
                className="warpper-form"
            >
                <label className="label-form">Buscar por um pokemon</label>
                <input 
                    required
                    type="text" 
                    placeholder="Informe o nome de um pokemon" 
                    list="listPokemons"
                    className="input-form"
                    onChange={e=>setSearchTerm(e.target.value)}
                />
                <datalist id="listPokemons">
                    { 
                        pokemons && pokemons.map(pkm=>(
                            <option value={pkm.name}>{pkm.name}</option>
                        )) 
                    }
                </datalist>
            </div>
            <input type="submit" value={"Buscar"} className="submit-form"/>
        </form>
    )
}