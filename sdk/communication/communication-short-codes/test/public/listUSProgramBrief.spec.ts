// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`ShortCodesClient - lists${useAad ? " [AAD]" : ""}`, function () {
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

    it("can list all US Program Briefs", async function () {
      let all = 0;
      for await (const programBrief of client.listUSProgramBriefs()) {
        //assert.match(programBrief.id, /\+\d{1}\d{3}\d{3}\d{4}/g);
        assert.isNotNull(programBrief.id);
        all++;
      }

      assert.isTrue(all > 0);
    }).timeout(60000);
  });
});
