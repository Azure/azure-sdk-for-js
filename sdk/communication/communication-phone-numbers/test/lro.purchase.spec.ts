// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isPlaybackMode, Recorder, env } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumberSearchResult, SearchAvailablePhoneNumbersRequest } from "../src";
import { PhoneNumbersClient } from "../src/phoneNumbersClient";
import { createRecordedClient } from "./utils/recordedClient";

describe("PhoneNumbersClient - lro - purchase", function() {
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

  describe("successfully purchases a phone number", function() {
    let searchResults: PhoneNumberSearchResult;

    it("finds phone number to purchase", async function() {
      const searchRequest: SearchAvailablePhoneNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
        assignmentType: "application",
        capabilities: {
          sms: "inbound+outbound",
          calling: "none"
        }
      };
      const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

      searchResults = await searchPoller.pollUntilDone();

      assert.ok(searchPoller.getOperationState().isCompleted);
      assert.isNotEmpty(searchResults.searchId);
      assert.isNotEmpty(searchResults.phoneNumbers);
      assert.equal(searchResults.phoneNumbers.length, 1);
    }).timeout(20000);

    it("purchases the phone number from the search", async function() {
      const purchasePoller = await client.beginPurchasePhoneNumbers(searchResults.searchId);

      await purchasePoller.pollUntilDone();
      assert.ok(purchasePoller.getOperationState().isCompleted);
      console.log(`Purchased ${searchResults.phoneNumbers[0]}`);
    }).timeout(45000);
  });
});
