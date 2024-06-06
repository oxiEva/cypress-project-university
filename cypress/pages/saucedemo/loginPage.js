class LoginPage {
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]')
    }

    typeUsername(username) {
        username && this.elements.usernameInput().type(username);
        return this;
    }
    
    typePassword(password) {
        password && this.elements.passwordInput().type(password);
        return this;
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    login(username, password) {
        this.typeUsername(username);
        this.typePassword(password);
        this.clickLogin();
    }
}

module.exports = new LoginPage();
