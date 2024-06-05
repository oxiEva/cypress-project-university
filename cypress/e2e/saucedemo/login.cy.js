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
        cy.login(this.credentials.standardUser, this.credentials.password);
        cy.url().should('include', '/inventory.html');
        cy.title().should('eq', 'Swag Labs');
    });

    it('Validate a user can not log into the page with invalid credentials', function() {
        cy.login(this.credentials.invalidUser, this.credentials.invalidPassword);
        cy.get('.error-message-container').should('be.visible')
          .and('contain', 'Epic sadface: Username and password do not match any user in this service');
      });
})
