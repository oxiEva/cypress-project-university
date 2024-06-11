class CheckoutStepTwoPage {
    elements = {
        title: () => cy.get('span.title[data-test="title"]'),
        cancelButton: () => cy.get('[data-test="cancel"]'),
        finishButton: () => cy.get('[data-test="finish"]'),
        itemPrices: () => cy.get('.inventory_item_price'),
        tax: () => cy.get('.summary_tax_label'),
        total: () => cy.get('.summary_total_label')
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

    getItemPrices() {
        return new Cypress.Promise((resolve, reject) => {
            const prices = [];
            this.elements.itemPrices().each(($el, index, $list) => {
                prices.push(parseFloat($el.text().replace('$', '')));
                if (index === $list.length - 1) {
                    resolve(prices);
                }
            });
        });
    }

    getTax() {
        return this.elements.tax().invoke('text').then(text => {
            return parseFloat(text.replace('Tax: $', ''));
        });
    }

    getTotal() {
        return this.elements.total().invoke('text').then(text => {
            return parseFloat(text.replace('Total: $', ''));
        });
    }
}

module.exports = new CheckoutStepTwoPage();
