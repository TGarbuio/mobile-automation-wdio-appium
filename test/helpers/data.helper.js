const fs = require('fs');
const path = require('path');

/**
 * Helper para carregar dados de testes
 */
class DataHelper {
    /**
     * Carrega dados de um arquivo JSON
     * @param {string} fileName - Nome do arquivo (sem extensão)
     * @returns {Object} Dados carregados
     */
    static loadJsonData(fileName) {
        try {
            const filePath = path.join(__dirname, '../data', `${fileName}.json`);
            const rawData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error(`Erro ao carregar dados do arquivo ${fileName}:`, error.message);
            return null;
        }
    }

    /**
     * Carrega dados de um arquivo CSV
     * @param {string} fileName - Nome do arquivo (sem extensão)
     * @returns {Array} Array de objetos com os dados
     */
    static loadCsvData(fileName) {
        try {
            const filePath = path.join(__dirname, '../data', `${fileName}.csv`);
            const rawData = fs.readFileSync(filePath, 'utf8');
            
            const lines = rawData.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            
            const data = [];
            for (let i = 1; i < lines.length; i++) {
                if (lines[i].trim()) {
                    const values = lines[i].split(',').map(v => v.trim());
                    const obj = {};
                    headers.forEach((header, index) => {
                        obj[header] = values[index];
                    });
                    data.push(obj);
                }
            }
            
            return data;
        } catch (error) {
            console.error(`Erro ao carregar dados do arquivo ${fileName}:`, error.message);
            return [];
        }
    }

    /**
     * Gera dados aleatórios para testes
     * @returns {Object} Objeto com dados aleatórios
     */
    static generateRandomData() {
        const timestamp = Date.now();
        return {
            email: `test${timestamp}@example.com`,
            password: `Test@${timestamp}`,
            text: `Test Text ${timestamp}`
        };
    }
}

module.exports = DataHelper;
