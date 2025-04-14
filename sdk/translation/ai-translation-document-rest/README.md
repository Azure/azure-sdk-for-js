# DocumentTranslation REST client library for JavaScript

Document Translation is a cloud-based machine translation feature of the Azure AI Translator service. You can translate multiple and complex documents across all supported languages and dialects while preserving original document structure and data format. The Document translation API supports two translation processes:

Asynchronous batch translation supports the processing of multiple documents and large files. The batch translation process requires an Azure Blob storage account with storage containers for your source and translated documents.

Synchronous single file supports the processing of single file translations. The file translation process doesn't require an Azure Blob storage account. The final response contains the translated document and is returned directly to the calling client.

The following operations are supported by the Document Translation feature:

- **Synchronous document translation**: Used to synchronously translate a single document. The method doesn't require an Azure Blob storage account.

- **Start batch translation**: Used to execute an asynchronous batch translation request. The method requires an Azure Blob storage account with storage containers for your source and translated documents.

- **Get status for all translation jobs**: Used to request a list and the status of all translation jobs submitted by the user (associated with the resource).

- **Get status for a specific translation job**: Used to request the status of a specific translation job. The response includes the overall job status and the status for documents that are being translated as part of that job.

- **Get status for all documents**: Used to request the status for all documents in a translation job.

- **Get status for a specific document**: This returns the status for a specific document in a job as indicated in the request by the id and documentId query parameters.

- **Cancel translation**: This cancels a translation job that is currently processing or queued (pending) as indicated in the request by the id query parameter. An operation isn't canceled if already completed, failed, or still canceling. In those instances, a bad request is returned. Completed translations can't be canceled and are charged.

- **Get supported formats**: This returns a list of document or glossary formats supported by the Document Translation feature. The list includes common file extensions and content-type if using the upload API.

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

#### Setup Azure Blob Storage Account

For more information about creating an Azure Blob Storage account see [here][azure_blob_storage_account]. For creating containers for your source and target files see [here][container]. Make sure to authorize your Translation resource storage access, more info [here][storage_container_authorization].

When "Allow Storage Account Key Access" is disabled on the storage account , Managed Identity is enabled on the Translator resource and it is assigned the role "Storage Blob Data Contributor" on the storage account, then you can use the container URLs directly and no SAS URIs will be need to be generated.

### Create a `DocumentTranslationClient` using an endpoint URL and API key `KeyCredential`

Once you have the value for API key, create a credential

```ts snippet:ReadmeSampleKeyCredential
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
```

With the value of the `KeyCredential` you can create the `DocumentTranslationClient` using the `createClient` method of [documentTranslationClient_class]:

```ts snippet:ReadmeSampleCreateClient
import DocumentTranslationClient from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);
```

## Examples

The following section provides several code snippets using the `client`, and covers the main features present in this client library.

### Synchronous Document Translation

Used to synchronously translate a single document. The method doesn't require an Azure Blob storage account.

```ts snippet:ReadmeSampleSynchronousDocumentTranslation
import DocumentTranslationClient, {
  DocumentTranslateParameters,
  isUnexpected,
} from "@azure-rest/ai-translation-document";
import { writeFileSync } from "node:fs";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

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
  throw response.body.error;
}

// Write the response to a file
writeFileSync("test-output.txt", response.body);
```

### Batch Document Translation

Used to execute an asynchronous batch translation request. The method requires an Azure Blob storage account with storage containers for your source and translated documents.

