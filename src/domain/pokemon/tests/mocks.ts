import { IDataPokemon, Iform, Isprites } from "../dataPokemon.model"

interface Ihttp {
    get: jest.Mock<Promise<any>>
    post: jest.Mock<Promise<any>>
}

export const mockHttp: jest.Mocked<Ihttp> = {
    get: jest.fn(),
    post: jest.fn()
}

const mockSpecies: Iform = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon-species/1/"
}

const mockSprites: Isprites = {
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png"
}

export const mockPokemonBulbasaur: IDataPokemon = {
    id: 1,
    name: "bulbasaur",
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
    species: mockSpecies,
    sprites: mockSprites,
    stats: [],
    types: [],
    weight: 0
}