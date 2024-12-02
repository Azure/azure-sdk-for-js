// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
"use strict";

const Mocha = require("mocha");

/**
 * Usage :
 * - Meant to be used to leverage Mocha's buitin Spec and XUnit reporters
 * - Provide the relative path to this file from your `sdk/service/package-folder/` to mocha
 * - Example - `--reporter ../../../common/tools/mocha-multi-reporter.js --report-option ...`
 *
 * Refer the following docs for more customizations on reporters
 * https://mochajs.org/api/tutorial-custom-reporter.html
 *
 * @class MultiReporter
 */
class MultiReporter {
  constructor(runner, options) {
    new Mocha.reporters.Spec(runner, options);
    new Mocha.reporters.XUnit(runner, options);
  }
}

module.exports = MultiReporter;
