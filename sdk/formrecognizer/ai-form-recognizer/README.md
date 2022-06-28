# Azure Form Recognizer client library for JavaScript

Azure Cognitive Services [Form Recognizer](https://azure.microsoft.com/services/cognitive-services/form-recognizer/) is a cloud service that uses machine learning to analyze text and structured data from your documents. It includes the following main features:

- Layout - Extract text, table structures, and selection marks, along with their bounding region coordinates, from documents.
- Document - Analyze entities, key-value pairs, tables, and selection marks from documents using the general prebuilt document model.
- Read - Read information about textual elements, such as page words and lines in addition to text language information.
- Prebuilt - Analyze data from certain types of common documents (such as receipts, invoices, business cards, or identity documents) using prebuilt models.
- Custom - Build custom models to extract text, field values, selection marks, and table data from documents. Custom models are built with your own data, so they're tailored to your documents.

[Source code](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/) |
[Package (NPM)](https://www.npmjs.com/package/@azure/ai-form-recognizer) |
[API reference documentation](https://docs.microsoft.com/javascript/api/@azure/ai-form-recognizer) |
[Product documentation](https://docs.microsoft.com/azure/cognitive-services/form-recognizer/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/samples)

#### **_Breaking Change Advisory_ ⚠️**

In version 4 (currently beta), this package introduces a full redesign of the Azure Form Recognizer client library. To leverage features of the newest Form Recognizer service API (version "2022-06-30-preview" and newer), the new SDK is required, and application code must be changed to use the new clients. Please see the [Migration Guide](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/MIGRATION-v3_v4.md) for detailed instructions on how to update application code from version 3.x of the Form Recognizer SDK to the new version (4.x). Additionally, the [CHANGELOG](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/CHANGELOG.md) contains an outline of the changes. This package targets Azure Form Recognizer service API version `2022-06-30-preview` and newer. To continue to use Form Recognizer API version 2.1, please use major version 3 of the client package (`@azure/ai-form-recognizer@^3.2.0`).

### Install the `@azure/ai-form-recognizer` Package

Install the Azure Form Recognizer client library for JavaScript with `npm`:

```bash
npm install @azure/ai-form-recognizer@4.0.0-beta.5
```

## Getting Started

```javascript
const { DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const { DefaultAzureCredential } = require("@azure/identity");

const fs = require("fs");

const credential = new DefaultAzureCredential();
const client = new DocumentAnalysisClient(
  "https://<resource name>.cognitiveservices.azure.com",
  credential
);

// Form Recognizer supports many different types of files.
const file = fs.createReadStream("path/to/file.jpg");
const poller = await client.beginAnalyzeDocument("<model ID>", file);

const { pages, tables, styles, keyValuePairs, entities, documents } = await poller.pollUntilDone();
```

### Currently Supported Environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Cognitive Services or Form Recognizer resource][fr_or_cs_resource]. If you need to create the resource, you can use the [Azure Portal][azure_portal] or [Azure CLI][azure_cli].

#### Create a Form Recognizer Resource

Form Recognizer supports both [multi-service and single-service access][multi_and_single_service]. Create a Cognitive Services resource if you plan to access multiple cognitive services under a single endpoint/key. For Form Recognizer access only, create a Form Recognizer resource.

You can create the resource using

**Option 1:** [Azure Portal][azure_portal_create_fr_resource]

**Option 2:** [Azure CLI][azure_cli_create_fr_resource].

Below is an example of how you can create a Form Recognizer resource using the CLI:

```bash
# Create a new resource group to hold the Form Recognizer resource -
# if using an existing resource group, skip this step
az group create --name my-resource-group --location westus2
```

If you use the Azure CLI, replace `<your-resource-group-name>` and `<your-resource-name>` with your own unique names:

```bash
az cognitiveservices account create --kind FormRecognizer --resource-group <your-resource-group-name> --name <your-resource-name> --sku <your-sku-name> --location <your-location>
```

### Create and Authenticate a Client

In order to interact with the Form Recognizer service, you'll need to select either a `DocumentAnalysisClient` or a `DocumentModelAdministrationClient`, and create an instance of this type. In the following examples, we will use `DocumentAnalysisClient`. To create a client instance to access the Form Recognizer API, you will need the `endpoint` of your Form Recognizer resource and a `credential`. The Form Recognizer clients can use either an `AzureKeyCredential` with an API key of your resource or a `TokenCredential` that uses Azure Active Directory RBAC to authorize the client.

You can find the endpoint for your Form Recognizer resource either in the [Azure Portal][azure_portal] or by using the [Azure CLI][azure_cli] snippet below:

```bash
az cognitiveservices account show --name <your-resource-name> --resource-group <your-resource-group-name> --query "properties.endpoint"
```

#### Using an API Key

Use the [Azure Portal][azure_portal] to browse to your Form Recognizer resource and retrieve an API key, or use the [Azure CLI][azure_cli] snippet below:

**Note:** Sometimes the API key is referred to as a "subscription key" or "subscription API key."

```bash
az cognitiveservices account keys list --resource-group <your-resource-group-name> --name <your-resource-name>
```

Once you have an API key and endpoint, you can use it as follows:

```js
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const client = new DocumentAnalysisClient("<endpoint>", new AzureKeyCredential("<API key>"));
```

#### Using Azure Active Directory

API key authorization is used in most of the examples, but you can also authenticate the client with Azure Active Directory using the [Azure Identity library][azure_identity]. To use the [DefaultAzureCredential][defaultazurecredential] provider shown below or other credential providers provided with the Azure SDK, please install the `@azure/identity` package:

```bash
npm install @azure/identity
```

To authenticate using a service principal, you will also need to [register an AAD application][register_aad_app] and grant access to Form Recognizer by assigning the `"Cognitive Services User"` role to your service principal (note: other roles such as `"Owner"` will not grant the necessary permissions, only `"Cognitive Services User"` will suffice to run the examples and the sample code).

Set the values of the client ID, tenant ID, and client secret of the AAD application as environment variables: `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, `AZURE_CLIENT_SECRET`.

```js
const { DocumentAnalysisClient } = require("@azure/ai-form-recognizer");
const { DefaultAzureCredential } = require("@azure/identity");

const client = new DocumentAnalysisClient("<endpoint>", new DefaultAzureCredential());
```

## Key Concepts

### `DocumentAnalysisClient`

`DocumentAnalysisClient` provides operations for analyzing input documents using custom and prebuilt models. It has three methods:

- `beginAnalyzeDocument`, which extracts data from an input document using a custom or prebuilt model given by its model ID. For information about the prebuilt models supported in all resources and their model IDs/outputs, please see [the service's documentation of the models][fr-models].
- `beginExtractLayout`, which uses the "prebuilt-layout" model to extract only the basic layout (OCR) information from the input documents, such as pages and their contents, tables, and observed text styles. This method provides a stronger TypeScript type for the layout result than the `beginAnalyzeDocument` method.
- `beginExtractGeneralDocument`, which uses the "prebuilt-document" model to extract key-value pairs and entities in addition to the properties of the prebuilt layout model. This method also provides a stronger TypeScript type for the general document result than the `beginAnalyzeDocument` method.
- `beginReadDocument`, which uses the "prebuilt-read" model to extract textual elements, such as page words and lines in addition to text language information.

### `DocumentModelAdministrationClient`

`DocumentModelAdministrationClient` provides operations for managing (creating, reading, listing, and deleting) models in the Form Recognizer resource:

- `beginBuildModel` starts an operation to create a new document model from your own training data set. The created model can extract fields according to a custom schema. The training data are expected to be located in an Azure Storage container and organized according to a particular convention. See the [service's documentation on creating a training data set][fr-build-training-set] for a more detailed explanation of applying labels to a training data set.
- `beginComposeModel` starts an operation to compose multiple models into a single model. When used for custom form recognition, the new composed model will first perform a classification of the input documents to determine which of its submodels is most appropriate.
- `beginCopyModelTo` starts an operation to copy a custom model from one Form Recognizer resource to another (or even to the same Form Recognizer resource). It requires a `CopyAuthorization` from the target Form Recognizer resource, which can be generated using the `getCopyAuthorization` method.
- `getInfo` retrieves information about the resource's limits, such as the number of custom models and the maximum number of models the resource can support.
- `getModel`, `listModels`, and `deleteModel` enable managing models in the resource.
- `getOperation` and `listOperations` enable viewing the status of model creation operations, even those operations that are ongoing or that have failed. Operations are retained for 24 hours.

Please note that models can also be created using the Form Recognizer service's graphical user interface: [Form Recognizer Labeling Tool][fr-labeling-tool].

Sample code snippets that illustrate the use of `DocumentModelAdministrationClient` to build a model can be found [below, in the "Build a Model" example section.](#build-a-model).

### Long-Running Operations

Long-running operations (LROs) are operations which consist of an initial request sent to the service to start an operation, followed by polling for a result at a certain interval to determine if the operation has completed and whether it failed or succeeded. Ultimately, the LRO will either fail with an error or produce a result.

In Azure Form Recognizer, operations that create models (including copying and composing models) as well as the analysis/data-extraction operations are LROs. The SDK clients provide asynchronous `begin<operation-name>` methods that return `Promise<PollerLike>` objects. The `PollerLike` object represents the operation, which runs asynchronously on the service's infrastructure, and a program can wait for the operation to complete by calling and awaiting the `pollUntilDone` method on the poller returned from the `begin<operation-name>` method. Sample code snippets are provided to illustrate using long-running operations in the next section.

## Examples

The following section provides several JavaScript code snippets illustrating common patterns used in the Form Recognizer client libraries.

- [Analyze a Document with a Model](#analyze-a-document-with-a-model)
- [Extract Layout](#extract-layout)
- [Extract General Document](#extract-general-document)
- [Use Prebuilt Models](#using-prebuilt-models)
- [Build a Model](#build-a-model)
- [Manage Models](#manage-models)

### Analyze a Document with a Model

The `beginAnalyzeDocument` method can extract fields and table data from documents. These models are trained with your own data, so they're tailored to your particular documents. A custom model should only be used with documents of the same structure as one of the document types in the model (there may be multiple, such as in a composed model).

```javascript
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const modelId = "<model id>";
  const path = "<path to a document>";

  const readStream = fs.createReadStream(path);

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginAnalyzeDocument(modelId, readStream, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });

  // There are more fields than just these three
  const { documents, pages, tables } = await poller.pollUntilDone();

  console.log("Documents:");
  for (const document of documents) {
    console.log(`Type: ${document.docType}`);
    console.log("Fields:");
    for (const [name, field] of Object.entries(document.fields)) {
      console.log(
        `Field ${name} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
  console.log("Pages:");
  for (const page of pages) {
    console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
  }

  console.log("Tables:");
  for (const table of tables) {
    console.log(`- Table (${table.columnCount}x${table.rowCount})`);
    for (const cell of table.cells) {
      console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

As an alternative to providing a readable stream, a publicly-accessible URL can be provided instead. "Publicly-accessible" means that URL sources must be accessible from the service's infrastructure (in other words, a private intranet URL, or URLs that use header- or certificate-based secrets, will not work, as the Form Recognizer service must be able to access the URL). However, the URL itself could encode a secret, such as an Azure Storage blob URL that contains a SAS token in the query parameters.

### Extract Layout

<a id="beginextractlayout-deprecation"></a>
**Deprecation Warning** ⚠️: The built in `beginExtractLayout` method is deprecated as of version `4.0.0-beta.4`. Prior to a stable release of version 4.0.0, we will remove it and provide a solution that uses the `beginAnalyzeDocument` method instead. This will align the `"prebuilt-layout"` model with the other prebuilt models, enabling us to continue to provide timely updates and ensure stability as the number of supported prebuilt models increases and as their capabilities are enhanced.

The `beginExtractLayout` method extracts only the basic elements of the document, such as pages, (which consist of text words/lines and selection marks), tables, and visual text styles along with their bounding regions and spans within the text content of the input documents.

```javascript
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to a document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginExtractLayout(readStream);
  const { pages, tables } = await poller.pollUntilDone();

  for (const page of pages) {
    console.log(`- Page ${page.pageNumber}: (${page.width}x${page.height} ${page.unit})`);
  }

  for (const table of tables) {
    console.log(`- Table (${table.columnCount}x${table.rowCount})`);
    for (const cell of table.cells) {
      console.log(`  cell [${cell.rowIndex},${cell.columnIndex}] "${cell.content}"`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

_Note_: you may also use the `beginAnalyzeDocument` method to extract layout information using the prebuilt layout model by providing the model ID `"prebuilt-layout"`. This method provides a weaker TypeScript type for the layout analysis result, but will produce the same information. The `beginExtractLayout` method is available for your convenience.

### Extract General Document

<a id="beginextractgeneraldocument-deprecation"></a>
**Deprecation Warning** ⚠️: The built in `beginExtractGeneralDocument` method is deprecated as of version `4.0.0-beta.4`. Prior to a stable release of version 4.0.0, we will remove it and provide a solution that uses the `beginAnalyzeDocument` method instead. This will align the `"prebuilt-document"` model with the other prebuilt models, enabling us to continue to provide timely updates and ensure stability as the number of supported prebuilt models increases and as their capabilities are enhanced.

The `beginExtractGeneralDocument` method extracts information about key-value pairs and entities in addition to the properties produced by the layout extraction method. This prebuilt (general) document model provides similar functionality to the custom models trained without label information in previous iterations of the Form Recognizer service, but it is now provided as a prebuilt model that works with a wide variety of documents.

```javascript
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to a document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginExtractGeneralDocument(readStream);

  // `pages`, `tables` and `styles` are also available as in the "layout" example above, but for the sake of this
  // example we won't show them here.
  const { keyValuePairs, entities } = await poller.pollUntilDone();

  if (keyValuePairs.length <= 0) {
    console.log("No key-value pairs were extracted from the document.");
  } else {
    console.log("Key-Value Pairs:");
    for (const { key, value, confidence } of keyValuePairs) {
      console.log("- Key  :", `"${key.content}"`);
      console.log("  Value:", `"${value?.content ?? "<undefined>"}" (${confidence})`);
    }
  }

  if (entities.length <= 0) {
    console.log("No entities were extracted from the document.");
  } else {
    console.log("Entities:");
    for (const entity of entities) {
      console.log(
        `- "${entity.content}" ${entity.category} - ${entity.subCategory ?? "<none>"} (${
          entity.confidence
        })`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

_Note_: you may also use the `beginAnalyzeDocument` method to extract general document information using the prebuilt document model by providing the model ID `"prebuilt-document"`. This method provides a weaker TypeScript type for the layout analysis result, but will produce the same information. The `beginExtractGeneralDocument` method is available for your convenience.

### Read Document

<a id="beginreaddocument-deprecation"></a>
**Deprecation Warning** ⚠️: The built in `beginReadDocument` method is deprecated as of version `4.0.0-beta.4`. Prior to a stable release of version 4.0.0, we will remove it and provide a solution that uses the `beginAnalyzeDocument` method instead. This will align the `"prebuilt-document"` model with the other prebuilt models, enabling us to continue to provide timely updates and ensure stability as the number of supported prebuilt models increases and as their capabilities are enhanced.

```javascript
const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");
const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to a document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const poller = await client.beginReadDocument(readStream);

  // The "prebuilt-read" model (`beginReadDocument` method) only extracts information about the textual content of the
  // document, such as page text elements, text styles, and information about the language of the text.
  const { content, pages, languages, styles } = await poller.pollUntilDone();

  if (pages.length <= 0) {
    console.log("No pages were extracted from the document.");
  } else {
    console.log("Pages:");
    for (const page of pages) {
      console.log("- Page", page.pageNumber, `(unit: ${page.unit})`);
      console.log(`  ${page.width}x${page.height}, angle: ${page.angle}`);
      console.log(`  ${page.lines.length} lines, ${page.words.length} words`);

      if (page.lines.length > 0) {
        console.log("  Lines:");

        for (const line of page.lines) {
          console.log(`  - "${line.content}"`);
        }
      }
    }
  }

  if (languages.length <= 0) {
    console.log("No language spans were extracted from the document.");
  } else {
    console.log("Languages:");
    for (const languageEntry of languages) {
      console.log(
        `- Found language: ${languageEntry.languageCode} (confidence: ${languageEntry.confidence})`
      );
      for (const text of getTextOfSpans(content, languageEntry.spans)) {
        const escapedText = text.replace(/\r?\n/g, "\\n").replace(/"/g, '\\"');
        console.log(`  - "${escapedText}"`);
      }
    }
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
```

_Note_: you may also use the `beginAnalyzeDocument` method to read document information using the "read" model by providing the model ID `"prebuilt-read"`. This method provides a weaker TypeScript type for the read result, but will produce the same information. The `beginReadDocument` method is available for your convenience.

### Using Prebuilt Models

The `beginAnalyzeDocument` method also supports extracting fields from certain types of common documents such as receipts, invoices, business cards, and identity documents using prebuilt models provided by the Form Recognizer service. The prebuilt models may be provided either as model ID strings (the same as custom document models) or using a `DocumentModel` object. When using a `DocumentModel`, the Form Recognizer SDK for JavaScript provides a much stronger TypeScript type for the resulting extracted documents based on the model's schema, and it will be converted to use JavaScript naming conventions.

<a id="prebuiltmodels-deprecation"></a>
**Deprecation Warning** ⚠️: The built in `PrebuiltModels` are deprecated as of version `4.0.0-beta.4`. Prior to a stable release of version 4.0.0, we will replace `PrebuiltModels` with an out-of-tree solution that provides the same strongly-typed functionality. This will enable us to continue to provide timely updates and ensure stability as the number of supported prebuilt models increases and as their capabilities are enhanced.

For example, the following code shows how to use `PrebuiltModels.Receipt` to extract a strongly-typed receipt object from an input.

```javascript
const {
  DocumentAnalysisClient,
  PrebuiltModels,
  AzureKeyCredential,
} = require("@azure/ai-form-recognizer");

const fs = require("fs");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const path = "<path to your receipt document>"; // pdf/jpeg/png/tiff formats

  const readStream = fs.createReadStream(path);

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  // The PrebuiltModels.Receipt `DocumentModel` encodes both the model ID and a stronger return type for the operation
  const poller = await client.beginAnalyzeDocument(PrebuiltModels.Receipt, readStream, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });

  const {
    documents: [receiptDocument],
  } = await poller.pollUntilDone();

  // The fields of the document constitute the extracted receipt data.
  const receipt = receiptDocument.fields;

  if (receipt === undefined) {
    throw new Error("Expected at least one receipt in analysis result.");
  }

  console.log(`Receipt data (${receiptDocument.docType})`);
  console.log("  Merchant Name:", receipt.merchantName?.value);

  // The items of the receipt are an example of a `DocumentArrayValue`
  if (receipt.items !== undefined) {
    console.log("Items:");
    for (const { properties: item } of receipt.items.values) {
      console.log("- Description:", item.description?.value);
      console.log("  Total Price:", item.totalPrice?.value);
    }
  }

  console.log("  Total:", receipt.total?.value);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

Alternatively, as mentioned above, instead of using `PrebuiltDocuments.Receipt`, which produces the stronger return type, the prebuilt receipt's model ID ("prebuilt-receipt") can be used, but the document fields will not be strongly typed in TypeScript, and the field names will be in "PascalCase" instead of "camelCase".

#### **Other Prebuilt Models**

You are not limited to receipts! There are a few prebuilt models to choose from, with more on the way. Each prebuilt model has its own set of supported fields:

- Receipts, using `PrebuiltModels.Receipt` or the prebuilt receipt model ID `"prebuilt-receipt"`.
- Business cards, using `PrebuiltModels.BusinessCard` or its model ID `"prebuilt-businessCard"`.
- Invoices, using `PrebuiltModels.Invoice` or its model ID `"prebuilt-invoice"`.
- Identity Documents (such as driver licenses and passports), using `PrebuiltModels.IdentityDocument` or its model ID `"prebuilt-idDocument"`.
- W2 Tax Forms (United States), using `PrebuiltModels.TaxUsW2` or its model ID `"prebuilt-tax.us.w2"`.
- Health Insurance Cards (United States), using `PrebuiltModels.HealthInsuranceCardUs` or its model ID `"prebuilt-healthInsuranceCard.us"`.
- Vaccination Cards (currently supports US COVID-19 vaccination cards), using `PrebuiltModels.VaccinationCard` or its model ID `"prebuilt-vaccinationCard"`.

For information about the fields of these models, see [the service's documentation of the available prebuilt models](https://aka.ms/azsdk/formrecognizer/models).

The fields of all prebuilt document models may also be accessed programmatically using the `getModel` method (by their model IDs) of `DocumentModelAdministrationClient` and inspecting the `docTypes` field in the result.

### Build a Model

The SDK also supports creating models, using `DocumentModelAdministrationClient`. Building a model from labeled training data creates a new model that is trained on your own documents, and the resulting model will be able to recognize values from the structures of those documents. The model building operation accepts a SAS-encoded URL to an Azure Storage Blob container that holds the training documents. The Form Recognizer service's infrastructure will read the files in the container and create a model based on their contents. For more details on how to create and structure a training data container, see the [Form Recognizer service's documentation for building a model][fr-build-model]. The Form Recognizer service team has created a tool to assist in the labeling and creation of models, please see [the documentation of the labeling tool][fr-labeling-tool] for more information.

For example, the following program builds a custom document model using a SAS-encoded URL to a pre-existing Azure Storage container:

```javascript
const {
  DocumentModelAdministrationClient,
  AzureKeyCredential,
} = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const containerSasUrl = "<SAS url to the blob container storing training documents>";

  const trainingClient = new DocumentModelAdministrationClient(
    endpoint,
    new AzureKeyCredential(apiKey)
  );

  // You must provide the model ID. It can be any text that does not start with "prebuilt-".
  // For example, you could provide a randomly generated GUID using the "uuid" package.
  // The second parameter is the SAS-encoded URL to an Azure Storage container with the training documents.
  // The third parameter is the build mode: one of "template" (the only mode prior to 4.0.0-beta.3) or "neural".
  // See https://aka.ms/azsdk/formrecognizer/buildmode for more information about build modes.
  const poller = await trainingClient.beginBuildModel("<model ID>", containerSasUrl, "template", {
    // The model description is optional and can be any text.
    description: "This is my new model!",
    onProgress: ({ status }) => {
      console.log(`operation status: ${status}`);
    },
  });
  const model = await poller.pollUntilDone();

  console.log("Model ID:", model.modelId);
  console.log("Description:", model.description);
  console.log("Created:", model.createdDateTime);

  // A model may contain several document types, which describe the possible object structures of fields extracted using
  // this model

  console.log("Document Types:");
  for (const [docType, { description, fieldSchema: schema }] of Object.entries(
    model.docTypes ?? {}
  )) {
    console.log(`- Name: "${docType}"`);
    console.log(`  Description: "${description}"`);

    // For simplicity, this example will only show top-level field names
    console.log("  Fields:");

    for (const [fieldName, fieldSchema] of Object.entries(schema)) {
      console.log(`  - "${fieldName}" (${fieldSchema.type})`);
      console.log(`    ${fieldSchema.description ?? "<no description>"}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

### Manage Models

`DocumentModelAdministrationClient` also provides several methods for managing models. The following example shows how to iterate through the models in a Form Recognizer resource (this will include both custom models in the resource as well as prebuilt models that are common to all resources), get a model by ID, and delete a model.

```javascript
const {
  DocumentModelAdministrationClient,
  AzureKeyCredential,
} = require("@azure/ai-form-recognizer");

async function main() {
  const endpoint = "<cognitive services endpoint>";
  const apiKey = "<api key>";
  const client = new DocumentModelAdministrationClient(endpoint, new AzureKeyCredential(apiKey));

  // Produces an async iterable that supports paging (`PagedAsyncIterableIterator`). The `listModels` method will only
  // iterate over model summaries, which do not include detailed schema information. Schema information is only returned
  // from `getModel` as part of the full model information.
  const models = client.listModels();
  let i = 1;
  for await (const summary of models) {
    console.log(`Model ${i++}:`, summary);
  }

  // The iterable is paged, and the application can control the flow of paging if needed
  i = 1;
  for await (const page of client.listModels().byPage()) {
    for (const summary of page) {
      console.log(`Model ${i++}`, summary);
    }
  }

  // We can also get a full ModelInfo by ID. Here we only show the basic information. See the documentation and the
  // `getModel` sample program for information about the `docTypes` field, which contains the model's document type
  // schemas.
  const model = await client.getModel("<model ID>");
  console.log("ID", model.modelId);
  console.log("Created:", model.createdDateTime);
  console.log("Description: ", model.description ?? "<none>");

  // A model can also be deleted by its model ID. Once it is deleted, it CANNOT be recovered.
  const modelIdToDelete = "<model ID that should be deleted forever>";
  await client.deleteModel(modelIdToDelete);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
```

## Troubleshooting

### Form Recognizer Errors

For information about the error messages and codes produced by the Form Recognizer service, please refer to [the service's error documentation][fr-errors].

### Logging

Enabling logging may help uncover useful information about failures. In order to see a log of HTTP requests and responses, set the `AZURE_LOG_LEVEL` environment variable to `info`. Alternatively, logging can be enabled at runtime by calling `setLogLevel` in the `@azure/logger`:

```javascript
const { setLogLevel } = require("@azure/logger");

setLogLevel("info");
```

For more detailed instructions on how to enable logs, you can look at the [@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/samples) directory for detailed code samples that show how to use this library including several features and methods that are not shown in the "Examples" section above, such as copying and composing models, listing model management operations, and deleting models.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fformrecognizer%2Fai-form-recognizer%2FREADME.png)

[azure_cli]: https://docs.microsoft.com/cli/azure
[azure_sub]: https://azure.microsoft.com/free/
[fr_or_cs_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal]: https://portal.azure.com
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity
[register_aad_app]: https://docs.microsoft.com/azure/cognitive-services/authentication#assign-a-role-to-a-service-principal
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[fr-build-model]: https://aka.ms/azsdk/formrecognizer/buildmodel
[build_sample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/buildModel.ts
[multi_and_single_service]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account?tabs=multiservice%2Cwindows
[azure_portal_create_fr_resource]: https://ms.portal.azure.com/#create/Microsoft.CognitiveServicesFormRecognizer
[azure_cli_create_fr_resource]: https://docs.microsoft.com/azure/cognitive-services/cognitive-services-apis-create-account-cli?tabs=windows
[fr-labeling-tool]: https://aka.ms/azsdk/formrecognizer/labelingtool
[fr-build-training-set]: https://aka.ms/azsdk/formrecognizer/buildtrainingset
[fr-errors]: https://aka.ms/azsdk/formrecognizer/errors
[fr-models]: https://aka.ms/azsdk/formrecognizer/models
