const BasePage = require('./base.page');

/**
 * Swipe Page Object
 */
class SwipePage {
    /**
     * Selectores dos elementos da tela de Swipe
     */
    get swipeTab() {
        return $('~Swipe');
    }

    get carouselContainer() {
        return $('//android.view.ViewGroup[@content-desc="Swipe-screen"]');
    }

    get logoImage() {
        return $('~WebdriverIO logo');
    }

    get cardTitle() {
        return $('//*[@resource-id="__CAROUSEL_ITEM_0_READY__"]//*[@content-desc="card-title"]');
    }

    get cardText() {
        return $('//*[@resource-id="__CAROUSEL_ITEM_0_READY__"]//*[@content-desc="card-text"]');
    }

    /**
     * Navega para a aba Swipe
     */
    async goToSwipeTab() {
        await BasePage.clickElement(this.swipeTab);
    }

    /**
     * Realiza um swipe horizontal
     * @param {string} direction - Direção do swipe ('left' ou 'right')
     */
    async swipeHorizontal(direction = 'left') {
        const container = await this.carouselContainer;
        await container.waitForDisplayed();
        
        const { x, y, width, height } = await driver.getElementRect(container.elementId);
        
        const startX = direction === 'left' ? x + width * 0.8 : x + width * 0.2;
        const endX = direction === 'left' ? x + width * 0.2 : x + width * 0.8;
        const startY = y + height / 2;
        
        await driver.touchAction([
            { action: 'press', x: startX, y: startY },
            { action: 'wait', ms: 1000 },
            { action: 'moveTo', x: endX, y: startY },
            'release'
        ]);
    }

    /**
     * Faz swipe para a esquerda
     */
    async swipeLeft() {
        await this.swipeHorizontal('left');
    }

    /**
     * Faz swipe para a direita
     */
    async swipeRight() {
        await this.swipeHorizontal('right');
    }

    /**
     * Verifica se está na tela de Swipe
     * @returns {Promise<boolean>}
     */
    async isOnSwipeScreen() {
        return await BasePage.isElementDisplayed(this.logoImage);
    }

    /**
     * Obtém o título do card atual
     * @returns {Promise<string>}
     */
    async getCardTitle() {
        return await BasePage.getText(this.cardTitle);
    }

    /**
     * Obtém o texto do card atual
     * @returns {Promise<string>}
     */
    async getCardText() {
        return await BasePage.getText(this.cardText);
    }
}

module.exports = new SwipePage();
