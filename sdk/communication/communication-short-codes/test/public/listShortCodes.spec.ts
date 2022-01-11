// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - lists Short Codes`, function () {
  let recorder: Recorder;
  let client: ShortCodesClient;

  beforeEach(function (this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function (this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can list all acquired short codes", async function () {
    for await (const shortCode of client.listShortCodes()) {
      assert.isNotNull(shortCode.number);
    }
  }).timeout(10000);
});
