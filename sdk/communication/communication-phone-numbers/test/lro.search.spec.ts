// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumberSearchRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - search", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  const countryCode = "US";

  beforeEach(function() {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function() {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can search for 1 available phone number by default", async function() {
    const search: PhoneNumberSearchRequest = {
      phoneNumberType: "tollfree",
      assignmentType: "application",
      capabilities: {
        sms: "inbound+outbound",
        calling: "none"
      },
      areaCode: "833"
    };
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(countryCode, search);
    const results = await searchPoller.pollUntilDone();

    assert.equal(results.phoneNumbers.length, 1);
  }).timeout(20000);

  xit("can search for multiple available phone number", async function() {
    const quantity = 2;
    const search: PhoneNumberSearchRequest = {
      phoneNumberType: "tollfree",
      assignmentType: "application",
      capabilities: {
        sms: "inbound+outbound",
        calling: "none"
      },
      areaCode: "833",
      quantity
    };
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(countryCode, search);
    const results = await searchPoller.pollUntilDone();

    assert.equal(results.phoneNumbers.length, quantity);
  }).timeout(20000);

  xit("can cancel search", async function() {
    const search: PhoneNumberSearchRequest = {
      phoneNumberType: "tollfree",
      assignmentType: "application",
      capabilities: {
        sms: "inbound+outbound",
        calling: "none"
      },
      areaCode: "833"
    };
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(countryCode, search);
    assert.ok(searchPoller.getOperationState().isStarted);

    await searchPoller.cancelOperation();
    assert.ok(searchPoller.isStopped);
    assert.ok(searchPoller.getOperationState().isCancelled);
  }).timeout(20000);
});
