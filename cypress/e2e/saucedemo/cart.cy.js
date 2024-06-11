import CartPage from "../../pages/saucedemo/CartPage"
import LoginPage from "../../pages/saucedemo/LoginPage"
import InventoryPage from "../../pages/saucedemo/InventoryPage"

describe('Cart Page', () => {
    beforeEach( function() {
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            LoginPage.login(credentials.standardUser, credentials.password);
        });

        cy.fixture('products').as('products');

        InventoryPage.addToCart(0);
        InventoryPage.addToCart(1);
        InventoryPage.goToCart();
    });

    it('Validate the correct title of the section',  function()  {
        CartPage.getSectionTitle().should('contain.text', 'Your Cart');
    });

    it('Validate "Continue Shopping" button is working', function() {
        CartPage.continueShoppingButton().should('exist');
        CartPage.continueShoppingButton().click();
        cy.url().should('include', '/inventory.html');
    });

    it('Validate "Checkout" button redirects to checkout', function(){
        CartPage.checkoutButton().should('exist');
        CartPage.checkoutButton().click();
        cy.url().should('include', '/checkout-step-one.html');
    });
  
    it('Validate cart items with descriptions and remove buttons are displayed', function() {
        cy.fixture('products').then(products => {
            CartPage.countCartItems().then(cartItemCount => {
                cy.wrap(Array.from({ length: cartItemCount })).each((_, index) => {
                    const product = products[index];
                    CartPage.getCartItemDescription(index).should('exist').and('contain.text', product.description);
                    CartPage.getCartItemRemoveButton(index).should('exist');
                });
            });;
        });
    });

    it('Validate cart item is removed', function() {
        CartPage.countCartItems().then(initialCount => {
            CartPage.getCartItemRemoveButton(0).click();
            CartPage.countCartItems().should('eq', initialCount - 1);
        });
    });

});
