// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { ServiceFabricClient } from "../../src";
import { assert } from "chai";
import { createClient } from "./utils/recordedClient";

describe("Cluster tests", () => {
  let recorder: Recorder;
  let client: ServiceFabricClient;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get health state", async function () {
    const result = await client.path("/$/GetClusterHealth").get();

    if (result.status !== "200") {
      throw result;
    }

    assert.isDefined(result.body.AggregatedHealthState);
  });
});
