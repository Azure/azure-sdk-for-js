// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Recorder } from "@azure-tools/test-recorder";
import type { ShortCodesClient } from "@azure-tools/communication-short-codes";
import { createRecordedClient } from "./utils/recordedClient.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe(`ShortCodeCostsClient - lists Short Code Costs`, function () {
  let recorder: Recorder;
  let client: ShortCodesClient;

  beforeEach(async (ctx) => {
    ({ client, recorder } = await createRecordedClient(ctx));
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("can list all short code costs", { timeout: 30000 }, async () => {
    let count = 0;
    for await (const shortCodeCost of client.listShortCodeCosts()) {
      count++;
      assert.isNotNull(shortCodeCost);
    }
    assert.isAtLeast(count, 3);
  });

  it("can list all short code costs, by Page", { timeout: 30000 }, async () => {
    const pages = client.listShortCodeCosts({ top: 1 }).byPage();
    for await (const page of pages) {
      if (page.length === 0) {
        break;
      }

      // loop over each item in the page
      for (const shortCodeCost of page) {
        assert.isNotNull(shortCodeCost);
      }
    }
  });
});
