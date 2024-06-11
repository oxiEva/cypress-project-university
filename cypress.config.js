const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter");

module.exports  = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://www.saucedemo.com/',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: 'cypress-university-qa',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allureCypress(on, {
        resultsDir: "./allure-results",
      });
      return config;
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
