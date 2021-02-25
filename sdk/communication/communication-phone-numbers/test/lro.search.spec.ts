// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { SearchAvailablePhoneNumbersRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient, testPollerOptions } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - search", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  let includePhoneNumberLiveTests: boolean;
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
    if (isPlaybackMode() || isLiveMode()) {
      this.skip();
    }
  });

  beforeEach(function() {
    ({ client, recorder, includePhoneNumberLiveTests } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can search for 1 available phone number by default", async function() {
    if (!includePhoneNumberLiveTests) {
      this.skip();
    }

    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

    const results = await searchPoller.pollUntilDone();
    assert.equal(results.phoneNumbers.length, 1);
    assert.ok(searchPoller.getOperationState().isCompleted);
  }).timeout(20000);

  it("can search for multiple available phone number", async function() {
    if (!includePhoneNumberLiveTests) {
      this.skip();
    }

    const quantity = 2;
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(
      { ...searchRequest, quantity },
      testPollerOptions
    );

    const results = await searchPoller.pollUntilDone();
    assert.equal(results.phoneNumbers.length, quantity);
    assert.ok(searchPoller.getOperationState().isCompleted);
  }).timeout(20000);

  it("can cancel search", async function() {
    if (!includePhoneNumberLiveTests) {
      this.skip();
    }

    const searchPoller = await client.beginSearchAvailablePhoneNumbers(
      searchRequest,
      testPollerOptions
    );

    await searchPoller.cancelOperation();
    assert.ok(searchPoller.isStopped);
    assert.ok(searchPoller.getOperationState().isCancelled);
  }).timeout(20000);
});
