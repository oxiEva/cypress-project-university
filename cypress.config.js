module.exports = {
  e2e: {
    chromeWebSecurity: false,
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
};
