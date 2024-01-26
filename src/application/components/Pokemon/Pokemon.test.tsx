import { act, render, screen, waitFor } from "@testing-library/react"
import { IPokemon } from "../../../domain/pokemon/pokemon.model"
import { Pokemon } from "."
import { useDomainPokemon } from "../../../domain/pokemon";
import { IDataPokemon } from "../../../domain/pokemon/dataPokemon.model";

jest.mock('../../../domain/pokemon', ()=>({
    useDomainPokemon: jest.fn()
}))

jest.mock('../Loader', ()=>({
    Loader: ()=> <div data-testid="loader">Loading</div>
}))

jest.mock('../SpritesCarrossel', ()=>({
    SpritesCarrossel: ()=> <div data-testid="sprites-carrossel">carrossel</div>
}))

const mockUseDomainPokemon = useDomainPokemon as jest.MockedFunction<typeof useDomainPokemon>;

const mockPokemon: IDataPokemon = {
    name: 'bulbasaur',
    sprites: {
        back_default: '',
        back_female: '',
        back_shiny: '',
        back_shiny_female: '',
        front_default: '',
        front_female: '',
        front_shiny: '',
        front_shiny_female: '',
        other: null,
        versions: null
    },
    id: 0,
    order: 0,
    is_default: false,
    abilities: undefined,
    base_experience: 0,
    forms: [],
    game_indices: [],
    heigth: 0,
    held_items: [],
    location_area_encounters: "",
    past_abilities: [],
    past_types: [],
    species: {
        name: "",
        url: ""
    },
    stats: [],
    types: [],
    weight: 0
}

let pokemon: IPokemon = {
    name:'bulbasaur',
    url:'https://pokeapi.co/api/v2/pokemon/1/'
}

describe("Pokemon Component",()=>{

    beforeEach(() => {
        mockUseDomainPokemon.mockReturnValue({
          getOne: jest.fn().mockResolvedValue({ data: mockPokemon }),
          getAll: jest.fn().mockResolvedValue({ data: [mockPokemon] }),
        });
    });

    test("renders the Pokemon component with loader when loading",async ()=>{
        render(<Pokemon pokemon={pokemon} heigth={300} width={300}/>);

        expect(screen.getByTestId('loader')).toBeInTheDocument();

        await waitFor(()=>{
            expect(screen.queryByTestId('loader')).toBeNull();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByText("bulbasaur")).toBeInTheDocument();
        })
    })

    test("renders the Pokemon component with data",async ()=>{
        render(<Pokemon pokemon={pokemon} width={300} heigth={300} />);

        await waitFor(()=>{
            expect(screen.getByText("bulbasaur")).toBeInTheDocument();
            // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
            expect(screen.getByTestId('sprites-carrossel')).toBeInTheDocument();
        })
    })

    test("calls getOne with the correct parameters", async ()=>{
        render(<Pokemon pokemon={pokemon} width={300} heigth={300} />);
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async ()=>{
            await waitFor(() => {
                 expect(mockUseDomainPokemon().getOne).toHaveBeenCalledWith('bulbasaur');
             });

        });
    })
})