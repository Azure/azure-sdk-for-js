// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient, SearchAvailablePhoneNumbersRequest } from "../../src";
import { matrix } from "./utils/matrix";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function(useAad) {
  describe(`PhoneNumbersClient - lro - search${useAad ? " [AAD]" : ""}`, function() {
    let recorder: Recorder;
    let client: PhoneNumbersClient;
    const searchRequest: SearchAvailablePhoneNumbersRequest = {
      countryCode: "US",
      phoneNumberType: "tollFree",
      assignmentType: "application",
      capabilities: {
        sms: "none",
        calling: "outbound"
      }
    };

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
        // TODO: Re-enable when service is fixed to return proper error code
        // assert.equal(error.statusCode, 400);
        return;
      }

      assert.fail("beginSearchAvailablePhoneNumbers should have thrown an exception.");
    }).timeout(60000);
  });
});
