// https://github.com/karma-runner/karma-chrome-launcher
process.env.CHROME_BIN = require("puppeteer").executablePath();
require("dotenv").config();

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: "./",

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
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
      "karma-junit-reporter"
    ],

    // list of files / patterns to load in the browser
    files: [
      // polyfill service supporting IE11 missing features
      // Promise,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.keys
      "https://cdn.polyfill.io/v2/polyfill.js?features=Promise,String.prototype.startsWith,String.prototype.endsWith,String.prototype.repeat,String.prototype.includes,Array.prototype.includes,Object.keys|always",
      "test-browser/index.js"
    ],

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.js": ["env"]
      // IMPORTANT: COMMENT following line if you want to debug in your browsers!!
      // Preprocess source file to calculate code coverage, however this will make source file unreadable
      // "test-browser/index.js": ["coverage"]
    },

    // inject following environment values into browser testing with window.__env__
    // environment values MUST be exported or set with same console running "karma start"
    // https://www.npmjs.com/package/karma-env-preprocessor
    envPreprocessor: [
      "SERVICEBUS_CONNECTION_STRING",
      "QUEUE_NAME_BROWSER",
      "QUEUE_NAME_NO_PARTITION_BROWSER",
      "QUEUE_NAME_SESSION_BROWSER",
      "QUEUE_NAME_NO_PARTITION_SESSION_BROWSER",
      "TOPIC_NAME_BROWSER",
      "TOPIC_NAME_NO_PARTITION_BROWSER",
      "TOPIC_NAME_SESSION_BROWSER",
      "TOPIC_NAME_NO_PARTITION_SESSION_BROWSER",
      "SUBSCRIPTION_NAME_BROWSER",
      "SUBSCRIPTION_NAME_NO_PARTITION_BROWSER",
      "SUBSCRIPTION_NAME_SESSION_BROWSER",
      "SUBSCRIPTION_NAME_NO_PARTITION_SESSION_BROWSER",
      "TOPIC_FILTER_NAME_BROWSER",
      "TOPIC_FILTER_SUBSCRIPTION_NAME_BROWSER",
      "TOPIC_FILTER_DEFAULT_SUBSCRIPTION_NAME_BROWSER",
      "AAD_CLIENT_ID",
      "AAD_CLIENT_SECRET",
      "AAD_TENANT_ID",
      "RESOURCE_GROUP",
      "AZURE_SUBSCRIPTION_ID",
      "CLEAN_NAMESPACE"
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha", "coverage", "remap-coverage", "junit"],

    coverageReporter: { type: "in-memory" },

    // Coverage report settings
    remapCoverageReporter: {
      "text-summary": null, // to show summary in console
      html: "./coverage-browser",
      cobertura: "./coverage-browser/cobertura-coverage.xml"
    },

    // Exclude coverage calculation for following files
    remapOptions: {
      exclude: /node_modules|tests/g
    },

    junitReporter: {
      outputDir: "", // results will be saved as $outputDir/$browserName.xml
      outputFile: "test-results.browser.xml", // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: "", // suite will become the package name attribute in xml testsuite element
      useBrowserName: false, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {} // key value pair of properties to add to the <properties> section of the report
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // 'ChromeHeadless', 'Chrome', 'Firefox', 'Edge', 'IE'
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,

    browserNoActivityTimeout: 600000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: "html",
        timeout: "600000",
        grep: " #RunInBrowser"
      }
    }
  });
};
