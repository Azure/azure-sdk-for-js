// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { createRecordedOcClient, createRecordedOcClientWithToken } from "./utils/recordedClient";
import { OperatorConnectClient } from "../../src";

matrix([[true, false]], async function (useAad) {
  describe(`OperatorConnectClient - get operators list${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: OperatorConnectClient;

    beforeEach(function (this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedOcClientWithToken(this)!
        : createRecordedOcClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can retrieve operators list", async function (this: Context) {
      let all = 0;
      for await (const operator of client.listOperators()) {
        assert.isNotEmpty(operator.friendlyName);
        all++;
      }

      assert.isTrue(all > 0);
    }).timeout(60000);
  });
});
