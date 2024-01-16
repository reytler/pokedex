import { Isprites } from "../../../domain/pokemon/dataPokemon.model"

interface IpropsSpritesCarrossel {
    sprites: Isprites
}

export function SpritesCarrossel({sprites}:IpropsSpritesCarrossel){
    return(
        <>
            <h1>Carrossel</h1>
        </>
    )
}