// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { matrix } from "@azure-tools/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { PhoneNumbersClient } from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - countries lists${useAad ? " [AAD]" : ""}`, function () {
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
