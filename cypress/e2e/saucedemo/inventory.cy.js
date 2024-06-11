import LoginPage from "../../pages/saucedemo/LoginPage";
import InventoryPage from "../../pages/saucedemo/InventoryPage";

describe('Inventory in Swag Labs', () => {
    beforeEach(function() {
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;
            LoginPage.login(this.credentials.standardUser, this.credentials.password);
        });
        cy.fixture('products').as('products');
    });

    it('Validate the number of results', function() {
        InventoryPage.elements.inventoryItems().should('have.length', 6);
    });

    it('Cart value increases when the user adds the first product in the store', function() {
        InventoryPage.addToCart(0);
        InventoryPage.elements.shoppingCartBadge().should('have.text', '1');
    });

    it('Cart contains three products when the user adds three products', function() {
        InventoryPage.addToCart(0).addToCart(1).addToCart(4);
        InventoryPage.elements.shoppingCartBadge().should('have.text', '3');
    });

    it('See Remove product button', function() {
        InventoryPage.addToCart(0);
        InventoryPage.elements.shoppingCartBadge().should('have.text', '1');
        InventoryPage.elements.removeButton(0).should('be.visible').and('contain', 'Remove');
    });

    it('Remove product', function() {
        InventoryPage.addToCart(1);
        InventoryPage.elements.shoppingCartBadge().should('have.text', '1');
        InventoryPage.removeFromCart(1);
        InventoryPage.elements.shoppingCartBadge().should('not.exist');
    });

    it('Validate the hamburger menu and its items', function() {
        InventoryPage.elements.hamburgerButton().should('be.visible');
        InventoryPage.clickHamburgerButton();
        const expectedMenuItems = ['All Items', 'About', 'Logout', 'Reset App State'];
        InventoryPage.elements.menuItems().should('have.length', expectedMenuItems.length)
            .each((item, index) => {
                cy.wrap(item).should('contain.text', expectedMenuItems[index]);
            });
    });

    it('Validate product details', function() {
        cy.fixture('products').then((products) => {
            products.forEach((product, index) => {
                InventoryPage.elements.productName(index).should('contain.text', product.name);
                InventoryPage.elements.productDescription(index).should('contain.text', product.description);
                InventoryPage.elements.productPrice(index).should('contain.text', `$${product.price}`);
            });
        });
    });

    it('Verify sorting functionality', function() {
        cy.get('@products').then((products) => {
            // Verify default sorting (A to Z)
            InventoryPage.getProductNames().then($items => {
                const names = [...$items].map(el => el.innerText);
                const sortedNames = products.map(p => p.name).sort();
                expect(names).to.deep.equal(sortedNames);
            });

            // Sort Z to A
            InventoryPage.selectSortOption('za');
            InventoryPage.getProductNames().then($items => {
                const names = [...$items].map(el => el.innerText);
                const sortedNames = products.map(p => p.name).sort().reverse();
                expect(names).to.deep.equal(sortedNames);
            });

            // Sort by price low to high
            InventoryPage.selectSortOption('lohi');
            InventoryPage.elements.inventoryItems().then($items => {
                const prices = [...$items].map(el => parseFloat(el.querySelector('.inventory_item_price').innerText.replace('$', '')));
                const sortedPrices = products.map(p => p.price).sort((a, b) => a - b);
                expect(prices).to.deep.equal(sortedPrices);
            });

            // Sort by price high to low
            InventoryPage.selectSortOption('hilo');
            InventoryPage.elements.inventoryItems().then($items => {
                const prices = [...$items].map(el => parseFloat(el.querySelector('.inventory_item_price').innerText.replace('$', '')));
                const sortedPrices = products.map(p => p.price).sort((a, b) => b - a);
                expect(prices).to.deep.equal(sortedPrices);
            });
        });
    });
});
