// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  DocumentTranslationClient,
  isUnexpected,
  getLongRunningPoller,
  GetTranslationStatus200Response,
  TranslationStatusOutput,
} from "../.././../src";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient";
import { createSourceContainer, createTargetContainer } from "./containerHelper";
import { Context } from "mocha";
import {
  createBatchRequest,
  createDummyTestDocuments,
  createSourceInput,
  createTargetInput,
  getTranslationOperationID,
  sleep,
} from "../utils/testHelper";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("TranslationFilter tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Translation Statuses Filter By Status", async () => {
    createTranslationJobs(1, 1, "Succeeded");
    const cancelledIds = createTranslationJobs(1, 1, "Cancelled");

    // list translations with filter
    const cancelledStatusList = ["Cancelled", "Cancelling"];
    const testStartTime = recorder.variable("testStartTime", new Date().toISOString());

    const queryParams = {
      statuses: cancelledStatusList,
      createdDateTimeUtcStart: testStartTime,
    };

    // get Translation Status
    const response = await client.path("/document/batches").get({
      queryParameters: queryParams,
    });

    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
    const responseBody = response.body;
    for (const translationStatus of responseBody.value) {
      assert.isTrue(cancelledStatusList.includes(translationStatus.status));
      assert.isTrue((await cancelledIds).includes(translationStatus.id));
    }
  });

  it("Translation Statuses Filter By Id", async () => {
    const allIds = createTranslationJobs(2, 1, "Succeeded");
    const targetIds = [];
    targetIds.push((await allIds)[0]);

    // get Translation Status
    const queryParams = {
      ids: targetIds,
    };
    const response = await client.path("/document/batches").get({
      queryParameters: queryParams,
    });

    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }

    const responseBody = response.body;
    for (const translationStatus of responseBody.value) {
      assert.isTrue(targetIds.includes(translationStatus.id));
    }
  });

  it("Translation Statuses Filter By Created After", async () => {
    const testStartTime = recorder.variable("testStartTime", new Date().toISOString());
    const targetIds = createTranslationJobs(1, 1, "Succeeded");

    // get Translation Status
    const queryParams = {
      createdDateTimeUtcStart: testStartTime,
    };
    const response = await client.path("/document/batches").get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
    const responseBody = response.body;
    for (const translationStatus of responseBody.value) {
      assert.isTrue((await targetIds).includes(translationStatus.id));
      assert.isTrue(new Date(translationStatus.createdDateTimeUtc).toISOString() > testStartTime);
    }
  });

  it("Translation Statuses Filter By Created Before", async () => {
    const targetIds = createTranslationJobs(1, 1, "Succeeded");
    for (let i = 0; i < (await targetIds).length; i++) {
      console.log(`targetIds[${i}]:`, (await targetIds)[i]);
    }

    const endDateTime = recorder.variable("endDateTime", new Date().toISOString());
    createTranslationJobs(1, 1, "Succeeded");

    // getting only translations from the last hour
    const testDateTime = new Date();
    testDateTime.setHours(testDateTime.getHours() - 1);
    const startDateTime = recorder.variable("startDateTime", testDateTime.toISOString());

    // get Translation Status
    const queryParams = {
      createdDateTimeUtcStart: startDateTime,
      createdDateTimeUtcEnd: endDateTime,
    };
    const response = await client.path("/document/batches").get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }

    const responseBody = response.body;
    let idExists = false;
    for (const translationStatus of responseBody.value) {
      if ((await targetIds).includes(translationStatus.id)) {
        idExists = true;
      }
      assert.isTrue(new Date(translationStatus.createdDateTimeUtc).toISOString() < endDateTime);
    }
    assert.isTrue(idExists);
  });

  it("Translation Statuses Filter By Created On", async () => {
    createTranslationJobs(3, 1, "Succeeded");

    // Add filter
    const startDateTime = recorder.variable("startDateTime", new Date().toISOString());
    const orderByList = ["createdDateTimeUtc asc"];
    const queryParams = {
      createdDateTimeUtcStart: startDateTime,
      orderby: orderByList,
    };

    const response = await client.path("/document/batches").get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get translation status job error:" + response.body;
    }
    let timestamp = new Date(-8640000000000000); // Minimum valid Date value in JavaScript

    const responseBody = response.body;
    for (const translationStatus of responseBody.value) {
      assert.isTrue(new Date(translationStatus.createdDateTimeUtc) > timestamp);
      timestamp = new Date(translationStatus.createdDateTimeUtc);
    }
  });

  async function createTranslationJobs(
    jobsCount: number,
    docsPerJob: number,
    jobTerminalStatus: string,
  ) {
    // create source container
    if (jobTerminalStatus.includes("cancelled")) {
      docsPerJob = 20; // in order to avoid job completing before canceling
    }
    const testDocuments = createDummyTestDocuments(docsPerJob);
    const sourceUrl = await createSourceContainer(recorder, testDocuments);
    const sourceInput = createSourceInput(sourceUrl);

    // create a translation job
    const translationIds = [];
    for (let i = 1; i <= jobsCount; i++) {
      const targetUrl = await createTargetContainer(recorder);
      const targetInput = createTargetInput(targetUrl, "fr");
      const batchRequest = createBatchRequest(sourceInput, [targetInput]);

      // Start translation
      const batchRequests = { inputs: [batchRequest] };
      const response = await client.path("/document/batches").post({
        body: batchRequests,
      });
      if (isUnexpected(response)) {
        throw "start translation job error:" + response.body;
      }

      const operationLocationUrl = (await response).headers["operation-location"];
      const operationId = getTranslationOperationID(operationLocationUrl);
      translationIds.push(operationId);

      if (jobTerminalStatus.includes("succeeded")) {
        // Wait until the operation completes
        const poller = getLongRunningPoller(client, response, testPollingOptions);
        const result = await (await poller).pollUntilDone();
        assert.equal(result.status, "200");
      } else if (jobTerminalStatus.includes("cancelled")) {
        await client.path("/document/batches/{id}", operationId).delete();
      }
    }

    // ensure that cancel status has propagated before returning
    if (jobTerminalStatus.includes("cancelled")) {
      waitForJobCancellation(translationIds);
    }
    return translationIds;
  }

  async function waitForJobCancellation(translationIds: string[]): Promise<void> {
    const retryCount = 10;

    for (const translationId of translationIds) {
      let translationStatus = null;
      let retriesLeft = retryCount;
      do {
        try {
          await sleep(10000);
          retriesLeft--;
          translationStatus = (await client
            .path("/document/batches/{id}", translationId)
            .get()) as GetTranslationStatus200Response;
        } catch (error) {
          console.error("Error during translation status retrieval:", error);
        }
      } while (
        translationStatus &&
        (translationStatus.body as TranslationStatusOutput).summary.cancelled > 0 &&
        retriesLeft > 0
      );
    }
    return;
  }
});
