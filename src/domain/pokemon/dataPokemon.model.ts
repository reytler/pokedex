export interface IDataPokemon {
    id: number
    name: string
    order: number
    is_default: boolean
    abilities: any
    base_experience: number
    forms: Array<Iform>
    game_indices: Array<Igameindice>
    heigth: number
    held_items: []
    location_area_encounters: string
    past_abilities: []
    past_types: []
    species: Iform
    sprites: Isprites
    stats: Array<Istats>
    types: Array<Itype>
    weight: number
}

interface Iform {
    name: string
    url: string
}

interface Igameindice {
    game_index: number
    version: Iform
}

export interface Isprites {
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
}

interface Istats {
    base_stat: number
    effort: number
    stat: Iform
}

interface Itype {
    slot: number
    type: Iform
}