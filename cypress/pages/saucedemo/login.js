class LoginPage {
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]')
    }

    typeUsername(username) {
        this.elements.usernameInput().type(username);
    }

    typePassword(password) {
        this.elements.passwordInput().type(password);
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    login(username, password) {
        if (username) {
            this.typeUsername(username);
        }
        if (password) {
            this.typePassword(password);
        }
        this.clickLogin();
    }
}

module.exports = new LoginPage();
