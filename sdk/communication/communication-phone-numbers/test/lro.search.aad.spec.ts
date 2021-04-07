// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { SearchAvailablePhoneNumbersRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import {
  canCreateRecordedClientWithToken,
  createRecordedClientWithToken
} from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - search [AAD]", function() {
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

  it("can search for 1 available phone number by default", async function() {
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

    const results = await searchPoller.pollUntilDone();
    assert.equal(results.phoneNumbers.length, 1);
    assert.ok(searchPoller.getOperationState().isCompleted);
  }).timeout(20000);

  it("throws on invalid search request", async function() {
    // person and toll free is an invalid combination
    const invalidSearchRequest: SearchAvailablePhoneNumbersRequest = {
      countryCode: "US",
      phoneNumberType: "tollFree",
      assignmentType: "person",
      capabilities: {
        sms: "inbound+outbound",
        calling: "none"
      }
    };

    try {
      const searchPoller = await client.beginSearchAvailablePhoneNumbers(invalidSearchRequest);
      await searchPoller.pollUntilDone();
    } catch (error) {
      assert.equal(error.statusCode, 400);
      return;
    }

    assert.fail("beginSearchAvailablePhoneNumbers should have thrown an exception.");
  });

  it("can cancel search polling", async function() {
    const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

    await searchPoller.cancelOperation();
    assert.ok(searchPoller.isStopped);
    assert.ok(searchPoller.getOperationState().isCancelled);
  }).timeout(20000);
});
