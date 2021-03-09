// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder, env } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient, testPollerOptions } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - release", function() {
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

  describe("successfully releases a phone number", function() {
    let phoneNumberToRelease: string;

    it("gets a phone number to release", async function() {
      const phoneNumber = await client.listPhoneNumbers().next();
      phoneNumberToRelease = await phoneNumber.value.phoneNumber;

      assert.isNotEmpty(phoneNumberToRelease);
      assert.match(phoneNumberToRelease, /\+\d+/);
    }).timeout(10000);

    it("releases the phone number", async function() {
      const releasePoller = await client.beginReleasePhoneNumber(
        phoneNumberToRelease,
        testPollerOptions
      );

      await releasePoller.pollUntilDone();
      assert.ok(releasePoller.getOperationState().isCompleted);
    }).timeout(45000);
  });
});
