/// <reference types="cypress" />


describe('Aliases', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');

    // Create an aliases
    cy.get('[data-test="filter-items"]').as('filterInput');
    cy.get('[data-test="items"]').as('allItems');
    cy.get('[data-test="items-unpacked"]').as('unpackedItems');
    cy.get('[data-test="items-packed"]').as('packedItems');
  });

  it('should filter the Airpods item', () => {
  
    // Type 'Airpods' into the filter input
    cy.get('@filterInput').type('Airpods');
  
    // Check if the 'Airpods' item is visible in the list
    cy.get('@allItems').contains('No items to show');
    cy.get('@unpackedItems').should('not.contain', 'iPhone');
  });

  it('should filter Deoderant item', () => {

    // Check if the 'Deoderant' item is visible in the list
    cy.get('@filterInput').type('Deoderant');

    cy.get('@allItems').should('contain', 'Deoderant');
    cy.get('@allItems').should('not.contain', 'iPhone');
  });
  
  it.only('should hold onto an alias', () => {
    // Get the first label element inside the unpackedItems and create an alias 'firstItem'
    cy.get('@unpackedItems').find('label').first().as('firstItem');
  
    // Get the text content of the 'firstItem' and create an alias 'text'
    cy.get('@firstItem').invoke('text').as('text');
  
    // Click on the checkbox inside the 'firstItem'
    cy.get('@firstItem').find('input[type="checkbox"]').click();
  
    // Use the 'text' alias to verify that the first packed item's label contains the expected text
    cy.get('@text').then((text) => {
      cy.get('@packedItems').find('label').first().should('include.text', text);
    });
  });
  
});
