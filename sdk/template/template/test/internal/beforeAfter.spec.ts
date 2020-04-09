// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalClass } from "../../src/internalClass";
import { assert } from "chai";
import { isNode } from "@azure/core-http";

describe("before, beforeEach, after and afterEach examples", function() {
  // We recommend using `beforeEach` rather than `before`,
  // just as much as we recommend using `afterEach` rather than `after`.
  // The idea is that each test case should not depend on a state that is shared with other tests.

  // Use `beforeEach` to execute tasks that will prepare the resources needed
  // for each test to run cleanly, and `afterEach` to tear down or clean
  // those settings before the next test runs.
  describe("Encouraged example of `beforeEach` and `afterEach`", function() {
    let client: InternalClass;
    let state: {
      fruits?: string[];
    } = {};

    beforeEach(function() {
      client = new InternalClass();
      state = {
        fruits: []
      };

      // And other per-test setups...
    });

    afterEach(function() {
      // Fruits are overwritten in the beforeEach,
      // but otherwise could be cleared up here:
      state.fruits = [];

      // And other per-test cleanups...
    });

    it("A test for the encouraged example of `beforeEach` and `afterEach`", function() {
      assert.exists(client);
    });
  });

  // Use `before` to declare heavy resources that can be used by more than one test.
  // Like a stateless web server...
  // (This test won't run if we're in a browser,
  // since HTTP servers can't be created in the browsers).
  if (isNode) {
    describe("Encouraged example of `before` and `after`", function() {
      const expectedHttpResponse = "Hello World!";
      let server: any;

      /**
       * helloWorldRequest makes a get request to the env.SERVER_ADDRESS
       * and returns a promise that resolves when the server responds.
       */
      async function helloWorldRequest(): Promise<string> {
        return new Promise((resolve) => {
          const http = require("http");
          http.get("http://localhost:8080", (res: any) => {
            let data = "";
            res.on("data", (chunk: string) => {
              data += chunk;
            });
            res.on("end", () => {
              resolve(data);
            });
          });
        });
      }

      before(function() {
        // Only internal tests may use mocks of servers.
        const http = require("http");
        server = http.createServer(function(_: any, res: any) {
          res.write(expectedHttpResponse);
          res.end();
        });
        server.listen(8080);
      });

      after(function() {
        server.close();
      });

      it("A test for the encouraged example of `before` and `after`", async function() {
        const response = await helloWorldRequest();
        assert.equal(response, expectedHttpResponse);
      });
    });
  }
});
