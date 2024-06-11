class CheckoutPage {
    elements = {
        title: () => cy.get('span.title[data-test="title"]'),
        firstNameInput: () => cy.get('[data-test="firstName"]'),
        lastNameInput: () => cy.get('[data-test="lastName"]'),
        postalCodeInput: () => cy.get('[data-test="postalCode"]'),
        continueButton: () => cy.get('[data-test="continue"]'),
        cancelButton: () => cy.get('[data-test="cancel"]'),
        errorMessage: () => cy.get('[data-test="error"]')
    }

    getSectionTitle() {
        return this.elements.title()
    }

    typeFirstNameInput(firstName) {
        firstName && this.elements.firstNameInput().type(firstName);
        return this;
    }
    
    typeLastNameInput(lastName) {
        lastName && this.elements.lastNameInput().type(lastName);
        return this;
    }
    
    typePostalCodeInput(postalCode) {
        postalCode && this.elements.postalCodeInput().type(postalCode);
        return this;
    }

    continueButton() {
        return this.elements.continueButton();
    }

    cancelButton() {
        return this.elements.cancelButton();
    }

    clickContinueButton() {
        this.continueButton.click();
    }

    clickCancelButton() {
        this.cancelButton.click();
    }

    fillOutForm(userData) {
        this.typeFirstNameInput(userData.firstName);
        this.typeLastNameInput(userData.lastName);
        this.typePostalCodeInput(userData.postalCode);
    }

    getErrorMessage(){
        return this.elements.errorMessage()
    }
}

module.exports = new CheckoutPage();
