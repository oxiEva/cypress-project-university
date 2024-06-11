import CheckoutStepTwoPage from "../../pages/saucedemo/CheckoutStepTwoPage"
import CheckoutPage from "../../pages/saucedemo/CheckoutPage"
import CartPage from "../../pages/saucedemo/CartPage"
import LoginPage from "../../pages/saucedemo/LoginPage"
import InventoryPage from "../../pages/saucedemo/InventoryPage"

describe('Checkout Step two Page', () => {
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
    });

    it('Validate the correct title of the section',  function()  {
        CheckoutStepTwoPage.getSectionTitle().should('have.text', 'Checkout: Overview');
    });

    it('Clicking the "Cancel" button redirects to the inventory page', () => {
        CheckoutStepTwoPage.cancelButton().click();
        cy.url().should('include', '/inventory.html');
    });

    it('Clicking the "Finish" button redirects to the cart page', () => {
        CheckoutStepTwoPage.finishButton().click();
        cy.url().should('include', '/checkout-complete.html');
    });
    
});
