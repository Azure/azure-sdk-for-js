// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder, env } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { SearchAvailablePhoneNumbersRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - search", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  const searchRequest: SearchAvailablePhoneNumbersRequest = {
    countryCode: "US",
    phoneNumberType: "tollFree",
    assignmentType: "application",
    capabilities: {
      sms: "inbound+outbound",
      calling: "none"
    }
  };

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

  it("can search for 1 available phone number by default", async function() {
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

    const results = await searchPoller.pollUntilDone();
    assert.equal(results.phoneNumbers.length, 1);
    assert.ok(searchPoller.getOperationState().isCompleted);
  }).timeout(20000);

  it("can cancel search", async function() {
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

    await searchPoller.cancelOperation();
    assert.ok(searchPoller.isStopped);
    assert.ok(searchPoller.getOperationState().isCancelled);
  }).timeout(20000);
});
