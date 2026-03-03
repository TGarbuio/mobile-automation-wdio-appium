const SwipePage = require('../pageobjects/swipe.page');
const allure = require('@wdio/allure-reporter').default;

describe('Swipe - Testes de Gestos', () => {
    beforeEach(async () => {
        allure.addFeature('Swipe');
        await SwipePage.goToSwipeTab();
    });

    it('CT13 - Deve realizar swipe para a esquerda', async () => {
        allure.addSeverity('high');
        allure.addTestId('CT13');
        allure.addDescription('Valida gesto de swipe horizontal para esquerda');

        const isOnSwipe = await SwipePage.isOnSwipeScreen();
        expect(isOnSwipe).to.be.true;

        await SwipePage.swipeLeft();
        
        // Verifica que ainda está na tela após o swipe
        const stillOnSwipe = await SwipePage.isOnSwipeScreen();
        expect(stillOnSwipe).to.be.true;
    });
});
