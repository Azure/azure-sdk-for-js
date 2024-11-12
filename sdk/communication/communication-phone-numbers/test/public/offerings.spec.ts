// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - offerings lists${useAad ? " [AAD]" : ""}`, function () {
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

    it("can list available offerings", async function () {
      const responseOfferings = [];
      for await (const offering of client.listAvailableOfferings("US")) {
        responseOfferings.push(offering);
      }
      assert.isNotEmpty(responseOfferings);
    }).timeout(60000);
  });
});
