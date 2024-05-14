describe('products', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  })

  it('Should have the correct title', () => {
    cy.get('h1').should('have.text', 'Products');
    cy.get('button').should('have.text', 'Cart');
    cy.get('button').click();
  })

})