# Migrating from `@azure/ai-form-recognizer` Version 4.0.0 to `@azure-rest/ai-document-intelligence` Version 1.0.0-beta.1

In this first preview of `@azure-rest/ai-document-intelligence` Rest Level Client Library, this package introduces a new design for the Azure AI Document Intelligence service (formerly known as Form Recognizer), targeting service API version `"2023-10-31-preview"`.

To leverage features of the newest Azure AI Document Intelligence service API (version "2023-10-31-preview" and newer), the new SDK is required, and application code must be changed to use the new client. Similarly, the new major version 4 of the client library cannot be used to communicate with versions 2.1 of the service API. To summarize:

- Version 3 of the `@azure/ai-form-recognizer` package _only_ supports Form Recognizer service API version 2.1, and will not receive support for newer (date-based) versions of Form Recognizer.
- Version 4 of the `@azure/ai-form-recognizer` package supports service API version "2022-08-31" of Form Recognizer.

_**Note: Form Recognizer has been rebranded to Document Intelligence.**_

- Version 1 of the `@azure-rest/ai-document-intelligence` package will receive support for newer (date-based) versions of Azure AI Document Intelligence.

This document provides instructions for updating your application code to the new `@azure-rest/ai-document-intelligence` SDK client library. In this document, the examples provided use TypeScript to provide type information, but all runtime behavior changes naturally apply to plain JavaScript as well.

## Partial Migration (Side-by-Side)

To avoid migrating an application all at once, `@azure-rest/ai-document-intelligence` Version 1.0.0-beta.1 may be installed alongside `@azure/ai-form-recognizer` Version 4.0.0. For instance, add the following to the `dependencies` field of `package.json`:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "^4.0.0",
        "@azure-rest/ai-document-intelligence": "1.0.0-beta.1"
    }
}
```

Then, the two packages may be used side-by-side, and an application may be migrated partially or over time:

```javascript
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
```

## Understanding the New Package

In the new `@azure-rest/ai-document-intelligence` package, several types and method signatures have been introduced which would feel newer owing to the redesign as a Rest Level Client package.

- `@azure/ai-form-recognizer` package offered `DocumentAnalysisClient` and `DocumentModelAdministrationClient` classes.
- The new `@azure-rest/ai-document-intelligence` package offers a `createClient` method that allows creating a an instance of `DocumentIntelligenceClient`, which would be the equivalent of the two classes offered through `@azure/ai-form-recognizer` package.

## Migrating from `DocumentAnalysisClient` to `DocumentIntelligence`

The previous `DocumentAnalysisClient` class offered

```ts
beginAnalyzeDocument(modelId, document: FormRecognizerRequestBody)
beginAnalyzeDocumentFromUrl(modelId, documentUrl)
beginClassifyDocument(classifierId, document: FormRecognizerRequestBody)
beginClassifyDocumentFromUrl(classifierId, documentUrl)
```

methods to analyze/classify documents.

Equivalently, the new `DocumentIntelligence` offers the following instead through the routes:

```ts
path("/documentModels/{modelId}:analyze", "<model-id>").post({
  contentType: "application/json",
  body: { urlSource: "..." }, // or { base64Source: "..." }
});

path("/documentClassifiers/{classifierId}:analyze", "<classifier-id>").post({
  contentType: "application/json",
  body: { urlSource: "..." }, // or { base64Source: "..." }
});
```

### URL Inputs

As in the previous "@azure/ai-form-recognizer" v4.0.0 SDK, to provide a publicly-accessible URL as an input to an analysis operation, use the `beginAnalyzeDocumentFromUrl` method, which treats the data passed to it as a file's contents. In the new `@azure-rest/ai-document-intelligence` package, the equivalent is to use the `path` method to call the `analyze` route and pass the URL as body (shown below).

Previous ("@azure/ai-form-recognizer" v4.0.0):

```typescript
import { AzureKeyCredential, DocumentAnalysisClient } from "@azure/ai-form-recognizer";

const client = new DocumentAnalysisClient(process.env.FORM_RECOGNIZER_ENDPOINT, new AzureKeyCredential(process.env.FORM_RECOGNIZER_API_KEY); );
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg";

const poller = await client.beginAnalyzeDocumentFromUrl("<model ID>", url);
```

Current ("@azure-rest/ai-document-intelligence" v1.0.0-beta.1):

```typescript
import DocumentIntelligence from "@azure-rest/ai-document-intelligence";

const client = DocumentIntelligence(process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"], {
  key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"],
});
const url =
  "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg";

const initialResponse = await client.path("/documentModels/{modelId}:analyze", "<model ID>").post({
  contentType: "application/json",
  body: { urlSource: url },
});

