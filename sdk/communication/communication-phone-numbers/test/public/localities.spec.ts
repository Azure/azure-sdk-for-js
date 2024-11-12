// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { ListLocalitiesOptions, PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - localities lists${useAad ? " [AAD]" : ""}`, function () {
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

    it("can list available localities", async function () {
      const responseLocalities = [];
      for await (const locality of client.listAvailableLocalities("US")) {
        responseLocalities.push(locality);
      }
      assert.isNotEmpty(responseLocalities);
    }).timeout(60000);

    it("can list available localities with administrative division", async function () {
      const availableLocalities = await client.listAvailableLocalities("US");
      const firstLocality = await availableLocalities.next();
      const request: ListLocalitiesOptions = {
        administrativeDivision: firstLocality.value.administrativeDivision.abbreviatedName,
      };

      for await (const locality of client.listAvailableLocalities("US", request)) {
        assert.equal(
          locality.administrativeDivision?.abbreviatedName,
          firstLocality.value.administrativeDivision.abbreviatedName,
        );
      }
    }).timeout(60000);
  });
});
