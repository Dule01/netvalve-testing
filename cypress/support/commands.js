// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import users from "../fixtures/users.json"
import loginPage from "../fixtures/objects/loginPage.json"

// Returns a random nubmer based on the digits defined
Cypress.getRandomNumber = function (digits){
const min = 10 ** (digits - 1);
const max = 10 ** digits - 1;
return Math.floor(Math.random() * (max - min +1) + min);
}

Cypress.Commands.add("login", () => {
    cy.visit("https://gateway.uat.sandbox-netvalve.com/login");
    cy.get(loginPage.usernameFieldInput).type(users.username);
    cy.get(loginPage.passwordFieldInput).type(users.password);
    cy.get(loginPage.signInBtn).click();
    cy.url().should("eq", "https://gateway.uat.sandbox-netvalve.com/merchant/orders?page=1&pageSize=10");
})