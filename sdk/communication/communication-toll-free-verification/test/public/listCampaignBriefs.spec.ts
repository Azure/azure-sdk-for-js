// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import type { TollFreeVerificationClient } from "@azure-tools/communication-toll-free-verification";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`TollFreeVerificationClient - lists Campaign Briefs`, { timeout: 30000 }, () => {
  let recorder: Recorder;
  let client: TollFreeVerificationClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can list all campaign briefs", async () => {
    for await (const campaignBrief of client.listCampaignBriefs()) {
      assert.equal(campaignBrief.countryCode, "US");
    }
  });
});
