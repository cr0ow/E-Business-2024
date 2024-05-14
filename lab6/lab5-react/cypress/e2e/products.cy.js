describe('products', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/products', { fixture: 'products.json' }).as('getProducts');
    cy.visit('http://localhost:3000');
    cy.wait('@getProducts');
  })

  it('Should have the correct structure', () => {
    cy.get('h1').should('have.text', 'Products');
    cy.get('ul li').should('have.length', 4);
    cy.get('button').first().should('have.text', 'Add to cart');
    cy.get('button').last().should('have.text', 'Cart');
  })

  it('Should have correct list displayed', () => {
    cy.get('li')
      .should('have.length', 4)
      .first()
      .should('have.text', 'Bread, 3.5 PLN Add to cart');
    cy.get('li')
      .last()
      .should('have.text', 'Apple juice, 3 PLN Add to cart');
  })

})