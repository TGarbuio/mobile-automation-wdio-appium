const FormsPage = require('../pageobjects/forms.page');
const allure = require('@wdio/allure-reporter').default;

describe('Forms - Testes de Formulários', () => {
    beforeEach(async () => {
        allure.addFeature('Forms');
        await FormsPage.goToFormsTab();
    });

    it('CT08 - Deve preencher campo de texto e verificar resultado', async () => {
        allure.addSeverity('critical');
        allure.addTestId('CT08');
        allure.addDescription('Valida preenchimento de campo de texto');

        const testText = 'WebdriverIO Testing';
        await FormsPage.fillInputField(testText);
        
        const result = await FormsPage.getInputResult();
        expect(result).to.equal(testText);
    });

    it('CT09 - Deve alternar o switch e verificar mudança de estado', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT09');
        allure.addDescription('Valida alteração de estado do switch');

        // Obtém o estado inicial
        const initialState = await FormsPage.getSwitchResult();
        
        // Alterna o switch
        await FormsPage.toggleSwitch();
        
        // Verifica que o estado mudou
        const newState = await FormsPage.getSwitchResult();
        expect(newState).to.not.equal(initialState);
    });

    it('CT10 - Deve selecionar opção no dropdown', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT10');
        allure.addDescription('Valida seleção de opção em dropdown');

        await FormsPage.selectDropdownOption('webdriver.io is awesome');
        
        const dropdownValue = await FormsPage.getDropdownValue();
        expect(dropdownValue).to.include('webdriver.io is awesome');
    });
});
