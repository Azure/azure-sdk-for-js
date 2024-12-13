// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";
import type { TieringClient } from "../../src/index.js";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`TieringClient - Get Tier Info`, () => {
  let recorder: Recorder;
  let client: TieringClient;

  beforeEach(async function (ctx) {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async function (ctx) {
    if (!ctx.task.pending) {
      await recorder.stop();
    }
  });

  it("get tier info", { timeout: 30000 }, async () => {
    // print all tier info
    const resourceId = env.RESOURCE_ID!;
    const tierInfo = await client.getTierByResourceId(resourceId);
    assert.isNotNull(tierInfo);
  });
});
