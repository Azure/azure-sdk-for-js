// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { isNode } from "@azure/core-http";
import * as fs from "fs";

describe("before, beforeEach, after and afterEach examples", function() {
  if (isNode) {
    // We recommend using `beforeEach` rather than `before`,
    // just as much as we recommend using `afterEach` rather than `after`.
    // The idea is that each test case should not depend on a state that is shared with other tests.

    // Use `beforeEach` to execute tasks that will prepare the resources needed
    // for each test to run cleanly, and `afterEach` to tear down or clean
    // those settings before the next test runs.
    describe("Encouraged example of `beforeEach` and `afterEach`", function() {
      let mockFs: any;

      beforeEach(function() {
        // Only internal tests may use mocks.
        mockFs = require("mock-fs");

        mockFs({
          "file.txt": "Here be dragons."
        });

        // And other per-test setups...
      });

      afterEach(function() {
        mockFs.restore();

        // And other per-test cleanups...
      });

      it("A test for the encouraged example of `beforeEach` and `afterEach`", function() {
        const response = fs.readFileSync("file.txt", { encoding: "utf8" });
        assert.equal(response, "Here be dragons.");
      });
    });

    // Use `before` to declare heavy resources that can be used by more than one test.
    describe("Encouraged example of `before` and `after`", function() {
      let mockFs: any;

      before(function() {
        // Only internal tests may use mocks.
        mockFs = require("mock-fs");

        mockFs({
          "file.txt": "Here be dragons."
        });
      });

      after(function() {
        mockFs.restore();
      });

      it("A test for the encouraged example of `before` and `after`", async function() {
        const response = fs.readFileSync("file.txt", { encoding: "utf8" });
        assert.equal(response, "Here be dragons.");
      });
    });
  }
});
