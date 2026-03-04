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
        return $('//*[@content-desc="Home"]');
    }

    get appLogo() {
        return $('//*[@content-desc="WebdriverIO logo"]');
    }

    get supportVideosButton() {
        return $('//*[@content-desc="Support videos"]');
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
        const logoVisible = await BasePage.isElementDisplayed(this.appLogo);
        if (logoVisible) {
            return true;
        }

        const supportVisible = await BasePage.isElementDisplayed(this.supportVideosButton);
        if (supportVisible) {
            return true;
        }

        try {
            const isSelected = await this.homeTab.getAttribute('selected');
            return isSelected === 'true';
        } catch (error) {
            return false;
        }
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
