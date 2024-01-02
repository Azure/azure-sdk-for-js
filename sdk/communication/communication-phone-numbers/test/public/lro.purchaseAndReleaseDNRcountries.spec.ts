// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient, SearchAvailablePhoneNumbersRequest } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - lro - purchase and release DNR${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    before(function (this: Context) {
      const includePhoneNumberLiveTests = env.INCLUDE_PHONENUMBER_LIVE_TESTS === "true";
      if (!includePhoneNumberLiveTests && !isPlaybackMode()) {
        this.skip();
      }
    });

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)!
        : await createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can purchase and release a phone number with DNR countries", async function (this: Context) {
      // search for phone number
      const searchRequest: SearchAvailablePhoneNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
        assignmentType: "application",
        capabilities: {
          sms: "none",
          calling: "inbound",
        },
      };
      const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
      const searchResults = await searchPoller.pollUntilDone();

      const consentToNotResellNumbers = true;

      assert.ok(searchPoller.getOperationState().isCompleted);
      assert.isNotEmpty(searchResults.searchId);
      assert.isNotEmpty(searchResults.phoneNumbers);
      assert.equal(searchResults.phoneNumbers.length, 1);

      const purchasedPhoneNumber = searchResults.phoneNumbers[0];
      assert.isNotEmpty(purchasedPhoneNumber);

      // purchase phone number

      const purchasePoller = await client.beginPurchasePhoneNumbers(
        searchResults.searchId,
        consentToNotResellNumbers
      );

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
      assert.equal(result.body.status, "succeeded");

      console.log(`Released: ${purchasedPhoneNumber}`);
    }).timeout(90000);

    it("will fail to purchase a phone number as no consent provided for DNR countries", async function (this: Context) {
      // search for phone number
      const searchRequest: SearchAvailablePhoneNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
        assignmentType: "application",
        capabilities: {
          sms: "none",
          calling: "outbound",
        },
      };
      const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);
      const searchResults = await searchPoller.pollUntilDone();

      const consentToNotResellNumbers = false;

      assert.ok(searchPoller.getOperationState().isCompleted);
      assert.isNotEmpty(searchResults.searchId);
      assert.isNotEmpty(searchResults.phoneNumbers);
      assert.equal(searchResults.phoneNumbers.length, 1);

      const purchasedPhoneNumber = searchResults.phoneNumbers[0];
      assert.isNotEmpty(purchasedPhoneNumber);

      // purchase phone number

      try {
        const purchasePoller = await client.beginPurchasePhoneNumbers(
          searchResults.searchId,
          consentToNotResellNumbers
        );
        await purchasePoller.pollUntilDone();
      } catch (error: any) {
        assert.isTrue(
          isClientErrorStatusCode(error.statusCode),
          `Status code ${error.statusCode} does not indicate client error.`
        );
        return;
      }

      assert.fail("beginPurchasePhoneNumbers should have thrown an exception.");
    }).timeout(90000);
  });
});
