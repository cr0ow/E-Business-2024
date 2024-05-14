describe('usos', () => {

  it('Should load home page', () => {
    cy.visit('https://www.usosweb.uj.edu.pl/kontroler.php?_action=news/default');
    cy.get('main').should('have.id', 'layout-main-content')
    cy.get('span').first().should('have.text', 'Unia Europejska')
  })

  it('Should open login form', () => {
    cy.visit('https://www.usosweb.uj.edu.pl/kontroler.php?_action=news/default');
    cy.contains('zaloguj się').should('exist');
    cy.contains('zaloguj się').click();
  })

})