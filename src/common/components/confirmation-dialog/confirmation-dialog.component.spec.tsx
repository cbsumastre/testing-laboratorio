import React from 'react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('confirmation-dialog-component specs', () => {
  const lorem = `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
      facilisis, quam eu tempus egestas, neque urna vestibulum nulla, at
      commodo felis felis non lectus. Vestibulum diam ante, lacinia quis
      ultrices non, fermentum ut mauris. Mauris egestas eros ex, ut vulputate
      dolor accumsan non. Curabitur ullamcorper laoreet urna, sit amet commodo
      sem accumsan et. Cras lobortis malesuada venenatis. Sed quis lacus
      massa. Maecenas condimentum nibh vitae ligula accumsan, et ornare massa
      efficitur.
    `;

  const testProps: React.ComponentProps<typeof ConfirmationDialogComponent> = {
    isOpen: true,
    onAccept: () => {},
    onClose: () => {},
    title: 'Test title',
    labels: {
      closeButton: 'Close',
      acceptButton: 'Accept',
    },
    children: <p>{lorem}</p>,
  };

  it('should render correctly when isOpen is true', () => {
    //Act
    render(<ConfirmationDialogComponent {...testProps} />);

    const titleElement = screen.getByRole('heading', {
      name: /test Title/i,
    });
    const contentElement = screen.getByRole('paragraph');
    const buttonElements = screen.getAllByRole('button');

    expect(titleElement).toBeInTheDocument();
    expect(contentElement).toBeInTheDocument();
    expect(buttonElements).toHaveLength(2);
  });

  it('should not be rendered when isOpen is false', () => {
    // Arrange
    const myProps = { ...testProps };
    myProps.isOpen = false;

    //Act
    render(<ConfirmationDialogComponent {...myProps} />);

    const titleElement = screen.queryByRole('heading', {
      name: /TEST TITLE/i,
    });
    const contentElement = screen.queryByRole('paragraph');
    const buttonElements = screen.queryByRole('button');

    //Assert
    expect(titleElement).not.toBeInTheDocument();
    expect(contentElement).not.toBeInTheDocument();
    expect(buttonElements).not.toBeInTheDocument();
  });

  it(`should call onClose when the "${testProps.labels.closeButton}" button is clicked`, async () => {
    // Arrange
    const myProps = { ...testProps };
    myProps.onClose = vi.fn();

    // Act
    render(<ConfirmationDialogComponent {...myProps} />);

    const [closeButtonElement] = screen.getAllByRole('button');
    await userEvent.click(closeButtonElement);

    // Assert
    expect(myProps.onClose).toHaveBeenCalledOnce();
  });

  it(`should call onAccept and onClose when the "${testProps.labels.acceptButton}" button is clicked`, async () => {
    // Arrange
    const myProps = { ...testProps };
    myProps.onClose = vi.fn();
    myProps.onAccept = vi.fn();

    // Act
    render(<ConfirmationDialogComponent {...myProps} />);

    const [, acceptButtonElement] = screen.getAllByRole('button');
    await userEvent.click(acceptButtonElement);

    // Assert
    expect(myProps.onAccept).toHaveBeenCalledOnce();
    expect(myProps.onClose).toHaveBeenCalledOnce();
  });

  it('should display the title as a string', () => {
    // Act
    render(<ConfirmationDialogComponent {...testProps} />);

    const titleElement = screen.getByRole('heading', {
      name: /test Title/i,
    });

    // Assert
    expect(titleElement).toHaveTextContent(testProps.title as string);
  });

  it('should display the title as a custom ReactNode component', () => {
    // Act
    const myProps = { ...testProps };
    const customTitle: React.ReactNode = (
      <span data-testid="pretty-custom-title">
        My <strong>Pretty</strong> Custom Title
      </span>
    );
    myProps.title = customTitle;

    render(<ConfirmationDialogComponent {...myProps} />);

    const titleElement = screen.getByRole('heading');
    const customTitleElement = screen.getByTestId('pretty-custom-title');

    // Assert
    expect(titleElement).toBeInTheDocument();
    expect(customTitleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('My Pretty Custom Title');
    expect(customTitleElement).toHaveTextContent('My Pretty Custom Title');
  });

  it('should display the passed content as children', () => {
    //Act
    render(<ConfirmationDialogComponent {...testProps} />);
    const contentElement = screen.getByRole('paragraph');

    // Assert
    expect(contentElement).toBeInTheDocument();
    expect(contentElement.textContent).toBe(lorem);
  });

  it(`should has "${testProps.labels.closeButton}" and "${testProps.labels.acceptButton}" buttons`, () => {
    // Act
    render(<ConfirmationDialogComponent {...testProps} />);

    const [closeButtonElement, acceptButtonElement] =
      screen.getAllByRole('button');

    // Assert
    expect(closeButtonElement.textContent).toBe(testProps.labels.closeButton);
    expect(acceptButtonElement.textContent).toBe(testProps.labels.acceptButton);
  });
});
