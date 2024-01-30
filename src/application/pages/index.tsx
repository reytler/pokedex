import { useCallback, useEffect, useState } from "react"
import { useDomainPokemon } from "../../domain/pokemon"
import { IPokemon } from "../../domain/pokemon/pokemon.model"
import { GridView } from "../components/GridView"
import { IconRefresh } from "../components/IconRefresh"
import { Pokemon } from "../components/Pokemon"
import { Loader } from "../components/Loader"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Modal } from "../components/Modal"
import { IconSearch } from "../components/IconSearch"
import { SearchPanel } from "../components/SearchPanel"

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
    const [pokemonsForSearch,setPokemonsForSearch] = useState<IPokemon[]>()
    const [limit,setLimit] = useLocalStorage<number>("limit",5)
    const [limitBeforeMonoView,setLimitBeforeMonoView] = useLocalStorage("limitBeforeMonoView",0)
    const [offset,setOffset] = useLocalStorage<number>("offset",0)
    const [view,setview] = useLocalStorage<View>("view",View.Grid)
    const [order,setOrder] = useLocalStorage<Order>("order",Order.Sort)
    const [count,setCont] = useState<number>(0)
    const [page,setPage] = useLocalStorage<number>("page",1)
    const [loading,setLoading] = useState<boolean>(false)
    const [modal,setModal] = useState<boolean>(false)

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

    const loadForSearch = useCallback(async ()=>{
        setLoading(true)
        const res = await getAll(10000,0)
        setPokemonsForSearch(res.data.results)
        setLoading(false)
    },[getAll])

    useEffect(()=>{
        if(modal){
            loadForSearch()
        }
    },[modal])

    useEffect(()=>{
        loadPokemons(limit,offset,order)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[limit,offset,order])

    useEffect(()=>{
        if(view === View.Mono){
            setLimitBeforeMonoView(limit)
            setLimit(1)
        }
        if(view === View.Grid){
            if(limitBeforeMonoView > 0){
                setLimit(limitBeforeMonoView)
                setLimitBeforeMonoView(0)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setOffset((prev: number)=>{
                if((prev+limit) <= count){
                    return prev+limit
                }

                return prev
            })
            if(page < pages){
                setPage((prev: number)=>prev+1)
            }
        }

        if(transition === Transition.Prev){
            if(offset >= limit){
                setOffset((prev: number)=>prev-limit)
            }
            if(page > 1){
                setPage((prev: number)=>prev-1)
            }
        }
    }

    return(
        <>
            <Modal isOpen={modal} toogle={()=>setModal(prev=>!prev)}>
                <SearchPanel 
                    loading={loading} 
                    pokemons={pokemonsForSearch} 
                    setPokemons={setPokemons}
                    setModal={setModal}
                />
            </Modal>
            <div style={{
                display:'flex', 
                justifyContent:'center',
                gap:'15px',
                margin:'10px 0 0 0'
            }}>
                <button style={{height:'20px'}} onClick={()=>pagination(Transition.Prev)} disabled={loading}>Anterior</button>
                <button style={{height:'20px'}} onClick={()=>setOffset(0)} disabled={loading}>Início</button>
                <button style={{height:'20px'}} onClick={()=>pagination(Transition.Next)} disabled={loading}>Próximo</button>
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
                        flexDirection:'column',
                        justifyContent:'center',
                        alignContent:'center',
                        alignItems:'center'
                    }}>
                        <div style={{
                            display:'flex',
                            justifyContent:'center',
                            padding:'15px 0 15px 0',
                            gap:'5px'
                        }}>
                            <label htmlFor="limit" style={{color:'white', fontWeight:'bold', margin:'0 5px 0 0'}}>Limite:</label>
                            <select name="limit" id="limit" onChange={(event)=>setLimit(parseInt(event.target.value))} defaultValue={limit} value={limit}>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                            </select>
                            <label htmlFor="order" style={{color:'white', fontWeight:'bold', margin:'0 5px 0 0'}}>Ordem:</label>                
                            <select name="limit" id="limit" onChange={(event)=>handleSetorder(event.target.value)} value={order}>
                                <option value={Order.Sort}>ASC</option>
                                <option value={Order.Reverse}>DESC</option>
                            </select>
                            <button onClick={()=>loadPokemons(limit,offset,order)} title="Recarregar" disabled={loading}><IconRefresh/></button>
                        </div>
                        <div style={{
                            width:'100%',
                            display:'flex',
                            justifyContent:'center'
                        }}>
                            <span 
                                style={{
                                    cursor:'pointer'
                                }}
                                title="Buscar por um pokemon"
                                onClick={()=>setModal(prev=>!prev)}
                            >
                                <IconSearch/>
                            </span>
                        </div>
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
                <GridView pokemons={pokemons}>
                    {pokemons?.map((pokemon:IPokemon)=>(
                        <Pokemon pokemon={pokemon} key={pokemon.url} heigth={300} width={300}/>
                    ))}
                </GridView>
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