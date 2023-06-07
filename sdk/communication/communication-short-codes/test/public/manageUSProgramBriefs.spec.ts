// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
    const actualProgramBrief = await client.getUSProgramBrief(uspb.id);
    assertEditableFieldsAreEqual(uspb, actualProgramBrief, "get after initial create");
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

  const _listUSProgramBriefs = async (
    expectedProgramBriefs: USProgramBrief[],
    byPage?: boolean,
    itemsPerPage?: number
  ): Promise<number> => {
    let totalNumberOfbriefs = 0;
    // create map of expected ids
    const expectedBriefMap: Record<string, { brief: USProgramBrief; found: boolean }> = {};
    expectedProgramBriefs.forEach((pb) => {
      expectedBriefMap[pb.id] = { brief: pb, found: false };
    });
    if (byPage) {
      const pages = client.listUSProgramBriefs({ top: itemsPerPage }).byPage();
      for await (const page of pages) {
        // loop over each item in the page
        for (const pb of page) {
          totalNumberOfbriefs++;
          if (expectedBriefMap[pb.id]) {
            expectedBriefMap[pb.id].found = true;
            assertEditableFieldsAreEqual(
              pb,
              expectedBriefMap[pb.id].brief,
              "list all program briefs, byPage"
            );
          }
        }
      }
    } else {
      // list program briefs, validate test program brief is in the list
      for await (const pb of client.listUSProgramBriefs()) {
        totalNumberOfbriefs++;
        if (expectedBriefMap[pb.id]) {
          expectedBriefMap[pb.id].found = true;
          assertEditableFieldsAreEqual(
            pb,
            expectedBriefMap[pb.id].brief,
            "list all program briefs"
          );
        }
      }
    }
    // make sure all expected briefs were found
    const programBriefsNotFound: string[] = [];
    Object.values(expectedBriefMap).map((expectedPB) => {
      if (!expectedPB.found) {
        programBriefsNotFound.push(expectedPB.brief.id);
      }
    });
    const notFoundErrorMsg = byPage
      ? "Program briefs not found while listUSProgramBriefs byPage"
      : "Program briefs not found while listUSProgramBriefs";
    assert.isTrue(
      programBriefsNotFound.length === 0,
      `${notFoundErrorMsg} : ${programBriefsNotFound.join(",")}`
    );
    return totalNumberOfbriefs;
  };

  const _testListUSProgramBriefs = async (
    expectedProgramBriefs: USProgramBrief[]
  ): Promise<boolean> => {
    // list program briefs, validate test program brief is in the list
    const totalNumberOfbriefs = await _listUSProgramBriefs(expectedProgramBriefs);

    // test pagination, using itemsPerPage pages
    const itemsPerPage = totalNumberOfbriefs > 1 ? Math.floor(totalNumberOfbriefs / 2) : 1;
    await _listUSProgramBriefs(expectedProgramBriefs, true, itemsPerPage);
    return true;
  };

  it("can create, get, update, list, and delete a US Program Brief", async function () {
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
        await _updateUSProgramBrief(pb);
        return true;
      });
      assert.isOk(await Promise.all(testAndUpdateBrief));
      // validate listProgramBriefs
      assert.isOk(await _testListUSProgramBriefs(testProgramBriefs));

      // delete program briefs, ensure it was removed
      const testDeleteBrief = testProgramBriefs.map(async (pb) => {
        const delRes = await client.deleteUSProgramBrief(pb.id);
        assert.isOk(delRes, "Deleting program brief failed");
        assert.isFalse(
          await doesProgramBriefExist(client, pb.id),
          "Delete program brief was unsuccessful, program brief is still returned"
        );
        return true;
      });
      assert.isOk(await Promise.all(testDeleteBrief));
    });
  }).timeout(50000);
});
