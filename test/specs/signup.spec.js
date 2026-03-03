const SignUpPage = require('../pageobjects/signup.page');
const allure = require('@wdio/allure-reporter').default;

describe('Sign Up - Testes de Cadastro', () => {
    beforeEach(async () => {
        allure.addFeature('Sign Up');
    });

    it('CT05 - Deve realizar cadastro com dados válidos', async () => {
        allure.addSeverity('critical');
        allure.addTestId('CT05');
        allure.addDescription('Valida o cadastro de novo usuário com dados válidos');

        await SignUpPage.signUp('newuser@example.com', 'Test@123', 'Test@123');
        
        const alertMessage = await SignUpPage.getAlertMessage();
        expect(alertMessage).to.include('Signed Up');
        
        await SignUpPage.dismissAlert();
    });

    it('CT06 - Deve exibir erro quando senhas não conferem', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT06');
        allure.addDescription('Valida validação de senhas diferentes');

        await SignUpPage.signUp('testuser@example.com', 'Test@123', 'Test@456');
        
        const alertMessage = await SignUpPage.getAlertMessage();
        expect(alertMessage).to.include('not match');
        
        await SignUpPage.dismissAlert();
    });

    it('CT07 - Deve verificar que todos os campos de cadastro estão visíveis', async () => {
        allure.addSeverity('medium');
        allure.addTestId('CT07');
        allure.addDescription('Verifica a presença de todos os campos na tela de cadastro');

        await SignUpPage.goToSignUpTab();
        
        const allFieldsDisplayed = await SignUpPage.areAllFieldsDisplayed();
        expect(allFieldsDisplayed).to.be.true;
    });
});
