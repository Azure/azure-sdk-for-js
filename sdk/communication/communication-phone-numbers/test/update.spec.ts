// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumberUpdateRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { buildCapabilityUpdate } from "./utils";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - update phone number", function() {
  const acquiredPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can update an acquired phone number", async function() {
    const update: PhoneNumberUpdateRequest = {
      callbackUri: "https://endpoint"
    };
    const { callbackUri } = await client.updatePhoneNumber(acquiredPhoneNumber, update);
    assert.strictEqual(update.callbackUri, callbackUri);
  });

  it("errors if trying to update phone number not owned by resource", async function() {
    const fake = "+14155550100";
    try {
      const update: PhoneNumberUpdateRequest = {
        callbackUri: "https://endpoint"
      };
      await client.updatePhoneNumber(fake, update);
    } catch (e) {
      assert.strictEqual(e.statusCode, 404);
    }
  });

  xit("can update a phone number's capabilities", async function() {
    const { capabilities } = await client.getPhoneNumber(acquiredPhoneNumber);
    const update = buildCapabilityUpdate(capabilities);

    const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
      acquiredPhoneNumber,
      update
    );
    const phoneNumber = await updatePoller.pollUntilDone();
    console.log(phoneNumber);
    assert.deepEqual(phoneNumber.capabilities, update);
  }).timeout(30000);
});
