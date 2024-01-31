import { fireEvent, render, screen } from "@testing-library/react";
import { FiltersGridPokemon } from ".";
import { Order, View } from "../../pages";

describe("FiltersGridPokemon Component",()=>{
    const mockProps = {
        handleLoadPokemons: jest.fn(),
        handleSetLimit: jest.fn(),
        handleSetorder: jest.fn(),
        toggleModal: jest.fn(),
        limit: 10,
        loading: false,
        order: Order.Sort,
        view: View.Grid,
    };

    test("renders the component with the correct elements and values",()=>{
        render(
            <FiltersGridPokemon {...mockProps} />
        );

        expect(screen.getByTestId('select-limit')).toBeInTheDocument()                    
        expect(screen.getByTestId('select-order')).toBeInTheDocument()                    
        expect(screen.getByTitle('Recarregar')).toBeInTheDocument()                    
        expect(screen.getByTitle('Buscar por um pokemon')).toBeInTheDocument()                    
    })

    test("calls the correct handlers on interactions",()=>{
        render(
            <FiltersGridPokemon {...mockProps} />
        );

        const limitSelect = screen.getByTestId('select-limit')
        fireEvent.change(limitSelect, {target: {value: '100'}})
        expect(mockProps.handleSetLimit).toHaveBeenCalledWith(100)
        
        const orderSelect = screen.getByTestId('select-order')
        fireEvent.change(orderSelect, {target: {value: Order.Reverse}})
        expect(mockProps.handleSetorder).toHaveBeenCalledWith(`${Order.Reverse}`)

        const reloadButton = screen.getByTitle('Recarregar')
        fireEvent.click(reloadButton)
        expect(mockProps.handleLoadPokemons).toHaveBeenCalled()

        const searchButton = screen.getByTitle('Buscar por um pokemon')
        fireEvent.click(searchButton)
        expect(mockProps.toggleModal).toHaveBeenCalled()
    })
})