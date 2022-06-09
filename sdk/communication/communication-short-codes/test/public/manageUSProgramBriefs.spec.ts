// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ShortCodesClient, ShortCodesUpsertUSProgramBriefOptionalParams } from "../../src";
import {
  assertEditableFieldsAreEqual,
  doesProgramBriefExist,
  getTestUSProgramBrief,
} from "./utils/testUSProgramBrief";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecordedClient } from "./utils/recordedClient";

describe(`ShortCodesClient - creates, gets, updates, lists, and deletes US Program Brief`, function () {
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

  it("can create, get, update, list, and delete a US Program Brief", async function () {
    const uspb = getTestUSProgramBrief();
    const createRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: uspb,
    };
    const updateRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: {
        id: uspb.id,
        programDetails: {
          signUpUrl: "https://endpoint/updated-sign-up",
          privacyPolicyUrl: "https://endpoint/updated-privacy",
          termsOfServiceUrl: "https://endpoint/updated-terms",
        },
      },
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
    const submitResult = await client.upsertUSProgramBrief(uspb.id, createRequest);
    assert.isOk(submitResult, "Failed to create program brief");
    assert.equal(uspb.id, submitResult.id, "Program brief creation returned the wrong Id");

    // get program brief, verify it was created correctly
    let getRes = await client.getUSProgramBrief(uspb.id);
    assertEditableFieldsAreEqual(uspb, getRes, "get after initial create");

    // update program brief by calling upsert
    if (uspb.programDetails) {
      uspb.programDetails.signUpUrl = updateRequest.body?.programDetails?.signUpUrl;
      uspb.programDetails.privacyPolicyUrl = updateRequest.body?.programDetails?.privacyPolicyUrl;
      uspb.programDetails.termsOfServiceUrl = updateRequest.body?.programDetails?.termsOfServiceUrl;
    }

    const updateResult = await client.upsertUSProgramBrief(uspb.id, updateRequest);
    assert.isOk(updateResult, "Update program brief failed");
    assert.equal(uspb.id, updateResult.id, "Update program brief returned the wrong Id");

    // get program brief, verify it was updated correctly
    getRes = await client.getUSProgramBrief(uspb.id);
    assertEditableFieldsAreEqual(uspb, getRes, "get after update");

    // list program briefs, validate test program brief is in the list
    let foundTestProgramBrief = false;
    for await (const pb of client.listUSProgramBriefs()) {
      if (pb.id === uspb.id) {
        foundTestProgramBrief = true;
        assertEditableFieldsAreEqual(uspb, pb, "list all program briefs");
      }
    }
    assert.isTrue(
      foundTestProgramBrief,
      "Test program brief was not returned in list of all program briefs"
    );

    // delete program brief, ensure it was removed
    const delRes = await client.deleteUSProgramBrief(uspb.id);
    assert.isOk(delRes, "Deleting program brief failed");
    assert.isFalse(
      await doesProgramBriefExist(client, uspb.id),
      "Delete program brief was unsuccessful, program brief is still returned"
    );
  }).timeout(35000);
});
