// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// https://github.com/karma-runner/karma-chrome-launcher
process.env.CHROME_BIN = require("puppeteer").executablePath();
require("dotenv").config();
const {
  jsonRecordingFilterFunction,
  isPlaybackMode,
  isSoftRecordMode,
  isRecordMode
} = require("@azure-tools/test-recorder");

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
      "karma-firefox-launcher",
      "karma-env-preprocessor",
      "karma-coverage",
      "karma-junit-reporter",
      "karma-json-to-file-reporter",
      "karma-json-preprocessor"
    ],

    // list of files / patterns to load in the browser
    files: [
      "dist-test/index.browser.js",
      { pattern: "dist-test/index.browser.js.map", type: "html", included: false, served: true }
    ].concat(isPlaybackMode() || isSoftRecordMode() ? ["recordings/browsers/**/*.json"] : []),

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.js": ["env"],
      "recordings/browsers/**/*.json": ["json"]
      // IMPORTANT: COMMENT following line if you want to debug in your browsers!!
      // Preprocess source file to calculate code coverage, however this will make source file unreadable
      //"dist-test/index.browser.js": ["coverage"]
    },

    envPreprocessor: [
      "TEST_MODE",
      "AZURE_BATCH_ENDPOINT",
      "AZURE_BATCH_ACCOUNT",
      "AZURE_BATCH_ACCESS_KEY",
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET"
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["mocha", "coverage", "junit", "json-to-file"],

    coverageReporter: {
      // specify a common output directory
      dir: "coverage-browser/",
      reporters: [{ type: "json", subdir: ".", file: "coverage.json" }]
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

    jsonToFileReporter: {
      filter: jsonRecordingFilterFunction,
      outputPath: "."
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

    // --no-sandbox allows our tests to run in Linux without having to change the system.
    // --disable-web-security allows us to authenticate from the browser without having to write tests using interactive auth, which would be far more complex.
    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-web-security"]
      }
    },

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: 1,

    browserNoActivityTimeout: 600000,
    browserDisconnectTimeout: 10000,
    browserDisconnectTolerance: 3,
    browserConsoleLogOptions: {
      terminal: !isRecordMode()
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
