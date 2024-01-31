import { useCallback, useEffect, useMemo, useState } from "react"
import { useDomainPokemon } from "../../domain/pokemon"
import { IPokemon } from "../../domain/pokemon/pokemon.model"
import { GridView } from "../components/GridView"
import { Pokemon } from "../components/Pokemon"
import { Loader } from "../components/Loader"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { Modal } from "../components/Modal"
import { SearchPanel } from "../components/SearchPanel"
import { LocalStorage } from "../../infra/repository/localStorage"
import { HeaderCommandButtons } from "../components/HeaderCommandButtons"
import { FiltersGridPokemon } from "../components/FiltersGridPokemon"
import './style.css'

export enum View {
    Grid,
    Mono
}

export enum Order {
    Sort,
    Reverse
}
export enum Transition {
    Prev,
    Next
}

export function Pokemons(){
    const storageInstance = useMemo(()=>new LocalStorage(1000),[])
    const {getAll} = useDomainPokemon()
    const [pokemons,setPokemons] = useState<IPokemon[]>()
    const [pokemonsForSearch,setPokemonsForSearch] = useState<IPokemon[]>()
    const [limit,setLimit] = useLocalStorage<number>("limit",5,storageInstance)
    const [limitBeforeMonoView,setLimitBeforeMonoView] = useLocalStorage("limitBeforeMonoView",0,storageInstance)
    const [offset,setOffset] = useLocalStorage<number>("offset",0,storageInstance)
    const [view,setview] = useLocalStorage<View>("view",View.Grid,storageInstance)
    const [order,setOrder] = useLocalStorage<Order>("order",Order.Sort,storageInstance)
    const [count,setCont] = useState<number>(0)
    const [page,setPage] = useLocalStorage<number>("page",1,storageInstance)
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

    function handleLoadPokemons(){
        loadPokemons(limit,offset,order)
    }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <HeaderCommandButtons 
                handleLoadPokemons={handleLoadPokemons} 
                handleSetview={handleSetview} 
                loading={loading} 
                pagination={pagination} 
                setOffset={setOffset} 
                view={view}
            />
            <FiltersGridPokemon 
                handleLoadPokemons={handleLoadPokemons} 
                handleSetLimit={(limit)=>setLimit(limit)}
                handleSetorder={(order:string)=>handleSetorder(order)}
                limit={limit}
                loading={loading}
                order={order}
                toggleModal={()=>setModal(prev=>!prev)}
                view={view}
            />            
            {loading && (
                <div className="area-loader-home">
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
                <div className="area-mono-view">
                    <Pokemon pokemon={pokemons[0]} heigth={600} width={600}/>
                </div>
            )
            }
        </>        
    )
}