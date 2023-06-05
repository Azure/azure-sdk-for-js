// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { TieringClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`TieringClient - Get Acquired Number Limits`, function () {
  let recorder: Recorder;
  let client: TieringClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("get acquired number limits", async function () {
    // print all acquire number limits
    const resourceId = "9d787bd6-07fc-4c7b-8e57-17f1fee41298";
    const acquiredNumberLimits = await client.getAcquiredNumberLimits(resourceId);
    assert.isNotNull(acquiredNumberLimits);
  }).timeout(10000);
});
