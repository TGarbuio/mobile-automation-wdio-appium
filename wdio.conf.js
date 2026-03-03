const path = require('path');
const { config } = require('./config/wdio.shared.conf');

// Configuração específica para Android
exports.config = {
    ...config,
    
    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.spec.js'
    ],
    
    // ============
    // Capabilities
    // ============
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:automationName': 'UiAutomator2',
        'appium:app': path.join(process.cwd(), 'app', 'android', 'Android-NativeDemoApp-0.4.0.apk'),
        'appium:appPackage': 'com.wdiodemoapp',
        'appium:appActivity': 'com.wdiodemoapp.SplashActivity',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': false,
        'appium:newCommandTimeout': 300,
    }],
    
    // ===================
    // Test Configurations
    // ===================
    logLevel: 'info',
    bail: 0,
    baseUrl: 'http://localhost',
    waitforTimeout: 30000,
    connectionRetryTimeout: 300000,
    connectionRetryCount: 3,
    
    // ========
    // Services
    // ========
    services: [
        ['appium', {
            args: {
                relaxedSecurity: true,
            },
            logPath: './logs/'
        }]
    ],
    
    // =======
    // Framework
    // =======
    framework: 'mocha',
    
    // =================
    // Mocha Configuration
    // =================
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // =========
    // Reporters
    // =========
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false
        }]
    ],
    
    // =====
    // Hooks
    // =====
    onPrepare: function (config, capabilities) {
        // Limpar allure-results antes de cada execução para evitar acúmulo de dados
        const fs = require('fs');
        const path = require('path');
        const allureResultsPath = path.join(process.cwd(), 'allure-results');
        
        if (fs.existsSync(allureResultsPath)) {
            fs.rmSync(allureResultsPath, { recursive: true, force: true });
            console.log('✓ Allure results limpo com sucesso!');
        }
    },
    
    beforeSession: function (config, capabilities, specs) {
        console.log('=== Starting Test Session ===');
    },
    
    before: function (capabilities, specs) {
        const chai = require('chai');
        global.expect = chai.expect;
        global.assert = chai.assert;
    },
    
    afterTest: async function(test, context, { error, result, duration, passed, retries }) {
        if (error) {
            await driver.takeScreenshot();
        }
    },
    
    after: function (result, capabilities, specs) {
        console.log('=== Test Completed ===');
    },
    
    afterSession: function (config, capabilities, specs) {
        console.log('=== Session Ended ===');
    }
};
