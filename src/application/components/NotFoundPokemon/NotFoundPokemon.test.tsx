import { render, screen} from "@testing-library/react";
import {NotFoundPokemon} from './index'

describe('NotFoundPokemon Component',()=>{
    test("render with text", ()=>{
        render(<NotFoundPokemon/>);
        expect(screen.getByText("Não foram encontrados dados sobre nenhum pokemon")).toBeInTheDocument()
    })
})