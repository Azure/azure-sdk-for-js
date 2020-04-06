// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { InternalClass } from "../../src/internalClass";
import { assert } from "chai";
import { Server, createServer } from "http";
import { isNode } from '@azure/core-http';

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

      // The recorder needs to be initialized before the clients are created,
      // so assume the recorder is being initialized here.

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
  
    it("A test for the encouraged example of `beforeEach` and `afterEach`", function() {
      assert.exists(client);
    });
  });

  // Use `before` to declare heavy resources that can be used by more than one test.
  // Like a stateless web server...
  if (!isNode) {
    describe("Encouraged example of `before` and `after`", function() {
      const expectedHttpResponse = "Hello World!";
      let server: Server;

      /**
       * helloWorldRequest makes a get request to the env.SERVER_ADDRESS
       * and returns a promise that resolves when the server responds.
       */
      async function helloWorldRequest(): Promise<string> {
        return new Promise((resolve) => {
          const http = require("http");
          http.get("localhost:8080", (res: any) => {
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
        server = createServer(function(_: any, res: any) {
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
