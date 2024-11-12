// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - countries lists${useAad ? " [AAD]" : ""}`, function () {
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

    it("can list all available countries", async function () {
      const countriesList = [
        {
          localizedName: "Canada",
          countryCode: "CA",
        },
        {
          localizedName: "United States",
          countryCode: "US",
        },
      ];
      const responseCountries = [];
      for await (const country of client.listAvailableCountries()) {
        responseCountries.push(country);
      }
      for (const currentCountry of countriesList) {
        assert.deepInclude(responseCountries, currentCountry);
      }
      setLogLevel("error");
    }).timeout(60000);
  });
});
