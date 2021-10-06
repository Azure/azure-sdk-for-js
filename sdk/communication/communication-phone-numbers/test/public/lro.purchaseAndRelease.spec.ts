// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { isPlaybackMode, Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient, SearchAvailablePhoneNumbersRequest } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function(useAad) {
  describe(`PhoneNumbersClient - lro - purchase and release${useAad ? " [AAD]" : ""}`, function() {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    before(function(this: Context) {
      const includePhoneNumberLiveTests = env.INCLUDE_PHONENUMBER_LIVE_TESTS === "true";
      if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
        this.skip();
      }
    });

    beforeEach(function(this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedClientWithToken(this)!
        : createRecordedClient(this));
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can purchase and release a phone number", async function(this: Context) {
      // search for phone number
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
      const searchResults = await searchPoller.pollUntilDone();

      assert.ok(searchPoller.getOperationState().isCompleted);
      assert.isNotEmpty(searchResults.searchId);
      assert.isNotEmpty(searchResults.phoneNumbers);
      assert.equal(searchResults.phoneNumbers.length, 1);

      const purchasedPhoneNumber = searchResults.phoneNumbers[0];
      assert.isNotEmpty(purchasedPhoneNumber);

      // purchase phone number
      const purchasePoller = await client.beginPurchasePhoneNumbers(searchResults.searchId);

      await purchasePoller.pollUntilDone();
      assert.ok(purchasePoller.getOperationState().isCompleted);

      console.log(`Purchased ${purchasedPhoneNumber}`);

      // get phone number to ensure it was purchased
      const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);
      assert.equal(purchasedPhoneNumber, phoneNumber);

      // release phone number
      console.log(`Will release ${purchasedPhoneNumber}`);

      const releasePoller = await client.beginReleasePhoneNumber(purchasedPhoneNumber as string);

      await releasePoller.pollUntilDone();
      assert.ok(releasePoller.getOperationState().isCompleted);
      const result = releasePoller.getOperationState().result! as any;
      assert.equal(result.status, "succeeded");

      console.log(`Released: ${purchasedPhoneNumber}`);
    }).timeout(90000);
  });
});
