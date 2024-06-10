import loginPage from "../../pages/saucedemo/loginPage";
import storePage from "../../pages/saucedemo/inventoryPage";

describe('Inventory in Swag Labs', () => {
    beforeEach(function() {
        cy.intercept('POST', 'https://events.backtrace.io/api/**', {});
        cy.visit('/');
        cy.fixture('userCredentials').then(credentials => {
            this.credentials = credentials;
            loginPage.login(this.credentials.standardUser, this.credentials.password);
        });
        cy.fixture('products').as('products');
    });

    it('Validate the number of results', function() {
        storePage.elements.inventoryItems().should('have.length', 6);
    });

    it('Cart value increases when the user adds the first product in the store', function() {
        storePage.addToCart(0);
        storePage.elements.shoppingCartBadge().should('have.text', '1');
    });

    it('Cart contains three products when the user adds three products', function() {
        storePage.addToCart(0).addToCart(1).addToCart(4);
        storePage.elements.shoppingCartBadge().should('have.text', '3');
    });

    it('See Remove product button', function() {
        storePage.addToCart(0);
        storePage.elements.shoppingCartBadge().should('have.text', '1');
        storePage.elements.removeButton(0).should('be.visible').and('contain', 'Remove');
    });

    it('Remove product', function() {
        storePage.addToCart(1);
        storePage.elements.shoppingCartBadge().should('have.text', '1');
        storePage.removeFromCart(1);
        storePage.elements.shoppingCartBadge().should('not.exist');
    });

    it('Validate the hamburger menu and its items', function() {
        storePage.elements.hamburgerButton().should('be.visible');
        storePage.clickHamburgerButton();
        const expectedMenuItems = ['All Items', 'About', 'Logout', 'Reset App State'];
        storePage.elements.menuItems().should('have.length', expectedMenuItems.length)
            .each((item, index) => {
                cy.wrap(item).should('contain.text', expectedMenuItems[index]);
            });
    });

    it('Validate product details', function() {
        cy.fixture('products').then((products) => {
            products.forEach((product, index) => {
                storePage.elements.productName(index).should('contain.text', product.name);
                storePage.elements.productDescription(index).should('contain.text', product.description);
                storePage.elements.productPrice(index).should('contain.text', `$${product.price}`);
            });
        });
    });

    it('Verify sorting functionality', function() {
        cy.get('@products').then((products) => {
            // Verify default sorting (A to Z)
            storePage.getProductNames().then($items => {
                const names = [...$items].map(el => el.innerText);
                const sortedNames = products.map(p => p.name).sort();
                expect(names).to.deep.equal(sortedNames);
            });

            // Sort Z to A
            storePage.selectSortOption('za');
            storePage.getProductNames().then($items => {
                const names = [...$items].map(el => el.innerText);
                const sortedNames = products.map(p => p.name).sort().reverse();
                expect(names).to.deep.equal(sortedNames);
            });

            // Sort by price low to high
            storePage.selectSortOption('lohi');
            storePage.elements.inventoryItems().then($items => {
                const prices = [...$items].map(el => parseFloat(el.querySelector('.inventory_item_price').innerText.replace('$', '')));
                const sortedPrices = products.map(p => p.price).sort((a, b) => a - b);
                expect(prices).to.deep.equal(sortedPrices);
            });

            // Sort by price high to low
            storePage.selectSortOption('hilo');
            storePage.elements.inventoryItems().then($items => {
                const prices = [...$items].map(el => parseFloat(el.querySelector('.inventory_item_price').innerText.replace('$', '')));
                const sortedPrices = products.map(p => p.price).sort((a, b) => b - a);
                expect(prices).to.deep.equal(sortedPrices);
            });
        });
    });
});
