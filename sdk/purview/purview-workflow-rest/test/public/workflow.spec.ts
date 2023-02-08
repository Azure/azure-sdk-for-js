// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// import { PurviewWorkflowClient } from "@azure-rest/purview-workflow";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createClient } from "./utils/recordedClient";

import { Context } from "mocha";
import { PurviewWorkflowClient } from "../../src/clientDefinitions";

describe("Get a workflow", () => {
  let recorder: Recorder;
  let client: PurviewWorkflowClient;
  let workflowId: string;

  beforeEach(async function(this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
    workflowId = "669ab714-1900-47a9-8346-060358f26623";
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("should get a workflow", async function() {
    const result = await client.path("/workflows/{workflowId}", workflowId).get();
    if (result.status !== "200") {
      assert.fail(`GET "/workflows/{workflowId} failed with ${result.status}`);
    }
  });
});
