// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TenDlcClient } from "@azure-tools/communication-ten-dlc";
import { createRecordedClient } from "../utils/recordedClient.js";
import type { Recorder } from "@azure-tools/test-recorder";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("TenDlcClient - Costs", function () {
  let recorder: Recorder;
  let client: TenDlcClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async (ctx) => {
    await recorder.stop();
  });

  it("can list all costs", async function () {
    for await (const cost of client.listCosts()) {
      assert.isNotNull(cost);
    }
  });
});
