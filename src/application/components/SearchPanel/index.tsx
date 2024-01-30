import { useState } from "react"
import { IPokemon } from "../../../domain/pokemon/pokemon.model"
import { Loader } from "../Loader"
import { useDomainPokemon } from "../../../domain/pokemon"

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
            <div style={{
                width:'99.8vw', 
                height:'80vh', 
                display:'flex', 
                justifyContent:'center', 
                alignItems:'center'
            }}>
                <Loader/>
            </div>
        )
    }

    return(
        <form
            style={{
                display: "flex",
                flexDirection:'column',
                justifyContent:'center',
                justifyItems:'center',
                alignContent:'center',
                alignItems:'center',
            }}
            onSubmit={(event: React.FormEvent<HTMLFormElement>)=>handleSearch(event)}
        >
            <div 
                style={{
                    display: "flex",
                    flexDirection:'column',
                    justifyContent:'center',
                    alignContent:'center',
                    alignItems:'center',
                    width:'100%'
                }}
            >
                <label style={{
                    color:'white',
                    fontSize:'18px',
                    margin:'0 0 15px 0'
                }}>Buscar por um pokemon</label>
                <input 
                    required
                    type="text" 
                    placeholder="Informe o nome de um pokemon" 
                    list="listPokemons"
                    style={{
                        width:'70%',
                        height:'45px',
                        border:'none'
                    }}
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
            <input type="submit" value={"Buscar"} style={{height:'45px', marginTop:'5px'}}/>
        </form>
    )
}