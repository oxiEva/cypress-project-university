describe('Inventory in Swag Labs', () => {

    beforeEach(() => {
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();
    });


    it('Validate the number of results', () => {
        cy.get('.inventory_item').should('have.length', 6);
    });

    it('Cart value increase', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length',1 );
    });
    
    it('See Remove product button', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length',1 );
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
            .and('contain', 'Remove');
    });

    it('Remove product ', () => {
        cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
        cy.get('[data-test="shopping-cart-badge"]').should('have.length',1 );
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').should('be.visible')
            .and('contain', 'Remove');
        cy.get('[data-test="remove-sauce-labs-bolt-t-shirt"]').click();    
        cy.get('[data-test="shopping-cart-badge"]').should('have.length',0 );
    });
})
