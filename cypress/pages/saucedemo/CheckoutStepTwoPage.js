class CheckoutStepTwoPage {
    elements = {
        title: () => cy.get('span.title[data-test="title"]'),
        cancelButton: () => cy.get('[data-test="cancel"]'),
        finishButton: () => cy.get('[data-test="finish"]'),
    }

    getSectionTitle() {
        return this.elements.title()
    }

    cancelButton() {
        return this.elements.cancelButton();
    }

    finishButton() {
        return this.elements.finishButton();
    }
}

module.exports = new CheckoutStepTwoPage();
