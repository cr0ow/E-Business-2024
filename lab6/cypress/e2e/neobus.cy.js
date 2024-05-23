describe('neobus', () => {

  beforeEach(() => {
    cy.visit('https://neobus.pl/en/');
    cy.get('a[class="close"]').click();
  })

  it('should display the website in English', () => {
    cy.visit('https://neobus.pl/en/');
    cy.contains('Timetable');
  });

  it('should load the homepage', () => {
    cy.contains('Neobus');
  });

  it('should have a search form', () => {
    cy.get('form').first()
        .should('be.visible')
        .should('have.class', 'inputs-box');
  });

  it('should select departure city', () => {
    cy.get('.selectize-input.items.not-full.has-options').first().click().next()
        .children('div').first()
        .children('div[data-value=46]').first().click()
    cy.get('select[name="initial_stop"]').should('have.value', '46');
  });

  it('should select destination city', () => {
    cy.get('.selectize-input.items.not-full.has-options').first().click().next()
        .children('div').first()
        .children('div[data-value=76]').first().click()

    cy.get('.selectize-input.items.not-full.has-options').first().click().next()
        .children('div').first()
        .children('div[data-value=71]').first().click()
    cy.get('select[name="final_stop"]').should('have.value', '71');
  });

  it('should select number of passengers', () => {
    cy.get('.selectize-input.items.full.has-options.has-items').first().click().next()
        .children('div').first()
        .children('div[data-value=3]').first().click()
    cy.get('select[name="passengers"]').should('have.value', '3');
  });

  it('should enter departure and return dates', () => {
    cy.get('.datepicker2.blur.hasDatepicker').first().click();
    cy.get('.ui-datepicker-calendar').get('tr').last()
        .children('td').first()
        .children('a').should('have.text', '27')
        .click();
    cy.get('input[name="date_there"]').should('have.value', '27.05.2024');

    cy.get('.datepicker2.blur.hasDatepicker').last().click();
    cy.get('.ui-datepicker-calendar').get('tr').last()
        .children('td').first().next()
        .children('a').should('have.text', '28')
        .click();
    cy.get('input[name="date_return"]').should('have.value', '28.05.2024');
  });

  it('should trigger search on clicking the search button', () => {
    cy.get('.selectize-input.items.not-full.has-options').first().click().next()
        .children('div').first()
        .children('div[data-value=36]').first().click();

    cy.get('.selectize-input.items.not-full.has-options').first().click().next()
        .children('div').first()
        .children('div[data-value=123]').first().click()

    cy.get('.datepicker2.blur.hasDatepicker').first().click();
    cy.get('.ui-datepicker-calendar').get('tr').last()
        .children('td').first()
        .children('a').click();

    cy.get('.submit-box').first()
        .children('a').should('have.text', 'SEARCH')
        .click();

    cy.get('.nag').children('h2')
        .should('have.text', 'BOGUCHWAŁA ODR - GLIWICE Centrum Przesiadkowe ul. Składowa 8a Stanowisko nr 23');
  });

  it('should open login form', () => {
    cy.get('.user').children('a')
        .should('have.text', 'Log in').click();

    cy.url().should('eq', 'https://neobus.pl/en/customer-panel')
    cy.get('.field.form-group').its('length').should('eq', 2)
    cy.get('.field.form-group').first().children('label').should('have.text', 'user');
    cy.get('.field.form-group').last().children('label').should('have.text', 'password');
  });

  it('should display the contact form', () => {
    cy.get('.box.col-xs-3').children('ul')
        .children('li').first()
        .children('a').click();

    cy.url().should('eq', 'https://neobus.pl/en/contact');
    cy.get('.xhtml_content').children('h1').should('have.text', 'Contact');
  });

})