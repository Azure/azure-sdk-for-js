// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ShortCodesClient,
  ShortCodesUpsertUSProgramBriefOptionalParams,
  USProgramBrief,
} from "../../src";
import {
  assertEditableFieldsAreEqual,
  doesProgramBriefExist,
  getTestUSProgramBrief,
  runTestCleaningLeftovers,
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
  };

  const _updateUSProgramBrief = async (uspb: USProgramBrief): Promise<void> => {
    const updateRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
      body: {
        id: uspb.id,
        programDetails: {
          callToActionUrl: "https://endpoint/updated-sign-up",
          privacyPolicyUrl: "https://endpoint/updated-privacy",
          termsOfServiceUrl: "https://endpoint/updated-terms",
        },
      },
    };

    // update program brief by calling upsert
    if (uspb.programDetails) {
      uspb.programDetails.callToActionUrl = updateRequest.body?.programDetails?.callToActionUrl;
      uspb.programDetails.privacyPolicyUrl = updateRequest.body?.programDetails?.privacyPolicyUrl;
      uspb.programDetails.termsOfServiceUrl = updateRequest.body?.programDetails?.termsOfServiceUrl;
    }

    const updateResult = await client.upsertUSProgramBrief(uspb.id, updateRequest);
    assert.isOk(updateResult, "Update program brief failed");
    assert.equal(uspb.id, updateResult.id, "Update program brief returned the wrong Id");

    // get program brief, verify it was updated correctly
    const actualProgramBrief = await client.getUSProgramBrief(uspb.id);
    assertEditableFieldsAreEqual(uspb, actualProgramBrief, "get after update");
  };

  const _listUSProgramBriefs = async (): Promise<number> => {
    // due to concurrency issues in different OSs, we cannot verify that the expected briefs are found in each page
    let totalNumberOfbriefs = 0;
    // list program briefs, validate test program brief is in the list
    for await (const pb of client.listUSProgramBriefs()) {
      assert.isNotNull(pb);
      totalNumberOfbriefs++;
    }
    return totalNumberOfbriefs;
  };

  const _listUSProgramBriefsByPage = async (itemsPerPage: number): Promise<number> => {
    // due to concurrency issues in different OSs, we cannot verify that the expected briefs are found in each page
    let totalNumberOfbriefs = 0;
    let totalPages = 0;
    const pages = client.listUSProgramBriefs({ top: itemsPerPage }).byPage();
    for await (const page of pages) {
      totalPages++;
      for (const pb of page) {
        assert.isNotNull(pb);
        totalNumberOfbriefs++;
      }
    }
    assert.isTrue(totalPages > 1, "Total pages in byPage is not correct");
    return totalNumberOfbriefs;
  };

  const _testListUSProgramBriefs = async (): Promise<boolean> => {
    // list program briefs, validate test program brief is in the list
    const totalNumberOfbriefs = await _listUSProgramBriefs();
    // test pagination, using itemsPerPage pages
    const itemsPerPage = totalNumberOfbriefs > 1 ? Math.floor(totalNumberOfbriefs / 2) : 1;
    await _listUSProgramBriefsByPage(itemsPerPage);
    return true;
  };

  const _deleteUSProgramBriefs = async (testProgramBriefs: USProgramBrief[]): Promise<void> => {
    // delete program briefs, ensure it was removed
    const testDeleteBrief = testProgramBriefs.map(async (pb) => {
      const delRes = await client.deleteUSProgramBrief(pb.id);
      assert.isOk(delRes, "Deleting program brief failed");
      assert.isFalse(
        await doesProgramBriefExist(client, pb.id),
        "Delete program brief was unsuccessful, program brief is still returned",
      );
      return true;
    });
    assert.isOk(await Promise.all(testDeleteBrief));
  };

  const _testGetUSProgramBrief = async (uspb: USProgramBrief): Promise<void> => {
    // get program brief, verify it was created correctly
    const actualProgramBrief = await client.getUSProgramBrief(uspb.id);
    assertEditableFieldsAreEqual(uspb, actualProgramBrief, "get after initial create");
  };

  it("can create and delete a US Program Brief", async function () {
    const testProgramBrief = getTestUSProgramBrief();
    // override test brief id with variable id
    const pbTestId = recorder.variable(`pb-var-${0}`, testProgramBrief.id);
    testProgramBrief.id = pbTestId;

    await runTestCleaningLeftovers([testProgramBrief.id], client, async () => {
      // validate upsert and update for each test brief
      await _createTestProgramBrief(testProgramBrief);
      await _testGetUSProgramBrief(testProgramBrief);
      await _updateUSProgramBrief(testProgramBrief);

      // delete program briefs, ensure it was removed
      await _deleteUSProgramBriefs([testProgramBrief]);
    });
  }).timeout(60000);

  it("can create, and list a US Program Brief", async function () {
    const testProgramBriefs = [getTestUSProgramBrief(), getTestUSProgramBrief()];
    // override test brief id with variable id
    const testProgramBriefIds = testProgramBriefs.map((pb, index) => {
      const pbTestId = recorder.variable(`pb-var-${index}`, pb.id);
      pb.id = pbTestId;
      return pb.id;
    });

    await runTestCleaningLeftovers(testProgramBriefIds, client, async () => {
      // validate upsert and update for each test brief
      const testAndUpdateBrief = testProgramBriefs.map(async (pb) => {
        await _createTestProgramBrief(pb);
        return true;
      });
      assert.isOk(await Promise.all(testAndUpdateBrief));
      // validate listProgramBriefs
      assert.isOk(await _testListUSProgramBriefs());

      // delete program briefs, ensure it was removed
      await _deleteUSProgramBriefs(testProgramBriefs);
    });
  }).timeout(60000);
});
