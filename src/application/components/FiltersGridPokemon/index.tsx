import { Order, View } from "../../pages";
import { IconRefresh } from "../IconRefresh";
import { IconSearch } from "../IconSearch";
import "./style.css"

interface propsFiltersGridPokemon {
    view: View
    order: Order
    limit: number
    loading: boolean
    handleSetLimit: (value: number)=>void
    handleLoadPokemons: ()=>void
    toggleModal: ()=>void
    handleSetorder: (value: string)=>void
}

export function FiltersGridPokemon({handleLoadPokemons,handleSetLimit,handleSetorder,toggleModal,limit,loading,order,view}:propsFiltersGridPokemon){
    return(
        <div 
            className="warpper-filter-grid"
            style={{
                display: view === View.Grid ? 'flex' : 'none',
            }}
        >
            <div className="area-filters-grid">
                <label htmlFor="limit" className="label-filters-grid">Limite:</label>
                <select name="limit" id="limit" onChange={(event)=>handleSetLimit(parseInt(event.target.value))} value={limit} data-testid="select-limit">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
                <label htmlFor="order" className="label-filters-grid">Ordem:</label>                
                <select name="order" id="order" onChange={(event)=>handleSetorder(event.target.value)} value={order} data-testid="select-order">
                    <option value={Order.Sort}>ASC</option>
                    <option value={Order.Reverse}>DESC</option>
                </select>
                <button onClick={()=>handleLoadPokemons()} title="Recarregar" disabled={loading}><IconRefresh/></button>
            </div>
            <div className="area-icon-search-grid">
                <span 
                    title="Buscar por um pokemon"
                    onClick={()=>toggleModal()}
                >
                    <IconSearch/>
                </span>
            </div>
        </div>
    )
}