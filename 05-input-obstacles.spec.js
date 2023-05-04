/// <reference types="cypress" />

describe('Input obstacles', () => {
  beforeEach(() => {
    cy.visit('/obstacle-course');
  });

  it('should input text into the input field', () => {
    const thought = 'Ravioli are a form of pop tart.';

    cy.get('[data-test="text-input"]').type(thought);
    cy.get('[data-test="text-result"]').contains(thought);
  });

  it('should control a select input', () => {
    cy.get('[data-test="select-input"]').select('Hulk');
    cy.get('[data-test="select-result"]').contains('Hulk');
  });

  it.only('should find and control a checkbox input', () => {
    cy.get('[data-test="checkbox-sardines"]').check();
    cy.get('[data-test="checkbox-result"]').contains('Sardines');
  });

  it('should find and control a radio input', () => {
    cy.get('[data-test="radio-ringo"]').check();
    cy.get('[data-test="radio-result"]').contains('Ringo');
  });

  it('should find and control a color input', () => {
    cy.get('[data-test="color-input"]').invoke('val', '#0000ff').trigger('input');
    cy.get('[data-test="color-result"]').contains('#0000ff');
  });

  it('should find and control a date input', () => {
    cy.get('[data-test="date-input"]').type('2021-07-31');
    cy.get('[data-test="date-result"]').contains('2021-07-31');
  });

  it('should find and control a range input', () => {
    cy.get('[data-test="range-input"]').invoke('val', '5').trigger('input');
    cy.get('[data-test="range-result"]').contains('5');
  });

  it('should find and control a file input', () => {
    cy.get('[data-test="file-input"]');
    cy.get('[data-test="file-result"]');
  });
});
