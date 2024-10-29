// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { ShortCodesClient } from "../../src";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - lists Short Codes`, function () {
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
