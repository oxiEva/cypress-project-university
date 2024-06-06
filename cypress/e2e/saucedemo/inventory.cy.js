const loginPage = require("../../pages/saucedemo/login")

describe('Inventory in Swag Labs', () => {

    beforeEach(function(){
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;

            loginPage.login(this.credentials.standardUser, this.credentials.password);
        })
        
    });

    it('Validate the number of results', function() {
        cy.get('[data-test="inventory-item"]').should('have.length', 6);
    });

    it('Cart value increase', function() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length', 1);
    });

    it('See Remove product button', function() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
            .and('contain', 'Remove');
    });

    it('Remove product', function() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
            .and('contain', 'Remove');
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('not.be.exist');
    });
})
