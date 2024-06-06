import loginPage from "../../pages/saucedemo/loginPage"
import storePage from "../../pages/saucedemo/storePage"

describe('Inventory in Swag Labs', () => {
    beforeEach(function() {
        // Intercept and stub XHR requests to events.backtrace.io
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;
            loginPage.login(this.credentials.standardUser, this.credentials.password);
        });
    });

    it('Validate the number of results', function() {
        storePage.validateInventoryItemCount(6);
    });

    it('Cart value increase', function() {
        storePage.addToCart('sauce-labs-bolt-t-shirt');
        storePage.verifyCartItemCount('1');
    });

    it('Cart value increase with different products', function() {
        storePage.addToCart('sauce-labs-bolt-t-shirt')
         .addToCart('sauce-labs-backpack')
         .addToCart('sauce-labs-onesie');
        storePage.verifyCartItemCount('3');
    });

    it('See Remove product button', function() {
        storePage.addToCart('sauce-labs-bolt-t-shirt');
        storePage.verifyCartItemCount('1');
        storePage.elements.removeButton('sauce-labs-bolt-t-shirt').should('be.visible')
            .and('contain', 'Remove');
    });

    it('Remove product', function() {
        storePage.addToCart('sauce-labs-bolt-t-shirt');
        storePage.verifyCartItemCount('1');
        storePage.elements.removeButton('sauce-labs-bolt-t-shirt').should('be.visible')
            .and('contain', 'Remove');
        storePage.removeFromCart('sauce-labs-bolt-t-shirt');
        storePage.elements.shoppingCartBadge().should('not.exist');
    });
});
