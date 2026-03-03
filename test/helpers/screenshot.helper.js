const allure = require('@wdio/allure-reporter').default;
const fs = require('fs');
const path = require('path');

/**
 * Helper para captura de screenshots
 */
class ScreenshotHelper {
    /**
     * Captura screenshot e anexa ao relatório Allure
     * @param {string} name - Nome do screenshot
     */
    static async takeScreenshot(name) {
        try {
            const screenshot = await driver.takeScreenshot();
            allure.addAttachment(
                name || 'Screenshot',
                Buffer.from(screenshot, 'base64'),
                'image/png'
            );
            console.log(`Screenshot capturado: ${name}`);
        } catch (error) {
            console.error(`Erro ao capturar screenshot: ${error.message}`);
        }
    }

    /**
     * Captura screenshot em caso de falha
     * @param {string} testName - Nome do teste que falhou
     */
    static async takeScreenshotOnFailure(testName) {
        await this.takeScreenshot(`FAILURE - ${testName}`);
    }

    /**
     * Salva screenshot em arquivo
     * @param {string} fileName - Nome do arquivo
     * @param {string} directory - Diretório onde salvar
     */
    static async saveScreenshotToFile(fileName, directory = './screenshots') {
        try {
            // Cria o diretório se não existir
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory, { recursive: true });
            }

            const screenshot = await driver.takeScreenshot();
            const filePath = path.join(directory, `${fileName}.png`);
            
            fs.writeFileSync(filePath, screenshot, 'base64');
            console.log(`Screenshot salvo em: ${filePath}`);
            
            return filePath;
        } catch (error) {
            console.error(`Erro ao salvar screenshot: ${error.message}`);
            return null;
        }
    }
}

module.exports = ScreenshotHelper;
