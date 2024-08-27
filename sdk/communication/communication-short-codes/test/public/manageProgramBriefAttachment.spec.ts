// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ProgramBriefAttachment,
  ShortCodesClient,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief,
} from "../../src";
import {
  doesProgramBriefContainAnyAttachment,
  getProgramBriefAttachmentsWithId,
  getProgramBriefAttachmentsWithIdByPage,
  getTestProgramBriefAttachment,
} from "./utils/testProgramBriefAttachment";
import {
  doesProgramBriefExist,
  getTestUSProgramBrief,
  runTestCleaningLeftovers,
} from "./utils/testUSProgramBrief";
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

  const _createTestProgramBrief = async (uspb: USProgramBrief): Promise<void> => {
    const createRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb,
    };

    // before test begins, make sure program brief does not exist, clean up if necessary
    if (await doesProgramBriefExist(client, uspb.id)) {
      console.warn(
        "Program brief should not exist, it has not yet been created. Cleaning up program brief.",
      );
      await client.deleteUSProgramBrief(uspb.id);
      if (await doesProgramBriefExist(client, uspb.id)) {
        assert.fail("Program brief should not exist, and could not be deleted");
      }
    }

    // create program brief by calling upsert
    const submitResult = await client.upsertUSProgramBrief(uspb.id, createRequest);
    assert.isOk(submitResult, "Failed to create program brief");
    assert.equal(uspb.id, submitResult.id, "Program brief creation returned the wrong Id");

    assert.isFalse(
      await doesProgramBriefContainAnyAttachment(client, uspb.id),
      "Recently created Program Brief already contain attachments",
    );
  };

  const _listProgramBriefAttachments = async (
    programBriefId: string,
    expectedAttachments: ProgramBriefAttachment[],
    byPage?: boolean,
  ): Promise<void> => {
    // create map of expected ids
    const expectedAttachmentMap: Record<
      string,
      { attachment: ProgramBriefAttachment; found: boolean }
    > = {};
    expectedAttachments.forEach((attachment) => {
      expectedAttachmentMap[attachment.id] = { attachment: attachment, found: false };
    });
    let actualAttachments = [];
    if (byPage) {
      actualAttachments = await getProgramBriefAttachmentsWithIdByPage(
        client,
        programBriefId,
        expectedAttachments.map((item) => item.id),
      );
    } else {
      actualAttachments = await getProgramBriefAttachmentsWithId(
        client,
        programBriefId,
        expectedAttachments.map((item) => item.id),
      );
    }
    actualAttachments.forEach((attachment) => {
      if (expectedAttachmentMap[attachment.id]) {
        expectedAttachmentMap[attachment.id].found = true;
      }
    });
    // make sure all expected briefs were found
    const attachmentsNotFound: string[] = [];
    Object.values(expectedAttachmentMap).map((expectedAttachment) => {
      if (!expectedAttachment.found) {
        attachmentsNotFound.push(expectedAttachment.attachment.id);
      }
    });
    const notFoundErrorMsg = byPage
      ? "Attachments not found while listUSProgramBriefAttachments byPage"
      : "Attachments not found while listUSProgramBriefAttachments";
    assert.isTrue(
      attachmentsNotFound.length === 0,
      `${notFoundErrorMsg} : ${attachmentsNotFound.join(",")}`,
    );
  };

  const _testListAttachments = async (
    programBriefId: string,
    expectedAttachments: ProgramBriefAttachment[],
  ): Promise<boolean> => {
    // list program briefs, validate test program brief is in the list
    const listAttachments = _listProgramBriefAttachments(programBriefId, expectedAttachments);
    // test pagination, using 2 pages
    const listAttachmentsByPage = _listProgramBriefAttachments(
      programBriefId,
      expectedAttachments,
      true,
    );
    assert.isOk(
      await Promise.all([listAttachments, listAttachmentsByPage]),
      "Something went wrong while listing attachments",
    );
    return true;
  };

  it("can manage Attachments", async function () {
    const uspb = getTestUSProgramBrief();
    const pbTestId = recorder.variable(`pb-var`, uspb.id);
    uspb.id = pbTestId;

    const testAttachments = [getTestProgramBriefAttachment(), getTestProgramBriefAttachment()];
    const expectedAttachmentsMap: Record<
      string,
      { attachment: ProgramBriefAttachment; found: boolean }
    > = {};

    // override test brief id with variable id
    testAttachments.map((attachment, index) => {
      const attachmentTestId = recorder.variable(`attachment-var-${index}`, attachment.id);
      attachment.id = attachmentTestId;
      expectedAttachmentsMap[attachment.id] = { attachment: attachment, found: false };
      return attachment.id;
    });

    await runTestCleaningLeftovers([uspb.id], client, async () => {
      await _createTestProgramBrief(uspb);

      // validate upsert and update for each test brief
      const testPBAttachments = testAttachments.map(async (attachment) => {
        // create attachment
        const attachmentCreationResult = await client.createOrReplaceUSProgramBriefAttachment(
          uspb.id,
          attachment.id,
          attachment.fileName,
          attachment.fileType,
          attachment.fileContentBase64,
          attachment.type,
        );
        assert.isOk(attachmentCreationResult);
        // fetch attachment
        const existingAttachment = await client.getUSProgramBriefAttachment(uspb.id, attachment.id);
        assert.equal(existingAttachment.id, attachment.id);
        assert.equal(existingAttachment.fileName, attachment.fileName);
        assert.equal(existingAttachment.fileType, attachment.fileType);
        assert.equal(existingAttachment.type, attachment.type);
        return true;
      });
      assert.isOk(
        await Promise.all(testPBAttachments),
        "There was an issue while creating and verifying attachments",
      );

      // test list attachments
      assert.isOk(await _testListAttachments(uspb.id, testAttachments));

      // delete attachments
      const testDeleteAttachments = testAttachments.map(async (attachment) => {
        const delRes = await client.deleteUSProgramBriefAttachment(uspb.id, attachment.id);
        assert.isOk(delRes, `Deleting Program Brief Attachment failed: ${attachment.id}`);
        return true;
      });
      assert.isOk(await Promise.all(testDeleteAttachments));

      assert.isFalse(
        await doesProgramBriefContainAnyAttachment(client, uspb.id),
        "Failed to delete Program Brief Attachments",
      );

      // delete program brief, ensure it was removed
      const delRes = await client.deleteUSProgramBrief(uspb.id);
      assert.isOk(delRes, "Deleting program brief failed");
      assert.isFalse(
        await doesProgramBriefExist(client, uspb.id),
        "Delete program brief was unsuccessful, program brief is still returned",
      );
    });
  }).timeout(80000);
});
