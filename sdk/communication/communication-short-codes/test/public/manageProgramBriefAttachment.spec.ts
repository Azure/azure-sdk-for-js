// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import {
  doesProgramBriefContainAnyAttachment,
  getProgramBriefAttachmentWithId,
  getTestProgramBriefAttachment,
} from "./utils/testProgramBriefAttachment";
import { doesProgramBriefExist, getTestUSProgramBrief } from "./utils/testUSProgramBrief";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - manage Attachments`, function () {
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

  it("can manage Attachments", async function () {
    const uspb = getTestUSProgramBrief();
    const programBriefRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb,
    };

    // before test begins, make sure program brief does not exist, clean up if necessary
    if (await doesProgramBriefExist(client, uspb.id)) {
      console.warn(
        "Program brief should not exist, it has not yet been created. Cleaning up program brief."
      );
      await client.deleteUSProgramBrief(uspb.id);
      if (await doesProgramBriefExist(client, uspb.id)) {
        assert.fail("Program brief should not exist, and could not be deleted");
      }
    }

    // create program brief by calling upsert
    const submitResult = await client.upsertUSProgramBrief(uspb.id, programBriefRequest);
    assert.isOk(submitResult);

    const attachment = getTestProgramBriefAttachment();

    assert.isFalse(
      await doesProgramBriefContainAnyAttachment(client, uspb.id),
      "Recently created Program Brief already contain attachments"
    );

    const attachmentCreationResult = await client.createOrReplaceUSProgramBriefAttachment(
      uspb.id,
      attachment.id,
      attachment.fileName,
      attachment.fileType,
      attachment.fileContentBase64,
      attachment.type
    );

    assert.isOk(attachmentCreationResult);

    const existingAttachment = await client.getUSProgramBriefAttachment(uspb.id, attachment.id);

    assert.equal(existingAttachment.id, attachment.id);
    assert.equal(existingAttachment.fileName, attachment.fileName);
    assert.equal(existingAttachment.fileType, attachment.fileType);
    assert.equal(existingAttachment.type, attachment.type);

    const listedAttachment = await getProgramBriefAttachmentWithId(client, uspb.id, attachment.id);

    assert.isOk(listedAttachment);

    let delRes = await client.deleteUSProgramBriefAttachment(uspb.id, attachment.id);
    assert.isOk(delRes, "Deleting Program Brief Attachment failed");

    assert.isFalse(
      await doesProgramBriefContainAnyAttachment(client, uspb.id),
      "Failed to delete Program Brief Attachment"
    );

    // delete program brief, ensure it was removed
    delRes = await client.deleteUSProgramBrief(uspb.id);
    assert.isOk(delRes, "Deleting program brief failed");
    assert.isFalse(
      await doesProgramBriefExist(client, uspb.id),
      "Delete program brief was unsuccessful, program brief is still returned"
    );
  }).timeout(50000);
});
