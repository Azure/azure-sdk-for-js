// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
"use strict";

const Mocha = require("mocha");
const MochaJUnitReporter = require("mocha-junit-reporter");

/**
 * Usage :
 * - Meant to be used to leverage Mocha's Spec reporter as well as mocha-junit-reporter for the test runs
 * - Provide the relative path to this file from your `sdk/service/package-folder/` as the reporter options to mocha
 * - Example - `--reporter ../../../common/tools/mocha-multi-reporter.js`
 *
 * Refer the following docs for more customizations on reporters
 * https://mochajs.org/api/tutorial-custom-reporter.html
 *
 * @class MultiReporter
 */
class MultiReporter {
  constructor(runner) {
    // Spec reporter is provided as part of mocha library
    // Invoking the spec reporter with the runner
    new Mocha.reporters.Spec(runner);
    // Invoking mocha-junit-reporter to generate XML reports of test summaries for CI
    new MochaJUnitReporter(runner);
  }
}

module.exports = MultiReporter;
