/// <reference types="cypress" />

// Adding a new item
// Filtering the items on the page
// Removing all of the items from the page
// Removing an item from the page
// Marking all of the items as unpacked
// Marking an individual item as packed

describe('Basic Practice', () => {
  beforeEach(() => {
    cy.visit('/jetsetter');
  });

  describe('Adding a new item', () => {
    it('should put a new item on the page after clicking on "Add Item"', () => {
      cy.get('[data-test="new-item-input"]').type('Airpods');
      cy.get('[data-test="add-item"]').click();

      cy.contains('Airpods')
    });

    it('should appear in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('GPS');
      cy.get('[data-test="add-item"]').click();

      cy.get('[data-test="items-unpacked"]').contains('GPS');
    });

    it('should appear as the last item in the "Unpacked Items" list', () => {
      cy.get('[data-test="new-item-input"]').type('Camera');
      cy.get('[data-test="add-item"]').click();

      cy.get('[data-test="items-unpacked"]')
      .find('li')
      .last()
      .should('contain', 'Camera');
    });
  });

  describe('Filtering items', () => {
    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Deoderant');
      
      cy.get('[data-test="items-unpacked"]').contains('Deoderant');
    });

    it('should show items that match whatever is in the filter field', () => {
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.contains('Tooth Brush');
      cy.contains('Tooth Paste');
    });

    it('should hide items that do not match whatever is in the filter field', () =>{
      cy.get('[data-test="filter-items"]').type('Tooth');

      cy.should('not.contain', 'Deoderant');
      cy.should('not.contain', 'iPhone Charger');
    });
  });

  it('should show items that match whatever is in the filter field (better)', () => {
    cy.get('[data-test="filter-items"]').type('Tooth');

    cy.get('[data-test="items"] li').each(($item) => {
      expect($item.text()).to.include('Tooth');
    })
  });

  it('should show items that match whatever is in the filter field (better, wrap)', () => {
    cy.get('[data-test="filter-items"]').type('Tooth');

    cy.get('[data-test="items"] li').each(($item) => {
      cy.wrap($item).should('include.text', 'Tooth');
    })
  });

  describe('Removing items', () => {
    describe('Remove all', () => {
      it('should remove all of the items', () => {
        cy.get('[data-test="remove-all"]').click();

        cy.get('[data-test="items-unpacked"]').contains('No items to show.');
        cy.get('[data-test="items"] li').should('not.exist');
      });
    });

  describe('Remove individual items', () => {
      it('should have a remove button on an item', () => {
        cy.get('[data-test="items"] li').find('[data-test="remove"]').should('exist');
      });

      it('should have a remove button on each (literally)', () => {
        cy.get('[data-test="items"] li').each((li) => {
          cy.wrap(li).find('[data-test="remove"]').should('exist');
        });

        it('should remove an element from the page', () => {
          cy.get('[data-test="items"] li').each(($li) => {
          cy.wrap($li).find('[data-test="remove"]').click()

          cy.wrap($li).should('not.exist'); 
          });
        });
      });
    });
  });

  describe('Mark all as unpacked', () => {
    it('should empty out the "Packed" list', () => {
      cy.get('[data-test="mark-all-as-unpacked"]').click();

      cy.get('[data-test="items-empty-state"]').contains('No items to show.');
      
      cy.get('[data-test="items-packed"] li').should('not.exist');
    });

    it('should empty have all of the items in the "Unpacked" list (better)', () => {
      cy.get('[data-test="items"] li')
      .its('length')
      .then((count) => {
        cy.get('[data-test="mark-all-as-unpacked"]').click();

        cy.get('[data-test="items-unpacked"] li').its('length').should('eq', count);
      })
    });
  });

    it('should move an individual item from "Unpacked" to "Packed" (better)', () => {
      cy.get('[data-test="items-unpacked"] li label')
        .first()
        .within(() => {
          cy.get('input[type="checkbox"]').click();
        })
        .then(($item) => {
          const text = $item.text();
          cy.get('[data-test="items-packed"] li label').first().should('have.text', text);
        });
    });
  });

