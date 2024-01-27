import { IPokemon } from "../../../domain/pokemon/pokemon.model";
import { NotFoundPokemon } from "../NotFoundPokemon";
import './style.css'

interface GridviewProps {
    pokemons: Array<IPokemon> | undefined
    children: JSX.Element[] | undefined
}

export function GridView({children,pokemons}:GridviewProps){

    if(pokemons && pokemons.length < 1){
        return(<NotFoundPokemon/>)
    }
    return(
        <div className="warpperGridView">
            {children}
        </div>
    )
}