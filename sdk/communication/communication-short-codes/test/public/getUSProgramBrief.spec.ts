// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - get US Program Brief`, function () {
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

  it("can get an existing US Program Brief", async function (this: Context) {
    const usProbramBriefId = "9fb78ef0-5704-4866-bca2-6a040ec83c0b";
    const { id } = await client.getUSProgramBrief(usProbramBriefId);

    assert.strictEqual(usProbramBriefId, id);
  }).timeout(60000);
});
