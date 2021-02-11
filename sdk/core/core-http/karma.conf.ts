const defaults = {
  port: 9876
};

process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config: any) {
  config.set({
    plugins: [
      "karma-mocha",
      "karma-chrome-launcher",
      "karma-edge-launcher",
      "karma-firefox-launcher"
    ],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ["mocha"],

    // list of files / patterns to load in the browser
    files: [
      { pattern: "dist-test/coreHttp.browser.test.js" },
      { pattern: "dist-test/coreHttp.browser.test.js.map", included: false }
    ],

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ["progress"],

    // web server port
    port: defaults.port,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher, for example:
    // browsers: ["Chrome", "Firefox", "Edge"],
    browsers: ["ChromeHeadless"],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    customLaunchers: {
      ChromeNoSecurity: {
        base: "ChromeHeadless",
        flags: ["--disable-web-security"]
      },
      ChromeDebugging: {
        base: "Chrome",
        flags: [
          `http://localhost:${defaults.port}/debug.html`,
          "--auto-open-devtools-for-tabs",
          "--disable-web-security"
        ]
      },
      FirefoxDebugging: {
        base: "Firefox",
        flags: ["-url", `http://localhost:${defaults.port}/debug.html`, "-devtools"]
      }
    },

    client: {
      mocha: {
        reporter: "html",
        timeout: "20000"
      }
    }
  });
};
