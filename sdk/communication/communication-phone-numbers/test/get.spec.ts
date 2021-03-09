// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - get phone number", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  let includePhoneNumberLiveTests: boolean;

  beforeEach(function() {
    ({ client, recorder, includePhoneNumberLiveTests } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can get a purchased phone number", async function() {
    if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
      this.skip();
    }

    const purchasedPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
    const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);

    assert.strictEqual(purchasedPhoneNumber, phoneNumber);
  });

  it("errors if phone number not found", async function() {
    const fake = "+14155550100";
    try {
      await client.getPurchasedPhoneNumber(fake);
    } catch (e) {
      assert.strictEqual(e.code, "PhoneNumberNotFound");
      assert.strictEqual(e.message, "The specified phone number +14155550100 cannot be found.");
    }
  });
});
