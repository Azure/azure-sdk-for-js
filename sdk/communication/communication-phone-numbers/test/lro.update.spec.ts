// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumberCapabilitiesRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { buildCapabilityUpdate } from "./utils";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - update", function() {
  const purchasedPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can update a phone number's capabilities", async function() {
    const { capabilities } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);
    const update: PhoneNumberCapabilitiesRequest = isPlaybackMode()
      ? { calling: "inbound+outbound", sms: "inbound" }
      : buildCapabilityUpdate(capabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      purchasedPhoneNumber,
      update
    );

    const phoneNumber = await updatePoller.pollUntilDone();
    assert.notDeepEqual(phoneNumber.capabilities, capabilities);
    assert.deepEqual(phoneNumber.capabilities, update);
  }).timeout(30000);

  it("can cancel update polling", async function() {
    const { capabilities } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);
    const update: PhoneNumberCapabilitiesRequest = isPlaybackMode()
      ? { calling: "inbound", sms: "outbound" }
      : buildCapabilityUpdate(capabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      purchasedPhoneNumber,
      update
    );

    await updatePoller.cancelOperation();
    assert.ok(updatePoller.isStopped);
    assert.ok(updatePoller.getOperationState().isCancelled);
  }).timeout(5000);
});
