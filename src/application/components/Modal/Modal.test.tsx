import { fireEvent, render, screen } from "@testing-library/react";
import { Modal } from ".";

describe('Modal Component', () => {
    const mockProps = {
        isOpen: true,
        children: <div>Test Content</div>,
        toogle: jest.fn(),
    };

    test('renders the component with the correct elements and values', () => {
        render(
          <Modal {...mockProps} />
        );
    
        const modal = screen.getByTestId('modal');
        expect(modal).toBeInTheDocument();
        expect(modal.style.display).toBe('block');
    
        const closeButton = screen.getByText('X');
        expect(closeButton).toBeInTheDocument();
    });

    test('renders the content correctly', () => {
        render(
          <Modal {...mockProps} />
        );
    
        const content = screen.getByText('Test Content');
        expect(content).toBeInTheDocument();
    });

    test('calls the toogle function on close button click', () => {
        render(
          <Modal {...mockProps} />
        );
    
        fireEvent.click(screen.getByText('X'));
    
        expect(mockProps.toogle).toHaveBeenCalled();
    });

    test('does not render the modal when isOpen is false', () => {
        render(
          <Modal {...mockProps} isOpen={false} />
        );
    
        const modal = screen.queryByTestId('modal');
        expect(modal?.style.display).toBe('none');
    });
})