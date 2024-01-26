import { render, screen} from "@testing-library/react";
import {GridView} from './index'
import { IPokemon } from "../../../domain/pokemon/pokemon.model";

let pokemonBulbasaur: IPokemon = {
    name:'bulbasaur',
    url:'https://pokeapi.co/api/v2/pokemon/1/'
}

let pokemonIvysaur: IPokemon = {
    name:'ivysaur',
    url:'https://pokeapi.co/api/v2/pokemon/2/'
}

let pokemonsWithElements: Array<IPokemon> = [pokemonBulbasaur,pokemonIvysaur]
let pokemonsVoid: Array<IPokemon> = []

jest.mock('../NotFoundPokemon', ()=>{
    return { NotFoundPokemon: ()=> <div data-testid="not-found">Not Found</div>}
})

describe('GridView Component',()=>{
    beforeEach(() => {
        jest.clearAllMocks();
    });


    test("Render GridView with pokemons",()=>{
        render(
            <GridView pokemons={pokemonsWithElements}>{
                pokemonsWithElements.map((pokemon: IPokemon)=>(
                    <h1 key={pokemon.url}>{pokemon.name}</h1>
                ))
            }</GridView>
        );
        expect(screen.getByText('bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('ivysaur')).toBeInTheDocument();
    })

    test("renders NotFoundPokemon when there are no pokemons",()=>{

        render(
            <GridView pokemons={pokemonsVoid}>
                {
                    pokemonsWithElements.map((pokemon: IPokemon)=>(
                        <h1 key={pokemon.url}>{pokemon.name}</h1>
                    ))
                }
            </GridView>
        )
        expect(screen.getByTestId('not-found')).toBeInTheDocument()
    })

    test('does not render NotFoundPokemon when there are pokemons', () => {
        render(
            <GridView pokemons={pokemonsWithElements}>
                {
                    pokemonsWithElements.map((pokemon: IPokemon)=>(
                        <h1 key={pokemon.url}>{pokemon.name}</h1>
                    ))
                }
            </GridView>
        );
        expect(screen.queryByText("Not Found")).toBeNull();
    });
})
