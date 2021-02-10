// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient, testPollerOptions } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - release", function() {
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

  describe("successfully releases a phone number", function() {
    let phoneNumberToRelease: string;

    it("gets a phone number to release", async function() {
      if (!includePhoneNumberLiveTests) {
        this.skip();
      }

      const phoneNumber = await client.listPhoneNumbers().next();
      phoneNumberToRelease = await phoneNumber.value.phoneNumber;

      assert.isNotEmpty(phoneNumberToRelease);
      assert.match(phoneNumberToRelease, /\+\d+/);
    });

    it("releases the phone number", async function() {
      if (!includePhoneNumberLiveTests) {
        this.skip();
      }

      const releasePoller = await client.beginReleasePhoneNumber(
        phoneNumberToRelease,
        testPollerOptions
      );
      //assert.ok(releasePoller.getOperationState().isStarted);

      await releasePoller.pollUntilDone();
      assert.ok(releasePoller.getOperationState().isCompleted);
    }).timeout(60000);
  });
});
