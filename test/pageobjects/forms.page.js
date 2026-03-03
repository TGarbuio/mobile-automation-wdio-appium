const BasePage = require('./base.page');

/**
 * Forms Page Object
 */
class FormsPage {
    /**
     * Selectores dos elementos da tela de Forms
     */
    get formsTab() {
        return $('//*[@content-desc="Forms"]');
    }

    get inputField() {
        return $('//*[@content-desc="text-input"]');
    }

    get inputResult() {
        return $('//*[@content-desc="input-text-result"]');
    }

    get switchElement() {
        return $('//*[@content-desc="switch"]');
    }

    get switchResult() {
        return $('//*[@content-desc="switch-text"]');
    }

    get dropdownButton() {
        return $('//*[@content-desc="Dropdown"]');
    }

    get activeButton() {
        return $('//*[@content-desc="button-Active"]');
    }

    get inactiveButton() {
        return $('//*[@content-desc="button-Inactive"]');
    }

    /**
     * Navega para a aba Forms
     */
    async goToFormsTab() {
        await BasePage.clickElement(this.formsTab);
    }

    /**
     * Preenche o campo de input de texto
     * @param {string} text - Texto a ser inserido
     */
    async fillInputField(text) {
        await BasePage.setValue(this.inputField, text);
        await BasePage.hideKeyboard();
    }

    /**
     * Obtém o resultado do input de texto
     * @returns {Promise<string>} Texto exibido no resultado
     */
    async getInputResult() {
        return await BasePage.getText(this.inputResult);
    }

    /**
     * Alterna o switch
     */
    async toggleSwitch() {
        await BasePage.clickElement(this.switchElement);
    }

    /**
     * Obtém o texto do resultado do switch
     * @returns {Promise<string>}
     */
    async getSwitchResult() {
        return await BasePage.getText(this.switchResult);
    }

    /**
     * Clica no botão de dropdown
     */
    async clickDropdown() {
        await BasePage.clickElement(this.dropdownButton);
    }

    /**
     * Seleciona uma opção do dropdown
     * @param {string} option - Opção a ser selecionada (ex: 'webdriver.io is awesome')
     */
    async selectDropdownOption(option) {
        await this.clickDropdown();
        const optionElement = await $(`//*[@text="${option}"]`);
        await BasePage.clickElement(optionElement);
    }

    /**
     * Clica no botão Active
     */
    async clickActiveButton() {
        await BasePage.scrollToElement(this.activeButton);
        await BasePage.clickElement(this.activeButton);
    }

    /**
     * Verifica se o campo de input está visível
     * @returns {Promise<boolean>}
     */
    async isInputFieldDisplayed() {
        return await BasePage.isElementDisplayed(this.inputField);
    }

    /**
     * Obtém o valor atual do dropdown
     * @returns {Promise<string>}
     */
    async getDropdownValue() {
        return await BasePage.getText(this.dropdownButton);
    }
}

module.exports = new FormsPage();
