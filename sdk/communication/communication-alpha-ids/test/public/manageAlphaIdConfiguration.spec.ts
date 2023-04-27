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
    await ignoreSubscriptionNotEligibleError(() => client.getConfiguration());
    await ignoreSubscriptionNotEligibleError(() => client.upsertConfiguration(false));
    await ignoreSubscriptionNotEligibleError(() => client.getConfiguration());
  }).timeout(15000);
});
