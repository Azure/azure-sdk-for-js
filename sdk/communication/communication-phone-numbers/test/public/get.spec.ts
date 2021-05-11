// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder, env, isPlaybackMode } from "@azure/test-utils-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../../src";
import {
  createRecordedClient,
  createRecordedClientWithToken
} from "./utils/recordedClient";

matrix([[true, false]], async function(useAad) {
  describe(`PhoneNumbersClient - get phone number${useAad ? " [AAD]" : ""}`, function() {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

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

    it("can get a purchased phone number", async function(this: Context) {
      const purchasedPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
      const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);

      assert.strictEqual(purchasedPhoneNumber, phoneNumber);
    }).timeout(10000);

    it("errors if phone number not found", async function() {
      const fake = "+14155550100";
      try {
        await client.getPurchasedPhoneNumber(fake);
      } catch (e) {
        assert.strictEqual(e.code, "PhoneNumberNotFound");
        assert.strictEqual(e.message, "The specified phone number +14155550100 cannot be found.");
      }
    });
  });
});
