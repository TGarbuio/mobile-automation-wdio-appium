const BasePage = require('./base.page');

/**
 * Login Page Object
 */
class LoginPage {
    /**
     * Selectores dos elementos da tela de Login
     */
    get loginTab() {
        return $('//*[@content-desc="Login"]');
    }

    get emailInput() {
        return $('//*[@content-desc="input-email"]');
    }

    get passwordInput() {
        return $('//*[@content-desc="input-password"]');
    }

    get loginButton() {
        return $('//*[@content-desc="button-LOGIN"]');
    }

    get signUpTab() {
        return $('//*[@content-desc="button-sign-up-container"]');
    }

    get successMessage() {
        return $('//*[@class="android.widget.TextView" and contains(@text, "You are logged")]');
    }

    get errorMessage() {
        return $('//*[@resource-id="android:id/message"]');
    }

    get okButton() {
        return $('//*[@text="OK"]');
    }

    /**
     * Navega para a aba de Login
     */
    async goToLoginTab() {
        await BasePage.clickElement(this.loginTab);
    }

    /**
     * Realiza o login com email e senha
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     */
    async login(email, password) {
        await this.goToLoginTab();
        await BasePage.setValue(this.emailInput, email);
        await BasePage.setValue(this.passwordInput, password);
        await BasePage.hideKeyboard();
        await BasePage.clickElement(this.loginButton);
    }

    /**
     * Obtém a mensagem de sucesso ou erro exibida
     * @returns {Promise<string>} Mensagem exibida
     */
    async getAlertMessage() {
        await BasePage.waitForElement(this.successMessage);
        return await BasePage.getText(this.successMessage);
    }

    /**
     * Clica no botão OK do alerta
     */
    async dismissAlert() {
        await BasePage.clickElement(this.okButton);
    }

    /**
     * Verifica se o campo de email está visível
     * @returns {Promise<boolean>}
     */
    async isEmailInputDisplayed() {
        return await BasePage.isElementDisplayed(this.emailInput);
    }

    /**
     * Verifica se o botão de login está habilitado
     * @returns {Promise<boolean>}
     */
    async isLoginButtonEnabled() {
        await BasePage.waitForElement(this.loginButton);
        return await this.loginButton.isEnabled();
    }

    /**
     * Navega para a aba de Sign Up
     */
    async goToSignUpTab() {
        await BasePage.clickElement(this.signUpTab);
    }
}

module.exports = new LoginPage();
