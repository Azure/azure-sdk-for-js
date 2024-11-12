// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - lists${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    beforeEach(async function (ctx) {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(this)!
        : await createRecordedClient(this));
    });

    afterEach(async function (ctx) {
      if (!ctx.task.pending) {
        await recorder.stop();
      }
    });

    it("can list all purchased phone numbers", async function () {
      let all = 0;
      for await (const purchased of client.listPurchasedPhoneNumbers()) {
        assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
        all++;
      }

      assert.isTrue(all > 0);
    }).timeout(60000);
  });
});
