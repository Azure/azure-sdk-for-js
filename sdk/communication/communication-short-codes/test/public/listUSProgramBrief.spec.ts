// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - lists US Program Brief`, function() {
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

  it("can list all US Program Briefs", async function() {
    for await (const programBrief of client.listUSProgramBriefs()) {
      assert.isNotNull(programBrief.id);
      assert.match(programBrief.id, /\+\d{1}\d{3}\d{3}\d{4}/g);
    }
  }).timeout(60000);
});
