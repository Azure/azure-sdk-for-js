// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`ShortCodesClient - submits Short Code${useAad ? " [AAD]" : ""}`, function () {
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

    it("can submit a US Program Brief", async function () {
      const programBriefId = "todo: generate guid";
      const submitRes = await client.submitUSProgramBrief(programBriefId);
      assert.isOk(submitRes);
    }).timeout(60000);
  });
});
