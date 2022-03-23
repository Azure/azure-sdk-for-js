// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { assert } from "chai";
import { Context } from "mocha";
import { OperatorConnectRecordedClient } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`OperatorConnectClient - get operators list${useAad ? " [AAD]" : ""}`, function () {
    let client: OperatorConnectRecordedClient;

    beforeEach(function (this: Context) {
      client = new OperatorConnectRecordedClient(this, useAad);
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await client.stopRecorder();
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
