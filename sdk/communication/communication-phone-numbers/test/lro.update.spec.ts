// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumberCapabilitiesRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { buildCapabilityUpdate } from "./utils";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - update", function() {
  const acquiredPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  this.beforeAll(function() {
    if (!env.INCLUDE_PHONENUMBER_LIVE_TESTS && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can update a phone number's capabilities", async function() {
    const { capabilities } = await client.getPurchasedPhoneNumber(acquiredPhoneNumber);
    const update: PhoneNumberCapabilitiesRequest = isPlaybackMode()
      ? { calling: "none", sms: "outbound" }
      : buildCapabilityUpdate(capabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      acquiredPhoneNumber,
      update
    );

    const phoneNumber = await updatePoller.pollUntilDone();
    assert.notDeepEqual(phoneNumber.capabilities, capabilities);
    assert.deepEqual(phoneNumber.capabilities, update);
  }).timeout(45000);

  it("can cancel an update", async function() {
    const { capabilities: originalCapabilities } = await client.getPurchasedPhoneNumber(
      acquiredPhoneNumber
    );
    const update: PhoneNumberCapabilitiesRequest = isPlaybackMode()
      ? { calling: "inbound+outbound", sms: "inbound+outbound" }
      : buildCapabilityUpdate(originalCapabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      acquiredPhoneNumber,
      update
    );

    await updatePoller.cancelOperation();
    assert.ok(updatePoller.isStopped);
    assert.ok(updatePoller.getOperationState().isCancelled);

    const { capabilities } = await client.getPurchasedPhoneNumber(acquiredPhoneNumber);
    assert.notDeepEqual(capabilities, update);
    assert.deepEqual(capabilities, originalCapabilities);
  }).timeout(5000);
});
