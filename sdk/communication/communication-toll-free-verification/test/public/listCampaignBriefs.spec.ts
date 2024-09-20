// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { TollFreeVerificationClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`TollFreeVerificationClient - lists Campaign Briefs`, function () {
  let recorder: Recorder;
  let client: TollFreeVerificationClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all campaign briefs", async function () {
    for await (const campaignBrief of client.listCampaignBriefs()) {
      assert.equal(campaignBrief.countryCode, "US");
    }
  }).timeout(30000);
});
