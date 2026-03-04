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
        return $('//*[@class="android.widget.TextView" and (contains(@text, "Success") or contains(@text, "Signed"))]');
    }

    get errorMessage() {
        return $('//*[@class="android.widget.TextView" and (contains(@text, "not match") or contains(@text, "Error") or contains(@text, "error"))]');
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
            await browser.pause(500);
        } catch (e) {
            // Se já estams na tela de login, continuar
        }
        
        // Tentar encontrar o botão de signup usando múltiplas estratégias
        let signUpButtonFound = false;
        const signUpSelectors = [
            $('//*[@content-desc="sign-up-button"]'),
            $('//*[@text="Sign up"]'),
            $('//android.widget.Button[contains(@text, "Sign")]'),
            $('//*[contains(@text, "Sign up")]')
        ];
        
        for (const selector of signUpSelectors) {
            try {
                await BasePage.waitForElement(selector, 5000);
                await BasePage.clickElement(selector);
                signUpButtonFound = true;
                break;
            } catch (e) {
                // Tentar o próximo seletor
                continue;
            }
        }
        
        if (!signUpButtonFound) {
            throw new Error('Sign up button not found with any selector');
        }
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
        let messageText = '';
        
        try {
            // Primeiro tenta encontrar a mensagem de sucesso
            const successVisible = await BasePage.isElementDisplayed(this.successMessage);
            if (successVisible) {
                messageText = await BasePage.getText(this.successMessage);
                return messageText;
            }
        } catch (e) {
            // Se não encontrou, tenta a mensagem de erro
        }
        
        try {
            // Se não achou sucesso, tenta erro
            const errorVisible = await BasePage.isElementDisplayed(this.errorMessage);
            if (errorVisible) {
                messageText = await BasePage.getText(this.errorMessage);
                return messageText;
            }
        } catch (e) {
            // Se não achou nenhuma das duas, tenta um genérico
        }
        
        // Última tentativa: buscar qualquer TextView
        try {
            const genericMessage = $('//*[@class="android.widget.TextView"]');
            messageText = await BasePage.getText(genericMessage);
            return messageText;
        } catch (e) {
            throw new Error('Could not find any alert message on screen');
        }
    }

    /**
     * Clica no botão OK do alerta ou fecha a tela
     */
    async dismissAlert() {
        try {
            // Tentar clicar no botão OK
            const okButtonVisible = await BasePage.isElementDisplayed(this.okButton);
            if (okButtonVisible) {
                await BasePage.clickElement(this.okButton);
                return;
            }
        } catch (e) {
            // Se não achou OK button, tenta outras opções
        }
        
        try {
            // Tentar voltar com o botão de back do sistema
            await browser.back();
        } catch (e) {
            // Ignora se voltar não funcionar
        }
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
