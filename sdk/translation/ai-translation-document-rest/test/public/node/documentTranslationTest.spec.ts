// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  DocumentStatusOutput,
  DocumentTranslationClient,
  GetDocumentStatus200Response,
  GetTranslationStatus200Response,
  StartTranslationDefaultResponse,
  TranslationStatusOutput,
} from "@azure-rest/ai-translation-document";
import { getLongRunningPoller, isUnexpected } from "@azure-rest/ai-translation-document";
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
  getTranslationOperationID,
  sleep,
} from "../utils/testHelper.js";
import type { BatchRequest } from "$internal/models.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";
import { getBlobEndpoint, getContainers, isLiveMode } from "../../utils/injectables.js";
import { documents3 } from "../../utils/documents.js";
import { BlobServiceClient } from "@azure/storage-blob";
import { createTestCredential } from "@azure-tools/test-credential";

export const testPollingOptions = {
  intervalInMs: isLiveMode() ? undefined : 0,
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

    const options = {
      queryParameters: {
        type: "",
      },
    };

    const response = await testClient.path("/document/formats").get(options);
    if (isUnexpected(response)) {
      assert.equal(response.status, "401");
    }
  });

  it("Single Source Single Target", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container1"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    await validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
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
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    await validateTranslationStatus(response as StartTranslationDefaultResponse, 3);
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
    const batchRequests = { inputs: [batchRequest1, batchRequest2] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    await validateTranslationStatus(response, 2);
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
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    await validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
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
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    await validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
  });

  it("Single Source Single Target List Documents", async () => {
    const sourceInput = createSourceInput(containers["source-container1"].url);
    const targetInput = createTargetInput(containers["target-container9"].url, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = await client.path("/document/batches/{id}", operationId).get();
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (
      translationStatus &&
      (translationStatus.body as TranslationStatusOutput).status === "NotStarted" &&
      retriesLeft > 0
    );
    const translationStatusOutput = translationStatus?.body as TranslationStatusOutput;

    const documentResponse = await client
      .path("/document/batches/{id}/documents", operationId)
      .get();
    if (isUnexpected(documentResponse)) {
      throw "get documents status job error:" + documentResponse.body;
    }
    const responseBody = documentResponse.body;
    for (const documentStatus of responseBody.value) {
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
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // get Documents Status
    const documentResponse = await client
      .path("/document/batches/{id}/documents", operationId)
      .get();

    if (isUnexpected(documentResponse)) {
      throw "get documents status job error:" + documentResponse.body;
    }
    const responseBody = documentResponse.body;
    for (const document of responseBody.value) {
      const documentStatus = await client
        .path("/document/batches/{id}/documents/{documentId}", operationId, document.id)
        .get();
      if (isUnexpected(documentStatus)) {
        throw "get documents status job error:" + documentStatus.body;
      }
      validateDocumentStatus(documentStatus as GetDocumentStatus200Response, document.to);
    }
  });

  it("Wrong Source Right Target", async () => {
    const sourceInput = createSourceInput("https://idont.ex.ist");
    const targetInput = createTargetInput(containers["target-container11"].url, "es");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await client.path("/document/batches").post({
      body: batchRequests,
    });
    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = (await client
          .path("/document/batches/{id}", operationId)
          .get()) as GetTranslationStatus200Response;
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (
      translationStatus &&
      (translationStatus.body as TranslationStatusOutput).status === "NotStarted" &&
      retriesLeft > 0
    );
    assert.equal((translationStatus?.body as TranslationStatusOutput).status, "ValidationFailed");
    assert.equal(
      (translationStatus?.body as TranslationStatusOutput).error?.innerError?.code,
      "InvalidDocumentAccessLevel",
    );
  });

  it("Right Source Wrong Target", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetInput = createTargetInput("https://idont.ex.ist", "es");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await client.path("/document/batches").post({
      body: batchRequests,
    });
    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = (await client
          .path("/document/batches/{id}", operationId)
          .get()) as GetTranslationStatus200Response;
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (
      translationStatus &&
      (translationStatus.body as TranslationStatusOutput).status === "NotStarted" &&
      retriesLeft > 0
    );

    assert.equal((translationStatus?.body as TranslationStatusOutput).status, "ValidationFailed");
    assert.equal(
      (translationStatus?.body as TranslationStatusOutput).error?.innerError?.code,
      "InvalidTargetDocumentAccessLevel",
    );
  });

  it("Supported And UnSupported Files", async () => {
    const sourceUrl = containers["source-container5"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container12"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }

    // Validate the response
    await validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
  });

  it("Empty Document Error", async () => {
    const sourceUrl = containers["source-container6"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container13"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);
    // Validate the response
    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    const translationStatus = (await client
      .path("/document/batches/{id}", operationId)
      .get()) as GetTranslationStatus200Response;
    if (isUnexpected(translationStatus)) {
      throw "get documents status job error:" + translationStatus.body;
    }
    const translationStatusOutput = translationStatus.body as TranslationStatusOutput;
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
    const batchRequests = { inputs: [batchRequest] };
    const response = await client.path("/document/batches").post({
      body: batchRequests,
    });
    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
      try {
        await sleep(10000);
        retriesLeft--;
        translationStatus = (await client
          .path("/document/batches/{id}", operationId)
          .get()) as GetTranslationStatus200Response;
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (
      translationStatus &&
      (translationStatus.body as TranslationStatusOutput).status === "NotStarted" &&
      retriesLeft > 0
    );
    assert.equal((translationStatus?.body as TranslationStatusOutput).status, "ValidationFailed");
    assert.equal(
      (translationStatus?.body as TranslationStatusOutput).error?.innerError?.code,
      "TargetFileAlreadyExists",
    );
  });

  it("Invalid Document GUID", async () => {
    const sourceUrl = containers["source-container1"].url;
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = containers["target-container14"].url;
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await client.path("/document/batches").post({
      body: batchRequests,
    });
    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // get document status
    let documentResponse = await client
      .path("/document/batches/{id}/documents/{documentId}", operationId, "Foo Bar")
      .get();
    assert.equal(documentResponse.status, "404");

    documentResponse = await client
      .path("/document/batches/{id}/documents/{documentId}", operationId, " ")
      .get();
    assert.equal(documentResponse.status, "404");
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
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    const operationLocationUrl = response.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    if (!isLiveMode()) {
      return;
    }
    const blobClient = new BlobServiceClient(getBlobEndpoint(), createTestCredential());

    const result = downloadDocument(blobClient, targetContainerName, "Document1.txt");
    assert.isTrue((await result).includes("glossaryTest"));
  });

  async function validateTranslationStatus(
    translationResponse: StartTranslationDefaultResponse,
    translationCount: number,
  ): Promise<void> {
    const operationLocationUrl = translationResponse.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);
    assert.equal(translationResponse.status, "202");

    const translationStatus = (await client
      .path("/document/batches/{id}", operationId)
      .get()) as GetTranslationStatus200Response;
    if (isUnexpected(translationStatus)) {
      throw "get documents status job error:" + translationStatus.body;
    }
    const translationStatusOutput = translationStatus.body as TranslationStatusOutput;
    assert.equal(translationStatusOutput.summary.total, translationCount);
    assert.equal(translationStatusOutput.summary.success, translationCount);
    assert.equal(translationStatusOutput.summary.failed, 0);
    assert.equal(translationStatusOutput.summary.cancelled, 0);
    assert.equal(translationStatusOutput.summary.inProgress, 0);

    return;
  }

  function validateDocumentStatus(
    documentStatus: GetDocumentStatus200Response,
    targetLanguage: string,
  ): void {
    assert.equal(documentStatus.status, "200");
    const documentStatusOutput = documentStatus.body as DocumentStatusOutput;
    assert.isNotNull(documentStatusOutput.id);
    assert.isNotNull(documentStatusOutput.sourcePath);
    assert.isNotNull(documentStatusOutput.path);
    if (isLiveMode()) {
      assert.equal(targetLanguage, documentStatusOutput.to);
    }
    assert.notEqual(new Date(), new Date(documentStatusOutput.createdDateTimeUtc));
    assert.notEqual(new Date(), new Date(documentStatusOutput.lastActionDateTimeUtc));
    assert.equal(1, documentStatusOutput.progress);

    return;
  }

  async function StartTranslationAndWait(batchRequests: {
    inputs: BatchRequest[];
  }): Promise<StartTranslationDefaultResponse> {
    // Start translation
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

    return response as StartTranslationDefaultResponse;
  }
});
