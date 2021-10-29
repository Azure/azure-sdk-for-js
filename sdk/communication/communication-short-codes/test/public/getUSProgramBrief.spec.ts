// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`ShortCodesClient - get US Program Brief${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: ShortCodesClient;

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

    it("can get an existing US Program Brief", async function (this: Context) {
      //const purchasedPhoneNumber = isPlaybackMode() ? "+14155550100" : env.AZURE_PHONE_NUMBER;
      const usProbramBriefId = "todo guid";
      const { id } = await client.getUSProgramBrief(usProbramBriefId);

      assert.strictEqual(usProbramBriefId, id);
    }).timeout(60000);

    // it("errors if phone number not found", async function () {
    //   const fake = "+14155550100";
    //   try {
    //     await client.getPurchasedPhoneNumber(fake);
    //   } catch (error) {
    //     assert.strictEqual(error.code, "NotFound");
    //     assert.strictEqual(error.message, "Input phoneNumber +14155550100 cannot be found.");
    //   }
    // });
  });
});
