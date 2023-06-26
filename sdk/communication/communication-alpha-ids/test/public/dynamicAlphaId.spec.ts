// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AlphaIdsClient } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { createRecordedClient } from "./utils/recordedClient";
import { assertAlphaDynamicConfiguration } from "./utils/alphaIdClientTestUtils";
import { assert } from "chai";

const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

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
    await assertAlphaDynamicConfiguration(
      (operationOptions) => client.upsertDynamicAlphaIdConfiguration(true, operationOptions),
      true
    );
    // wait 1s to get the updated configuration
    await sleep(1000);
    await assertAlphaDynamicConfiguration(
      (operationOptions) => client.getDynamicAlphaIdConfiguration(operationOptions),
      true
    );
    await assertAlphaDynamicConfiguration(
      (operationOptions) => client.upsertDynamicAlphaIdConfiguration(false, operationOptions),
      false
    );
    // wait 1s to get the updated configuration
    await sleep(1000);
    await assertAlphaDynamicConfiguration(
      (operationOptions) => client.getDynamicAlphaIdConfiguration(operationOptions),
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
