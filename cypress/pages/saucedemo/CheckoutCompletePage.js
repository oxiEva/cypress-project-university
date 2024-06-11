class CheckoutCompletePage {
    elements = {
        sectionTitle: () => cy.get('span.title'),
        thankYouMessage: () => cy.get('.complete-header'),
        orderDispatchedMessage: () => cy.get('.complete-text'),
        backHomeButton: () => cy.get('[data-test="back-to-products"]')
    }

    getSectionTitle() {
        return this.elements.sectionTitle();
    }

    getThankYouMessage() {
        return this.elements.thankYouMessage();
    }

    getOrderDispatchedMessage() {
        return this.elements.orderDispatchedMessage();
    }

    clickBackHomeButton() {
        this.elements.backHomeButton().click();
    }
}

module.exports = new CheckoutCompletePage();
