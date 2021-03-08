// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode, isLiveMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { buildCapabilityUpdate } from "./utils";
import { createRecordedClient, testPollerOptions } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - update", function() {
  const acquiredPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  let includePhoneNumberLiveTests: boolean;

  this.beforeAll(function() {
    if (isPlaybackMode() || isLiveMode()) {
      this.skip();
    }
  });

  beforeEach(function() {
    ({ client, recorder, includePhoneNumberLiveTests } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can update a phone number's capabilities", async function() {
    if (!includePhoneNumberLiveTests) {
      this.skip();
    }

    const { capabilities } = await client.getPhoneNumber(acquiredPhoneNumber);
    const update = buildCapabilityUpdate(capabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      acquiredPhoneNumber,
      update,
      testPollerOptions
    );

    const phoneNumber = await updatePoller.pollUntilDone();
    assert.notDeepEqual(phoneNumber.capabilities, capabilities);
    assert.deepEqual(phoneNumber.capabilities, update);
  }).timeout(30000);

  it("can cancel an update", async function() {
    if (!includePhoneNumberLiveTests) {
      this.skip();
    }

    const { capabilities: originalCapabilities } = await client.getPhoneNumber(acquiredPhoneNumber);
    const update = buildCapabilityUpdate(originalCapabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      acquiredPhoneNumber,
      update,
      testPollerOptions
    );

    await updatePoller.cancelOperation();
    assert.ok(updatePoller.isStopped);
    assert.ok(updatePoller.getOperationState().isCancelled);

    const { capabilities } = await client.getPhoneNumber(acquiredPhoneNumber);
    assert.notDeepEqual(capabilities, update);
    assert.deepEqual(capabilities, originalCapabilities);
  }).timeout(5000);
});
