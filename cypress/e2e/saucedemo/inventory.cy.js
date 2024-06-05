describe('Inventory in Swag Labs', () => {

    beforeEach(function(){
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;

            cy.get('[data-test="username"]').type(this.credentials.standardUser);
            cy.get('[data-test="password"]').type(this.credentials.password);
            cy.get('[data-test="login-button"]').click();
        })
        
    });

    it('Validate the number of results', function() {
        cy.get('.inventory_item').should('have.length', 6);
    });

    it('Cart value increase', function() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length', 1);
    });

    it('See Remove product button', function() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length', 1);
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
            .and('contain', 'Remove');
    });

    it('Remove product', function() {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length', 1);
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
            .and('contain', 'Remove');
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length', 0);
    });
})
