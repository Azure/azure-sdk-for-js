// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Context } from "mocha";
import type { Recorder } from "@azure-tools/test-recorder";
import type { ShortCodesClient } from "../../src/index.js";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient.js";

describe(`ShortCodesClient - lists Short Codes`, function () {
  let recorder: Recorder;
  let client: ShortCodesClient;

  beforeEach(async function (ctx) {
    ({ client, recorder } = await createRecordedClient(this));
  });

  afterEach(async function (ctx) {
    if (!ctx.task.pending) {
      await recorder.stop();
    }
  });

  it("can list all acquired short codes", async function () {
    for await (const shortCode of client.listShortCodes()) {
      assert.isNotNull(shortCode.value);
    }
  }).timeout(30000);

  it("can list all acquired short codes, by Page", async function () {
    const pages = client.listShortCodes().byPage();
    for await (const page of pages) {
      // loop over each item in the page
      for (const shortCode of page) {
        assert.isNotNull(shortCode.value);
      }
    }
  }).timeout(30000);
});
