import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/#', // # porque está configurado con el HashRouter
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}',
    video: true,
    screenshotOnRunFailure: true
  },
});

