// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient, SearchAvailablePhoneNumbersRequest } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - lro - search${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;
    const searchRequest: SearchAvailablePhoneNumbersRequest = {
      countryCode: "US",
      phoneNumberType: "tollFree",
      assignmentType: "application",
      capabilities: {
        sms: "none",
        calling: "outbound",
      },
    };

    before(function (this: Context) {
      const skipPhoneNumbersTests = env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";
      if (skipPhoneNumbersTests) {
        this.skip();
      }
    });

    beforeEach(function (this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedClientWithToken(this)!
        : createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can search for 1 available phone number by default", async function () {
      const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

      const results = await searchPoller.pollUntilDone();
      assert.ok(searchPoller.getOperationState().isCompleted);
      assert.equal(results.phoneNumbers.length, 1);
    }).timeout(60000);

    it("throws on invalid search request", async function () {
      // person and toll free is an invalid combination
      const invalidSearchRequest: SearchAvailablePhoneNumbersRequest = {
        countryCode: "US",
        phoneNumberType: "tollFree",
        assignmentType: "person",
        capabilities: {
          sms: "inbound+outbound",
          calling: "none",
        },
      };

      try {
        const searchPoller = await client.beginSearchAvailablePhoneNumbers(invalidSearchRequest);
        await searchPoller.pollUntilDone();
      } catch (error: any) {
        // TODO: Re-enable when service is fixed to return proper error code
        assert.equal(error.statusCode, 400);
        return;
      }

      assert.fail("beginSearchAvailablePhoneNumbers should have thrown an exception.");
    }).timeout(60000);
  });
});
