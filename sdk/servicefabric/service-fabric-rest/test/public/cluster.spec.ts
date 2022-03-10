// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { ServiceFabricLike } from "../../src";
import { createClient } from "./utils/recordedClient";

describe("Cluster tests", () => {
  let recorder: Recorder;
  let client: ServiceFabricLike;

  beforeEach(async function (this: Context) {
    recorder = new Recorder(this.currentTest);
    client = await createClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should get health state", async function () {
    const result = await client.getClusterHealth();

    if (result.status !== "200") {
      throw result;
    }

    assert.isDefined(result.body.AggregatedHealthState);
  });
});
