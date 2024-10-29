const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    setupNodeEvents(on, config) {
      on("after:screenshot", (details) => {
        console.log(`Screenshot tirada em ${details.path}`);
      });

      on("test:before:run", (attributes, test) => {
        console.log(`Iniciando teste: ${test.title}`);
      });

      on("test:after:run", (results, test) => {
        if (results.state === "failed") {
          console.log(`Teste falhou: ${test.title}`);
        } else {
          console.log(`Teste passou: ${test.title}`);
        }
      });

      return config;
    },
  },
});
