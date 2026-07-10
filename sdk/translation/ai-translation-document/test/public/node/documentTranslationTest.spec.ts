// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  BatchRequest,
  DocumentStatus,
  DocumentTranslationClient,
  TranslationStatus,
} from "../../../src/index.js";
import {
  createDocumentTranslationClient,
  createDocumentTranslationClientWithEndpointAndCredentials,
  startRecorder,
} from "../utils/recordedClient.js";

import { downloadDocument } from "../../utils/containerHelper.js";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationIdFromPoller,
  sleep,
} from "../utils/testHelper.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getBlobEndpoint, getContainers, isLiveMode } from "../../utils/injectables.js";
import { documents3 } from "../../utils/documents.js";
import { BlobServiceClient } from "@azure/storage-blob";
import { createTestCredential } from "@azure-tools/test-credential";

export const testPollingOptions = {
  updateIntervalInMs: isLiveMode() ? undefined : 1,
};

// TODO: Re-record test
describe("DocumentTranslation tests", () => {
  const retryCount = 10;
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

  it("Client Cannot Authenticate With FakeApiKey", async () => {
    const testEndpoint = "https://t7d8641d8f25ec940-doctranslation.cognitiveservices.azure.com";
    const testApiKey = "fakeApiKey";
    const testClient = await createDocumentTranslationClientWithEndpointAndCredentials({
      endpointParam: testEndpoint,
      credentials: { key: testApiKey },
    });

    // The modular client throws for unexpected responses; a fake key yields a 401.
    let statusCode: number | undefined;
    try {
      await testClient.getSupportedFormats("Document");
    } catch (error: any) {
      statusCode = error.statusCode;
    }
    assert.equal(statusCode, 401);
  });

  it("Single Source Single Target", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container1"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });

    // Validate the response
    await validateTranslationStatus(operationId, 1);
  });

  it("Single Source Multiple Targets", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);

    const targetUrl1 = containers["target-container2"].url;
    const targetInput1 = createTargetInput(targetUrl1, "fr");

    const targetUrl2 = containers["target-container3"].url;
    const targetInput2 = createTargetInput(targetUrl2, "es");

    const targetUrl3 = containers["target-container4"].url;
    const targetInput3 = createTargetInput(targetUrl3, "ar");

    const batchRequest = createBatchRequest(sourceInput, [
      targetInput1,
      targetInput2,
      targetInput3,
    ]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });

    // Validate the response
    await validateTranslationStatus(operationId, 3);
  });

  it("Multiple Sources Single Target", async () => {
    const sourceUrl1 = containers["source-container1"].url;
    const sourceInput1 = createSourceInput(sourceUrl1);

    const targetUrl1 = containers["target-container5"].url;
    const targetInput1 = createTargetInput(targetUrl1, "fr");
    const batchRequest1 = createBatchRequest(sourceInput1, [targetInput1]);

    const sourceInput2 = createSourceInput(containers["source-container2"].url);

    const targetUrl2 = containers["target-container6"].url;
    const targetInput2 = createTargetInput(targetUrl2, "es");
    const batchRequest2 = createBatchRequest(sourceInput2, [targetInput2]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest1, batchRequest2] });

    // Validate the response
    await validateTranslationStatus(operationId, 2);
  });

  it("Single Source Single Target With Prefix", async () => {
    const documentFilter = {
      prefix: "File",
    };
    const sourceUrl = containers["source-container3"].url;
    const sourceInput = createSourceInput(sourceUrl, undefined, undefined, documentFilter);

    const targetUrl = containers["target-container7"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });

    // Validate the response
    await validateTranslationStatus(operationId, 1);
  });

  it("Single Source Single Target With Suffix", async () => {
    const documentFilter = {
      suffix: "txt",
    };
    const sourceInput = createSourceInput(
      containers["source-container1"].url,
      undefined,
      undefined,
      documentFilter,
    );
    const targetInput = createTargetInput(containers["target-container8"].url, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });

    // Validate the response
    await validateTranslationStatus(operationId, 1);
  });

  it("Single Source Single Target List Documents", async () => {
    const sourceInput = createSourceInput(containers["source-container1"].url);
    const targetInput = createTargetInput(containers["target-container9"].url, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });
    assert.isNotNull(operationId);

    // get translation status (the translation has already reached a terminal state)
    const translationStatusOutput = await client.getTranslationStatus(operationId);

    for await (const documentStatus of client.getDocumentsStatus(operationId)) {
      assert.equal(documentStatus.status, translationStatusOutput.status);
      assert.equal(
        documentStatus.characterCharged,
        translationStatusOutput.summary.totalCharacterCharged,
      );
      break;
    }
  });

  it("Get Document Status", async () => {
    const sourceInput = createSourceInput(containers["source-container1"].url);
    const targetInput = createTargetInput(containers["target-container10"].url, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });
    assert.isNotNull(operationId);

    // get Documents Status
    for await (const document of client.getDocumentsStatus(operationId)) {
      const documentStatus = await client.getDocumentStatus(operationId, document.id);
      validateDocumentStatus(documentStatus, document.to);
    }
  });

  it("Wrong Source Right Target", async () => {
    const sourceInput = createSourceInput("https://idont.ex.ist");
    const targetInput = createTargetInput(containers["target-container11"].url, "es");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationJob({ inputs: [batchRequest] });
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus: TranslationStatus | null = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = await client.getTranslationStatus(operationId);
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (translationStatus && translationStatus.status === "NotStarted" && retriesLeft > 0);
    assert.equal(translationStatus?.status, "ValidationFailed");
    assert.equal(translationStatus?.error?.innerError?.code, "InvalidDocumentAccessLevel");
  });

  it("Right Source Wrong Target", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetInput = createTargetInput("https://idont.ex.ist", "es");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationJob({ inputs: [batchRequest] });
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus: TranslationStatus | null = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = await client.getTranslationStatus(operationId);
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (translationStatus && translationStatus.status === "NotStarted" && retriesLeft > 0);

    assert.equal(translationStatus?.status, "ValidationFailed");
    assert.equal(translationStatus?.error?.innerError?.code, "InvalidTargetDocumentAccessLevel");
  });

  it("Supported And UnSupported Files", async () => {
    const sourceUrl = containers["source-container5"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container12"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });

    // Validate the response
    await validateTranslationStatus(operationId, 1);
  });

  it("Empty Document Error", async () => {
    const sourceUrl = containers["source-container6"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container13"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation (do not await the poller: this translation is expected to fail)
    const poller = client.startTranslation({ inputs: [batchRequest] }, testPollingOptions);
    const operationId = await getTranslationIdFromPoller(poller);
    assert.isNotNull(operationId);

    // Wait until the operation reaches a terminal state; a failed translation rejects the poller.
    try {
      await poller.pollUntilDone();
    } catch {
      // The translation is expected to fail; validate the details via the status below.
    }

    const translationStatusOutput = await client.getTranslationStatus(operationId);
    assert.equal(translationStatusOutput.status, "Failed");
    assert.equal(translationStatusOutput.summary.total, 1);
    assert.equal(translationStatusOutput.summary.success, 0);
    assert.equal(translationStatusOutput.summary.failed, 1);
    assert.equal(translationStatusOutput.error?.code, "InvalidRequest");
    assert.equal(translationStatusOutput.error?.innerError?.code, "NoTranslatableText");
  });

  it("Existing File In Target Container", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container1"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationJob({ inputs: [batchRequest] });
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus: TranslationStatus | null = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = await client.getTranslationStatus(operationId);
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (translationStatus && translationStatus.status === "NotStarted" && retriesLeft > 0);
    assert.equal(translationStatus?.status, "ValidationFailed");
    assert.equal(translationStatus?.error?.innerError?.code, "TargetFileAlreadyExists");
  });

  it("Invalid Document GUID", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container14"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationJob({ inputs: [batchRequest] });
    assert.isNotNull(operationId);

    // get document status with an invalid document id -> the client throws a 404
    let statusCode: number | undefined;
    try {
      await client.getDocumentStatus(operationId, "Foo Bar");
    } catch (error: any) {
      statusCode = error.statusCode;
    }
    assert.equal(statusCode, 404);

    statusCode = undefined;
    try {
      await client.getDocumentStatus(operationId, " ");
    } catch (error: any) {
      statusCode = error.statusCode;
    }
    assert.equal(statusCode, 404);
  });

  it("Document Translation With Glossary", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);

    const targetContainerName = "target-container15";
    const targetContainer = containers[targetContainerName];
    const targetUrl = targetContainer.url;
    const glossaryUrl = `${containers["source-container4"].url}/${documents3[0].name}`;

    const glossaries = [
      {
        glossaryUrl,
        format: "csv",
      },
    ];
    const targetInput = createTargetInput(targetUrl, "fr", undefined, glossaries);
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const operationId = await startTranslationAndWait({ inputs: [batchRequest] });

    // Validate the response
    assert.isNotNull(operationId);

    if (!isLiveMode()) {
      return;
    }
    const blobClient = new BlobServiceClient(getBlobEndpoint(), createTestCredential());

    const result = downloadDocument(blobClient, targetContainerName, "Document1.txt");
    assert.isTrue((await result).includes("glossaryTest"));
  });

  async function validateTranslationStatus(
    operationId: string,
    translationCount: number,
  ): Promise<void> {
    assert.isNotNull(operationId);

    const translationStatusOutput = await client.getTranslationStatus(operationId);
    assert.equal(translationStatusOutput.summary.total, translationCount);
    assert.equal(translationStatusOutput.summary.success, translationCount);
    assert.equal(translationStatusOutput.summary.failed, 0);
    assert.equal(translationStatusOutput.summary.cancelled, 0);
    assert.equal(translationStatusOutput.summary.inProgress, 0);

    return;
  }

  function validateDocumentStatus(
    documentStatusOutput: DocumentStatus,
    targetLanguage: string,
  ): void {
    assert.isNotNull(documentStatusOutput.id);
    assert.isNotNull(documentStatusOutput.sourcePath);
    assert.isNotNull(documentStatusOutput.path);
    if (isLiveMode()) {
      assert.equal(targetLanguage, documentStatusOutput.to);
    }
    assert.notEqual(new Date(), new Date(documentStatusOutput.createdDateTimeUtc));
    assert.notEqual(new Date(), new Date(documentStatusOutput.lastActionDateTimeUtc));
    assert.equal(documentStatusOutput.progress, 1);

    return;
  }

  async function startTranslationAndWait(batchRequests: {
    inputs: BatchRequest[];
  }): Promise<string> {
    // Awaiting the poller polls until the operation completes and resolves with the final status.
    const result = await client.startTranslation(batchRequests, testPollingOptions);
    assert.equal(result.status, "Succeeded");

    return result.id;
  }

  async function startTranslationJob(batchRequests: { inputs: BatchRequest[] }): Promise<string> {
    // Start the translation but return its id without waiting for it to complete.
    const poller = client.startTranslation(batchRequests, testPollingOptions);
    return getTranslationIdFromPoller(poller);
  }
});
