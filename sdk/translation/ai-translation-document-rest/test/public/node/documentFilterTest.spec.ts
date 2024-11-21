// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import type { DocumentTranslationClient, StartTranslation202Response } from "../../../src";
import { isUnexpected, getLongRunningPoller } from "../../../src";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient";
import { createSourceContainer, createTargetContainer } from "./containerHelper";
import type { Context } from "mocha";
import {
  createBatchRequest,
  createDummyTestDocuments,
  createSourceInput,
  createTargetInput,
  getTranslationOperationID,
} from "../utils/testHelper";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DocumentFilter tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Document Statuses Filter By Status", async () => {
    const result = createSingleTranslationJob(5);
    const operationLocationUrl = (await result).headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // Add Status filter
    const succeededStatusList = ["Succeeded"];
    const queryParams = {
      statuses: succeededStatusList,
    };

    // get DocumentsStatus
    const response = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }
    const responseBody = response.body;
    for (const documentStatus of responseBody.value) {
      assert.isTrue(succeededStatusList.includes(documentStatus.status));
    }
  });

  it("Document Statuses Filter By ID", async () => {
    const result = createSingleTranslationJob(2);
    const operationLocationUrl = (await result).headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // get Documents Status with operationID
    const testIds = [];
    const response = await client.path("/document/batches/{id}/documents", operationId).get();
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }
    let responseBody = response.body;
    for (const documentStatus of responseBody.value) {
      testIds.push(documentStatus.id);
    }

    // Add id filter
    const queryParams = {
      ids: testIds,
    };

    // get Documents Status with testIds option
    const documentStatusResponse = await client
      .path("/document/batches/{id}/documents", operationId)
      .get({
        queryParameters: queryParams,
      });
    if (isUnexpected(documentStatusResponse)) {
      throw "get documents status job error:" + documentStatusResponse.body;
    }

    responseBody = documentStatusResponse.body;
    for (const documentStatus of responseBody.value) {
      assert.isTrue(testIds.includes(documentStatus.id));
    }
  });

  it("Document Statuses Filter By Created After", async () => {
    const result = createSingleTranslationJob(5);
    const operationLocationUrl = (await result).headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // Add orderBy filter
    const orderByList = ["createdDateTimeUtc asc"];
    const queryParams = {
      orderby: orderByList,
    };

    // get Documents Status w.r.t orderby
    const testCreatedOnDateTimes = [];
    const response = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }
    let responseBody = response.body;
    for (const documentStatus of responseBody.value) {
      testCreatedOnDateTimes.push(documentStatus.createdDateTimeUtc);
    }

    // Asserting that only the last document is returned
    let itemCount = 0;
    const queryParams2 = {
      createdDateTimeUtcStart: testCreatedOnDateTimes[4],
    };

    const response2 = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams2,
    });
    if (isUnexpected(response2)) {
      throw "get documents status job error:" + response2.body;
    }
    responseBody = response2.body;
    for (const documentStatus of responseBody.value) {
      assert.isNotNull(documentStatus);
      itemCount += 1;
    }

    assert.equal(itemCount, 1);
  });

  it("Document Statuses Filter By Created Before", async () => {
    const result = createSingleTranslationJob(5);
    const operationLocationUrl = (await result).headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // Add orderBy filter
    const orderByList = ["createdDateTimeUtc asc"];
    const queryParams = {
      orderby: orderByList,
    };

    // get Documents Status w.r.t orderby
    const testCreatedOnDateTimes = [];
    const response = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }
    let responseBody = response.body;
    for (const documentStatus of responseBody.value) {
      testCreatedOnDateTimes.push(documentStatus.createdDateTimeUtc);
    }

    // Asserting that only the first document is returned
    let itemCount2 = 0;
    const queryParams2 = {
      createdDateTimeUtcEnd: testCreatedOnDateTimes[0],
    };

    const response2 = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams2,
    });
    if (isUnexpected(response2)) {
      throw "get documents status job error:" + response2.body;
    }

    responseBody = response2.body;
    for (const documentStatus of responseBody.value) {
      assert.isNotNull(documentStatus);
      itemCount2 += 1;
    }

    assert.equal(itemCount2, 1);

    // Asserting that the first 4/5 docs are returned
    let itemCount3 = 0;
    const queryParams3 = {
      createdDateTimeUtcEnd: testCreatedOnDateTimes[3],
    };

    const response3 = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams3,
    });
    if (isUnexpected(response3)) {
      throw "get documents status job error:" + response3.body;
    }
    responseBody = response3.body;
    for (const documentStatus of responseBody.value) {
      assert.isNotNull(documentStatus);
      itemCount3 += 1;
    }

    assert.equal(itemCount3, 4);
  });

  it("Document Statuses Filter By Created On", async () => {
    const result = createSingleTranslationJob(3);
    const operationLocationUrl = (await result).headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // Add OrderBy filter
    const orderByList = ["createdDateTimeUtc desc"];
    const queryParams = {
      statuses: orderByList,
    };

    // get Documents Status
    const response = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters: queryParams,
    });
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }
    const timestamp = new Date();

    const responseBody = response.body;
    for (const documentStatus of responseBody.value) {
      const createdDateTime = new Date(documentStatus.createdDateTimeUtc);
      assert.isTrue(createdDateTime < timestamp || createdDateTime === timestamp);
    }
  });

  async function createSingleTranslationJob(count: number) {
    const testDocs = createDummyTestDocuments(count);
    const sourceUrl = await createSourceContainer(recorder, testDocs);
    const sourceInput = createSourceInput(sourceUrl);

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

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    return response as StartTranslation202Response;
  }
});
