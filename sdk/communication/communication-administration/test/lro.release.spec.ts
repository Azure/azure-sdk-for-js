// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumberAdministrationClient, PhoneNumberRelease } from "../src";
import { createRecordedPhoneNumberAdministrationClient } from "./utils/recordedClient";

describe("PhoneNumber - LROs - Release [Playback/Live]", function() {
  let recorder: Recorder;
  let client: PhoneNumberAdministrationClient;
  let includePhoneNumberLiveTests: boolean;
  let phoneNumberToRelease: string;

  beforeEach(function() {
    ({
      client,
      recorder,
      includePhoneNumberLiveTests
    } = createRecordedPhoneNumberAdministrationClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can get phone number to release", async function() {
    if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
      this.skip();
    }

    const phoneNumbers = await client.listPhoneNumbers().next();
    phoneNumberToRelease = await phoneNumbers.value.phoneNumber;

    assert.isNotEmpty(phoneNumberToRelease);
  });

  it("can wait until a phone number is released", async function() {
    if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
      this.skip();
    }

    const poller = await client.beginReleasePhoneNumbers([phoneNumberToRelease]);
    assert.ok(poller.getOperationState().isStarted);

    const release: PhoneNumberRelease = await poller.pollUntilDone();
    assert.ok(poller.getOperationState().isCompleted);
    assert.equal(release.status, "Complete");
  }).timeout(30000);
});
