// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { ListLocalitiesOptions, PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`PhoneNumbersClient - localities lists${useAad ? " [AAD]" : ""}`, () => {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    beforeEach(async (ctx) => {
      ({ client, recorder } = useAad
        ? await createRecordedClientWithToken(ctx)!
        : await createRecordedClient(ctx));
    });

    afterEach(async () => {
      await recorder.stop();
    });

    it("can list available localities", { timeout: 60000 }, async () => {
      const responseLocalities = [];
      for await (const locality of client.listAvailableLocalities("US")) {
        responseLocalities.push(locality);
      }
      assert.isNotEmpty(responseLocalities);
    });

    it(
      "can list available localities with administrative division",
      { timeout: 60000 },
      async () => {
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
      },
    );

    it("can list available mobile localities", { timeout: 60000 }, async () => {
      const responseLocalities = [];
      const options: ListLocalitiesOptions = {
        phoneNumberType: "mobile",
      };

      for await (const locality of client.listAvailableLocalities("IE", options)) {
        responseLocalities.push(locality);
      }
      assert.isNotEmpty(responseLocalities);
    });
  });
});
