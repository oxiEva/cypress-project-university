import CheckoutCompletePage from "../../pages/saucedemo/CheckoutCompletePage"
import CheckoutStepTwoPage from "../../pages/saucedemo/CheckoutStepTwoPage"
import CheckoutPage from "../../pages/saucedemo/CheckoutPage"
import CartPage from "../../pages/saucedemo/CartPage"
import LoginPage from "../../pages/saucedemo/LoginPage"
import InventoryPage from "../../pages/saucedemo/InventoryPage"

describe('Checkout Complete Page', () => {
    beforeEach(() => {
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            LoginPage.login(credentials.standardUser, credentials.password);
        });
        cy.fixture('products').as('products');
        cy.fixture('userData').as('userData');
        cy.fixture('errorMessages').as('errorMessages');
        InventoryPage.addToCart(0);
        InventoryPage.addToCart(1);
        InventoryPage.goToCart();
        CartPage.checkoutButton().click();
        cy.get('@userData').then(userData => {
            CheckoutPage.fillOutForm(userData.validUser);
        });
        
        CheckoutPage.continueButton().click();
        CheckoutStepTwoPage.finishButton().click();
    });

    it('Validate the correct title of the section', function() {
        CheckoutCompletePage.getSectionTitle().should('have.text', 'Checkout: Complete!');
    });

    it('Validate the thank you message', function() {
        CheckoutCompletePage.getThankYouMessage().should('have.text', 'Thank you for your order!');
    });

    it('Validate the order dispatched message', function() {
        CheckoutCompletePage.getOrderDispatchedMessage().should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
    });

    it('Clicking the "Back Home" button redirects to the inventory page', function() {
        CheckoutCompletePage.clickBackHomeButton();
        cy.url().should('include', '/inventory.html');
    });
});
