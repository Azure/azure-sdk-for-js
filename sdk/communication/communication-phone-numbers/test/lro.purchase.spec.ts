// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isLiveMode, isPlaybackMode, Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { PhoneNumberSearchRequest, PhoneNumberSearchResult } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient, testPollerOptions } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - purchase", function() {
  let recorder: Recorder;
  let client: PhoneNumbersClient;
  let includePhoneNumberLiveTests: boolean;
  const countryCode = "US";

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

  describe("successfully purchases a phone number", function() {
    let searchResults: PhoneNumberSearchResult;

    it("finds phone number to purchase", async function() {
      if (!includePhoneNumberLiveTests) {
        this.skip();
      }

      const searchRequest: PhoneNumberSearchRequest = {
        phoneNumberType: "tollFree",
        assignmentType: "application",
        capabilities: {
          sms: "inbound+outbound",
          calling: "none"
        },
        areaCode: "833",
        quantity: 1
      };
      const searchPoller = await client.beginSearchAvailablePhoneNumbers(
        countryCode,
        searchRequest,
        testPollerOptions
      );
      //assert.ok(searchPoller.getOperationState().isStarted);

      searchResults = await searchPoller.pollUntilDone();

      assert.ok(searchPoller.getOperationState().isCompleted);
      assert.isNotEmpty(searchResults.searchId);
      assert.isNotEmpty(searchResults.phoneNumbers);
      assert.equal(searchResults.phoneNumbers.length, 1);
    }).timeout(20000);

    it("purchases the phone number from the search", async function() {
      if (!includePhoneNumberLiveTests) {
        this.skip();
      }

      const purchasePoller = await client.beginPurchasePhoneNumbers(
        searchResults.searchId,
        testPollerOptions
      );
      //assert.ok(purchasePoller.getOperationState().isStarted);

      await purchasePoller.pollUntilDone();
      assert.ok(purchasePoller.getOperationState().isCompleted);
    }).timeout(45000);
  });
});
