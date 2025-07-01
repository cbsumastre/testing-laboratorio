Cypress.Commands.add("loginOK", () => {
  // Arrange
  const user = "admin"
  const password = "test";

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
})