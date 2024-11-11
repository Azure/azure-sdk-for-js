// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import type { TollFreeVerificationClient } from "../../src/index.js";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe(`TollFreeVerificationClient - lists Campaign Briefs`, function () {
  let recorder: Recorder;
  let client: TollFreeVerificationClient;

  beforeEach(async function (ctx) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (ctx) {
    if (!ctx.task.pending) {
      await recorder.stop();
    }
  });

  it("can list all campaign briefs", async function () {
    for await (const campaignBrief of client.listCampaignBriefs()) {
      assert.equal(campaignBrief.countryCode, "US");
    }
  }).timeout(30000);
});
