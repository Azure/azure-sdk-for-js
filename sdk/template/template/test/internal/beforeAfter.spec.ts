// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalClass } from "../../src/internalClass";
import { assert } from "chai";

describe("before, beforeEach, after and afterEach examples", function() {

  // We recommend using `beforeEach` rather than `before`,
  // just as much as we recommend using `afterEach` rather than `after`.
  // The idea is that each test case should not depend on a state that is shared with other tests.
  describe.skip("Discouraged example of `before` and `after`", function() {
    let state: {
      properties?: any;
    } = {};
    let client: InternalClass;

    before(() => {
      state = {
        properties: {}
      };
      client = new InternalClass();
      // And other global setups...
    });

    after(() => {
      delete state.properties;
      // And other global cleanups...
    });

    it("A test for the discouraged example of `before`", function() {
      assert.exists(state.properties);
      assert.exists(client);
    });
  });

  // Use `beforeEach` to execute tasks that will prepare the resources needed
  // for each test to run cleanly, and `afterEach` to tear down or clean
  // those settings before the next test runs.
  describe("Encouraged example of `beforeEach` and `afterEach`", function() {
    let client: InternalClass;
    beforeEach(function() {
      client = new InternalClass();
      // And other per-test setups...
    });
  
    afterEach(function() {
      // And other per-test cleanups...
    });
  
    it("A test for the encouraged example of `before", function() {
      assert.exists(client);
    });
  });
});
