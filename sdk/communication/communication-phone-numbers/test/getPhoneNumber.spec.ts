// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient getPhoneNumber", function() {
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

  it("can get an acquired phone number", async function() {
    const acquiredPhoneNumber = env.AZURE_PHONE_NUMBER;
    const { phoneNumber } = await client.getPhoneNumber(acquiredPhoneNumber);

    assert.strictEqual(acquiredPhoneNumber, phoneNumber);
  });

  it("errors if phone number not found", async function() {
    const fake = "+14155550100";
    try {
      await client.getPhoneNumber(fake);
    } catch (e) {
      assert.strictEqual(e.code, "PhoneNumberNotFound");
      assert.strictEqual(e.message, "The specified phone number +14155550100 cannot be found.");
    }
  });
});
