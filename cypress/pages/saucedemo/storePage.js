class StorePage {
    elements = {
        inventoryItems: () => cy.get('[data-test="inventory-item"]'),
        addToCartButton: (productName) => cy.get(`[data-test="add-to-cart-${productName}"]`),
        removeButton: (productName) => cy.get(`[data-test="remove-${productName}"]`),
        shoppingCartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
        errorMessageContainer: () => cy.get('.error-message-container'),
        errorButton: () => cy.get('[data-test="error-button"]')
    }

    addToCart(productName) {
        this.elements.addToCartButton(productName).click();
        return this;
    }

    removeFromCart(productName) {
        this.elements.removeButton(productName).click();
        return this;
    }

    verifyCartItemCount(expectedCount) {
        this.elements.shoppingCartBadge().should('have.text', expectedCount);
    }

    verifyErrorMessage(expectedMessage) {
        this.elements.errorMessageContainer().should('be.visible')
            .and('contain', expectedMessage);
    }

    dismissErrorMessage() {
        this.elements.errorButton().click();
    }

    validateInventoryItemCount(expectedCount) {
        this.elements.inventoryItems().should('have.length', expectedCount);
    }
}

module.exports = new StorePage();
