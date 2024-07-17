// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { ShortCodesClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodeCostsClient - lists Short Code Costs`, function () {
  let recorder: Recorder;
  let client: ShortCodesClient;

  beforeEach(async function (this: Context) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all short code costs", async function () {
    let count = 0;
    for await (const shortCodeCost of client.listShortCodeCosts()) {
      count++;
      assert.isNotNull(shortCodeCost);
    }
    assert.isAtLeast(count, 3);
  }).timeout(30000);

  it("can list all short code costs, by Page", async function () {
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
  }).timeout(30000);
});
