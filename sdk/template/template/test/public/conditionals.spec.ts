/* eslint-disable no-invalid-this */
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { NodeClient, BrowserClient } from "../../src";
import { isNode } from "@azure/core-http";
import { assert } from "chai";

describe("testing the client's basic methods", function() {
  let client: NodeClient | BrowserClient;

  beforeEach(function() {
    client = isNode ? new NodeClient() : new BrowserClient();
  });

  it("should test A #node", function(): void {
    if (!isNode) {
      return this.skip();
    }
    const nodeClient = this.client as NodeClient;
    assert.equal(nodeClient.A(), "Node");
  });

  it("should test B #browser", function(): void {
    if (isNode) {
      return this.skip();
    }
    const browserClient = this.client as BrowserClient;
    assert.equal(browserClient.B(), "Browser");
  });

  it("should test C #live", function(): void {
    if (process.env.TEST_MODE) {
      return this.skip();
    }
    assert.equal(client.C(), "Live");
  });
});
