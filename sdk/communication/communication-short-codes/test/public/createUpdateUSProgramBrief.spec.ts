// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";
import { getTestUSProgramBrief } from "./utils/testUSProgramBrief";

describe(`ShortCodesClient - updates US Program Brief using upsert`, function () {
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

  it("can create and update a US Program Brief", async function () {
    const uspb = getTestUSProgramBrief();
    const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb,
    };
    const submitRes = await client.upsertUSProgramBrief(uspb.id, programBriefRequest);
    assert.isOk(submitRes);

    uspb.programDetails!.description = "TEST UPDATE";
    programBriefRequest.body = uspb;

    const updateRes = await client.upsertUSProgramBrief(uspb.id, programBriefRequest);

    assert.isOk(updateRes);
    assert.equal(updateRes.programDetails?.description, uspb.programDetails?.description);
  }).timeout(15000);
});
