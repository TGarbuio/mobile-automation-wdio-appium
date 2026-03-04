const HomePage = require('../pageobjects/home.page');
const LoginPage = require('../pageobjects/login.page');
const FormsPage = require('../pageobjects/forms.page');
const SwipePage = require('../pageobjects/swipe.page');
const allure = require('@wdio/allure-reporter').default;

describe('Navegação - Testes de Navegação entre Telas', () => {
    beforeEach(async () => {
        allure.addFeature('Navigation');
    });

    it('CT11 - Deve navegar entre as diferentes abas do aplicativo', async () => {
        allure.addSeverity('critical');
        allure.addTestId('CT11');
        allure.addDescription('Valida navegação entre Home, Login, Forms e Swipe');

        // Navega para Home
        await HomePage.goToHomeTab();
        let isOnHome = await HomePage.isOnHomeScreen();
        expect(isOnHome).to.be.true;

        // Navega para Login
        await LoginPage.goToLoginTab();
        const loginSelected = await LoginPage.loginTab.getAttribute('selected');
        expect(loginSelected).to.equal('true');

        // Navega para Forms
        await FormsPage.goToFormsTab();
        const formsSelected = await FormsPage.formsTab.getAttribute('selected');
        expect(formsSelected).to.equal('true');

        // Navega para Swipe
        await SwipePage.goToSwipeTab();
        let isOnSwipe = await SwipePage.isOnSwipeScreen();
        expect(isOnSwipe).to.be.true;
    });

    it('CT12 - Deve retornar à tela Home após navegar', async () => {
        allure.addSeverity('medium');
        allure.addTestId('CT12');
        allure.addDescription('Valida retorno à tela inicial');

        await FormsPage.goToFormsTab();
        await HomePage.goToHomeTab();
        
        const isOnHome = await HomePage.isOnHomeScreen();
        expect(isOnHome).to.be.true;
    });
});
