// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";
import { getTestUSProgramBrief } from "./utils/testUSProgramBrief";

describe(`ShortCodesClient - creates US Program Brief using upsert`, function() {
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

  it("can upsert a US Program Brief", async function() {
    const programBriefId = "2f129c97-701d-4ab8-913b-3c2625216ad9";
    const uspb = getTestUSProgramBrief(programBriefId);
    const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb
    };

    const submitRes = await client.upsertUSProgramBrief(programBriefId, programBriefRequest);
    console.log(submitRes._response.parsedBody["id"]);
    assert.isOk(submitRes);
  }).timeout(60000);
});
