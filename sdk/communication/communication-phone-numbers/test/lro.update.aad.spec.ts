// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumberCapabilitiesRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { buildCapabilityUpdate } from "./utils";
import {
  canCreateRecordedClientWithToken,
  createRecordedClientWithToken
} from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - update [AAD]", function() {
  const purchasedPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  before(function(this: Context) {
    if (!canCreateRecordedClientWithToken()) {
      this.skip();
    }
  });

  beforeEach(function(this: Context) {
    const recordedClient = createRecordedClientWithToken(this);
    ({ client, recorder } = recordedClient!);
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can update a phone number's capabilities", async function() {
    const { capabilities } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);
    const update: PhoneNumberCapabilitiesRequest = isPlaybackMode()
      ? { calling: "none", sms: "outbound" }
      : buildCapabilityUpdate(capabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      purchasedPhoneNumber,
      update
    );

    const phoneNumber = await updatePoller.pollUntilDone();
    assert.notDeepEqual(phoneNumber.capabilities, capabilities);
    assert.deepEqual(phoneNumber.capabilities, update);
  }).timeout(45000);

  it("can cancel update polling", async function() {
    const { capabilities } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);
    const update: PhoneNumberCapabilitiesRequest = isPlaybackMode()
      ? { calling: "outbound", sms: "inbound" }
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
