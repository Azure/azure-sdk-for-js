// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AlphaIdsClient } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient";
import { ignoreSubscriptionNotEligibleError } from "./utils/alphaIdClientTestUtils";

describe(`AlphaIdsClient - manage configuration`, function () {
  let recorder: Recorder;
  let client: AlphaIdsClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can manage configuration", async function () {
    await ignoreSubscriptionNotEligibleError(() => client.upsertConfiguration(true), true);
    await ignoreSubscriptionNotEligibleError(() => client.getConfiguration(), true);
    await ignoreSubscriptionNotEligibleError(() => client.upsertConfiguration(false), false);
    await ignoreSubscriptionNotEligibleError(() => client.getConfiguration(), false);
  }).timeout(15000);
});
