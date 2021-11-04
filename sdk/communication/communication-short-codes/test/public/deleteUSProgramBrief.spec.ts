// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - deletes US Program Brief`, function() {
  let recorder: Recorder;
  let client: ShortCodesClient;

  beforeEach(function(this: Context) {
    ({ client, recorder } = createRecordedClient(this));
  });

  afterEach(async function(this: Context) {
    if (!this.currentTest?.isPending()) {
      await recorder.stop();
    }
  });

  it("can delete a specified US Program Brief", async function() {
    const guid = "2f129c97-701d-4ab8-913b-3c2625216ad9";
    const delRes = await client.deleteUSProgramBrief(guid);
    assert.isOk(delRes);
  }).timeout(60000);
});
