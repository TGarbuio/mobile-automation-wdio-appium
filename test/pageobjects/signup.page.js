const BasePage = require('./base.page');

/**
 * Sign Up Page Object
 */
class SignUpPage {
    /**
     * Selectores dos elementos da tela de Sign Up
     */
    get signUpTab() {
        return $('~Sign up');
    }

    get emailInput() {
        return $('~input-email');
    }

    get passwordInput() {
        return $('~input-password');
    }

    get repeatPasswordInput() {
        return $('~input-repeat-password');
    }

    get signUpButton() {
        return $('~button-SIGN UP');
    }

    get successMessage() {
        return $('//*[@resource-id="android:id/message"]');
    }

    get okButton() {
        return $('//*[@text="OK"]');
    }

    /**
     * Navega para a aba de Sign Up
     */
    async goToSignUpTab() {
        await BasePage.clickElement(this.signUpTab);
    }

    /**
     * Realiza o cadastro de um novo usuário
     * @param {string} email - Email do usuário
     * @param {string} password - Senha do usuário
     * @param {string} repeatPassword - Confirmação da senha
     */
    async signUp(email, password, repeatPassword) {
        await this.goToSignUpTab();
        await BasePage.setValue(this.emailInput, email);
        await BasePage.setValue(this.passwordInput, password);
        await BasePage.setValue(this.repeatPasswordInput, repeatPassword);
        await BasePage.hideKeyboard();
        await BasePage.clickElement(this.signUpButton);
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
     * Verifica se todos os campos obrigatórios estão visíveis
     * @returns {Promise<boolean>}
     */
    async areAllFieldsDisplayed() {
        const emailDisplayed = await BasePage.isElementDisplayed(this.emailInput);
        const passwordDisplayed = await BasePage.isElementDisplayed(this.passwordInput);
        const repeatPasswordDisplayed = await BasePage.isElementDisplayed(this.repeatPasswordInput);
        return emailDisplayed && passwordDisplayed && repeatPasswordDisplayed;
    }
}

module.exports = new SignUpPage();
