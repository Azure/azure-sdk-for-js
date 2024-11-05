// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils";
import type { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import type { Context } from "mocha";
import type { PhoneNumbersClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - offerings lists${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    beforeEach(async function (this: Context) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)!
        : await createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
        await recorder.stop();
      }
    });

    it("can list available offerings", async function () {
      const responseOfferings = [];
      for await (const offering of client.listAvailableOfferings("US")) {
        responseOfferings.push(offering);
      }
      assert.isNotEmpty(responseOfferings);
    }).timeout(60000);
  });
});
