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
import { v1 as uuid } from "uuid";

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
    const testBriefMap: Record<string, { brief: USProgramBrief; found: boolean }> = {};
    const idsArray: string[] = [];
    for (let i = 0; i < 2; i++) {
      // create a unique id for program brief
      const programBriefId = recorder.variable(`test-brief-${i + 1}`, uuid());
      // in record mode = this creates the test-brief-# = uuid() and returns this value
      // in playback mode this will return the variable stored
      const testBrief = getTestUSProgramBrief(programBriefId);

      testBriefMap[testBrief.id] = { brief: testBrief, found: false };
      idsArray.push(testBrief.id);
    }
    await runTestCleaningLeftovers(idsArray, client, async () => {
      // create 2 test program briefs and save drafts async
      let errorDuringCreate = true;
      await Promise.all(
        Object.values(testBriefMap).map(async (testProgramBrief) => {
          const uspb = testProgramBrief.brief;
          const createRequest: ShortCodesUpsertUSProgramBriefOptionalParams = {
            body: uspb,
          };
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
            uspb.programDetails.callToActionUrl =
              updateRequest.body?.programDetails?.callToActionUrl;
            uspb.programDetails.privacyPolicyUrl =
              updateRequest.body?.programDetails?.privacyPolicyUrl;
            uspb.programDetails.termsOfServiceUrl =
              updateRequest.body?.programDetails?.termsOfServiceUrl;
          }

          const updateResult = await client.upsertUSProgramBrief(uspb.id, updateRequest);
          assert.isOk(updateResult, "Update program brief failed");
          assert.equal(uspb.id, updateResult.id, "Update program brief returned the wrong Id");

          // get program brief, verify it was updated correctly
          getRes = await client.getUSProgramBrief(uspb.id);
          assertEditableFieldsAreEqual(uspb, getRes, "get after update");
        })
      ).then(() => (errorDuringCreate = false));
      assert.isFalse(errorDuringCreate, "Errors were found while creating test program briefs");

      // retrieve program briefs and verify they were created succesfully
      const usPBIterator = client.listUSProgramBriefs({ top: 1 }).byPage();
      for await (const page of usPBIterator) {
        // loop over each phone number in the page
        for (const programBrief of page) {
          if (idsArray.includes(programBrief.id)) {
            testBriefMap[programBrief.id].found = true;
            assertEditableFieldsAreEqual(
              programBrief,
              testBriefMap[programBrief.id].brief,
              "list all program briefs"
            );
          }
        }
      }

      // verify all test briefs were found during listing
      // delete all program briefs at the end
      let errorsDuringDelete = true;
      await Promise.all(
        Object.values(testBriefMap).map(async (testBrief) => {
          const uspb = testBrief.brief;
          assert.isTrue(
            testBrief.found,
            "Test program brief " + uspb.id + " was not returned in list of all program briefs"
          );

          // delete program brief, ensure it was removed
          const delRes = await client.deleteUSProgramBrief(uspb.id);
          assert.isOk(delRes, "Deleting program brief failed");
          assert.isFalse(
            await doesProgramBriefExist(client, uspb.id),
            "Delete program brief was unsuccessful, program brief is still returned"
          );
        })
      ).then(() => (errorsDuringDelete = false));
      assert.isFalse(errorsDuringDelete, "Errors were found while deleting test program briefs");
    });
  }).timeout(60000);
});
