import { useCallback, useEffect, useState } from "react"
import { useDomainPokemon } from "../../domain/pokemon"
import { IPokemon } from "../../domain/pokemon/pokemon.model"
import { GridView } from "../components/GridView"
import { IconRefresh } from "../components/IconRefresh"

enum View {
    Grid,
    Mono
}

enum Order {
    Sort,
    Reverse
}

export function Pokemons(){
    const {getAll} = useDomainPokemon()
    const [pokemons,setPokemons] = useState<IPokemon[]>()
    const [limit,setLimit] = useState<number>(5)
    const [offset,setOffset] = useState<number>(0)
    const [view,setview] = useState<View>(View.Grid)
    const [order,setOrder] = useState<Order>(Order.Sort)

    function onderPokemons(pokemons:Array<IPokemon>,order:Order): Array<IPokemon> {
        if(order === Order.Sort){
            return pokemons.sort()
        }
        return pokemons.reverse()
    }

    const loadPokemons = useCallback(async (limit:number, offset: number, order: Order)=>{
        const res = await getAll(limit,offset)
        setPokemons(onderPokemons(res?.data.results,order))
    },[])

    useEffect(()=>{
        loadPokemons(limit,offset,order)
    },[limit,offset,order])

    function handleSetorder(value: string){
        if(parseInt(value) === Order.Reverse){
            setOrder(Order.Reverse)
        }else{
            setOrder(Order.Sort)
        }
    }

    return(
        <>
            <div style={{
                display:'flex',
                justifyContent:'center',
                padding:'15px 0 15px 0',
                gap:'5px'
            }}>
                <label htmlFor="limit" style={{color:'white', fontWeight:'bold', margin:'0 5px 0 0'}}>Limit:</label>
                <select name="limit" id="limit" onChange={(event)=>setLimit(parseInt(event.target.value))} value={limit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
                <label htmlFor="order" style={{color:'white', fontWeight:'bold', margin:'0 5px 0 0'}}>Order:</label>                
                <select name="limit" id="limit" onChange={(event)=>handleSetorder(event.target.value)}>
                    <option value={Order.Sort}>ASC</option>
                    <option value={Order.Reverse}>DESC</option>
                </select>
                <button onClick={()=>loadPokemons(limit,offset,order)}><IconRefresh/></button>
            </div>
            {view === View.Grid 
            ? (
                <GridView pokemons={pokemons}/>
            ) 
            : null
            }
        </>
    )
}