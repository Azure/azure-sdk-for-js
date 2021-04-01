// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder, env } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - release", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;

  before(function(this: Context) {
    if (!env.INCLUDE_PHONENUMBER_LIVE_TESTS && !isPlaybackMode()) {
      this.skip();
    }
  });

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  describe("successfully releases a phone number", function() {
    let phoneNumberToRelease: string;

    it("gets a phone number to release", async function() {
      const phoneNumber = await client.listPurchasedPhoneNumbers().next();
      phoneNumberToRelease = await phoneNumber.value.phoneNumber;

      assert.isNotEmpty(phoneNumberToRelease);
      assert.match(phoneNumberToRelease, /\+\d+/);
    }).timeout(10000);

    it("releases the phone number", async function() {
      const releasePoller = await client.beginReleasePhoneNumber(phoneNumberToRelease);

      await releasePoller.pollUntilDone();
      assert.ok(releasePoller.getOperationState().isCompleted);
    }).timeout(45000);
  });
});
