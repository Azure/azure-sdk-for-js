// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type { TieringClient } from "../../src/index.js";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient.js";

describe(`TieringClient - Get Acquired Number Limits`, function () {
  let recorder: Recorder;
  let client: TieringClient;

  beforeEach(async function (ctx) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (ctx) {
    if (!ctx.task.pending) {
      await recorder.stop();
    }
  });

  it("get acquired number limits", async function () {
    // print all acquire number limits
    const resourceId = env.RESOURCE_ID!;
    const acquiredNumberLimits = await client.getAcquiredNumberLimits(resourceId);
    assert.isNotNull(acquiredNumberLimits);
  }).timeout(30000);
});
