describe('Login specs', () => {
  it('visit the login page', () => {
    // Arrange

    // Act
    cy.visit('/')
    // Assert
  })

  it('should name input has the focus when it clicks on it', () => {
    // Arrange

    // Act
    cy.visit('/')
    cy.get('input[name="user"]').click()

    // Assert
    cy.get('input[name="user"]').should('have.focus')

  })

  it('should show an snackbar with a message when type invalid credentials', () => {
    // Arrange
    const user = "admin"
    const password = "notest"; // password ok -> test


    // Act
    cy.visit('/')
    cy.get('input[name="user"]').as("userInput")
    cy.get('input[name="password"]').as("passwordInput")
    cy.get("button").as("submitButton")

    cy.get('@userInput').type(user)
    cy.get("@passwordInput").type(password)

    // Assert
    cy.get('@userInput').should('have.value', user)
    cy.get('@passwordInput').should('have.value', password)
    cy.get("@submitButton").click()

    // esperamos hasta que el spinner desaparezca porque no hay llamada a ninguna api que se pueda interceptar
    cy.wait(2000);
    cy.findByRole("alert").should('be.visible').and('contain.text', 'Usuario y/o password no válidos');
  })

  it('should navigate to submodule-list url when type valid credentials', () => {
    //Act 
    cy.loginOK();
    //Assert
    cy.url().should("equal", 'http://localhost:5173/#/submodule-list')
  })
})