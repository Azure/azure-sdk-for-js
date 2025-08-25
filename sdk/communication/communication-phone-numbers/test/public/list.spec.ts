// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { matrix } from "@azure-tools/test-utils-vitest";
import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "@azure/communication-phone-numbers";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

matrix([[true, false]], async (useAad) => {
  describe(`PhoneNumbersClient - lists${useAad ? " [AAD]" : ""}`, () => {
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

    it("can list all purchased phone numbers", { timeout: 60000 }, async () => {
      let all = 0;
      for await (const purchased of client.listPurchasedPhoneNumbers()) {
        assert.match(purchased.phoneNumber, /\+\d{1}\d{3}\d{3}\d{4}/g);
        all++;
      }

      assert.isTrue(all > 0);
    });
  });
});
