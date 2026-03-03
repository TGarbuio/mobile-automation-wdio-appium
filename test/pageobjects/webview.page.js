const BasePage = require('./base.page');

/**
 * WebView Page Object
 */
class WebViewPage {
    /**
     * Selectores dos elementos da tela de WebView
     */
    get webViewTab() {
        return $('//*[@content-desc="Webview"]');
    }

    get urlInput() {
        return $('//*[@content-desc="urlInput"]');
    }

    get goToSiteButton() {
        return $('//*[@content-desc="goToSiteButton"]');
    }

    /**
     * Navega para a aba WebView
     */
    async goToWebViewTab() {
        await BasePage.clickElement(this.webViewTab);
    }

    /**
     * Navega para uma URL específica
     * @param {string} url - URL a ser acessada
     */
    async navigateToUrl(url) {
        await BasePage.setValue(this.urlInput, url);
        await BasePage.hideKeyboard();
        await BasePage.clickElement(this.goToSiteButton);
    }

    /**
     * Alterna para o contexto WebView
     */
    async switchToWebView() {
        await driver.pause(3000); // Aguarda o carregamento
        const contexts = await driver.getContexts();
        const webviewContext = contexts.find(context => context.includes('WEBVIEW'));
        if (webviewContext) {
            await driver.switchContext(webviewContext);
        }
    }

    /**
     * Alterna para o contexto nativo
     */
    async switchToNative() {
        await driver.switchContext('NATIVE_APP');
    }

    /**
     * Verifica se está na tela de WebView
     * @returns {Promise<boolean>}
     */
    async isOnWebViewScreen() {
        return await BasePage.isElementDisplayed(this.urlInput);
    }
}

module.exports = new WebViewPage();
