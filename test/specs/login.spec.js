const LoginPage = require('../pageobjects/login.page');
const allure = require('@wdio/allure-reporter').default;

describe('Login - Testes de Autenticação', () => {
    beforeEach(async () => {
        allure.addFeature('Login');
    });

    it('CT01 - Deve realizar login com credenciais válidas', async () => {
        allure.addSeverity('critical');
        allure.addTestId('CT01');
        allure.addDescription('Valida o login com email e senha válidos');

        await LoginPage.login('testuser@example.com', 'Test@123');
        
        const alertMessage = await LoginPage.getAlertMessage();
        expect(alertMessage).to.include('Success');
        
        await LoginPage.dismissAlert();
    });

    it('CT02 - Deve exibir erro ao tentar login com email inválido', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT02');
        allure.addDescription('Valida mensagem de erro para email inválido');

        await LoginPage.login('invalid-email', 'Test@123');
        
        const alertMessage = await LoginPage.getAlertMessage();
        expect(alertMessage).to.include('valid email');
        
        await LoginPage.dismissAlert();
    });

    it('CT03 - Deve exibir erro ao tentar login com senha vazia', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT03');
        allure.addDescription('Valida validação de campo obrigatório senha');

        await LoginPage.login('testuser@example.com', '');
        
        const alertMessage = await LoginPage.getAlertMessage();
        expect(alertMessage).to.include('enter');
        
        await LoginPage.dismissAlert();
    });

    it('CT04 - Deve verificar que campos de login estão visíveis', async () => {
        allure.addSeverity('medium');
        allure.addTestId('CT04');
        allure.addDescription('Verifica a presença dos campos na tela de login');

        await LoginPage.goToLoginTab();
        
        const isEmailDisplayed = await LoginPage.isEmailInputDisplayed();
        expect(isEmailDisplayed).to.be.true;
        
        const isLoginButtonEnabled = await LoginPage.isLoginButtonEnabled();
        expect(isLoginButtonEnabled).to.be.true;
    });
});
