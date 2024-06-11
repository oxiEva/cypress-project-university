import LoginPage from "../../pages/saucedemo/LoginPage"

describe('Login to Swag Labs', () => {
    beforeEach(function() {
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;
        })
        cy.fixture('errorMessages').as('errorMessages')
    });

    it('Validate landing URL and page title', () => {
        cy.url().should('eq','https://www.saucedemo.com/');
        cy.title().should('eq', 'Swag Labs');
    });
    
    it('Validate a user can log into the page with valid credentials', function() {
        LoginPage.login(this.credentials.standardUser, this.credentials.password);
        cy.url().should('include', '/inventory.html');
        cy.title().should('eq', 'Swag Labs');
    });

    it('Validate a user can not log into the page with invalid credentials', function() {
        LoginPage.login(this.credentials.invalidUser, this.credentials.invalidPassword);
        LoginPage.getErrorMessage().should('be.visible')
            .and('contain', this.errorMessages.notMatch);
        cy.get('[data-test="error-button"]').should('be.visible').click();
        cy.get('[data-test="error-button"]').should('not.exist');
    });

    it('Validate a user can not log into the page without credentials', function() {
        LoginPage.login('', '');
        LoginPage.getErrorMessage().should('be.visible')
            .and('contain', this.errorMessages.usernameRequired);
    });

    it('Validate a user can not log into the page without a username', function() {
        LoginPage.login('', this.credentials.invalidPassword);
        LoginPage.getErrorMessage().should('be.visible')
            .and('contain', this.errorMessages.usernameRequired);
    });

    it('Validate a user can not log into the page without a password', function() {
        LoginPage.login(this.credentials.standardUser, '');
        LoginPage.getErrorMessage().should('be.visible')
            .and('contain', this.errorMessages.passwordRequired);
    });

    it('Validate a user locked out can not log into the page with valid credentials', function() {
        LoginPage.login(this.credentials.lockedOutUser, this.credentials.password);
        LoginPage.getErrorMessage().should('be.visible')
            .and('contain', this.errorMessages.lockedUser);
    });
})
