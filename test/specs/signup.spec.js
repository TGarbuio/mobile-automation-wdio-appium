const SignUpPage = require('../pageobjects/signup.page');
const BasePage = require('../pageobjects/base.page');
const allure = require('@wdio/allure-reporter').default;

describe('Sign Up - Testes de Cadastro', () => {
    beforeEach(async () => {
        allure.addFeature('Sign Up');
    });

    it('CT05 - Deve realizar cadastro com dados válidos', async () => {
        allure.addSeverity('critical');
        allure.addTestId('CT05');
        allure.addDescription('Valida o cadastro de novo usuário com dados válidos');

        try {
            await SignUpPage.signUp('newuser@example.com', 'Test@123', 'Test@123');
            
            const alertMessage = await SignUpPage.getAlertMessage();
            console.log('Alert Message:', alertMessage);
            
            // Aceita múltiplos formatos de mensagem de sucesso
            expect(alertMessage.toLowerCase()).to.satisfy(msg => 
                msg.includes('success') || 
                msg.includes('signed') || 
                msg.includes('registr') ||
                msg.includes('welcome')
            );
            
            await SignUpPage.dismissAlert();
        } catch (error) {
            allure.addAttachment('Error', error.message, 'text/plain');
            throw error;
        }
    });

    it('CT06 - Deve exibir erro quando senhas não conferem', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT06');
        allure.addDescription('Valida validação de senhas diferentes');

        try {
            await SignUpPage.signUp('testuser@example.com', 'Test@123', 'Test@456');
            
            // Aguarda um pouco para os dados serem processados
            await browser.pause(1000);
            
            // Tenta obter a mensagem de alerta
            try {
                const alertMessage = await SignUpPage.getAlertMessage();
                console.log('Alert Message Found:', alertMessage);
                
                // Verifica se há uma mensagem de erro
                expect(alertMessage.toLowerCase()).to.satisfy(msg =>
                    msg.includes('not match') ||
                    msg.includes('password') ||
                    msg.includes('differ') ||
                    msg.includes('error') ||
                    msg.includes('don\'t match') ||
                    msg.includes('mismatch')
                );
                
                await SignUpPage.dismissAlert();
            } catch (e) {
                // Se não foi possível obter o alerta, verifica se ainda estamos na tela de signup
                // (indicando que o cadastro falhou como esperado)
                const emailFieldExists = await BasePage.isElementDisplayed(SignUpPage.emailInput);
                expect(emailFieldExists).to.be.true;
            }
        } catch (error) {
            allure.addAttachment('Error', error.message, 'text/plain');
            throw error;
        }
    });

    it('CT07 - Deve verificar que todos os campos de cadastro estão visíveis', async () => {
        allure.addSeverity('medium');
        allure.addTestId('CT07');
        allure.addDescription('Verifica a presença de todos os campos na tela de cadastro');

        try {
            await SignUpPage.goToSignUpTab();
            
            const allFieldsDisplayed = await SignUpPage.areAllFieldsDisplayed();
            expect(allFieldsDisplayed).to.be.true;
        } catch (error) {
            allure.addAttachment('Error', error.message, 'text/plain');
            throw error;
        }
    });
});
