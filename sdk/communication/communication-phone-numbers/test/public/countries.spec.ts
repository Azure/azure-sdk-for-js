// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`PhoneNumbersClient - countries lists${useAad ? " [AAD]" : ""}`, () => {
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

    it("can list all available countries", { timeout: 60000 }, async () => {
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
    });
  });
});
