// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import { createRecordedClient } from "./utils/recordedClient";
import { getTestUSProgramBrief } from "./utils/testUSProgramBrief";

describe(`ShortCodesClient - updates US Program Brief using upsert`, function () {
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

  it("can upsert a US Program Brief", async function () {
    const programBriefId = "2f129c97-701d-4ab8-913b-3c2625216ad9";
    const updatedDate = new Date();
    let uspb = getTestUSProgramBrief(programBriefId);
    uspb.programDetails!.description = 'TEST UPDATE' + updatedDate;
    const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb
    }

    const submitRes = await client.upsertUSProgramBrief(programBriefId, programBriefRequest);
    assert.isOk(submitRes);
  }).timeout(60000);
});
