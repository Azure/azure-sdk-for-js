# Azure Document Translation client library for JavaScript

Document Translation is a cloud-based machine translation feature of the Azure AI Translator service. You can translate multiple and complex documents across all supported languages and dialects while preserving original document structure and data format. The Document Translation API supports two translation processes:

Asynchronous batch translation supports the processing of multiple documents and large files. The batch translation process requires an Azure Blob storage account with storage containers for your source and translated documents.

Synchronous single file translation supports the processing of single file translations. The file translation process doesn't require an Azure Blob storage account. The final response contains the translated document and is returned directly to the calling client.

The following operations are supported by the Document Translation feature:

- **Synchronous document translation**: Used to synchronously translate a single document. The method doesn't require an Azure Blob storage account.
- **Start batch translation**: Used to execute an asynchronous batch translation request. The method requires an Azure Blob storage account with storage containers for your source and translated documents.
- **Get status for all translation jobs**: Used to request a list and the status of all translation jobs submitted by the user (associated with the resource).
- **Get status for a specific translation job**: Used to request the status of a specific translation job. The response includes the overall job status and the status for documents that are being translated as part of that job.
- **Get status for all documents**: Used to request the status for all documents in a translation job.
- **Get status for a specific document**: Returns the status for a specific document in a job as indicated in the request by the id and documentId query parameters.
- **Cancel translation**: Cancels a translation job that is currently processing or queued (pending). An operation isn't canceled if already completed, failed, or still canceling.
- **Get supported formats**: Returns a list of document or glossary formats supported by the Document Translation feature.

Key links:

- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document)
- [Package (NPM)](https://www.npmjs.com/package/@azure/ai-translation-document)
- [API reference documentation](https://learn.microsoft.com/javascript/api/@azure/ai-translation-document)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/translation/ai-translation-document/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)
- Latest versions of Safari, Chrome, Edge and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription][azure_sub].
- An existing Translator service or Azure AI services resource. See [Create a Translator resource][translator_resource_create].

### Install the `@azure/ai-translation-document` package

Install the Azure Document Translation client library for JavaScript with `npm`:

```bash
npm install @azure/ai-translation-document
```

#### Set up Azure Blob Storage account

Batch translation requires an Azure Blob Storage account. For more information about creating an Azure Blob Storage account see [here][azure_blob_storage_account]. For creating containers for your source and target files see [here][container]. Make sure to authorize your Translation resource storage access, more info [here][storage_container_authorization].

When "Allow Storage Account Key Access" is disabled on the storage account, Managed Identity is enabled on the Translator resource, and it is assigned the role "Storage Blob Data Contributor" on the storage account, then you can use the container URLs directly and no SAS URIs will need to be generated.

### Authenticate the client

This library exposes two clients:

- `DocumentTranslationClient` for batch translation and translation status operations.
- `SingleDocumentTranslationClient` for synchronous single-document translation.

Both clients can authenticate with a Microsoft Entra credential or an API key.

#### Using a Microsoft Entra credential

You can authenticate with Microsoft Entra ID using a credential from the [@azure/identity][azure_identity] library. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below, or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

You will also need to **register a new Microsoft Entra application and grant access** to the Translator resource by assigning a suitable role to your service principal.

Using Node.js and Node-like environments, you can use the `DefaultAzureCredential` class to authenticate the client:

```ts snippet:ReadmeSampleCreateClient_Node
import { DocumentTranslationClient } from "@azure/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
const client = new DocumentTranslationClient(endpoint, new DefaultAzureCredential());
```

For browser environments, use the `InteractiveBrowserCredential` from the `@azure/identity` package to authenticate:

```ts snippet:ReadmeSampleCreateClient_Browser
import { InteractiveBrowserCredential } from "@azure/identity";
import { DocumentTranslationClient } from "@azure/ai-translation-document";

const credential = new InteractiveBrowserCredential({
  tenantId: "<YOUR_TENANT_ID>",
  clientId: "<YOUR_CLIENT_ID>",
});
const client = new DocumentTranslationClient("<endpoint>", credential);
```

#### Using an API key

You can also authenticate with the resource's API key using a `KeyCredential`:

```ts snippet:ReadmeSampleCreateClient_KeyCredential
import { KeyCredential } from "@azure/core-auth";
import { DocumentTranslationClient } from "@azure/ai-translation-document";

const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
const credential: KeyCredential = { key: "YOUR_SUBSCRIPTION_KEY" };
const client = new DocumentTranslationClient(endpoint, credential);
```

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

## Key concepts

### DocumentTranslationClient

`DocumentTranslationClient` is the interface for asynchronous batch translation and for querying translation and document status. Batch translation requires an Azure Blob Storage account with containers for your source and translated documents.

### SingleDocumentTranslationClient

`SingleDocumentTranslationClient` is the interface for synchronous single-document translation. It doesn't require an Azure Blob Storage account; the translated document is returned directly in the response.

## Examples

The following section provides several code snippets covering the main features of this client library.

### Synchronous document translation

Used to synchronously translate a single document. The method doesn't require an Azure Blob storage account.

```ts snippet:ReadmeSampleSynchronousDocumentTranslation
import { SingleDocumentTranslationClient } from "@azure/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";
import { writeFile } from "node:fs/promises";

const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
const client = new SingleDocumentTranslationClient(endpoint, new DefaultAzureCredential());
const response = await client.translate("hi", {
  document: {
    contents: "This is a test.",
    contentType: "text/html",
    filename: "test-input.txt",
  },
});
if (response.readableStreamBody) {
  await writeFile("test-output.txt", response.readableStreamBody);
}
```

### Batch document translation

Used to execute an asynchronous batch translation request. The method requires an Azure Blob storage account with storage containers for your source and translated documents. Provide the source and target container URLs (with SAS tokens if required) and poll until the operation completes.

```ts snippet:ReadmeSampleBatchDocumentTranslation
import { DocumentTranslationClient } from "@azure/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
const client = new DocumentTranslationClient(endpoint, new DefaultAzureCredential());
const poller = client.startTranslation({
  inputs: [
    {
      source: { sourceUrl: "<source container SAS URL>" },
      targets: [{ targetUrl: "<target container SAS URL>", language: "fr" }],
    },
  ],
});
const result = await poller.pollUntilDone();
console.log(`Translation status: ${result.status}`);
```

### Get supported formats

Returns a list of document formats supported by the Document Translation feature.

```ts snippet:ReadmeSampleGetSupportedFormats
import { DocumentTranslationClient } from "@azure/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<translator-instance>.cognitiveservices.azure.com";
const client = new DocumentTranslationClient(endpoint, new DefaultAzureCredential());
const formats = await client.getSupportedFormats("document");
for (const format of formats.value) {
  console.log(format.format);
}
```

## Troubleshooting

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```ts snippet:SetLogLevel
import { setLogLevel } from "@azure/logger";

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

## Related projects

- [Microsoft Azure SDK for JavaScript](https://github.com/Azure/azure-sdk-for-js)

[azure_sub]: https://azure.microsoft.com/free/
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[translator_resource_create]: https://learn.microsoft.com/azure/ai-services/translator/create-translator-resource
[azure_blob_storage_account]: https://learn.microsoft.com/azure/storage/common/storage-account-create
[container]: https://learn.microsoft.com/azure/storage/blobs/storage-quickstart-blobs-portal#create-a-container
[storage_container_authorization]: https://learn.microsoft.com/azure/ai-services/translator/document-translation/how-to-guides/create-sas-tokens

</content>
