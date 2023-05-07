/// <reference types="cypress" />

describe('Dog Facts', () => {
  beforeEach(() => {
    cy.visit('/dog-facts');

    cy.get('[data-test="fetch-button"]').as('fetchButton');
    cy.get('[data-test="clear-button"]').as('clearButton');
    cy.get('[data-test="amount-select"]').as('amountSelect');
    cy.get('[data-test="empty-state"]').as('emptyState');

    cy.intercept('/dog-facts/api?*').as('api');
  });

  it('should start out with an empty state', () => {
    cy.get('@emptyState');
  });

  it('should make a request when the button is called', () => {
    cy.get('@fetchButton').click();
    cy.wait('@api');
  });

  it('should adjust the amount when the select is changed', () => {
    cy.get('@amountSelect').select('4')
    cy.get('@fetchButton').click();
    
    cy.wait('@api').then((interception) => {
      expect(interception.request.url).to.match(/\?amount=4$/);
    });    
  });
  it('should show the correct number of facts on the page', () => {
    cy.get('@amountSelect').select('6');
    cy.get('@fetchButton').click();
    cy.get('[data-test="dog-fact"]').should('have.length', 6);
  });

  it('should clear the facts when the "Clear" button is pressed', () => {
    cy.get('@amountSelect').select('6');
    cy.get('@fetchButton');

    
    cy.get('@clearButton');
    cy.get('@emptyState').should('contain', 'Fetch some dog facts or something.');
  });

  it("should reflect the number of facts we're looking for in the title", () => {
    cy.get('@amountSelect').select('5');
    cy.title().should('equal', '5 Dog Facts')
  });

  it('should display the correct number of facts based on the selected value', () => {
    cy.get('@amountSelect').select('5');
    cy.get('@fetchButton').click();

    cy.get('#facts article').should('have.length', 5)
  });
});


