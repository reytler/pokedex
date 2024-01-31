import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { SearchPanel } from ".";
import { useDomainPokemon } from "../../../domain/pokemon";
import { IPokemon } from "../../../domain/pokemon/pokemon.model";
import { IDataPokemon } from "../../../domain/pokemon/dataPokemon.model";

jest.mock('../../../domain/pokemon', ()=>({
    useDomainPokemon: jest.fn()
}))

const mockUseDomainPokemon = useDomainPokemon as jest.MockedFunction<typeof useDomainPokemon>;

const mockPokemon: IPokemon = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/"
}
const mockDataPokemon: IDataPokemon = {
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
    id: 1,
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

jest.mock('../Loader', ()=>({
    Loader: ()=> <div data-testid="loader">Loading</div>
}))


describe("SearchPanel Component",()=>{

    beforeEach(() => {
        mockUseDomainPokemon.mockReturnValue({
          getOne: jest.fn().mockResolvedValue({ data: mockDataPokemon }),
          getAll: jest.fn().mockResolvedValue({ data: [mockPokemon] }),
        });
    });
   
    test("renders the component with loading state",()=>{
        render(
            <SearchPanel loading={true} pokemons={[]} setModal={()=>{}} setPokemons={()=>{}}/>
        )

        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    test("renders the component without loading state",()=>{
        render(
            <SearchPanel loading={false} pokemons={[]} setPokemons={() => {}} setModal={() => {}} />
        );

        expect(screen.getByText((content,element)=> element?.tagName.toLowerCase() === 'form')).toBeInTheDocument()
    })

    test("handles search submission correctly", async ()=>{
        const setPokemonsMock = jest.fn();
        const setModalMock = jest.fn();

        render(
            <SearchPanel loading={false} pokemons={[]} setPokemons={setPokemonsMock} setModal={setModalMock} />
        );

        fireEvent.change(screen.getByPlaceholderText('Informe o nome de um pokemon'),{target: {value: 'bulbasaur'}})
        fireEvent.click(screen.getByText('Buscar'))

        await waitFor(()=>{
            expect(setPokemonsMock).toHaveBeenCalledWith([mockPokemon]);
        })

        await waitFor(()=>{
            expect(setModalMock).toHaveBeenCalledWith(false);
        })
    })
})