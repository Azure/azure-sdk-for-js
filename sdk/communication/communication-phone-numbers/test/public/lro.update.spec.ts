// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import type { Context } from "mocha";
import type { PhoneNumberCapabilitiesRequest, PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { getPhoneNumber } from "./utils/testPhoneNumber.js";
import { isClientErrorStatusCode } from "./utils/statusCodeHelpers.js";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - lro - update${useAad ? " [AAD]" : ""}`, function () {
    const purchasedPhoneNumber = getPhoneNumber();
    const update: PhoneNumberCapabilitiesRequest = { calling: "none", sms: "outbound" };
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    before(function (ctx) {
      const skipPhoneNumbersTests =
        !isPlaybackMode() && env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";
      const skipUpdateCapabilitiesLiveTests =
        !isPlaybackMode() && env.SKIP_UPDATE_CAPABILITIES_LIVE_TESTS === "true";

      if (skipPhoneNumbersTests || skipUpdateCapabilitiesLiveTests) {
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

    it("can update a phone number's capabilities", async function () {
      const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
        purchasedPhoneNumber,
        update,
      );

      const phoneNumber = await updatePoller.pollUntilDone();
      await updatePoller.pollUntilDone();
      assert.ok(updatePoller.getOperationState().isCompleted);
      assert.deepEqual(phoneNumber.capabilities, update);
    }).timeout(120000);

    it("update throws when phone number is unauthorized", async function () {
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

    it("update throws when phone number is invalid", async function () {
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

    it("update throws when phone number is empty", async function () {
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
  });
});
