// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient, SearchAvailablePhoneNumbersRequest } from "@azure/communication-phone-numbers";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  const skipPhoneNumbersTests = env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";

  describe(
    `PhoneNumbersClient - lro - search${useAad ? " [AAD]" : ""}`,
    { skip: skipPhoneNumbersTests && !isPlaybackMode() },
    () => {
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

      beforeEach(async (ctx) => {
        ({ client, recorder } = useAad
          ? await createRecordedClientWithToken(ctx)!
          : await createRecordedClient(ctx));
      });

      afterEach(async () => {
        await recorder.stop();
      });

      it("can search for 1 available phone number by default", { timeout: 60000 }, async () => {
        const searchPoller = await client.beginSearchAvailablePhoneNumbers(searchRequest);

        const results = await searchPoller.pollUntilDone();
        assert.ok(searchPoller.getOperationState().isCompleted);
        assert.equal(results.phoneNumbers.length, 1);
      });

      it("throws on invalid search request", { timeout: 60000 }, async () => {
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
      });
    },
  );
});
