// https://github.com/karma-runner/karma-chrome-launcher
process.env.CHROME_BIN = require("puppeteer").executablePath();
require("dotenv").config();

const { relativeRecordingsPath } = require("@azure-tools/test-recorder");

process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPath();

module.exports = function (config) {
  config.set({
    basePath: "./",
    frameworks: ["mocha"],

    plugins: [
      "karma-mocha",
      "karma-mocha-reporter",
      "karma-chrome-launcher",
      "karma-edge-launcher",
      "karma-firefox-launcher",
      "karma-ie-launcher",
      "karma-env-preprocessor",
      "karma-coverage",
      "karma-sourcemap-loader",
      "karma-junit-reporter",
    ],

    files: [
      "dist-test/index.browser.js",
      { pattern: "dist-test/index.browser.js.map", type: "html", included: false, served: true },
    ],

    exclude: [],

    preprocessors: {
      "**/*.js": ["sourcemap", "env"],
      //"dist-test/index.browser.js": ["coverage"],
    },

    envPreprocessor: [
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_TENANT_ID",
      "KEYVAULT_NAME",
      "KEYVAULT_URI",
      "AZURE_MANAGEDHSM_URI",
      "AZURE_KEYVAULT_ATTESTATION_URI",
      "TEST_MODE",
      "AZURE_AUTHORITY_HOST",
      "RECORDINGS_RELATIVE_PATH",
    ],

    reporters: ["mocha", "coverage", "junit"],

    coverageReporter: {
      // specify a common output directory
      dir: "coverage-browser/",
      reporters: [
        { type: "json", subdir: ".", file: "coverage.json" },
        { type: "lcovonly", subdir: ".", file: "lcov.info" },
        { type: "html", subdir: "html" },
        { type: "cobertura", subdir: ".", file: "cobertura-coverage.xml" },
      ],
    },

    junitReporter: {
      outputDir: "",
      outputFile: "test-results.browser.xml",
      suite: "",
      useBrowserName: false,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {},
    },

    port: 9329,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    // --no-sandbox allows our tests to run in Linux without having to change the system.
    // --disable-web-security allows us to authenticate from the browser without having to write tests using interactive auth, which would be far more complex.
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-web-security"],
      },
    },

    singleRun: false,
    concurrency: 1,

    browserNoActivityTimeout: 180000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: "html",
        timeout: "180000",
      },
    },
  });
};
