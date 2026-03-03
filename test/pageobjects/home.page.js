const BasePage = require('./base.page');

/**
 * Home Page Object
 * Representa a tela inicial do aplicativo
 */
class HomePage {
    /**
     * Selectores dos elementos da Home
     */
    get homeTab() {
        return $('~Home');
    }

    get appLogo() {
        return $('~WebdriverIO logo');
    }

    get supportVideosButton() {
        return $('~Support videos');
    }

    /**
     * Navega para a aba Home
     */
    async goToHomeTab() {
        await BasePage.clickElement(this.homeTab);
    }

    /**
     * Verifica se está na tela Home
     * @returns {Promise<boolean>}
     */
    async isOnHomeScreen() {
        return await BasePage.isElementDisplayed(this.appLogo);
    }

    /**
     * Verifica se o botão de vídeos está visível
     * @returns {Promise<boolean>}
     */
    async isSupportVideosButtonDisplayed() {
        return await BasePage.isElementDisplayed(this.supportVideosButton);
    }

    /**
     * Clica no botão de Support Videos
     */
    async clickSupportVideos() {
        await BasePage.scrollToElement(this.supportVideosButton);
        await BasePage.clickElement(this.supportVideosButton);
    }
}

module.exports = new HomePage();
