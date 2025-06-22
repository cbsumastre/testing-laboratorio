import { renderHook } from "@testing-library/react";
import { useConfirmationDialog } from "./confirmation-dialog.hook"
import { createEmptyLookup, Lookup } from "#common/models";
import { act } from "react";

vi.mock('#common/models', () => ({
    createEmptyLookup: vi.fn(() => ({ id: '', name: '' })),
}));



describe("useConfirmationDialog specs", () => {

    const mockedLookup: Lookup = { id: '', name: '' };

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should return isOpen equals false when initialize the hook', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog())

        // Assert
        expect(result.current.isOpen).toBe(false)
    });

    it('should return itemToDelete equals empty Lookup when initialize the hook', () => {
        // Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog())

        // Assert
        expect(result.current.itemToDelete).toEqual(mockedLookup);
        expect(createEmptyLookup).toHaveBeenCalledOnce()

    });

    it('should open the dialog and set the item to delete when onOpenDialog is called', () => {
        // Arrange
        const testLookup: Lookup = { id: '123', name: 'Name' };

        // Act
        const { result } = renderHook(() => useConfirmationDialog())

        act(() => {
            result.current.onOpenDialog(testLookup)
        })

        // Assert
        expect(result.current.isOpen).toBe(true)
        expect(result.current.itemToDelete).toEqual(testLookup)
    });

    // Test 3: Comportamiento de onClose
    it('should close the dialog when onClose is called', () => {
        //Arrange

        // Act
        const { result } = renderHook(() => useConfirmationDialog())

        act(() => {
            result.current.onOpenDialog(mockedLookup)
        })

        act(() => {
            expect(result.current.isOpen).toBe(true)
            result.current.onClose()
        })

        //Assert
        expect(result.current.isOpen).toBe(false)
    });

    it('should clear the itemToDelete when onAccept is called', () => {

        // Arrange
        const itemToDelete: Lookup = { id: '123', name: 'Name' };

        // Act
        const { result } = renderHook(() => useConfirmationDialog())

        act(() => {
            result.current.onOpenDialog(itemToDelete);
        })

        act(() => {
            expect(result.current.itemToDelete).toEqual(itemToDelete);
            result.current.onAccept();
        })

        act(() => {
            expect(result.current.isOpen).toBe(true)

        })

        // Assert
        expect(result.current.itemToDelete).toEqual(mockedLookup)
    });
})