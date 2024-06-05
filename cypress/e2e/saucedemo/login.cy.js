describe('Login to Swag Labs', () => {
    beforeEach(function() {
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;
        })
    });

    it('Validate landing URL and page title', () => {
        cy.url().should('eq','https://www.saucedemo.com/');
        cy.title().should('eq', 'Swag Labs');
    });
    
    it('Validate a user can log into the page with valid credentials', function() {
        cy.get('[data-test="username"]').type(this.credentials.standardUser);
        cy.get('[data-test="password"]').type(this.credentials.password);
        cy.get('[data-test="login-button"]').click();
        cy.url().should('include', '/inventory.html');
        cy.title().should('eq', 'Swag Labs');
    });

    it('Validate a user can not log into the page with invalid credentials', function() {
        cy.get('[data-test="username"]').type(this.credentials.invalidUser);
        cy.get('[data-test="password"]').type(this.credentials.invalidPassword);
        cy.get('[data-test="login-button"]').click();
        cy.get('.error-message-container').should('be.visible')
          .and('contain', 'Epic sadface: Username and password do not match any user in this service');
      });
})
