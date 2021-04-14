// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import {
  canCreateRecordedClientWithToken,
  createRecordedClientWithToken
} from "./utils/recordedClient";

describe("PhoneNumbersClient - get phone number [AAD]", function() {
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

  it("can get a purchased phone number", async function(this: Context) {
    const purchasedPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
    const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);

    assert.strictEqual(purchasedPhoneNumber, phoneNumber);
  }).timeout(5000);

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
