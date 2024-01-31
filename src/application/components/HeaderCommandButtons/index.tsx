import { Transition, View } from "../../pages";
import { IconRefresh } from "../IconRefresh";
import './style.css'

interface HeaderCommandButtonsProps{
    pagination: (value: Transition)=>void
    setOffset: (value:number)=>void
    handleSetview: (value: string)=>void
    loading: boolean
    view: View
    handleLoadPokemons: ()=>void
}

export function HeaderCommandButtons({handleLoadPokemons,handleSetview,loading,pagination,setOffset,view}:HeaderCommandButtonsProps){
    return(
        <div className="wrapper-header">
            <button className="btn-header" onClick={()=>pagination(Transition.Prev)} disabled={loading}>Anterior</button>
            <button className="btn-header" onClick={()=>setOffset(0)} disabled={loading}>Início</button>
            <button className="btn-header" onClick={()=>pagination(Transition.Next)} disabled={loading}>Próximo</button>
            <select name="" id="" onChange={(event)=>handleSetview(event.target.value)} data-testid="select-view" value={view}>
                <option value={View.Grid}>Grid</option>
                <option value={View.Mono}>Mono</option>
            </select>
            { view === View.Mono && <button onClick={()=>handleLoadPokemons()} title="Recarregar"><IconRefresh/></button>}
        </div>
    )
}