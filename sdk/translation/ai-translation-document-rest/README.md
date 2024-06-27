# DocumentTranslation REST client library for JavaScript

Document Translation is a cloud-based machine translation feature of the Azure AI Translator service. You can translate multiple and complex documents across all supported languages and dialects while preserving original document structure and data format. The Document translation API supports two translation processes:

Asynchronous batch translation supports the processing of multiple documents and large files. The batch translation process requires an Azure Blob storage account with storage containers for your source and translated documents.

Synchronous single file supports the processing of single file translations. The file translation process doesn't require an Azure Blob storage account. The final response contains the translated document and is returned directly to the calling client.

The following operations are supported by the Document Translation feature:

Synchronous document translation: Used to synchronously translate a single document. The method doesn't require an Azure Blob storage account.

Start batch translation: Used to execute an asynchronous batch translation request. The method requires an Azure Blob storage account with storage containers for your source and translated documents.

Get status for all translation jobs: Used to request a list and the status of all translation jobs submitted by the user (associated with the resource).

Get status for a specific translation job: Used to request the status of a specific translation job. The response includes the overall job status and the status for documents that are being translated as part of that job.

Get status for all documents: Used to request the status for all documents in a translation job.

Get status for a specific document: This returns the status for a specific document in a job as indicated in the request by the id and documentId query parameters.

Cancel translation: This cancels a translation job that is currently processing or queued (pending) as indicated in the request by the id query parameter. An operation isn't canceled if already completed, failed, or still canceling. In those instances, a bad request is returned. Completed translations can't be canceled and are charged.

