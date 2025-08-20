// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import type {
  PhoneNumberCapabilitiesRequest,
  PhoneNumbersClient,
} from "@azure/communication-phone-numbers";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { getPhoneNumber } from "./utils/testPhoneNumber.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  const skipPhoneNumbersTests =
    !isPlaybackMode() && env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";
  const skipUpdateCapabilitiesLiveTests =
    !isPlaybackMode() && env.SKIP_UPDATE_CAPABILITIES_LIVE_TESTS === "true";

  describe(
    `PhoneNumbersClient - lro - update${useAad ? " [AAD]" : ""}`,
    { skip: skipPhoneNumbersTests || skipUpdateCapabilitiesLiveTests },
    () => {
      const purchasedPhoneNumber = getPhoneNumber();
      const update: PhoneNumberCapabilitiesRequest = { calling: "none", sms: "outbound" };
      let recorder: Recorder;
      let client: PhoneNumbersClient;

      beforeEach(async (ctx) => {
        ({ client, recorder } = useAad
          ? await createRecordedClientWithToken(ctx)!
          : await createRecordedClient(ctx));
      });

      afterEach(async () => {
        await recorder.stop();
      });

      it("can update a phone number's capabilities", { timeout: 120000 }, async () => {
        const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
          purchasedPhoneNumber,
          update,
        );

        const phoneNumber = await updatePoller.pollUntilDone();
        await updatePoller.pollUntilDone();
        assert.ok(updatePoller.getOperationState().isCompleted);
        assert.deepEqual(phoneNumber.capabilities, update);
      });

      it("update throws when phone number is unauthorized", async () => {
        const fakeNumber = "+14155550100";
        try {
          const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
          await searchPoller.pollUntilDone();
        } catch (error: any) {
          assert.isTrue(
            isClientErrorStatusCode(error.statusCode),
            `Status code ${error.statusCode} does not indicate client error.`,
          );
          return;
        }

        assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
      });

      it("update throws when phone number is invalid", async () => {
        const fakeNumber = "invalid_phone_number";
        try {
          const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
          await searchPoller.pollUntilDone();
        } catch (error: any) {
          assert.isTrue(
            isClientErrorStatusCode(error.statusCode),
            `Status code ${error.statusCode} does not indicate client error.`,
          );
          return;
        }

        assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
      });

      it("update throws when phone number is empty", async () => {
        const fakeNumber = "";
        try {
          const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
          await searchPoller.pollUntilDone();
        } catch (error: any) {
          assert.equal(error.message, "phone number can't be empty");
          return;
        }

        assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
      });
    },
  );
});
