// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { DocumentFilter, DocumentStatusOutput, DocumentTranslationClient, GetDocumentStatus200Response, GetDocumentsStatus200Response, GetTranslationStatus200Response, Glossary, StartTranslationDefaultResponse, TranslationStatusOutput, getLongRunningPoller, isUnexpected, } from "../.././../src";
import { createDocumentTranslationClient, createDocumentTranslationClientWithEndpointAndCredentials, startRecorder } from "../utils/recordedClient";

import { Context } from "mocha";
import { ONE_TEST_DOCUMENTS, createGlossaryContainer, createSourceContainer, createTargetContainer, createTargetContainerWithInfo, downloadDocument } from "./containerHelper";
import { createBatchRequest, createSourceInput, createTargetInput, getTranslationOperationID, sleep } from "../utils/testHelper";
import { TestDocument, createTestDocument } from "../utils/TestDocument";

export const testPollingOptions = {
  intervalInMs: isPlaybackMode() ? 0 : undefined,
};

describe("DocumentTranslation tests", () => {
  let retryCount = 10; 
  let recorder: Recorder;
  let client: DocumentTranslationClient;

  beforeEach(async function (this: Context) {
    recorder = await startRecorder(this);
    client = await createDocumentTranslationClient({ recorder });
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it ("Client Cannot Authenticate With FakeApiKey", async () => {
    const testEndpoint = "https://t7d8641d8f25ec940-doctranslation.cognitiveservices.azure.com";
    const testApiKey = "fakeApiKey";
    const testClient = await createDocumentTranslationClientWithEndpointAndCredentials({
        endpointParam: testEndpoint,
        credentials: { key: testApiKey}
    });

    const response = await testClient.path("/document/formats").get();
    if (isUnexpected(response)) {
        assert.equal(response.status, "401");
    }

  });

  it ("Single Source Single Target", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    if (isUnexpected(response)) {
        throw "start translation job error:" + response.body;
    }

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);

  });

  it ("Single Source Multiple Targets", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    const targetInput1 = createTargetInput(await createTargetContainer(recorder), "fr");
    const targetInput2 = createTargetInput(await createTargetContainer(recorder), "es");
    const targetInput3 = createTargetInput(await createTargetContainer(recorder), "ar");
    const batchRequest = createBatchRequest(sourceInput, [targetInput1, targetInput2, targetInput3]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    if (isUnexpected(response)) {
        throw "start translation job error:" + response.body;
    }

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 3);

  });

  it ("Multiple Sources Single Target", async () => {
    const sourceInput1 = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS));
    const targetInput1 = createTargetInput(await createTargetContainer(recorder), "fr");
    const batchRequest1 = createBatchRequest(sourceInput1, [targetInput1]);

    const sourceInput2 = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS));
    const targetInput2 = createTargetInput(await createTargetContainer(recorder), "es");
    const batchRequest2 = createBatchRequest(sourceInput2, [targetInput2]);

    //Start translation
    const batchRequests = {inputs: [batchRequest1, batchRequest2]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    if (isUnexpected(response)) {
        throw "start translation job error:" + response.body;
    }

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 2);

  });

  //This test is failing, need to investigate
  it ("Single Source Single Target With Prefix", async () => {
    const documentFilter: DocumentFilter = {
        prefix: "File"
      };
    const sourceInput = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS), undefined, undefined, documentFilter );
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    if (isUnexpected(response)) {
        throw "start translation job error:" + response.body;
    }

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);

  });

  it ("Single Source Single Target With Suffix", async () => {
    const documentFilter: DocumentFilter = {
        suffix: "txt"
      };
    const sourceInput = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS), undefined, undefined, documentFilter );
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    if (isUnexpected(response)) {
        throw "start translation job error:" + response.body;
    }

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);

  });

  it ("Single Source Single Target List Documents", async () => {
    const sourceInput = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS));
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    //get translations status
    const translationStatus = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
    const translationStatusOutput = translationStatus.body as TranslationStatusOutput;

    //get Documents Status
    const documentResponse = await client.path("/document/batches/{id}/documents", operationId).get();
    if (documentResponse.status === "200" && "body" in documentResponse) {  
        const responseBody = (documentResponse as GetDocumentsStatus200Response).body;
        for (const documentStatus of responseBody.value) {
            assert.equal(documentStatus.status, translationStatusOutput.status);
            assert.equal(documentStatus.characterCharged, translationStatusOutput.summary.totalCharacterCharged);
            break;          
        }
      }
      if (isUnexpected(response)) {
        throw "get documents status job error:" + response.body;
      }
  });

  it ("Get Document Status", async () => {
    const sourceInput = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS));
    const targetInput = createTargetInput(await createTargetContainer(recorder), "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    //get Documents Status
    const documentResponse = await client.path("/document/batches/{id}/documents", operationId).get();
    if (documentResponse.status === "200" && "body" in documentResponse) {  
        const responseBody = (documentResponse as GetDocumentsStatus200Response).body;
        for (const document of responseBody.value) {
            const documentStatus = await client.path("/document/batches/{id}/documents/{documentId}", operationId, document.id).get();
            validateDocumentStatus(documentStatus as GetDocumentStatus200Response, document.to);
        }
      }
      if (isUnexpected(response)) {
        throw "get documents status job error:" + response.body;
      }
  });

  it ("Wrong Source Right Target", async () => {
    const sourceInput = createSourceInput("https://idont.ex.ist");
    const targetInput = createTargetInput(await createTargetContainer(recorder), "es");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);
    
    //get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
        try {
            await sleep(10000);
            retriesLeft--;
            translationStatus = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
        } catch (error) {
            console.error('Error during translation status retrieval:', error);
        }            
    } while (translationStatus && (translationStatus.body as TranslationStatusOutput).status == "NotStarted" && retriesLeft > 0);
    assert.equal((translationStatus?.body as TranslationStatusOutput).status, "ValidationFailed");
    assert.equal((translationStatus?.body as TranslationStatusOutput).error?.innerError?.code, "InvalidDocumentAccessLevel");

    if (isUnexpected(response)) {
    throw "get documents status job error:" + response.body;
    }
  });

  it ("Right Source Wrong Target", async () => {
    const sourceInput = createSourceInput(await createSourceContainer(recorder, ONE_TEST_DOCUMENTS));
    const targetInput = createTargetInput("https://idont.ex.ist", "es");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");


    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    //get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
        try {
            await sleep(10000);
            retriesLeft--;
            translationStatus = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
        } catch (error) {
            console.error('Error during translation status retrieval:', error);
        }            
    } while (translationStatus && (translationStatus.body as TranslationStatusOutput).status == "NotStarted" && retriesLeft > 0);

    assert.equal((translationStatus?.body as TranslationStatusOutput).status, "ValidationFailed");
    assert.equal((translationStatus?.body as TranslationStatusOutput).error?.innerError?.code, "InvalidTargetDocumentAccessLevel");

    if (isUnexpected(response)) {
    throw "get documents status job error:" + response.body;
    }
  });

  it ("Supported And UnSupported Files", async () => {
    const documents: TestDocument[] = [
        createTestDocument('Document1.txt', 'First english test file'),
        createTestDocument('File2.jpg', 'jpg')
    ];
    const sourceUrl = await createSourceContainer(recorder, documents);
    const sourceInput = createSourceInput(sourceUrl);  
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    validateTranslationStatus(response as StartTranslationDefaultResponse, 1);    

    if (isUnexpected(response)) {
    throw "get documents status job error:" + response.body;
    }
  });

  it ("Empty Document Error", async () => {
    const documents: TestDocument[] = [
        createTestDocument('Document1.txt', ''),
    ];
    const sourceUrl = await createSourceContainer(recorder, documents);
    const sourceInput = createSourceInput(sourceUrl);  
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    }); 

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const result = await (await poller).pollUntilDone();
    assert.equal(result.status, "200");

    // Validate the response
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);    

    const translationStatus = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
    const translationStatusOutput = translationStatus.body as TranslationStatusOutput;
    assert.equal(translationStatusOutput.status, "Failed");
    assert.equal(translationStatusOutput.summary.total, 1);
    assert.equal(translationStatusOutput.summary.success, 0);
    assert.equal(translationStatusOutput.summary.failed, 1);
    assert.equal(translationStatusOutput.error?.code, "InvalidRequest");
    assert.equal(translationStatusOutput.error?.innerError?.code, "NoTranslatableText");

    if (isUnexpected(response)) {
    throw "get documents status job error:" + response.body;
    }
  });

  it ("Existing File In Target Container", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);  
    const targetUrl = await createTargetContainer(recorder, ONE_TEST_DOCUMENTS);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    });
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    //get translations status
    let translationStatus = null;
    let retriesLeft = retryCount;
    do {
        try {
            await sleep(10000);
            retriesLeft--;
            translationStatus = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
        } catch (error) {
            console.error('Error during translation status retrieval:', error);
        }            
    } while (translationStatus && (translationStatus.body as TranslationStatusOutput).status == "NotStarted" && retriesLeft > 0);
    assert.equal((translationStatus?.body as TranslationStatusOutput).status, "ValidationFailed");
    assert.equal((translationStatus?.body as TranslationStatusOutput).error?.innerError?.code, "TargetFileAlreadyExists");

    if (isUnexpected(response)) {
    throw "get documents status job error:" + response.body;
    }
  });

  it ("Invalid Document GUID", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);  
    const targetUrl = await createTargetContainer(recorder);
    const targetInput = createTargetInput(targetUrl, "fr");
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    });
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    //get document status    
    let documentResponse = await client.path("/document/batches/{id}/documents/{documentId}", operationId, "Foo Bar").get();
    assert.equal(documentResponse.status, "404");

    documentResponse = await client.path("/document/batches/{id}/documents/{documentId}", operationId, " ").get();
    assert.equal(documentResponse.status, "404");
    
    if (isUnexpected(response)) {
        console.log("Error during get document status:", response.body);
        throw "get documents status job error:" + response.body;
    }
  });

  it ("Document Translation With Glossary", async () => {
    const sourceUrl = await createSourceContainer(recorder, ONE_TEST_DOCUMENTS);
    const sourceInput = createSourceInput(sourceUrl);
    
    const targetContainer: Map<string, string> = await createTargetContainerWithInfo(recorder);
    const targetUrl = targetContainer.get("sasUrl") as string; 
    const targetContainerName =  targetContainer.get("containerName") as string; 
    const glossaryUrl = await createGlossaryContainer(recorder);
    const glossaries: Glossary[] = [{ 
        glossaryUrl: glossaryUrl,
        format: "csv"
    }];
    const targetInput = createTargetInput(targetUrl, "fr", undefined, glossaries);
    const batchRequest = createBatchRequest(sourceInput, [targetInput]);

    //Start translation
    const batchRequests = {inputs: [batchRequest]};
    const response = await client.path("/document/batches").post({
        body: batchRequests
    });

    // Wait until the operation completes
    const poller = getLongRunningPoller(client, response, testPollingOptions);  
    const pollerResult = await (await poller).pollUntilDone();
    assert.equal(pollerResult.status, "200");

    // Validate the response
    const operationLocationUrl = response.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);

    const result = downloadDocument(targetContainerName, "Document1.txt");
    assert.isTrue((await result).includes("glossaryTest"));

    if (isUnexpected(response)) {
        throw "Error:" + response.body;
    }
  });

async function validateTranslationStatus(translationResponse: StartTranslationDefaultResponse, translationCount: number) {    
    const operationLocationUrl = translationResponse.headers["operation-location"]
    const operationId = getTranslationOperationID(operationLocationUrl);
    assert.isNotNull(operationId);
    assert.equal(translationResponse.status, "Succeeded");

    const translationStatus = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
    const translationStatusOutput = translationStatus.body as TranslationStatusOutput;
    assert.equal(translationStatusOutput.summary.total, translationCount);
    assert.equal(translationStatusOutput.summary.success, translationCount);
    assert.equal(translationStatusOutput.summary.failed, 0);
    assert.equal(translationStatusOutput.summary.cancelled, 0);
    assert.equal(translationStatusOutput.summary.inProgress, 0);
}

function validateDocumentStatus(documentStatus: GetDocumentStatus200Response, targetLanguage: string) {
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
}
    
});

