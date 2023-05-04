/// <reference types="cypress" />

describe('Create a New Item', () => {
  beforeEach(() => {
    cy.visit('/jetsetter')
  });
  
  it('should have a form', () => {
    cy.get('form').should('exist');
  });

  it('should have an "Add Item" button that is disabled', () => {
    cy.contains('Add Item');
    cy.get('[data-test="add-item"]').should('be.disabled');
  });

  it.only('should have an enable "Add Item" when text is in the input ', () => {
    cy.get('[data-test="new-item-input"]').type('Red Ballon');
    cy.contains('Add Item').should('be.enabled');
  });

  it('should create new item', () => {
    cy.get('[data-test="new-item-input"]').type('Running Short');
    cy.get('[data-test="add-item"]').click();
  }); 
});


