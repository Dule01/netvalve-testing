const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    defaultCommandTimeout: 25000,
    viewportWidth: 1600,
    viewportHeight: 900,
    experimentalRunAllSpecs: true
  },
});
