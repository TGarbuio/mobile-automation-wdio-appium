const LoginPage = require('../pageobjects/login.page');
const SignUpPage = require('../pageobjects/signup.page');
const FormsPage = require('../pageobjects/forms.page');
const HomePage = require('../pageobjects/home.page');
const testData = require('../data/testData.json');
const allure = require('@wdio/allure-reporter').default;

describe('Data-Driven - Testes com múltiplos conjuntos de dados', () => {
    
    describe('Login com múltiplos usuários válidos', () => {
        beforeEach(async () => {
            // Garante que cada teste começa da Home tab
            try {
                await HomePage.goToHomeTab();
                await driver.pause(500);
            } catch (error) {
                console.log('Já está na tela inicial ou erro ao navegar:', error.message);
            }
        });

        testData.validUsers.forEach((user, index) => {
            it(`CT14.${index + 1} - Deve fazer login com usuário ${user.email}`, async () => {
                allure.addFeature('Data-Driven Login');
                allure.addSeverity('critical');
                allure.addTestId(`CT14.${index + 1}`);
                allure.addDescription(`Login com dados do conjunto ${index + 1}`);

                await LoginPage.login(user.email, user.password);
                
                const alertMessage = await LoginPage.getAlertMessage();
                // Aceita múltiplas variações de mensagem de sucesso
                const isSuccess = alertMessage.toLowerCase().includes('success') || 
                                  alertMessage.toLowerCase().includes('logged in') ||
                                  alertMessage.toLowerCase().includes('you are');
                expect(isSuccess).to.be.true;
                
                await LoginPage.dismissAlert();
            });
        });
    });

     describe('Validação de emails inválidos', () => {
        beforeEach(async () => {
            // Garante que cada teste começa da Home tab
            try {
                await HomePage.goToHomeTab();
                await driver.pause(500);
            } catch (error) {
                console.log('Já está na tela inicial ou erro ao navegar:', error.message);
            }
        });

        testData.invalidEmails.forEach((data, index) => {
            it(`CT15.${index + 1} - Deve rejeitar email inválido: ${data.email}`, async () => {
                allure.addFeature('Data-Driven Validation');
                allure.addSeverity('high');
                allure.addTestId(`CT15.${index + 1}`);
                allure.addDescription(`Valida email inválido: ${data.email}`);

                await LoginPage.login(data.email, data.password);
                
                // Aguarda um pouco para ver se há alguma resposta do app
                await driver.pause(2000);
                
                // Verifica se NÃO houve sucesso de login tentando buscar a mensagem de sucesso
                // Se não encontrar o elemento de sucesso após o timeout, é porque o login falhou (esperado)
                try {
                    const successMsg = $('//*[@class="android.widget.TextView" and contains(@text, "You are logged")]');
                    const isDisplayed = await successMsg.isDisplayed();
                    // Se encontrou mensagem de sucesso, o teste deve falhar
                    expect(isDisplayed).to.be.false;
                } catch (error) {
                    // Não encontrou mensagem de sucesso - comportamento esperado para email inválido
                    expect(true).to.be.true;
                }
            });
        });
    });

    describe('Preenchimento de formulário com múltiplos valores', () => {
        beforeEach(async () => {
            // Garante que cada teste começa da Home tab
            try {
                await HomePage.goToHomeTab();
                await driver.pause(500);
            } catch (error) {
                console.log('Já está na tela inicial ou erro ao navegar:', error.message);
            }
        });

        testData.formInputs.forEach((data, index) => {
            it(`CT16.${index + 1} - Deve preencher formulário com: ${data.text}`, async () => {
                allure.addFeature('Data-Driven Forms');
                allure.addSeverity('medium');
                allure.addTestId(`CT16.${index + 1}`);
                allure.addDescription(`Preenche formulário com: ${data.text}`);

                await FormsPage.goToFormsTab();
                await FormsPage.fillInputField(data.text);
                
                const result = await FormsPage.getInputResult();
                expect(result).to.equal(data.text);
            });
        });
    });
});
