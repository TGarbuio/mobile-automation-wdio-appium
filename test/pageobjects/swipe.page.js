const BasePage = require('./base.page');

/**
 * Swipe Page Object
 */
class SwipePage {
    /**
     * Selectores dos elementos da tela de Swipe
     */
    get swipeTab() {
        return $('//*[@content-desc="Swipe"]');
    }

    get carouselContainer() {
        return $('//android.view.ViewGroup[@content-desc="Swipe-screen"]');
    }

    get logoImage() {
        return $('//*[@content-desc="WebdriverIO logo"]');
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
        const { width, height } = await driver.getWindowRect();

        const startX = direction === 'left' ? Math.floor(width * 0.8) : Math.floor(width * 0.2);
        const endX = direction === 'left' ? Math.floor(width * 0.2) : Math.floor(width * 0.8);
        const startY = Math.floor(height * 0.5);

        await driver.performActions([
            {
                type: 'pointer',
                id: 'finger1',
                parameters: { pointerType: 'touch' },
                actions: [
                    { type: 'pointerMove', duration: 0, x: startX, y: startY },
                    { type: 'pointerDown', button: 0 },
                    { type: 'pause', duration: 200 },
                    { type: 'pointerMove', duration: 600, x: endX, y: startY },
                    { type: 'pointerUp', button: 0 }
                ]
            }
        ]);

        await driver.releaseActions();

        await browser.pause(500);
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
        const logoVisible = await BasePage.isElementDisplayed(this.logoImage);
        if (logoVisible) {
            return true;
        }

        const carouselVisible = await BasePage.isElementDisplayed(this.carouselContainer);
        if (carouselVisible) {
            return true;
        }

        try {
            const isSelected = await this.swipeTab.getAttribute('selected');
            return isSelected === 'true';
        } catch (error) {
            return false;
        }
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
