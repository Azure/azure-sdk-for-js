// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AlphaIdsClient } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient";
import { ignoreSubscriptionNotEligibleError } from "./utils/alphaIdClientTestUtils";
import { assert } from "chai";

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
    await ignoreSubscriptionNotEligibleError(
      (operationOptions) => client.upsertConfiguration(true, operationOptions),
      true
    );
    await ignoreSubscriptionNotEligibleError(
      (operationOptions) => client.getConfiguration(operationOptions),
      true
    );
    await ignoreSubscriptionNotEligibleError(
      (operationOptions) => client.upsertConfiguration(false, operationOptions),
      false
    );
    await ignoreSubscriptionNotEligibleError(
      (operationOptions) => client.getConfiguration(operationOptions),
      false
    );
  }).timeout(15000);

  it("can list all dynamic alpha ids countries", async function () {
    const countries = (await client.getDynamicAlphaIdCountries()).countries;
    countries?.forEach((countryCode) => {
      assert.isNotNull(countryCode);
    });
  }).timeout(20000);
});
