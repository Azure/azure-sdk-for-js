# Release History

## 2.0.0-beta.1 (2025-08-29)
Compared with version 1.1.0

### Features Added
  - Added operation in Routes for path: "/documentModels/{modelId}/analyzeResults/{resultId}/png"
  - Added Interface GetAnalyzeResultPng
  - Added Interface GetAnalyzeResultPng200Headers
  - Added Interface GetAnalyzeResultPng200Response
  - Added Interface GetAnalyzeResultPngDefaultResponse
  - Added Interface SimplePollerLike
  - Added Type Alias GetAnalyzeResultPngParameters
  - Added function overload "export function isUnexpected(response: GetAnalyzeResultPng200Response | GetAnalyzeResultPngDefaultResponse): response is GetAnalyzeResultPngDefaultResponse;"

### Breaking Changes
  - Removed Interface GetLongRunningPollerOptions
  - Removed function parseResultIdFromResponse
  - Removed function streamToUint8Array
  - Removed Enum KnownDocumentIntelligenceAudience

<!-- dev-tool snippets ignore -->

## 1.1.0 (2025-05-08)

### Features Added

- Supports alternative cloud environments (Azure United States Government and Azure China Cloud). To use an alternative cloud environment, provide a value for the `scopes` field of `DocumentIntelligenceClientOptions#credentials` to configure the client to authenticate within a [Sovereign Cloud](https://learn.microsoft.com/entra/identity-platform/authentication-national-cloud).
  Import and use `KnownDocumentIntelligenceAudience` to get the correct values for a given cloud environment. The currently supported cloud environments are:

  - `KnownDocumentIntelligenceAudience.AzureChina` (`"https://cognitiveservices.azure.cn"`),
  - `KnownDocumentIntelligenceAudience.AzureGovernment` (`"https://cognitiveservices.azure.us"`),
  - `KnownDocumentIntelligenceAudience.AzurePublicCloud` (`"https://cognitiveservices.azure.com"`),

  ```js
    const client = DocumentIntelligence(
      "<cognitive services endpoint>",
      <--credential-->,
      { credentials: { scopes: [ KnownDocumentIntelligenceAudience.AzureGovernment ] } }
    );
  ```

  If `scopes` is undefined, the default value is suitable for the Azure Public Cloud `https://cognitiveservices.azure.com`.

## 1.0.0 (2024-12-16)

### Features Added

- Adds `streamToUint8Array`, a convenience function that buffers a `NodeJS.ReadableStream` in a `Uint8Array`. It can be used to read the pdf and png responses from the results of an analysis.

  ```ts
  import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
  import { streamToUint8Array } from "@azure-rest/ai-document-intelligence";

  const client = DocumentIntelligence("<DOCUMENT_INTELLIGENCE_ENDPOINT>", {
    key: "<DOCUMENT_INTELLIGENCE_API_KEY>",
  });

  // Do analysis on you document and get the resultId, figureId

  // Example for the figures api that provides an image output
  const output = await client
    .path(
      "/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}",
      "prebuilt-layout",
      resultId,
      figureId,
    )
    .get()
    .asNodeStream(); // output.body would be NodeJS.ReadableStream

  if (output.status !== "200" || !output.body) {
    throw new Error("The response was unexpected, expected NodeJS.ReadableStream in the body.");
  }

  const imageData = await streamToUint8Array(output.body);
  fs.promises.writeFile(`./figures/${figureId}.png`, imageData); // Or you can consume the NodeJS.ReadableStream directly
  ```

- Adds `parseResultIdFromResponse`, a convenience function that extracts the `operationId` from the batch analysis response.

  ```js
  // Example
  const initialResponse = await client
    .path("/documentModels/{modelId}:analyzeBatch", "prebuilt-layout")
    .post({
      contentType: "application/json",
      body: {
        azureBlobSource: {
          containerUrl: batchTrainingFilesContainerUrl(),
        },
        resultContainerUrl: batchTrainingFilesResultContainerUrl(),
        resultPrefix: "result",
      },
    });

  if (isUnexpected(initialResponse)) {
    throw initialResponse.body.error;
  }
  const batchResultId = parseResultIdFromResponse(initialResponse);

  const response = await client
    .path(
      "/documentModels/{modelId}/analyzeBatchResults/{resultId}",
      "prebuilt-layout",
      batchResultId,
    )
    .get();
  ```

- Changes the following interfaces as follows:

  - `AnalyzeBatchDocumentsBodyParam`:
    - Updates `body` to be required.
  - `AnalyzeBatchOperationOutput`:
    - Adds `resultId`.
  - `AnalyzeDocumentBodyParam`:
    - Changes `body` from optional to required.
  - `DocumentClassifierDetailsOutput`:
    - Adds `modifiedDateTime`.
  - `DocumentModelDetailsOutput`:
    - Adds `modifiedDateTime`.

- Introduces new interfaces to define query parameters for document analysis requests, allowing customizable `style` and `explode` options:
  - **AnalyzeBatchDocumentsFeaturesQueryParam**: Accepts DocumentAnalysisFeature[] values.
  - **AnalyzeBatchDocumentsOutputQueryParam**: Accepts AnalyzeOutputOption[] values.
  - **AnalyzeBatchDocumentsQueryFieldsQueryParam**: Accepts string[] values.
  - **AnalyzeDocumentFeaturesQueryParam**: Accepts DocumentAnalysisFeature[] values.
  - **AnalyzeDocumentFromStreamFeaturesQueryParam**: Accepts DocumentAnalysisFeature[] values.

### Breaking Changes

- Removes the `poller.getOperationId()` for a given polling operation. Use `parseResultIdFromResponse` to extract the `operationId` directly.
- `getLongRunningPoller` function is not async anymore, do not `await` on it.

### Other Changes

The following types are renamed

- `CopyAuthorization` to `ModelCopyAuthorization`
- `ErrorResponseOutput` to `DocumentIntelligenceErrorResponseOutput`
- `ErrorModelOutput` to `DocumentIntelligenceErrorOutput`
- `InnerErrorOutput` to `DocumentIntelligenceInnerErrorOutput`
- `WarningOutput` to `DocumentIntelligenceWarningOutput`
- `ContentFormat` to `DocumentContentFormat`
- `ContentFormatOutput` to `DocumentContentFormatOutput`
- `OperationDetailsOutputParent` to `DocumentIntelligenceOperationDetailsOutputParent`
- `OperationDetailsOutput` to `DocumentIntelligenceOperationDetailsOutput`
- `OperationStatusOutput` to `DocumentIntelligenceOperationStatusOutput`
- `ResourceDetailsOutput` to `DocumentIntelligenceResourceDetailsOutput`
- `PagedOperationDetailsOutput` to `PagedDocumentIntelligenceOperationDetailsOutput`
- `GetResourceInfo` to `GetResourceDetails`
- `AnalyzeResultOperationOutput` to `AnalyzeOperationOutput`
- `FontWeightOutput` to `DocumentFontWeightOutput`
- `FontStyleOutput` to `DocumentFontStyleOutput`
- `DocumentOutput` to `AnalyzedDocumentOutput`
- `CopyAuthorizationOutput` to `ModelCopyAuthorizationOutput`

## 1.0.0-beta.3 (2024-08-20)

### Features Added

- Added support for the Analyze Batch Documents API with the long-running operations, `/documentModels/{modelId}:analyzeBatch`.
- Added support for method `/documentModels/{modelId}/analyzeResults/{resultId}/pdf`.
- Added support for method `/documentModels/{modelId}/analyzeResults/{resultId}/figures/{figureId}`.
- Added support for the analysis method to specify other kinds of output through `AnalyzeDocumentFromStreamBodyParam#output` param : can be `pdf` and `figures`.
- Added property `id` to `Output` model.
- Added support for the Copy Classifier API with method `/documentClassifiers:authorizeCopy`.
- Added method `/documentClassifiers/{classifierId}:copyTo`.
- Added new enum type to `DocumentBuildMode`: `generative`.
- Added property `warnings` to `AnalyzeResultOutput ` model.
- Added properties `classifierId`, `split`, and `trainingHours` to `DocumentModelDetailsOutput` model.
- Added properties `confidenceThreshold`, `features`, `maxDocumentsToAnalyze`, `modelId`, and `queryFields` to `DocumentTypeDetailsOutput` model.
- Added properties `allowOverwrite` and `maxTrainingHours` to `BuildDocumentModelRequest` model.
- Added parameter `pages` to `ClassifyDocument` overloads.
- Added properties `classifierId`, `docTypes`, and `split` to `ComposeDocumentModelRequest`.
- Added property `allowOverwrite` to `BuildDocumentClassifierRequest`.
- Added property `getOperationId()` method to the pollers.

### Other Changes

- The `@azure-rest/ai-document-intelligence` Rest Level Client Library, now targets the Azure AI Document Intelligence service API version `2024-07-31-preview`. Support for `2024-02-29-preview` has been removed.
- Removed support for extracting lists from analyzed documents:
  - Removed models `DocumentListOutput` and `DocumentListItemOutput`.
  - Removed property `lists` from `AnalyzeResultOutput`.
- Changes to the Compose Document API:
  - Removed model `ComponentDocumentModelDetails`.
  - Removed property `componentModels` from `ComposeDocumentModelRequest`.
  - `ComposeDocumentModelRequest` now requires a map of `DocumentTypeDetails` and a classifier ID.
- Removed model `QuotaDetailsOutput`.
- Removed property `customNeuralDocumentModelBuilds` from `ResourceDetailsOutput`.
- Removed required property `fieldSchema` and from `DocumentTypeDetailsOuput`.
- `DocumentFieldType` is now a required property of `DocumentFieldSchema`.

## 1.0.0-beta.2 (2024-03-06)

### Features Added

- Support for "retry-after" header has been added for long-running operations, including `/documentModels/{modelId}:analyze`, `/documentModels:build`, and `/documentClassifiers:build`.
- `BuildDocumentClassifierContent` now includes a new property, `baseClassifierId`.
- `DocumentClassifierDetailsOutput` now includes a new property, `baseClassifierId`.
- A new property, `warnings`, has been added to `DocumentModelDetailsOutput` and `DocumentClassifierDetailsOutput`, represents an array of objects with `code`, `message`, and `target`.
- `DocumentFieldOutput` now includes a new property, `valueSelectionGroup`.
- A new member, `"completed"`, has been added to `OperationDetails#status`.

### Breaking Changes

- The `@azure-rest/ai-document-intelligence` Rest Level Client Library, previously known as Form Recognizer, now targets the Azure AI Document Intelligence service API version `"2024-02-29-preview"`. Please note that support for `2023-10-31-preview` has been discontinued.

## 1.0.0-beta.1 (2023-11-16)

### Features Added

This marks the first preview of `@azure-rest/ai-document-intelligence` Rest Level Client Library for the Azure AI Document Intelligence service (formerly known as Form Recognizer), targeting service API version `"2023-10-31-preview"`.

_**Note: Form Recognizer has been rebranded to Document Intelligence.**_

- Updates all REST API operation paths from `{endpoint}/formrecognizer` to `{endpoint}/documentintelligence`. SDK would handle this change automatically, users would not have to do additional work to support this.
- `@azure-rest/ai-document-intelligence` is the new package, replacing `@azure/ai-form-recognizer` package. The new package supports a Rest Level Client, which is part of the new generation of Azure SDKs to simplify the development experience. The new package is not compatible with the previous `@azure/ai-form-recognizer` package without necessary changes to your code.
- **Breaking Changes (with the `@azure/ai-form-recognizer` SDK)** - API shapes have been designed from scratch to support the new Rest Level Client for the Document Intelligence service. Please refer to the [Readme](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/README.md) and [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/documentintelligence/ai-document-intelligence-rest/samples) for more understanding.

### `"2023-10-31-preview"` Service API version

The new `"2023-10-31-preview"` service version comes with some new features and a few breaking changes when compared to the API versions supported by the `@azure/ai-form-recognizer` library.

**New Features**

- **Markdown content format**

  Supports output with Markdown content format along with the default plain _text_. For now, this is only supported for "prebuilt-layout". Markdown content format is deemed a more friendly format for LLM consumption in a chat or automation use scenario.

  Service follows the GFM spec ([GitHub Flavored Markdown](https://github.github.com/gfm/)) for the Markdown format. Also introduces a new _contentFormat_ property with value "text" or "markdown" to indicate the result content format.

  ```ts
  import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
  const client = DocumentIntelligence(process.env["DOCUMENT_INTELLIGENCE_ENDPOINT"], {
    key: process.env["DOCUMENT_INTELLIGENCE_API_KEY"],
  });

  const initialResponse = await client
    .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
    .post({
      contentType: "application/json",
      body: {
        urlSource:
          "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/6704eff082aaaf2d97c1371a28461f512f8d748a/sdk/formrecognizer/ai-form-recognizer/assets/forms/Invoice_1.pdf",
      },
      queryParameters: { outputContentFormat: "markdown" }, // <-- new query parameter
    });
  ```

- **Query Fields**

  When this feature flag is specified, the service will further extract the values of the fields specified via the queryFields query parameter to supplement any existing fields defined by the model as fallback.

  ```ts
  await client.path("/documentModels/{modelId}:analyze", "prebuilt-layout").post({
    contentType: "application/json",
    body: { urlSource: "..." },
    queryParameters: {
      features: ["queryFields"],
      queryFields: ["NumberOfGuests", "StoreNumber"],
    }, // <-- new query parameter
  });
  ```

- **Split Options**

  In the previous API versions supported by the older `@azure/ai-form-recognizer` library, document splitting and classification operation (`"/documentClassifiers/{classifierId}:analyze"`) always tried to split the input file into multiple documents.

  To enable a wider set of scenarios, service introduces a "split" query parameter with the new "2023-10-31-preview" service version. The following values are supported:

  - `split: "auto"`

    Let service determine where to split.

  - `split: "none"`

    The entire file is treated as a single document. No splitting is performed.

  - `split: "perPage"`

    Each page is treated as a separate document. Each empty page is kept as its own document.

### Breaking Changes

- **prebuilt-receipt** - Currency related fields have been updated. Currency symbol ("$") and code ("USD") are returned along with the amount as shown below.

  ```json
  {
    "content": "$123.45",
    "confidence": 0.995,
    "type": "currency",
    "valueCurrency": {
      "amount": 123.45,
      "currencySymbol": "$",
      "currencyCode": "USD"
    },
    ...
  }
  ```

**Retirements/Deprecations**

- `"prebuilt-businessCard"` model is retired.
- `"prebuilt-document"` model is retired, this model is essentially `"prebuilt-layout"` with `features: ["keyValuePairs"]` specified. _(This is only supported as an optional feature for "prebuilt-layout" and "prebuilt-invoice".)_

If you wish to still use these models, please rely on the older `@azure/ai-form-recognizer` library through the older service API versions.

If you were using the old `@azure/ai-form-recognizer` package, please refer [MIGRATION_GUIDE.MD](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/documentintelligence/ai-document-intelligence-rest/MIGRATION-FR_v4-DI_v1.md) for more details.
