// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { matrix } from "@azure/test-utils";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import {
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumbersClient,
} from "../../src";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient";

matrix([[true, false]], async function (useAad) {
  describe(`PhoneNumbersClient - area codes lists${useAad ? " [AAD]" : ""}`, function () {
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
  });
});
