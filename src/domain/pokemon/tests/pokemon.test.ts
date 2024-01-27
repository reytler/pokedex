import { Ihttp } from "../../../infra/Http/interface/Ihttp";
import { Pokemon } from "../Pokemon";
import { IPokemon } from "../pokemon.model";
import { mockHttp, mockPokemonBulbasaur } from "./mocks";

describe("Pokemon domain",() =>{
    let pokemon: Pokemon;
    let httpMock: jest.Mocked<Ihttp>;
    const resultsMock: Array<IPokemon> = [{
        name:'bulbasaur',
        url:'https://pokeapi.co/api/v2/pokemon/1/'
    }]
    
    const dataMock = {
        count: 1302,
        next: "https://pokeapi.co/api/v2/pokemon?offset=10&limit=10",
        previous: null,
        results: resultsMock
    }

    beforeEach(()=>{
        httpMock = mockHttp;
        pokemon = new Pokemon(httpMock);
    });

    describe("getPokemons",()=>{
        test("should fetch pokemons with the provided limit and offset",async ()=>{
            const limit = 10;
            const offset = 0;

            httpMock.get.mockResolvedValue(dataMock);

            const result = await pokemon.getPokemons(limit,offset);

            expect(httpMock.get).toHaveBeenCalledWith({
                path:'/pokemon',
                searchParams: {limit,offset}
            });

            expect(result).toEqual({
                data:dataMock,
                error: null,
            });
        });

        test("should handle errors during pokemon fetching", async ()=>{
            const limit = 10;
            const offset = 0;

            httpMock.get.mockRejectedValue(new Error('Failed to fetch pokemons'));

            const result = await pokemon.getPokemons(limit, offset);

            expect(httpMock.get).toHaveBeenCalledWith({
                path: '/pokemon',
                searchParams: { limit, offset },
            });

            expect(result).toEqual({
                data: null,
                error: new Error('Failed to fetch pokemons'),
            });
        })
    })

    describe("findPokemon",()=>{
        test("should find a pokemon by name",async ()=>{
            const pokemonName = mockPokemonBulbasaur.name;
            httpMock.get.mockResolvedValue(mockPokemonBulbasaur);
            const result = await pokemon.findPokemon(pokemonName);

            expect(httpMock.get).toHaveBeenCalledWith({
                path: '/pokemon',
                searchParams: {},
                pathParam: `/${pokemonName}`,
            });

            expect(result).toEqual({
                data: mockPokemonBulbasaur,
                error: null,
            })
        });

        test("should handle errors during pokemon searching",async ()=>{
            const pokemonName = mockPokemonBulbasaur.name;
            httpMock.get.mockRejectedValue(new Error('Failed to find pokemon'));

            const result = await pokemon.findPokemon(pokemonName);

            expect(httpMock.get).toHaveBeenCalledWith({
                path: '/pokemon',
                searchParams: {},
                pathParam: `/${pokemonName}`,
            });

            expect(result).toEqual({
                data: null,
                error: new Error('Failed to find pokemon'),
            });
        })
    })
})