```ts snippet:ReadmeSampleBatchDocumentTranslation
import DocumentTranslationClient from "@azure-rest/ai-translation-document";
import { BlobServiceClient, ContainerSASPermissions } from "@azure/storage-blob";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

// Upload test documents to source container
const testDocuments = [{ name: "Document1.txt", content: "First english test document" }];
const sourceContainerName = "source-12345";
const connectionString =
  "DefaultEndpointsProtocol=httpsAccountName=your_account_name;AccountKey=your_account_key;EndpointSuffix=core.windows.net";
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const sourceContainerClient = blobServiceClient.getContainerClient(sourceContainerName);
await sourceContainerClient.createIfNotExists();
for (const document of testDocuments) {
  const blobClient = sourceContainerClient.getBlobClient(document.name);
  const blockBlobClient = blobClient.getBlockBlobClient();
  await blockBlobClient.upload(document.content, document.content.length);
}

// Create configuration for the source connection
const sourceUrl = await sourceContainerClient.generateSasUrl({
  permissions: ContainerSASPermissions.parse("rwl"),
  expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
});
const sourceInput = { sourceUrl };

// Create target container
const targetContainerName = "target-12345";
const targetContainerClient = blobServiceClient.getContainerClient(targetContainerName);
await targetContainerClient.createIfNotExists();

// Create configuration for the target connection
const targetUrl = await targetContainerClient.generateSasUrl({
  permissions: ContainerSASPermissions.parse("rwl"),
  expiresOn: new Date(Date.now() + 24 * 60 * 60 * 1000),
});
const targetInput = { targetUrl, language: "fr" };

// Start translation
const batchRequest = { source: sourceInput, targets: [targetInput] };
const batchRequests = { inputs: [batchRequest] };
const poller = await client.path("/document/batches").post({
  body: batchRequests,
});

const operationId =
  new URL(poller.headers["operation-location"]).pathname.split("/").filter(Boolean).pop() || "";
console.log(`Translation started and the operationID is: ${operationId}`);
```

### Cancel Document Translation

This cancels a translation job that is currently processing or queued (pending) as indicated in the request by the id query parameter. An operation isn't canceled if already completed, failed, or still canceling. In those instances, a bad request is returned. Completed translations can't be canceled and are charged.

```ts snippet:ReadmeSampleCancelDocumentTranslation
import DocumentTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

const id = "<operation-id-from-batch-translation>";
await client.path("/document/batches/{id}", id).delete();

// Get translation status and verify the job is cancelled, cancelling or notStarted
const response = await client.path("/document/batches/{id}", id).get();
if (isUnexpected(response)) {
  throw response.body.error;
}
```

### Get Documents Status

Used to request the status for all documents in a translation job.

```ts snippet:ReadmeSampleGetDocumentsStatus
import DocumentTranslationClient, {
  isUnexpected,
  paginate,
} from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

// Get Documents Status
const id = "<operation-id-from-batch-translation>";
const documentResponse = await client.path("/document/batches/{id}/documents", id).get();
if (isUnexpected(documentResponse)) {
  throw documentResponse.body.error;
}

const documentStatus = paginate(client, documentResponse);
for await (const document of documentStatus) {
  console.log(`Document ${document.id} status: ${document.status}`);
}
```

### Get Document Status

This returns the status for a specific document in a job as indicated in the request by the id and documentId query parameters.

```ts snippet:ReadmeSampleGetDocumentStatus
import DocumentTranslationClient, {
  isUnexpected,
  paginate,
} from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

// Get Documents Status
const id = "<operation-id-from-batch-translation>";
const documentResponse = await client.path("/document/batches/{id}/documents", id).get();
if (isUnexpected(documentResponse)) {
  throw documentResponse.body.error;
}

const documentStatus = paginate(client, documentResponse);
for await (const document of documentStatus) {
  // Get individual Document Status
  const documentStatus = await client
    .path("/document/batches/{id}/documents/{documentId}", id, document.id)
    .get();
  if (isUnexpected(documentStatus)) {
    throw documentStatus.body.error;
  }

  const documentStatusOutput = documentStatus.body;
  console.log(`Document Status: ${documentStatusOutput.status}`);
  console.log(`Document ID: ${documentStatusOutput.id}`);
  console.log(`Document source path: ${documentStatusOutput.sourcePath}`);
  console.log(`Document path: ${documentStatusOutput.path}`);
  console.log(`Target language: ${documentStatusOutput.to}`);
  console.log(`Document created dateTime: ${documentStatusOutput.createdDateTimeUtc}`);
  console.log(`Document last action date time: ${documentStatusOutput.lastActionDateTimeUtc}`);
}
```

