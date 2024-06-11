class InventoryPage {
    elements = {
        title: () => cy.get('.app_logo'),
        inventoryItems: () => cy.get('[data-test="inventory-item"]'),
        addToCartButton:(index)=> cy.get(`.inventory_item:nth-child(${index + 1}) .btn_inventory`),
        removeButton: (index) => cy.get(`.inventory_item:nth-child(${index + 1}) [data-test^="remove"]`),
        shoppingCartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
        hamburgerButton: () => cy.get('#react-burger-menu-btn'),
        menuItems: () => cy.get('.bm-item-list a'),
        productName: (index) => cy.get(`.inventory_item:nth-child(${index + 1}) .inventory_item_name`),
        productDescription: (index) => cy.get(`.inventory_item:nth-child(${index + 1}) .inventory_item_desc`),
        productPrice: (index) => cy.get(`.inventory_item:nth-child(${index + 1}) .inventory_item_price`),
        sortDropdown: () => cy.get('.product_sort_container'),
        cartBadge: () => cy.get('.shopping_cart_badge'),
        cartIcon: () => cy.get('.shopping_cart_link'),
        errorMessageContainer: () => cy.get('.error-message-container'),
        errorButton: () => cy.get('[data-test="error-button"]')
    }

    getPageTitle() {
        return this.elements.title()
    }

    addToCart(index) {
        this.elements.addToCartButton(index).click();
        return this;
    }

    removeFromCart(index) {
        this.elements.removeButton(index).click();
        return this;
    }

    goToCart() {
        this.elements.cartIcon().click();
    }

    clickHamburgerButton() {
        cy.wait(1000);
        this.elements.hamburgerButton().click();
    }

    dismissErrorMessage() {
        this.elements.errorButton().click();
    }

    selectSortOption(optionValue) {
        this.elements.sortDropdown().select(optionValue);
    }

    getProductNames() {
        return this.elements.inventoryItems().find('.inventory_item_name');
    }
}

module.exports = new InventoryPage();
