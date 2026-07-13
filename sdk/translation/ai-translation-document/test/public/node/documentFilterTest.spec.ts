// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type { DocumentTranslationClient } from "../../../src/index.js";
import { createDocumentTranslationClient, startRecorder } from "../utils/recordedClient.js";
import { createBatchRequest, createSourceInput, createTargetInput } from "../utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getContainers, isLiveMode } from "../../utils/injectables.js";

export const testPollingOptions = {
  updateIntervalInMs: isLiveMode() ? undefined : 1,
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
    const operationId = await createSingleTranslationJob(
      containers["source-container7"].url,
      containers["target-container17"].url,
    );

    // Add Status filter
    const succeededStatusList = ["Succeeded"];

    // get DocumentsStatus
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      statuses: succeededStatusList,
    })) {
      assert.isTrue(succeededStatusList.includes(documentStatus.status));
    }
  });

  it("Document Statuses Filter By ID", async () => {
    const operationId = await createSingleTranslationJob(
      containers["source-container9"].url,
      containers["target-container27"].url,
    );

    // get Documents Status with operationID
    const testIds: string[] = [];
    for await (const documentStatus of client.getDocumentsStatus(operationId)) {
      testIds.push(documentStatus.id);
    }

    // get Documents Status with testIds filter
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      documentIds: testIds,
    })) {
      assert.isTrue(testIds.includes(documentStatus.id));
    }
  });

  it("Document Statuses Filter By Created After", async () => {
    const operationId = await createSingleTranslationJob(
      containers["source-container7"].url,
      containers["target-container28"].url,
    );

    // Add orderBy filter
    const orderByList = ["createdDateTimeUtc asc"];

    // get Documents Status w.r.t orderby
    const testCreatedOnDateTimes: Date[] = [];
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      orderby: orderByList,
    })) {
      testCreatedOnDateTimes.push(documentStatus.createdDateTimeUtc);
    }

    // Asserting that only the last document is returned
    let itemCount = 0;
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      createdDateTimeUtcStart: testCreatedOnDateTimes[4],
    })) {
      assert.isNotNull(documentStatus);
      itemCount += 1;
    }

    assert.equal(itemCount, 1);
  });

  it("Document Statuses Filter By Created Before", async () => {
    const operationId = await createSingleTranslationJob(
      containers["source-container7"].url,
      containers["target-container29"].url,
    );

    // Add orderBy filter
    const orderByList = ["createdDateTimeUtc asc"];

    // get Documents Status w.r.t orderby
    const testCreatedOnDateTimes: Date[] = [];
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      orderby: orderByList,
    })) {
      testCreatedOnDateTimes.push(documentStatus.createdDateTimeUtc);
    }

    // Asserting that only the first document is returned
    let itemCount2 = 0;
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      // Add 1ms: JS Date truncates the service's sub-millisecond createdDateTimeUtc,
      // so the raw value would fall just before the doc and exclude it from the range.
      createdDateTimeUtcEnd: new Date(testCreatedOnDateTimes[0].getTime() + 1),
    })) {
      assert.isNotNull(documentStatus);
      itemCount2 += 1;
    }

    assert.equal(itemCount2, 1);

    // Asserting that the first 4/5 docs are returned
    let itemCount3 = 0;
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      // Add 1ms to compensate for JS Date sub-millisecond truncation (see above).
      createdDateTimeUtcEnd: new Date(testCreatedOnDateTimes[3].getTime() + 1),
    })) {
      assert.isNotNull(documentStatus);
      itemCount3 += 1;
    }

    assert.equal(itemCount3, 4);
  });

  it("Document Statuses Filter By Created On", async () => {
    const operationId = await createSingleTranslationJob(
      containers["source-container8"].url,
      containers["target-container30"].url,
    );

    // Add OrderBy filter
    const orderByList = ["createdDateTimeUtc desc"];

    // get Documents Status
    const timestamp = new Date();
    for await (const documentStatus of client.getDocumentsStatus(operationId, {
      statuses: orderByList,
    })) {
      const createdDateTime = new Date(documentStatus.createdDateTimeUtc);
      assert.isTrue(createdDateTime < timestamp || createdDateTime === timestamp);
    }
  });

  async function createSingleTranslationJob(
    sourceContainerUrl: string,
    targetContainerUrl: string,
  ): Promise<string> {
    const sourceInput = createSourceInput(sourceContainerUrl);
    const targetInput = createTargetInput(targetContainerUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation and wait until the operation completes
    const result = await client.startTranslation({ inputs: [batchRequest] }, testPollingOptions);
    assert.equal(result.status, "Succeeded");

    return result.id;
  }
});
