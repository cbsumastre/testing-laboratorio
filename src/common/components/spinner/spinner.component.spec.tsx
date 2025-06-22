import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { SpinnerComponent } from './spinner.component';
import { render, screen, waitFor } from '@testing-library/react';

type MockUsePromiseTracker = typeof usePromiseTracker &
  ReturnType<typeof vi.fn>;

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: vi.fn(),
}));

describe('spinner.component specs', () => {
  const mockUsePromiseTracker = usePromiseTracker as MockUsePromiseTracker;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not show the spinner when promiseInProgress is false', () => {
    // Arrange
    mockUsePromiseTracker.mockReturnValue({ promiseInProgress: false });

    // Act
    render(<SpinnerComponent />);
    const modal = screen.queryByRole('dialog');

    // Assert
    expect(modal).not.toBeInTheDocument();
  });

  it('should show the spinner (loader) when promiseInProgress is true', () => {
    //Arrange
    mockUsePromiseTracker.mockReturnValue({ promiseInProgress: true });

    //Act
    render(<SpinnerComponent />);
    // he añadido el role de status al Loader en spinner.component.tsx para localizarlo
    const loader = screen.queryByRole('status');

    //Assert
    expect(loader).toBeInTheDocument();
  });

  it('should hide the spinner when promiseInProgress becomes false after being true', async () => {
    // Assert
    mockUsePromiseTracker.mockReturnValue({ promiseInProgress: true });

    //Act
    render(<SpinnerComponent />);
    // he añadido el role de status al Loader en spinner.component.tsx para localizarlo
    const loader = screen.queryByRole('status');
    expect(loader).toBeInTheDocument();

    mockUsePromiseTracker.mockReturnValue({ promiseInProgress: false });
    render(<SpinnerComponent />);

    // Assert
    await waitFor(() => {
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });
});
