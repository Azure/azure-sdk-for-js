// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";
import { getTestUSProgramBrief } from "./utils/testUSProgramBrief";

describe(`ShortCodesClient - creates US Program Brief using upsert`, function () {
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

  it("can create, get and delete a US Program Brief", async function () {
    const uspb = getTestUSProgramBrief();
    const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb,
    };

    const submitRes = await client.upsertUSProgramBrief(uspb.id, programBriefRequest);
    console.log(submitRes.id);
    assert.isOk(submitRes);

    const { id } = await client.getUSProgramBrief(uspb.id);
    assert.strictEqual(uspb.id, id);

    const delRes = await client.deleteUSProgramBrief(id);
    assert.isOk(delRes);
  }).timeout(15000);
});
