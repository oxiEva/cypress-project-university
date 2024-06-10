class CartPage {
    elements = {
        title: () => cy.get('span.title[data-test="title"]'),
        cartItems: () => cy.get('.cart_item'),
        cartItemName: (index) => cy.get(`.cart_item:nth-child(${index + 1}) .inventory_item_name`),
        cartItemDescription: (index) => cy.get(`.cart_item:eq(${index}) .inventory_item_desc`),
        cartItemRemoveButton: (index) => cy.get(`.cart_item:eq(${index}) .cart_button`),
        checkoutButton: () => cy.get('[data-test="checkout"]'),
        continueShoppingButton: () => cy.get('[data-test="continue-shopping"]')
    }

    getSectionTitle() {
        return this.elements.title()
    }

    checkoutButton() {
        return this.elements.checkoutButton();
    }

    continueShoppingButton() {
        return this.elements.continueShoppingButton();
    }

    countCartItems() {
        return this.elements.cartItems().its('length');
    }

    getCartItemDescription(index) {
        return this.elements.cartItemDescription(index);
    }

    getCartItemRemoveButton(index) {
        return this.elements.cartItemRemoveButton(index);
    }
    
}

module.exports = new CartPage();
