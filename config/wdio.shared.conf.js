exports.config = {
    runner: 'local',
    autoCompileOpts: {
        autoCompile: false
    },
    execArgv: [],
    port: 4723,
    maxInstances: 1,
    logLevel: 'info',
    bail: 0, 
    baseUrl: 'http://localhost',   
    waitforTimeout: 30000,   
    connectionRetryTimeout: 300000,   
    connectionRetryCount: 3,
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};
