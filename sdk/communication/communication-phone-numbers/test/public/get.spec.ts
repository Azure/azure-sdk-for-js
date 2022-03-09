// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";
import { getPhoneNumber } from "./utils/testPhoneNumber";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - get phone number${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

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

    it("can get a purchased phone number", async function (this: Context) {
      const purchasedPhoneNumber = getPhoneNumber();
      const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);

      assert.strictEqual(purchasedPhoneNumber, phoneNumber);
    }).timeout(60000);

    it("errors if phone number not found", async function () {
      const fake = "+14155550100";
      try {
        await client.getPurchasedPhoneNumber(fake);
      } catch (error: any) {
        assert.strictEqual(error.code, "NotFound");
        assert.strictEqual(error.message, "Input phoneNumber +14155550100 cannot be found.");
      }
    });
  });
});
