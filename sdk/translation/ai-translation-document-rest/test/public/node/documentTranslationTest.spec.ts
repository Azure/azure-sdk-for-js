// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  DocumentStatusOutput,
  DocumentTranslationClient,
  GetDocumentStatus200Response,
  GetTranslationStatus200Response,
  StartTranslationDefaultResponse,
  TranslationStatusOutput,
  getLongRunningPoller,
  isUnexpected,
} from "../.././../src";
import {
  createDocumentTranslationClient,
  createDocumentTranslationClientWithEndpointAndCredentials,
  startRecorder,
} from "../utils/recordedClient";

import { Context } from "mocha";
import {
  ONE_TEST_DOCUMENTS,
  TWO_TEST_DOCUMENTS,
  createGlossaryContainer,
  createSourceContainer,
  createTargetContainer,
  createTargetContainerWithInfo,
  downloadDocument,
  getUniqueName,
} from "./containerHelper";
import {
  createBatchRequest,
  createSourceInput,
  createTargetInput,
  getTranslationOperationID,
  sleep,
} from "../utils/testHelper";
import { createTestDocument } from "../utils/TestDocument";
import { BatchRequest } from "../../../src/models";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DocumentTranslation tests", () => {
  const retryCount = 10;
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("Client Cannot Authenticate With FakeApiKey", async () => {
    const testEndpoint = "https://t7d8641d8f25ec940-doctranslation.cognitiveservices.azure.com";
    const testApiKey = "fakeApiKey";
    const testClient = await createDocumentTranslationClientWithEndpointAndCredentials({
      endpointParam: testEndpoint,
      credentials: { key: testApiKey },
    });

    const response = await testClient.path("/document/formats").get();
    if (isUnexpected(response)) {
      assert.equal(response.status, "401");
    }
  });

  it("Single Source Single Target", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
  });

  it("Single Source Multiple Targets", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);

    const containerName1 = recorder.variable("targetContainer1", `target-${getUniqueName()}`);
    const targetUrl1 = await createTargetContainer(recorder, containerName1);
    const targetInput1 = createTargetInput(targetUrl1, "fr");

    const containerName2 = recorder.variable("targetContainer2", `target-${getUniqueName()}`);
    const targetUrl2 = await createTargetContainer(recorder, containerName2);
    const targetInput2 = createTargetInput(targetUrl2, "es");

    const containerName3 = recorder.variable("targetContainer3", `target-${getUniqueName()}`);
    const targetUrl3 = await createTargetContainer(recorder, containerName3);
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
    validateTranslationStatus(response as StartTranslationDefaultResponse, 3);
  });

  it("Multiple Sources Single Target", async () => {
    const srcContainerName1 = recorder.variable("sourceContainer1", `source-${getUniqueName()}`);
    const sourceUrl1 = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS, srcContainerName1);
    const sourceInput1 = createSourceInput(sourceUrl1);

    const tgtContainerName1 = recorder.variable("targetContainer1", `target-${getUniqueName()}`);
    const targetUrl1 = await createTargetContainer(recorder, tgtContainerName1);
    const targetInput1 = createTargetInput(targetUrl1, "fr");
    const batchRequest1 = createBatchRequest(sourceInput1, [targetInput1]);

    const srcContainerName2 = recorder.variable("sourceContainer2", `source-${getUniqueName()}`);
    const sourceInput2 = createSourceInput(
      await createSourceContainer(recorder, ONE_TEST_DOCUMENTS, srcContainerName2),
    );

    const tgtContainerName2 = recorder.variable("targetContainer2", `target-${getUniqueName()}`);
    const targetUrl2 = await createTargetContainer(recorder, tgtContainerName2);
    const targetInput2 = createTargetInput(targetUrl2, "es");
    const batchRequest2 = createBatchRequest(sourceInput2, [targetInput2]);

    // Start translation
    const batchRequests = { inputs: [batchRequest1, batchRequest2] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    validateTranslationStatus(response, 2);
  });

  it("Single Source Single Target With Prefix", async () => {
    const documentFilter = {
      prefix: "File",
    };
    const sourceUrl = await createSourceContainer(recorder, TWO_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl, undefined, undefined, documentFilter);

    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
  });

  it("Single Source Single Target With Suffix", async () => {
    const documentFilter = {
      suffix: "txt",
    };
    const sourceInput = createSourceInput(
      await createSourceContainer(recorder, ONE_TEST_DOCUMENTS),
      undefined,
      undefined,
      documentFilter,
    );
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
  });

  it("Single Source Single Target List Documents", async () => {
    const sourceInput = createSourceInput(
      await createSourceContainer(recorder, ONE_TEST_DOCUMENTS),
    );
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
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
        translationStatus = (await client
          .path("/document/batches/{id}", operationId)
          .get()) as GetTranslationStatus200Response;
      } catch (error) {
        console.error("Error during translation status retrieval:", error);
      }
    } while (
      translationStatus &&
      (translationStatus.body as TranslationStatusOutput).status === "Succeeded" &&
      retriesLeft > 0
    );
    const translationStatusOutput = translationStatus?.body as TranslationStatusOutput;

    if (translationStatusOutput.status === "Succeeded") {
      // get Documents Status
      const documentResponse = await client
        .path("/document/batches/{id}/documents", operationId)
        .get();
      if (isUnexpected(documentResponse)) {
        throw "get documents status job error:" + documentResponse.body;
      }
      const responseBody = documentResponse.body;
      for (const documentStatus of responseBody.value) {
        console.log("documentStatus.status" + documentStatus.status);
        console.log("translationStatusOutput.status" + translationStatusOutput.status);
        assert.equal(documentStatus.status, translationStatusOutput.status);
        assert.equal(
          documentStatus.characterCharged,
          translationStatusOutput.summary.totalCharacterCharged,
        );
        break;
      }
    }
  });

  it("Get Document Status", async () => {
    const sourceInput = createSourceInput(
      await createSourceContainer(recorder, ONE_TEST_DOCUMENTS),
    );
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
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
    const targetInput = createTargetInput(await createTargetContainer(recorder), "es");
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
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
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
    const documents = [
      createTestDocument("Document1.txt", "First english test file"),
      createTestDocument("File2.jpg", "jpg"),
    ];
    const sourceUrl = await createSourceContainer(recorder, documents);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    // Start translation
    const batchRequests = { inputs: [batchRequest] };
    const response = await StartTranslationAndWait(batchRequests);
    if (isUnexpected(response)) {
      throw "get documents status job error:" + response.body;
    }

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);
  });

  it("Empty Document Error", async () => {
    const documents = [createTestDocument("Document1.txt", "")];
    const sourceUrl = await createSourceContainer(recorder, documents);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
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
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder, undefined, ONE_TEST_DOCUMENTS);
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
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
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
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);

    const targetContainer = await createTargetContainerWithInfo(recorder);
    const targetUrl = targetContainer.get("sasUrl") as string;
    const targetContainerName = targetContainer.get("containerName") as string;
    const glossaryUrl = await createGlossaryContainer(recorder);

    const glossaries = [
      {
        glossaryUrl: glossaryUrl,
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

    const result = downloadDocument(recorder, targetContainerName, "Document1.txt");
    assert.isTrue((await result).includes("glossaryTest"));
  });

  async function validateTranslationStatus(
    translationResponse: StartTranslationDefaultResponse,
    translationCount: number,
  ) {
    const operationLocationUrl = translationResponse.headers["operation-location"];
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);
    assert.equal(translationResponse.status, "Succeeded");

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
  ) {
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
    const poller = getLongRunningPoller(client, response, testPollingOptions);
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    return response as StartTranslationDefaultResponse;
  }
});
