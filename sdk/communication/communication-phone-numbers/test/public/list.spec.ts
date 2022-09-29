// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import {
  ListLocalitiesOptions,
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumbersClient,
} from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - lists${useAad ? " [AAD]" : ""}`, function () {
    let recorder: Recorder;
    let client: PhoneNumbersClient;

    beforeEach(function (this: Context) {
      ({ client, recorder } = useAad
        ? createRecordedClientWithToken(this)!
        : createRecordedClient(this));
    });

    afterEach(async function (this: Context) {
      if (!this.currentTest?.isPending()) {
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

    it("can list all available countries", async function () {
      const countriesList = [
        {
          localizedName: "Canada",
          countryCode: "CA",
        },
        {
          localizedName: "Puerto Rico",
          countryCode: "PR",
        },
        {
          localizedName: "United Kingdom",
          countryCode: "GB",
        },
        {
          localizedName: "United States",
          countryCode: "US",
        },
      ];
      const responseCountries = [];
      for await (var country of client.listAvailableCountries()) {
        responseCountries.push(country);
      }
      for (var country of countriesList) {
        assert.deepInclude(responseCountries, country);
      }
    }).timeout(60000);

    it("can list all geographic area codes", async function () {
      var geographicAreaCodesList = [
        {
          areaCode: "214",
        },
        {
          areaCode: "469",
        },
        {
          areaCode: "972",
        },
        {
          areaCode: "945",
        },
      ];
      const request: PhoneNumbersListAreaCodesOptionalParams = {
        locality: "Dallas",
      };
      const areaCodes = await client.listAvailableGeographicAreaCodes("US", request);
      for await (var areaCode of areaCodes) {
        assert.deepInclude(geographicAreaCodesList, areaCode);
      }
    }).timeout(60000);

    it("can list all toll free area codes", async function () {
      const tollFreeAreaCodesList = [
        {
          areaCode: "888",
        },
        {
          areaCode: "877",
        },
        {
          areaCode: "866",
        },
        {
          areaCode: "855",
        },
        {
          areaCode: "844",
        },
        {
          areaCode: "800",
        },
        {
          areaCode: "833",
        },
        {
          areaCode: "88",
        },
      ];
      const areaCodes = await client.listAvailableTollFreeAreaCodes("US");
      for await (var areaCode of areaCodes) {
        assert.deepInclude(tollFreeAreaCodesList, areaCode);
      }
    }).timeout(60000);

    it("can list available localities", async function () {
      const responseLocalities = [];
      for await (var locality of client.listAvailableLocalities("US")) {
        responseLocalities.push(locality);
      }
      assert.isNotEmpty(responseLocalities);
    }).timeout(60000);

    it("can list available localities with administrative division", async function () {
      const request: ListLocalitiesOptions = {
        administrativeDivision: "WA",
      };

      for await (var locality of client.listAvailableLocalities("US", request)) {
        assert.equal(locality.administrativeDivision?.abbreviatedName, "WA");
      }
    }).timeout(60000);

    it("can list available offerings", async function () {
      const responseOfferings = [];
      for await (var offering of client.listAvailableOfferings("US")) {
        responseOfferings.push(offering);
      }
      assert.isNotEmpty(responseOfferings);
    }).timeout(60000);
  });
});
