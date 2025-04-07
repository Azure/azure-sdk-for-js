// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { PhoneNumbersClient } from "../../src/index.js";
import { createRecordedClient, createRecordedClientWithToken } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getAzurePhoneNumber } from "../utils/injectables.js";

describe.each([true, false])(`PhoneNumbersClient - get phone number (AAD = %s)`, (useAad) => {
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

  it("can get a purchased phone number", { timeout: 60000 }, async () => {
    const purchasedPhoneNumber = getAzurePhoneNumber();
    const { phoneNumber } = await client.getPurchasedPhoneNumber(purchasedPhoneNumber);

    assert.strictEqual(purchasedPhoneNumber, phoneNumber);
  });

  it("errors if phone number not found", async () => {
    const fake = "+14155550100";
    try {
      await client.getPurchasedPhoneNumber(fake);
    } catch (error: any) {
      assert.strictEqual(error.code, "NotFound");
      assert.strictEqual(error.message, "Input phoneNumber +14155550100 cannot be found.");
    }
  });
});
