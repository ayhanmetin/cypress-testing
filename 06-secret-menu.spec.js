/// <reference types="cypress" />

const restaurants = [
  'Chick-fil-A',
  'McDonalds',
  'In-N-Out',
  'KFC',
  'Jack In The Box',
  'Jamba Juice',
  'Starbucks',
  'Dairy Queen',
  'Burger King',
  'Chipotle',
  'Taco Bell',
  'Five Guys',
  'Sonic',
  'Subway',
  'Panera Bread',
];

const properties = [
  'name',
  'whereToOrder',
  'description',
  'secret',
  'ingredients',
  'popularity',
  'price',
  'howToOrder',
];


const ratings = [1, 2, 3, 4, 5, 6, 7];

describe('Secret Menu Items', () => {
  beforeEach(() => {
    cy.visit('/secret-menu');
  });

  it('should exist have the title on the page', () => {
    cy.get('h1').should('contain', 'Secret Menu Items');
  });

  for (const property of properties) {
    it(`should have a column for ${property}`, () => {
      cy.get(`#${property}-column`);
    });
    
    it(`should have a column for showing the ${property} column`, () => {
      cy.get(`#show-${property}`);
    });

    
    it('should hide the column when the checkbox is unchecked', () => {
      cy.get(`#show-${property}`).click();
      cy.get(`#${property}-column`).should('be.hidden');
    });
  }

  describe('Restaurant Filter', () => {
    beforeEach(() => {
      cy.get('#restaurant-visibility-filter').as('restaurant-filter');
    });

    for (const restaurant of restaurants) {
      it(`should only display rows that match ${restaurant} when selected`, () => {
        cy.get('@restaurant-filter').select(restaurant);

        cy.get('td[headers="whereToOrder-column"]').should('contain', restaurant);
      });
    }
  });

  describe('Ratings Filter', () => {
    beforeEach(() => {
      cy.get('#minimum-rating-visibility').as('rating-filter');
    });

    for (const rating of ratings) { 
      // Loop through each rating in the ratings array
      it(`should only display items with a popularity above ${rating}`, () => { 
        // Define a test case for the current rating
        cy.get('@rating-filter').invoke('val', rating).trigger('change'); 
        // Set the rating filter value and trigger a 'change' event to update the filtered items
        cy.get('td[headers="popularity-column"]').each(($el) => { 
          // Loop through each table cell with the header "popularity-column"
          expect(+$el.text()).to.be.gte(rating); 
          // Check if the popularity value (converted to a number using the '+' prefix) is greater than or equal to the rating
        });
      });
    }
    
    // The + in front of $el.text() is a shorthand to convert the text content of the element into a number. 
    //This is important because we want to compare the numeric value of the popularity against the rating.
    // The change event inside the trigger method is used to notify the application that the rating filter value has been updated. 
    //This event allows the application to update the displayed items based on the new filter value.
    //'gte' is used, which stands for "Greater Than or Equal to."
    
  });
});
