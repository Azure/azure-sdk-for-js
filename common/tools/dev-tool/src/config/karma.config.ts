// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as fs from "fs-extra";

import { ConfigOptions as KarmaConfig, FilePattern } from "karma";
import { executablePath } from "puppeteer";

declare module "karma" {
  export interface ConfigOptions {
    envPreprocessor?: string[];
    coverageReporter?: unknown;
    junitReporter?: unknown;
  }
}

const mode = (() => {
  if (process.env.TEST_MODE === undefined) {
    return "playback";
  }
  switch (process.env.TEST_MODE) {
    case "record":
    case "soft-record":
    case "playback":
    case "live":
      return process.env.TEST_MODE;
    default:
      throw new Error("Unrecognized test mode: " + process.env.TEST_MODE);
  }
})();

/**
 * When `jsonRecordingFilterFunction` is passed as a filter to `jsonToFileReporter` in karma.conf.js,
 * it captures the recordings(as JSON strings) from the console.logs.
 *
 * More Info -
 * 1. JSON objects with `writeFile` property are captured and saved as recordings as per the `path` property.
 * 2. If the captured object doesn't have the `writeFile` property, the object will be logged directly to the console.
 *
 * @param {{
 *   writeFile: boolean;
 *   path: string;
 *   content: string;
 * }} browserRecordingJsonObject
 */
export const jsonRecordingFilterFunction = function(browserRecordingJsonObject: {
  writeFile: boolean;
  path: string;
  content: string;
}) {
  if (mode.endsWith("record")) {
    if (browserRecordingJsonObject.writeFile) {
      // Create the directories recursively incase they don't exist
      try {
        // Stripping away the filename from the file path and retaining the directory structure
        fs.ensureDirSync(
          browserRecordingJsonObject.path.substring(
            0,
            browserRecordingJsonObject.path.lastIndexOf("/") + 1
          )
        );
      } catch (err) {
        if (err.code !== "EEXIST") throw err;
      }
      fs.writeFile(
        browserRecordingJsonObject.path,
        JSON.stringify(browserRecordingJsonObject.content, null, " "),
        (err: any) => {
          if (err) {
            throw err;
          }
        }
      );
    } else {
      console.log(browserRecordingJsonObject);
    }
  }
};

interface KarmaConfigOptions {
  browsers: string[];
}

const defaultOptions: KarmaConfigOptions = {
  browsers: ["ChromeHeadlessNoSandbox"]
};

process.env.CHROME_BIN = executablePath();

export function makeConfig(options: Partial<KarmaConfigOptions> = {}): KarmaConfig {
  const fullOptions = { ...defaultOptions, ...options };

  const mapFilesPattern: FilePattern = {
    pattern: "dist-test/index.browser.js.map",
    type: "html",
    included: false,
    served: true
  };

  return {
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
      "karma-junit-reporter",
      "karma-json-to-file-reporter",
      "karma-json-preprocessor"
    ],

    // list of files / patterns to load in the browser
    files: ["dist-test/index.browser.js", mapFilesPattern].concat(
      mode === "playback" || mode === "soft-record" ? ["recordings/browsers/**/*.json"] : []
    ),

    // list of files / patterns to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      "**/*.js": ["env"],
      "**/*.json": ["json"]
      // IMPORTANT: COMMENT following line if you want to debug in your browsers!!
      // Preprocess source file to calculate code coverage, however this will make source file unreadable
      //"dist-test/index.browser.js": ["coverage"]
    },

    envPreprocessor: [
      "TEST_MODE",
      "APPCONFIG_ENDPOINT",
      "APPCONFIG_TEST_SETTING_KEY",
      "APPCONFIG_TEST_SETTING_EXPECTED_VALUE",
      "AZURE_CLIENT_ID",
      "AZURE_CLIENT_SECRET",
      "AZURE_TENANT_ID"
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
      filter: jsonRecordingFilterFunction as (obj: object) => boolean,
      outputPath: "."
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // --no-sandbox allows our tests to run in Linux without having to change the system.
    // --disable-web-security allows us to authenticate from the browser without having to write tests using interactive auth, which would be far more complex.
    browsers: fullOptions.browsers,
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
      terminal: mode !== "record"
    },

    client: {
      mocha: {
        // change Karma's debug.html to the mocha web reporter
        reporter: "html",
        timeout: "600000"
      }
    } as any
  };
}
