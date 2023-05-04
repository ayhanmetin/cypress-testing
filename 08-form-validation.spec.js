/// <reference types="cypress" />

describe('Sign Up', () => {
  beforeEach(() => {
    cy.visit('/echo-chamber/sign-up');
    cy.get('[data-test="sign-up-password"]').as('password');
    cy.get('[data-test="sign-up-email"]').as('email');
    cy.get('[data-test="sign-up-submit"]').as('submit');
  });

  it('should require an email', () => {
    cy.get('@password').type('password').click();
    cy.get('[data-test="sign-up-submit"]').click();

    cy.get('[data-test="sign-up-email"]:invalid')
    .invoke('prop', 'validationMessage')
    .should('contain','Please fill out this field');
  });

  it('should require that the email actually be an email address', () => {
    cy.get('@email').type('ayhan');
    cy.get('@password').click();
    cy.get('@submit').click();

    cy.get('@email')
    .invoke('prop', 'validationMessage')
    .should('contain', "Please include an '@' in the email address.");
  });

  it('should require a password when the email is present', () => {
    cy.get('@email').type('ayhan@gmail.com{enter}')

    cy.get('@password')
    .invoke('prop', 'validity')
    .its('valueMissing')
    .should('be.true');
  });
});
