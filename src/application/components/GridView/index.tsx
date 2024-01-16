import { IPokemon } from "../../../domain/pokemon/pokemon.model";
import { NotFoundPokemon } from "../NotFoundPokemon";
import { Pokemon } from "../Pokemon";
import './style.css'

interface GridviewProps {
    pokemons: Array<IPokemon> | undefined
}

export function GridView({pokemons}:GridviewProps){

    if(pokemons !== undefined && pokemons.length < 1){
        return(<NotFoundPokemon/>)
    }
    return(
        <div className="warpperGridView">
            {pokemons?.map((pokemon:IPokemon)=>(
                <Pokemon pokemon={pokemon} key={pokemon.url}/>
            ))}
        </div>
    )
}