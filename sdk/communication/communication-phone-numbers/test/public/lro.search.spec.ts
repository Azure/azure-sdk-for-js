// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient, SearchAvailablePhoneNumbersRequest } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

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

    before(function (ctx) {
      const skipPhoneNumbersTests = env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";
      if (skipPhoneNumbersTests && !isPlaybackMode()) {
        ctx.skip();
      }
    });

    beforeEach(async function (ctx) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)!
        : await createRecordedClient(this));
    });

    afterEach(async function (ctx) {
      if (!ctx.task.pending) {
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
        assert.isTrue(
          isClientErrorStatusCode(error.statusCode),
          `Status code ${error.statusCode} does not indicate client error.`,
        );
        return;
      }

      assert.fail("beginSearchAvailablePhoneNumbers should have thrown an exception.");
    }).timeout(60000);
  });
});
