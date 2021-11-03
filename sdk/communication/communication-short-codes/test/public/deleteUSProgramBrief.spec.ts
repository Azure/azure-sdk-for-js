// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder, env } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[false]], async function (useAad) {
  describe(`ShortCodesClient - deletes US Program Brief${useAad ? " [AAD]" : ""}`, function () {
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

    it("can delete a specified US Program Brief", async function () {
      let guid = env.US_PROGRAM_BRIEF_ID;
      const delRes = await client.deleteUSProgramBrief(guid);
      //assert.match(programBrief.id, /\+\d{1}\d{3}\d{3}\d{4}/g);
      assert.isOk(delRes);
    }).timeout(60000);
  });
});