if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}
const poller = await getLongRunningPoller(client, initialResponse);
```

### Base64 Inputs

As in the previous "@azure/ai-form-recognizer" v4.0.0 SDK, to provide a document input to an analysis operation, use the `beginAnalyzeDocument` method, which treats the data passed to it as a file's contents.
In the new `@azure-rest/ai-document-intelligence` package, the equivalent is to use the `path` method to call the `analyze` route and pass the base64-encoded contents (string) as body (shown below).

_Note: Subject to change in the future previews of this package for better._

Previous ("@azure/ai-form-recognizer" v4.0.0):

```ts
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
const path = "<path to a document>";
const readStream = fs.createReadStream(path);
const poller = await client.beginAnalyzeDocument(modelId, readStream);
```

Current ("@azure-rest/ai-document-intelligence" v1.0.0-beta.1):

```ts
import DocumentIntelligence from "@azure-rest/ai-document-intelligence";

const client = DocumentIntelligence(endpoint, { key: apiKey });
const filePath = "<path to a document>";
const base64Source = fs.readFileSync(filePath, { encoding: "base64" });
const initialResponse = await client.path("/documentModels/{modelId}:analyze", "<model id>").post({
  contentType: "application/json",
  body: { base64Source },
});

if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const poller = getLongRunningPoller(client, initialResponse, { ...testPollingOptions });
```

## Example with polling

```ts
const endpoint = "<cognitive services endpoint>";
const apiKey = "<api key>";
const path = "<path to a document>"; // pdf/jpeg/png/tiff formats

const readStream = fs.createReadStream(path);

const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
const poller = await client.beginAnalyzeDocument("prebuilt-layout", readStream);
const { pages, tables } = await poller.pollUntilDone();
```

```ts
const client = DocumentIntelligence(
  process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"] || "<cognitive services endpoint>",
  { key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"] || "<api key>" }
);

const base64Source = fs.readFileSync(filePath, { encoding: "base64" });
const initialResponse = await client.path("/documentModels/{modelId}:analyze", "prebuilt-layout").post({
  contentType: "application/json",
  body: { base64Source },
});

if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const poller = await getLongRunningPoller(client, initialResponse);
const analyzeResult = (await poller.pollUntilDone().body as AnalyzeResultOperationOutput)
  .analyzeResult;

const pages = analyzeResult?.pages;
const tables = analyzeResult?.tables;
```

## Migrating from `DocumentModelAdministrationClient` to `DocumentIntelligence`

The `DocumentModelAdministrationClient` class, was used for all model management operations (creating, reading, listing, and deleting models). The new `DocumentIntelligence` offers the following instead through the routes:

```ts
beginBuildDocumentClassifier(classifierId, docTypeSources: DocumentClassifierDocumentTypeSources)
beginBuildDocumentModel(modelId, containerUrl, buildMode: "template")
beginBuildDocumentModel(modelId, contentSource: DocumentModelSource, buildMode: "template")
beginComposeDocumentModel(modelId, componentModelIds: Iterable<string> BeginComposeDocumentModelOptions)
beginCopyModelTo(sourceModelId, authorization: CopyAuthorization)
deleteDocumentClassifier(classifierId)
deleteDocumentModel(modelId)
getCopyAuthorization(destinationModelId)
getDocumentClassifier(classifierId)
getDocumentModel(modelId)
getOperation(operationId)
getResourceDetails()
listDocumentClassifiers()
listDocumentModels()
listOperations()
```

Equivalently, the new `DocumentIntelligence` offers the following instead through the routes:

```ts
path("/documentClassifiers:build").post({
  body: {
    classifierId: "<classifier-id>",
    docTypes: {
      foo: {
        azureBlobSource: {
          containerUrl: "<container-url>",
        },
      },
    },
  },
});
path("/documentModels:build").post({
  body: {
    buildMode: "template",
    modelId: modelName,
    azureBlobSource: {
      containerUrl: "<container-url>",
    },
  },
});
path("/documentModels:compose").post({
  body: {
    componentModels: componentModelIds,
    modelId,
  },
});
path("/documentClassifiers/{classifierId}", classifierId).delete();
path("/documentModels/{modelId}", modelId).delete();
path("/documentModels/{modelId}:copyTo", sourceModel.modelId).post({
  body: targetAuth.body,
});
path("/documentClassifiers/{classifierId}", classifierId).get();
path("/documentModels/{modelId}", model.modelId).get();
path("/operations/{operationId}", "<operationId>").get();
path("/info").get();
path("/documentClassifiers").get();
path("/documentModels").get();
path("/operations").get();
```

## Features Added