Get supported formats: This returns a list of document or glossary formats supported by the Document Translation feature. The list includes common file extensions and content-type if using the upload API.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document-rest)
- [Package (NPM)](https://www.npmjs.com/package/@azure-rest/ai-translation-document)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document-rest/samples)

## Getting started

### Currently supported environments

- LTS versions of Node.js
- Latest versions of Edge, Chrome, Safar and Firefox

### Prerequisites

- An existing Translator service or Cognitive Services resource. More info on [Pre-requisites][pre_requisities].

### Install the `@azure-rest/ai-translation-document` package

Install the Document Translation REST client library for JavaScript with `npm`:

```bash
npm install @azure-rest/ai-translation-document
```

#### Create a Translator service resource

You can create Translator resource following [Create a Translator resource][translator_resource_create].

### Create a `DocumentTranslationClient` using an endpoint URL and API key `KeyCredential`

Once you have the value for API key, create a credential
```typescript
const credentials = { key: apiKey ?? "" };
```

With the value of the `KeyCredential` you can create the `DocumentTranslationClient` using the `createClient` method of [documentTranslationClient_class]:

```typescript
const client = createClient(endpoint, credentials);
```

## Examples

The following section provides several code snippets using the `client`, and covers the main features present in this client library.

### Synchronous Document Translation

Used to synchronously translate a single document. The method doesn't require an Azure Blob storage account.

```typescript
console.log("== Synchronous Document Translation ==");
const client = createClient(endpoint, credentials);
const options: DocumentTranslateParameters = {
  queryParameters: {
    targetLanguage: "hi",
  },
  contentType: "multipart/form-data",
  body: [
    {
      name: "document",
      body: "This is a test.",
      filename: "test-input.txt",
      contentType: "text/html",
    },
  ],
};

const response = await client.path("/document:translate").post(options);
if (isUnexpected(response)) {
  throw response.body;
}
console.log('Response code: ' + response.status + ', Response body: ' + response.body); 
```

### Batch Document Translation
Used to execute an asynchronous batch translation request. The method requires an Azure Blob storage account with storage containers for your source and translated documents.

```typescript
console.log("== Batch Document Translation ==");
const client = createClient(endpoint, credentials);

const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
const sourceInput = createSourceInput(sourceUrl);
const targetUrl = await createTargetContainer();
const targetInput = createTargetInput(targetUrl, "fr");
const batchRequest = createBatchRequest(sourceInput, [targetInput]);

//Start translation
const batchRequests = {inputs: [batchRequest]};
const poller = await client.path("/document/batches").post({
body: batchRequests
}); 
const id = getTranslationOperationID(poller.headers["operation-location"]);
console.log('Translation started and the operationID is: ' + id);
```

### Cancel Document Translation
This cancels a translation job that is currently processing or queued (pending) as indicated in the request by the id query parameter. An operation isn't canceled if already completed, failed, or still canceling. In those instances, a bad request is returned. Completed translations can't be canceled and are charged.

```typescript
console.log("== Cancel Translation ==");
const client = createClient(endpoint, credentials);

const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
const sourceInput = createSourceInput(sourceUrl);
const targetUrl = await createTargetContainer();
const targetInput = createTargetInput(targetUrl, "fr");
const batchRequest = createBatchRequest(sourceInput, [targetInput]);

//Start translation
const batchRequests = {inputs: [batchRequest]};
const poller = await client.path("/document/batches").post({
body: batchRequests
}); 
const id = getTranslationOperationID(poller.headers["operation-location"]);

//Cancel translation
await client.path("/document/batches/{id}", id).delete();

//get translation status and verify the job is cancelled, cancelling or notStarted
const response = await client.path("/document/batches/{id}", id).get();
if (isUnexpected(response)) {
  throw response.body;
}
console.log("The status after cancelling the batch operation is:" + response.body.status);
```

### Get Documents Status
Used to request the status for all documents in a translation job.

```typescript
console.log("== Gets Documents Status ==");
const client = createClient(endpoint, credentials);

const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
const sourceInput = createSourceInput(sourceUrl);
const targetUrl = await createTargetContainer();
const targetInput = createTargetInput(targetUrl, "fr");
const batchRequest = createBatchRequest(sourceInput, [targetInput]);

//Start translation
const batchRequests = {inputs: [batchRequest]};
const response = await StartTranslationAndWait(client, batchRequests); 

const operationLocationUrl = response.headers["operation-location"]
const operationId = getTranslationOperationID(operationLocationUrl);

//get Documents Status
const documentResponse = await client.path("/document/batches/{id}/documents", operationId).get();
if (isUnexpected(documentResponse)) {
  throw documentResponse.body;
}

const responseBody = documentResponse.body;
for (const documentStatus of responseBody.value) {
    console.log("Document Status is: " + documentStatus.status);
    console.log("Characters charged is: " + documentStatus.characterCharged);
    break;          
}
```

### Get Document Status
This returns the status for a specific document in a job as indicated in the request by the id and documentId query parameters.

```typescript
console.log("== Get Document Status ==");
const client = createClient(endpoint, credentials);

const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
const sourceInput = createSourceInput(sourceUrl);
const targetUrl = await createTargetContainer();
const targetInput = createTargetInput(targetUrl, "fr");
const batchRequest = createBatchRequest(sourceInput, [targetInput]);

//Start translation
const batchRequests = {inputs: [batchRequest]};
const response = await StartTranslationAndWait(client, batchRequests); 
const operationLocationUrl = response.headers["operation-location"]
const operationId = getTranslationOperationID(operationLocationUrl);

//get Documents Status
const documentResponse = await client.path("/document/batches/{id}/documents", operationId).get();
if (isUnexpected(documentResponse)) {
  throw documentResponse.body;
}

const responseBody = documentResponse.body;
for (const document of responseBody.value) {
    //get document status
    const documentStatus = await client.path("/document/batches/{id}/documents/{documentId}", operationId, document.id).get();
    console.log("Document Status = " + documentStatus.status);
    const documentStatusOutput = documentStatus.body as DocumentStatusOutput;
    console.log("Document ID = " +documentStatusOutput.id);
    console.log("Document source path = " + documentStatusOutput.sourcePath);
    console.log("Document path = " + documentStatusOutput.path);
    console.log("Target language = " + documentStatusOutput.to);
    console.log("Document created dateTime = " + documentStatusOutput.createdDateTimeUtc);
    console.log("Document last action date time = " + documentStatusOutput.lastActionDateTimeUtc);        
}
```

### Get Translations Status
Used to request a list and the status of all translation jobs submitted by the user (associated with the resource).

```typescript
console.log("== Get Translations Status ==");
  const client = createClient(endpoint, credentials);

  const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
  const sourceInput = createSourceInput(sourceUrl);
  const targetUrl = await createTargetContainer();
  const targetInput = createTargetInput(targetUrl, "fr");
  const batchRequest = createBatchRequest(sourceInput, [targetInput]);
  
  //Start translation
  const batchRequests = {inputs: [batchRequest]};
  const translationResponse = await StartTranslationAndWait(client, batchRequests); 
  const operationLocationUrl = translationResponse.headers["operation-location"]
  const operationId = getTranslationOperationID(operationLocationUrl);  

  //get Translation Statusby ID filter
  const queryParams = {
      ids: [operationId]
    };    
  const response = await client.path("/document/batches").get({
      queryParameters: queryParams 
    });
  if (isUnexpected(response)) {
    throw response.body;
  }  
  const responseBody = response.body;
  for (const translationStatus of responseBody.value) {
    console.log("Translation ID = " + translationStatus.id);
    console.log("Translation Status = " + translationStatus.status);
    console.log("Translation createdDateTimeUtc = " + translationStatus.createdDateTimeUtc);
    console.log("Translation lastActionDateTimeUtc = " + translationStatus.lastActionDateTimeUtc);
    console.log("Total documents submitted for translation = " + translationStatus.summary.total);
    console.log("Total characters charged = " + translationStatus.summary.totalCharacterCharged);
  }  
```

### Get Translation Status
Used to request the status of a specific translation job. The response includes the overall job status and the status for documents that are being translated as part of that job.

```typescript
console.log("== Get Translation Status ==");
const client = createClient(endpoint, credentials);

const sourceUrl = await createSourceContainer(ONE_TEST_DOCUMENTS);
const sourceInput = createSourceInput(sourceUrl);
const targetUrl = await createTargetContainer();
const targetInput = createTargetInput(targetUrl, "fr");
const batchRequest = createBatchRequest(sourceInput, [targetInput]);

//Start translation
const batchRequests = {inputs: [batchRequest]};
const translationResponse = await StartTranslationAndWait(client, batchRequests); 

const operationLocationUrl = translationResponse.headers["operation-location"]
const operationId = getTranslationOperationID(operationLocationUrl);  

//get Translation Status
const response = await client.path("/document/batches/{id}",operationId).get() as GetTranslationStatus200Response;
if (isUnexpected(response)) {
    throw response.body;
}

console.log("Translation ID = " + response.body.id);
console.log("Translation Status = " + response.body.status);
console.log("Translation createdDateTimeUtc = " + response.body.createdDateTimeUtc);
console.log("Translation lastActionDateTimeUtc = " + response.body.lastActionDateTimeUtc);
console.log("Total documents submitted for translation = " + response.body.summary.total);
console.log("Total characters charged = " + response.body.summary.totalCharacterCharged);
```


### Get Supported Formats

This returns a list of document or glossary formats supported by the Document Translation feature. The list includes common file extensions and content-type if using the upload API.

```typescript
console.log("== List Supported Format Types ==");

const documentTranslationClient = DocumentTranslationClient(endpoint);
const response = await documentTranslationClient.path("/document/formats").get();

const fileFormatTypes = response.body;
fileFormatTypes.value.forEach((fileFormatType: { format: any; contentTypes: any; fileExtensions: any; }) => {
console.log(fileFormatType.format);
console.log(fileFormatType.contentTypes);
console.log(fileFormatType.fileExtensions);
});
```

## Troubleshooting

When you interact with the Translator Service using the DocumentTranslator client library, errors returned by the Translator service correspond to the same HTTP status codes returned for REST API requests.

For example, if you submit a translation request without a target translate language, a `400` error is returned, indicating "Bad Request".

You can find the different error codes returned by the service in the [Service Documentation][service_errors].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
Please refer to the service documentation for a conceptual discussion of [languages][languages_doc].

[service_errors]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/how-to-guides/use-rest-api-programmatically?tabs=csharp#common-http-status-codes
[translator_resource_create]: https://learn.microsoft.com/azure/cognitive-services/Translator/create-translator-resource
[documentTranslationClient_class]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/src/documentTranslationClient.ts
[pre_requisities]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/how-to-guides/use-rest-api-programmatically?tabs=csharp#prerequisites
