declare namespace Cypress {
  interface Chainable {
    loginOK(): Chainable<Element>;
  }
}