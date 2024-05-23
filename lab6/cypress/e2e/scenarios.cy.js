describe('scenarios', () => {

  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:8080/products', { fixture: 'products.json' }).as('getProducts');
    cy.visit('http://localhost:3000');
    cy.wait('@getProducts');
  })

  it('Should start at product page', () => {
    cy.get('h1').should('have.text', 'Products');
    cy.get('button').last().should('have.text', 'Cart');
  })

  it('Should navigate to cart page', () => {
    cy.get('button').last().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 0);
  })

  it('Should add product to cart', () => {
    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 1);
  })

  it('Should add product and come back to products', () => {
    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 1);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Products');
    cy.get('ul li').should('have.length', 4);
  })

  it('Should add the same product to cart twice', () => {
    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 1);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Products');
    cy.get('ul li').should('have.length', 4);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 2);
  })

  it('Should navigate to the payments page', () => {
    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 1);

    cy.get('button').last().click();
    cy.get('h2').should('have.text', 'Amount to pay: 3.50 PLN');
  })

  it('Should buy one product', () => {
    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 1);

    cy.get('button').last().click();
    cy.get('h2').should('have.text', 'Amount to pay: 3.50 PLN');

    cy.intercept('POST', 'http://localhost:8080/payments', { fixture: 'payment1.json' }).as('makePayment');
    cy.get('button').first().click();
    cy.wait('@makePayment');

    cy.get('h1').should('have.text', 'Products');
  })

  it('Should buy multiple products', () => {
    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 1);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Products');
    cy.get('ul li').should('have.length', 4);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 2);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Products');
    cy.get('ul li').should('have.length', 4);

    cy.get('button').first().click();
    cy.get('h1').should('have.text', 'Cart');
    cy.get('ul li').should('have.length', 3);

    cy.get('button').last().click();
    cy.get('h2').should('have.text', 'Amount to pay: 10.50 PLN');
    cy.intercept('POST', 'http://localhost:8080/payments', { fixture: 'payment2.json' }).as('makePayment');
    cy.get('button').first().click();
    cy.wait('@makePayment');

    cy.get('h1').should('have.text', 'Products');
  })

})