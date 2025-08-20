// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import type { ShortCodesClient } from "@azure-tools/communication-short-codes";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`ShortCodesClient - lists Short Codes`, () => {
  let recorder: Recorder;
  let client: ShortCodesClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can list all acquired short codes", { timeout: 30000 }, async () => {
    for await (const shortCode of client.listShortCodes()) {
      assert.isNotNull(shortCode.value);
    }
  });

  it("can list all acquired short codes, by Page", { timeout: 30000 }, async () => {
    const pages = client.listShortCodes().byPage();
    for await (const page of pages) {
      // loop over each item in the page
      for (const shortCode of page) {
        assert.isNotNull(shortCode.value);
      }
    }
  });
});
