describe('cart', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/cart');
  })

  it('Should have the correct structure', () => {
    cy.get('h1').should('have.text', 'Cart');
    cy.get('h2').should('have.text', 'Amount: 0.00 PLN');
    cy.get('button').first().should('have.text', 'Back to products');
    cy.get('button').last().should('have.text', 'Buy');
  })

})