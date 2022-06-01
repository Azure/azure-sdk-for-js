// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder, env, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumberCapabilitiesRequest, PhoneNumbersClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { getPhoneNumber } from "./utils/testPhoneNumber";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - lro - update${useAad ? " [AAD]" : ""}`, function () {
    const purchasedPhoneNumber = getPhoneNumber();
    const update: PhoneNumberCapabilitiesRequest = { calling: "none", sms: "outbound" };
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    before(function (this: Context) {
      const skipPhoneNumbersTests = env.COMMUNICATION_SKIP_INT_PHONENUMBERS_TESTS === "true";
      const skipUpdateCapabilitiesLiveTests =
        !isPlaybackMode() && env.SKIP_UPDATE_CAPABILITIES_LIVE_TESTS === "true";

      if (skipPhoneNumbersTests || skipUpdateCapabilitiesLiveTests) {
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

    it("can update a phone number's capabilities", async function () {
      const updatePoller = await client.beginUpdatePhoneNumberCapabilities(
        purchasedPhoneNumber,
        update
      );

      const phoneNumber = await updatePoller.pollUntilDone();
      await updatePoller.pollUntilDone();
      assert.ok(updatePoller.getOperationState().isCompleted);
      assert.deepEqual(phoneNumber.capabilities, update);
    }).timeout(120000);

    it("update throws when phone number isn't owned", async function () {
      const fakeNumber = "+14155550100";
      try {
        const searchPoller = await client.beginUpdatePhoneNumberCapabilities(fakeNumber, update);
        await searchPoller.pollUntilDone();
      } catch (error: any) {
        assert.equal(error.statusCode, 404);
        return;
      }

      assert.fail("beginUpdatePhoneNumberCapabilities should have thrown an exception.");
    });
  });
});
