/// <reference types="cypress" />

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');

    cy.get('#minimum-rating-visibility').as('ratingFilter');
    cy.get('#restaurant-visibility-filter').as('restaurant-filter');
  });

  it('should set the range and verify it', () => {
    cy.get('@ratingFilter').invoke('val', '7').trigger('input');

    cy.get('@ratingFilter').should('have.value', '7');
  });

  it('should check the checkbox and verify it', () => {
    cy.get('input[type="checkbox"]').as('checkbox').check();
    cy.get('@checkbox').should('be.checked');
  });

  it.only('should select an option from the select and verify it', () => {
    cy.get('@restaurant-filter').select('KFC');

    cy.get('@restaurant-filter').should('have.value', 'KFC');
  });
});
