describe('payments', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/payments');
  })

  it('Should have the correct structure', () => {
    cy.get('h2').should('have.text', 'Amount to pay: 0.00 PLN');
    cy.get('button').first()
      .should('have.text', 'Order and pay')
    cy.get('button').last()
      .should('have.text', 'Back to cart')
  })

})