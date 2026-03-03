const BasePage = require('./base.page');

/**
 * Sign Up Page Object
 */
class SignUpPage {
    /**
     * Selectores dos elementos da tela de Sign Up
     */
    get signUpTab() {
        return $('//*[@content-desc="button-sign-up-container"]');
    }

    get emailInput() {
        return $('//*[@content-desc="input-email"]');
    }

    get passwordInput() {
        return $('//*[@content-desc="input-password"]');
    }

    get repeatPasswordInput() {
        return $('//*[@content-desc="input-repeat-password"]');
    }

    get signUpButton() {
        return $('//*[@content-desc="button-SIGN UP"]');
    }

    get successMessage() {
        return $('//*[@class="android.widget.TextView" and contains(@text, "Success")]');
    }

    get okButton() {
        return $('//*[@text="OK"]');
    }

    /**
     * Navega para a aba de Sign Up
     */
    async goToSignUpTab() {
        // Na tela inicial, clicar no Login tab (que também dá acesso ao Sign up)
        const loginTab = $('//*[@content-desc="Login"]');
        try {
            await BasePage.clickElement(loginTab);
        } catch (e) {
            // Se já estams na tela de login, continuar
        }
        
        // Agora clicar no botão "Sign up" dentro da tela de login
        const signUpButton = $('//*[@text="Sign up"]');
        await BasePage.clickElement(signUpButton);
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
