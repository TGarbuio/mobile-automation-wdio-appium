/**
 * Base Page Object
 * Contém métodos comuns para todos os Page Objects
 */
class BasePage {
    /**
     * Aguarda até que um elemento seja exibido
     * @param {WebdriverIO.Element} element - Elemento a ser aguardado
     * @param {number} timeout - Tempo máximo de espera em ms
     */
    async waitForElement(element, timeout = 10000) {
        await element.waitForDisplayed({ timeout });
    }

    /**
     * Clica em um elemento após aguardar que esteja disponível
     * @param {WebdriverIO.Element} element - Elemento a ser clicado
     */
    async clickElement(element) {
        await this.waitForElement(element);
        await element.click();
    }

    /**
     * Define o valor de um campo de texto
     * @param {WebdriverIO.Element} element - Campo de texto
     * @param {string} value - Valor a ser inserido
     */
    async setValue(element, value) {
        await this.waitForElement(element);
        await element.clearValue();
        await element.setValue(value);
    }

    /**
     * Obtém o texto de um elemento
     * @param {WebdriverIO.Element} element - Elemento
     * @returns {Promise<string>} Texto do elemento
     */
    async getText(element) {
        await this.waitForElement(element);
        return await element.getText();
    }

    /**
     * Verifica se um elemento está visível
     * @param {WebdriverIO.Element} element - Elemento
     * @returns {Promise<boolean>}
     */
    async isElementDisplayed(element) {
        try {
            return await element.isDisplayed();
        } catch (error) {
            return false;
        }
    }

    /**
     * Scroll até um elemento
     * @param {WebdriverIO.Element} element - Elemento de destino
     */
    async scrollToElement(element) {
        await element.scrollIntoView();
    }

    /**
     * Esconde o teclado
     */
    async hideKeyboard() {
        try {
            await driver.hideKeyboard();
        } catch (error) {
            // Teclado já está escondido
        }
    }
}

module.exports = new BasePage();
