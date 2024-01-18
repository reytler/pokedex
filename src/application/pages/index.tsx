import { useCallback, useEffect, useState } from "react"
import { useDomainPokemon } from "../../domain/pokemon"
import { IPokemon } from "../../domain/pokemon/pokemon.model"
import { GridView } from "../components/GridView"
import { IconRefresh } from "../components/IconRefresh"
import { Pokemon } from "../components/Pokemon"
import { Loader } from "../components/Loader"

enum View {
    Grid,
    Mono
}

enum Order {
    Sort,
    Reverse
}
enum Transition {
    Prev,
    Next
}

export function Pokemons(){
    const {getAll} = useDomainPokemon()
    const [pokemons,setPokemons] = useState<IPokemon[]>()
    const [limit,setLimit] = useState<number>(5)
    const [offset,setOffset] = useState<number>(0)
    const [view,setview] = useState<View>(View.Grid)
    const [order,setOrder] = useState<Order>(Order.Sort)
    const [count,setCont] = useState<number>(0)
    const [page,setPage] = useState<number>(1)
    const [loading,setLoading] = useState<boolean>(false)

    console.log('PAGE: ',page)

    function onderPokemons(pokemons:Array<IPokemon>,order:Order): Array<IPokemon> {
        if(order === Order.Sort){
            return pokemons.sort()
        }
        return pokemons.reverse()
    }

    const loadPokemons = useCallback(async (limit:number, offset: number, order: Order)=>{
        setLoading(true)
        const res = await getAll(limit,offset)
        setCont(res?.data.count)
        setPokemons(onderPokemons(res?.data.results,order))
        setLoading(false)
    },[getAll])

    useEffect(()=>{
        loadPokemons(limit,offset,order)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[limit,offset,order])

    useEffect(()=>{
        if(view === View.Mono){
            setLimit(1)
            setOrder(Order.Sort)
        }
        if(view === View.Grid){
            setLimit(5)
        }
    },[view])

    function handleSetorder(value: string){
        if(parseInt(value) === Order.Reverse){
            setOrder(Order.Reverse)
        }else{
            setOrder(Order.Sort)
        }
    }
    function handleSetview(value: string){
        if(parseInt(value) === View.Grid){
            setview(View.Grid)
        }else{
            setview(View.Mono)
        }
    }

    function pagination(transition:Transition){
        let pages = count / limit
        pages = Math.ceil(pages)

        if(transition === Transition.Next){
            setOffset(prev=>prev+limit)
            if(page < pages){
                setPage(prev=>prev+1)
            }
        }

        if(transition === Transition.Prev){
            if(offset >= limit){
                setOffset(prev=>prev-limit)
            }
            if(page > 1){
                setPage(prev=>prev-1)
            }
        }
    }

    useEffect(()=>{
        setPage(1)
        setOffset(0)
    },[limit])

    return(
        <>
            <div style={{
                display:'flex', 
                justifyContent:'center',
                gap:'15px',
                margin:'10px 0 0 0'
            }}>
                <button style={{height:'20px'}} onClick={()=>pagination(Transition.Prev)}>Anterior</button>
                <button style={{height:'20px'}} onClick={()=>setOffset(0)}>Início</button>
                <button style={{height:'20px'}} onClick={()=>pagination(Transition.Next)}>Próximo</button>
                <select name="" id="" onChange={(event)=>handleSetview(event.target.value)}>
                    <option value={View.Grid}>Grid</option>
                    <option value={View.Mono}>Mono</option>
                </select>
                { view === View.Mono && <button onClick={()=>loadPokemons(limit,offset,order)} title="Recarregar"><IconRefresh/></button>}
            </div>
            {
                view === View.Grid && (
                    <div style={{
                        display:'flex',
                        justifyContent:'center',
                        padding:'15px 0 15px 0',
                        gap:'5px'
                    }}>
                        <label htmlFor="limit" style={{color:'white', fontWeight:'bold', margin:'0 5px 0 0'}}>Limite:</label>
                        <select name="limit" id="limit" onChange={(event)=>setLimit(parseInt(event.target.value))} value={limit}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                            <option value="20">20</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                        </select>
                        <label htmlFor="order" style={{color:'white', fontWeight:'bold', margin:'0 5px 0 0'}}>Ordem:</label>                
                        <select name="limit" id="limit" onChange={(event)=>handleSetorder(event.target.value)}>
                            <option value={Order.Sort}>ASC</option>
                            <option value={Order.Reverse}>DESC</option>
                        </select>
                        <button onClick={()=>loadPokemons(limit,offset,order)} title="Recarregar"><IconRefresh/></button>
                    </div>
                )
            }
            
            {loading && (
                <div style={{
                    width:'99.8vw', 
                    height:'80vh', 
                    display:'flex', 
                    justifyContent:'center', 
                    alignItems:'center'
                }}>
                    <Loader/>
                </div>
            )}
            
            {view === View.Grid && !loading
            ? (
                <GridView pokemons={pokemons}/>
            ) 
            : pokemons && !loading && (
                <div 
                style={{
                    display:'flex', 
                    justifyContent:'center', 
                    justifyItems:'center', 
                    height:'95vh',
                    margin:'15px 0 0 0'
                }}>
                    <Pokemon pokemon={pokemons[0]} heigth={600} width={600}/>
                </div>
            )
            }
        </>        
    )
}