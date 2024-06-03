describe('Login to Swag Labs', () => {
    const BASE_URL = 'https://www.saucedemo.com/';

    beforeEach(() => {
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit(BASE_URL);
    });

    it('Validate landing URL and page title', () => {
        cy.url().should('eq',BASE_URL);
        cy.title().should('eq', 'Swag Labs');
    });
    
    it('Validate a user can log into the page with valid credentials', () => {
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
        cy.title().should('eq', 'Swag Labs');
    });

    it('Validate a user can not log into the page with invalid credentials', () => {
        cy.get('[data-test="username"]').type('invalid_user');
        cy.get('[data-test="password"]').type('invalid_password');
        cy.get('[data-test="login-button"]').click();
        cy.get('.error-message-container').should('be.visible')
          .and('contain', 'Epic sadface: Username and password do not match any user in this service');
      });
})
