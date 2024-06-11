import CheckoutPage from "../../pages/saucedemo/CheckoutPage"
import CartPage from "../../pages/saucedemo/CartPage"
import LoginPage from "../../pages/saucedemo/LoginPage"
import InventoryPage from "../../pages/saucedemo/InventoryPage"

describe('Checkout Page', () => {
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
    });

    it('Validate the correct title of the section',  function()  {
        CheckoutPage.getSectionTitle().should('have.text', 'Checkout: Your Information');
    });

    it('Fill out the form fields with valid data', function() {
        CheckoutPage.fillOutForm(this.userData.validUser);
        CheckoutPage.continueButton().click();
        cy.url().should('include', '/checkout-step-two.html');
    });

    it('Fill out the form fields without first name', function() {
        CheckoutPage.fillOutForm(this.userData.missingFirstName);
        CheckoutPage.continueButton().click();
        CheckoutPage.getErrorMessage(this.errorMessages.firstNameRequired);  
    });

    it('Fill out the form fields without last name', function() {
        CheckoutPage.fillOutForm(this.userData.missingLastName);
        CheckoutPage.continueButton().click();
        CheckoutPage.getErrorMessage(this.errorMessages.lastNameRequired);  
    });

    it('Fill out the form fields without postal code', function() {
        CheckoutPage.fillOutForm(this.userData.missingPostalCode);
        CheckoutPage.continueButton().click();
        CheckoutPage.getErrorMessage(this.errorMessages.postalCodeRequired);  
    });

    it('Clicking the "Cancel" button redirects to the cart page', () => {
        CheckoutPage.cancelButton().click();
        cy.url().should('include', '/cart.html');
    });
    
});
