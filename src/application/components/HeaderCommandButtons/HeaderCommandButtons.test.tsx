import { fireEvent, render, screen } from "@testing-library/react";
import { Transition, View } from "../../pages";
import { HeaderCommandButtons } from ".";

describe("HeaderCommandButtons Component",()=>{
    const mockProps = {
        pagination: jest.fn(),
        setOffset: jest.fn(),
        handleSetview: jest.fn(),
        loading: false,
        view: View.Mono,
        handleLoadPokemons: jest.fn(),
    };

    test("renders the component with the correct elements and values",()=>{
        render(
            <HeaderCommandButtons {...mockProps} />
        );

        expect(screen.getByText('Anterior')).toBeInTheDocument();
        expect(screen.getByText('Início')).toBeInTheDocument();
        expect(screen.getByText('Próximo')).toBeInTheDocument();
        expect(screen.getByTitle('Recarregar')).toBeInTheDocument();
    })

    test("calls the correct handlers on interactions",()=>{
        render(
            <HeaderCommandButtons {...mockProps} />
        );

        fireEvent.click(screen.getByText('Anterior'))
        expect(mockProps.pagination).toHaveBeenCalledWith(Transition.Prev);

        fireEvent.click(screen.getByText('Próximo'))
        expect(mockProps.pagination).toHaveBeenCalledWith(Transition.Next);

        fireEvent.click(screen.getByText('Início'))
        expect(mockProps.setOffset).toHaveBeenCalledWith(0);
        
        fireEvent.change(screen.getByTestId('select-view'),{ target: { value: View.Grid } })
        expect(mockProps.handleSetview).toHaveBeenCalledWith(View.Grid.toString());

        fireEvent.click(screen.getByTitle('Recarregar'));
        expect(mockProps.handleLoadPokemons).toHaveBeenCalled()
    })
})