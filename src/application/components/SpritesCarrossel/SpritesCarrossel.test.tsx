import { fireEvent, render, screen } from "@testing-library/react";
import { SpritesCarrossel } from ".";
import { Isprites } from "../../../domain/pokemon/dataPokemon.model";

describe("SpritesCarrossel Component", ()=>{

    const mockSprites: Isprites = {
        back_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png',
        back_female: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/back_female.png',
        back_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png',
        back_shiny_female: '',
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        front_female: '',
        front_shiny: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png',
        front_shiny_female: '',
        other: null,
        versions: null
    }

    test("renders SpritesCarrossel with initial image",()=>{
        render(<SpritesCarrossel sprites={mockSprites} pixels={100} />);
        
        expect(screen.getByAltText('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png')).toBeInTheDocument();
        expect(screen.getByText('Anterior')).toBeInTheDocument();
        expect(screen.getByText('Próximo')).toBeInTheDocument();
    });

    test("transitions to the next image",()=>{
        render(<SpritesCarrossel sprites={mockSprites} pixels={100} />);

        fireEvent.click(screen.getByText('Próximo'));

        expect(screen.getByAltText('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/back_female.png')).toBeInTheDocument();
    });

    test("transitions to the previous image",()=>{
        render(<SpritesCarrossel sprites={mockSprites} pixels={100} />);

        fireEvent.click(screen.getByText('Próximo'));
        fireEvent.click(screen.getByText('Anterior'));
        expect(screen.getByAltText('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png')).toBeInTheDocument();
    });
});