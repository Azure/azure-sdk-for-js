// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type {
  PhoneNumbersListAreaCodesOptionalParams,
  PhoneNumbersClient,
} from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`PhoneNumbersClient - area codes lists${useAad ? " [AAD]" : ""}`, () => {
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

    it("can list all geographic area codes", { timeout: 60000 }, async () => {
      const availableLocalities = await client.listAvailableLocalities("US");
      const locality = await availableLocalities.next();
      const request: PhoneNumbersListAreaCodesOptionalParams = {
        locality: locality.value.localizedName,
        administrativeDivision: locality.value.administrativeDivision.abbreviatedName,
      };
      const areaCodes = await client.listAvailableGeographicAreaCodes("US", request);
      for await (const areaCode of areaCodes) {
        assert.isNotNull(areaCode);
      }
    });

    it("can list all toll free area codes", { timeout: 60000 }, async () => {
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
      for await (const areaCode of areaCodes) {
        assert.deepInclude(tollFreeAreaCodesList, areaCode);
      }
    });

    it("can list all mobile area codes", { timeout: 60000 }, async () => {
      const availableLocalities = await client.listAvailableLocalities("IE", {
        phoneNumberType: "mobile",
      });
      const locality = await availableLocalities.next();
      const request: PhoneNumbersListAreaCodesOptionalParams = {
        locality: locality.value.localizedName,
      };
      const areaCodes = await client.listAvailableMobileAreaCodes("IE", request);
      for await (const areaCode of areaCodes) {
        assert.isNotNull(areaCode);
      }
    });
  });
});
