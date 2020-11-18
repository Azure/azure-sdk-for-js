// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { assert } from "chai";
import { Recorder } from "@azure/test-utils-recorder";
import { MonitoringClient } from "../src";
import { authenticate } from "./utils/testAuthentication";

describe("Synapse Monitoring Client", () => {
  let client: MonitoringClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.client;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("successfully list Spark Jobs", async function() {
    let listResult = await client.getSparkBatchJob();

    assert.equal(listResult.nJobs, 51);
  });
});
