// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient, StartTranslation202Response } from "@azure-rest/ai-translation-document";
import { isUnexpected, getLongRunningPoller } from "@azure-rest/ai-translation-document";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient.js";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationOperationID,
} from "../utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getContainers, isLiveMode } from "../../utils/injectables.js";

export const testPollingOptions = {
  intervalInMs: isLiveMode() ? undefined : 0,
};

describe("DocumentFilter tests", () => {
  let recorder: Recorder;
  let client: DocumentTranslationClient;
  const containers = getContainers();

  beforeEach(async (ctx) => {
    recorder = await startRecorder(ctx);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("Document Statuses Filter By Status", async () => {
    const result = await createSingleTranslationJob(
      containers["source-container7"].url,
      containers["target-container17"].url,
    );
    const operationLocationUrl = result.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // Add Status filter
    const succeededStatusList = ["Succeeded"];
    const queryParameters = {
      statuses: succeededStatusList,
    };

    // get DocumentsStatus
    const response = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters,
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
    const result = await createSingleTranslationJob(
      containers["source-container9"].url,
      containers["target-container27"].url,
    );
    const operationLocationUrl = result.headers["operation-location"];
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
    const queryParameters = {
      ids: testIds,
    };

    // get Documents Status with testIds option
    const documentStatusResponse = await client
      .path("/document/batches/{id}/documents", operationId)
      .get({
        queryParameters,
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
    const result = await createSingleTranslationJob(
      containers["source-container7"].url,
      containers["target-container28"].url,
    );
    const operationLocationUrl = result.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);

    // Add orderBy filter
    const orderByList = ["createdDateTimeUtc asc"];
    const queryParameters = {
      orderby: orderByList,
    };

    // get Documents Status w.r.t orderby
    const testCreatedOnDateTimes = [];
    const response = await client.path("/document/batches/{id}/documents", operationId).get({
      queryParameters,
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
    const result = await createSingleTranslationJob(
      containers["source-container7"].url,
      containers["target-container29"].url,
    );
    const operationLocationUrl = result.headers["operation-location"];
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
    const result = await createSingleTranslationJob(
      containers["source-container8"].url,
      containers["target-container30"].url,
    );
    const operationLocationUrl = result.headers["operation-location"];
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

  async function createSingleTranslationJob(
    sourceContainerUrl: string,
    targetContainerUrl: string,
  ): Promise<StartTranslation202Response> {
    const sourceInput = createSourceInput(sourceContainerUrl);
    const targetInput = createTargetInput(targetContainerUrl, "fr");
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
    const poller = await getLongRunningPoller(client, response, testPollingOptions);
    const result = await poller.pollUntilDone();
    assert.equal(result.status, "200");

    return response as StartTranslation202Response;
  }
});
