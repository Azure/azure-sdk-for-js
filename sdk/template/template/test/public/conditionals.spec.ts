// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */

import { NodeClient, BrowserClient } from "../../src";
import { isNode } from "@azure/core-http";
import { assert } from "chai";
import { env, record, RecorderEnvironmentSetup, Recorder } from "@azure/test-utils-recorder";

describe("Tests with conditionals", function() {
  let client: NodeClient | BrowserClient;
  let recorder: Recorder;

  beforeEach(function() {
    const recorderEnvSetup: RecorderEnvironmentSetup = {
      replaceableVariables: {},
      customizationsOnRecordings: [],
      queryParametersToSkip: []
    };

    recorder = record(this, recorderEnvSetup);

    client = isNode ? new NodeClient() : new BrowserClient(env);
  });

  afterEach(function() {
    recorder.stop();
  });

  it("should test A #node", function(): void {
    if (!isNode) {
      return this.skip();
    }
    const nodeClient = client as NodeClient;
    assert.equal(nodeClient.A(), "Node");
  });

  it("should test B #browser", function(): void {
    if (isNode) {
      return this.skip();
    }
    const browserClient = client as BrowserClient;
    assert.equal(browserClient.B(), "Browser");
  });

  it("should test C #live", function(): void {
    if (env.TEST_MODE) {
      return this.skip();
    }
    assert.equal(client.C(), "Live");
  });
});