### Get Translations Status

Used to request a list and the status of all translation jobs submitted by the user (associated with the resource).

```ts snippet:ReadmeSampleGetTranslationsStatus
import DocumentTranslationClient, {
  isUnexpected,
  paginate,
} from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

// Get status
const id = "<operation-id-from-batch-translation>";
const queryParams = {
  ids: [id],
};
const response = await client.path("/document/batches").get({
  queryParameters: queryParams,
});
if (isUnexpected(response)) {
  throw response.body.error;
}

const translationResponse = paginate(client, response);
for await (const translationStatus of translationResponse) {
  console.log(`Translation ID: ${translationStatus.id}`);
  console.log(`Translation Status ${translationStatus.status}`);
  console.log(`Translation createdDateTimeUtc: ${translationStatus.createdDateTimeUtc}`);
  console.log(`Translation lastActionDateTimeUtc: ${translationStatus.lastActionDateTimeUtc}`);
  console.log(`Total documents submitted for translation: ${translationStatus.summary.total}`);
  console.log(`Total characters charged: ${translationStatus.summary.totalCharacterCharged}`);
}
```

### Get Translation Status

Used to request the status of a specific translation job. The response includes the overall job status and the status for documents that are being translated as part of that job.

```ts snippet:ReadmeSampleGetTranslationStatus
import DocumentTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

// Get status
const id = "<operation-id-from-batch-translation>";
const response = await client.path("/document/batches/{id}", id).get();
if (isUnexpected(response)) {
  throw response.body.error;
}

const translationStatus = response.body;
console.log(`Translation ID: ${translationStatus.id}`);
console.log(`Translation Status ${translationStatus.status}`);
console.log(`Translation createdDateTimeUtc: ${translationStatus.createdDateTimeUtc}`);
console.log(`Translation lastActionDateTimeUtc: ${translationStatus.lastActionDateTimeUtc}`);
console.log(`Total documents submitted for translation: ${translationStatus.summary.total}`);
console.log(`Total characters charged: ${translationStatus.summary.totalCharacterCharged}`);
```

### Get Supported Formats

This returns a list of document or glossary formats supported by the Document Translation feature. The list includes common file extensions and content-type if using the upload API.

```ts snippet:ReadmeSampleGetSupportedFormats
import DocumentTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-document";

const endpoint = "https://<translator-instance>-doctranslation.cognitiveservices.azure.com";
const key = "YOUR_SUBSCRIPTION_KEY";
const credential = {
  key,
};
const client = DocumentTranslationClient(endpoint, credential);

const response = await client.path("/document/formats").get();
if (isUnexpected(response)) {
  throw response.body.error;
}

for (const fileFormatType of response.body.value) {
  console.log(`File format: ${fileFormatType.format}`);
  console.log(`Content types: ${fileFormatType.contentTypes}`);
  console.log(`File extensions: ${fileFormatType.fileExtensions}`);
}
```

## Troubleshooting

When you interact with the Translator Service using the DocumentTranslator client library, errors returned by the Translator service correspond to the same HTTP status codes returned for REST API requests.

For example, if you submit a translation request without a target translate language, a `400` error is returned, indicating "Bad Request".

You can find the different error codes returned by the service in the [Service Documentation][service_errors].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).
Please refer to the service documentation for a conceptual discussion of [languages][languages_doc].

[service_errors]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/how-to-guides/use-rest-api-programmatically?tabs=csharp#common-http-status-codes
[translator_resource_create]: https://learn.microsoft.com/azure/cognitive-services/Translator/create-translator-resource
[documentTranslationClient_class]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document-rest/src/documentTranslationClient.ts
[pre_requisities]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/how-to-guides/use-rest-api-programmatically?tabs=csharp#prerequisites
[azure_blob_storage_account]: https://ms.portal.azure.com/#create/Microsoft.StorageAccount
[container]: https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container
[storage_container_authorization]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/quickstarts/client-library-sdks?tabs=dotnet&pivots=programming-language-csharp#storage-container-authorization
