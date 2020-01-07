// https://github.com/karma-runner/karma-chrome-launcher
process.env.CHROME_BIN = require("puppeteer").executablePath();
require("dotenv").config({ path: "../.env" });
const jsonRecordingFilter = require("@azure/test-utils-recorder").jsonRecordingFilterFunction;

module.exports = function(config) {
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
      "karma-remap-coverage",
      "karma-junit-reporter",
      "karma-json-to-file-reporter",
      "karma-json-preprocessor"
    ],

    files: [
      // polyfill service supporting IE11 missing features
      // Promise,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.keys
      "https://cdn.polyfill.io/v2/polyfill.js?features=Promise,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.keys|always",
      "dist-test/index.browser.js"
    ].concat(process.env.TEST_MODE === "playback" ? ["recordings/browsers/**/*.json"] : []),

    exclude: [],

    preprocessors: {
      "**/*.js": ["env"],
      "dist-test/index.browser.js": ["coverage"],
      "recordings/browsers/**/*.json": ["json"]
    },

    envPreprocessor: [
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_TENANT_ID",
      "KEYVAULT_NAME",
      "TEST_MODE"
    ],

    reporters: ["mocha", "coverage", "remap-coverage", "junit", "json-to-file"],

    coverageReporter: { type: "in-memory" },

    remapCoverageReporter: {
      "text-summary": null,
      html: "./coverage-browser",
      cobertura: "./coverage-browser/cobertura-coverage.xml"
    },

    remapOptions: {
      exclude: /node_modules|test/g
    },

    junitReporter: {
      outputDir: "",
      outputFile: "test-results.browser.xml",
      suite: "",
      useBrowserName: false,
      nameFormatter: undefined,
      classNameFormatter: undefined,
      properties: {}
    },

    jsonToFileReporter: {
      // required - to save the recordings of browser tests
      filter: jsonRecordingFilter,
      outputPath: "."
    },

    port: 9328,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,

    // --no-sandbox allows our tests to run in Linux without having to change the system.
    // --disable-web-security allows us to authenticate from the browser without having to write tests using interactive auth, which would be far more complex.
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-web-security"]
      }
    },

    singleRun: false,
    concurrency: 1,

    browserNoActivityTimeout: 600000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserConsoleLogOptions: {
      // IMPORTANT: COMMENT the following line if you want to print debug logs in your browsers in record mode!!
      terminal: process.env.TEST_MODE !== "record"
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: "html",
        timeout: "600000"
      }
    }
  });
};
