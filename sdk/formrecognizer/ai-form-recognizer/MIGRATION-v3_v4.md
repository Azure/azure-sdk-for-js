# Migrating to `@azure/ai-form-recognizer` Version 4

**Note ⚠️**: `@azure/ai-form-recognizer` version 4 is currently a beta package. Certain aspects of the package's API surface and implementation may change during the course of its development, and this document is a work-in-progress and may change to reflect updates to the package. We value your feedback, and it is especially useful during the beta development cycle. Please [create an issue](https://github.com/Azure/azure-sdk-for-js/issues/new/choose) to suggest any improvements or report any problems with this guide or with the package itself.

In major version 4, this package introduces a full redesign of the Azure Form Recognizer client library. To leverage features of the newest Form Recognizer service API (version "2021-09-30-preview" and newer), the new SDK is required, and application code must be changed to use the new clients. Similarly, the new major version 4 of the client library cannot be used to communicate with version 2.1 of the service API. To summarize:

- Version 3 of the `@azure/ai-form-recognizer` package _only_ supports Form Recognizer service API version 2.1, and will not receive support for newer (date-based) versions of Form Recognizer.
- Version 4 (beta) of the package supports service API version "2022-06-30-preview", and future releases of this major version will support newer service API versions as well.

This document provides instructions for updating your application code to the new major version 4 of the SDK client library. In this document the examples provided use TypeScript to provide type information, but all runtime behavior changes naturally apply to plain JavaScript as well.

## Partial Migration (Side-by-Side)

To avoid migrating an application all at once, major version 3 may be installed alongside major version 4 using a dependency alias. Either version may be aliased. For example, to install the new SDK package under an alias, add the following to the `dependencies` field of `package.json`:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "^3.2.0",
        "@azure/ai-form-recognizer-beta": "npm:@azure/ai-form-recognizer@4.0.0-beta.5"
    }
}
```

With this configuration, imports from `"@azure/ai-form-recognizer"` will import from major version 3 of the package, and imports from `"@azure/ai-form-recognizer-beta"` will import from the new beta package. Of course, major version 3 could be aliased instead:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "4.0.0-beta.5",
        "@azure/ai-form-recognizer-v3": "npm:@azure/ai-form-recognizer@^3.2.0"
    }
}
```

Then, the two packages may be used side-by-side, and an application may be migrated partially or over time:

```javascript
import { FormTrainingClient } from "@azure/ai-form-recognizer-v3";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";
```

## Understanding the New Return Types

In the new 4.0.0 SDK package, several types have been introduced, renamed, restructured, and removed. This section describes the differences between the packages.

### Terminology

Some terminology has changed to reflect the enhanced capabilities of the newest Form Recognizer service APIs. While the service is still called "Form Recognizer," it is capable of much more than simple recognition, and is not limited to documents that are "forms". As a result, we've made the following broad changes to the terminology used throughout the SDK:

- The word "Document" has broadly replaced the word "Form." The service supports a wide variety of documents and data-extraction scenarios, not merely limited to "forms."
- The word "Analyze" has broadly replaced the word "Recognize." The document analysis operation executes a data extraction pipeline that supports more than just recognition.
- Distinctions between "custom" and "prebuilt" models have broadly been eliminated. Prebuilt models are simply models that were created by the Form Recognizer service team and that exist within every Form Recognizer resource.
- The concept of "model training" has broadly been replaced with "model creation" or "model administration" (whatever is most appropriate in context), as not all model creation operations involve "training" a model from a data set. When referring to a model schema trained from a data set, we will use the term "document type" instead.

### Changes to Types

The following table explores several type names from the previous (v3.x) SDK and shows their nearest new (v4.x) equivalent. The name changes illustrate several of the above-mentioned changes in terminology. The breaking changes between each of the pairs of types are also listed. This table provides an overview, and more detail and code samples are provided in the following sections.

<!-- prettier-ignore -->
| Previous (v3.x) Type Name | Current (v4.x) Equivalent | Symbol Type | Breaking Changes and Comments |
| ------------------------- | ------------------------- | ----------- | ----------------------------- |
| `FormRecognizerClient` | `DocumentAnalysisClient` | Class | This class replaces the former and has no methods in common with it. See the Section on `DocumentAnalysisClient` below. |
| `RecognizedForm` and `RecognizedFormArray` | `AnalyzedDocument` | Interface | The `pages` property was removed. Pages are now accessed through `AnalyzeResult`. The properties `formType` and `formTypeConfidence` are now `docType` and `confidence` respectively. |
| `FormField` and variants (e.g. `FormArrayField`, `FormStringField`, etc.) | `DocumentField` | Tagged (Branded) Union | The tag (or discriminator) has been renamed to `kind` from `valueType`. The `DocumentArrayField` and `DocumentObjectField` variants have their values in properties named `values` and `properties` respectively (previously, both used `value`). `name`, `labelData`, and `valueData` were removed. |
| `FormPage` and `FormPageArray`                                            | `DocumentPage`                      | Interface              | The `tables` property was removed. Tables are now accessed through the `AnalyzeResult`. `textAngle` was renamed `angle`. There is now a `words` property in addition to `lines` that contains the words on the page. |
| `FormLine` | `DocumentLine` | Interface | `appearance`, `kind`, and `words` were removed. `styles` is now a top-level property of the `AnalyzeResult`, and it replaces the `appearance` property of this type. Additionally, `words` are now properties of the `DocumentPage` and can be related to a `DocumentLine` through the line's `spans`. The `text` property was renamed `content`. |
| `FormWord` | `DocumentWord` | Interface | `pageNumber` and `kind` were removed. `text` was renamed to `content`. `boundingBox` was replaced with `boundingRegions` (see the section on `boundingRegions` below). |
| `FormSelectionMark` | `DocumentSelectionMark` | Interface | Removed `kind`. `boundingBox` was replaced with `boundingRegions` (see the section on `boundingRegions` below). |
| `TextStyle` | `DocumentStyle` | Interface | Renamed `styleConfidence` to `confidence`, and replaced `styleName` with a simple boolean named `isHandwritten`. |
| `FormTable` and `FormTableCell` | `DocumentTable` and `DocumentTableCell` | Interface | The `pageNumber` field was removed from `DocumentTable`. `isHeader`, `isFooter`, `fieldElements`, and `pageNumber` were removed from `DocumentTableCell`. The `text` field was renamed to `content`. Both types have replaced their `boundingBox` property with `boundingRegions`. (See the section on `boundingRegions` below.) |
| -- | -- | -- | -- |
| `FormTrainingClient` | `DocumentModelAdministrationClient` | Class | This class replaces the former, and renames/reworks several of its methods. See the section on `DocumentModelAdministrationClient` below. |
| `CustomFormModel` | `ModelInfo` | Interface | `modelName` has been removed (as model name and model ID have been combined into `modelId`). `status` and `errors` have been removed, as now only model creation operations that succeed create models (operations that fail can be accessed through `getOperation` and `listOperations`). `trainingCompletedOn` was replaced with `createdDateTime`, and `trainingStartedOn` was removed (the model is now fully immutable after its creation). `submodels` was replaced with `docTypes` (see the section on `docTypes` below). |
| `CustomFormModelInfo` | `ModelSummary` | Interface | This is the base type of `ModelInfo`, so reference the row above. |
| `AccountProperties` | `GetInfoResponse` | Interface | All properties replaced with `customDocumentModels`, which itself has `count` and `limit` denoting the number of models in the resource and the maximum allowable, respectively. |
| `CopyAuthorization` | `CopyAuthorization` (no change) | Interface | `modelId` was renamed `targetModelId`, `resourceId` renamed `targetResourceId`, `resourceRegion` renamed `targetResourceRegion` and `expiresOn` renamed `expirationDateTime`. |

### `AnalyzeResult`, `GeneralDocumentResult`, and `LayoutResult` vs. `RecognizedFormArray` and `FormPageArray`

In the previous SDK, the analysis operations `beginRecognizeCustomForms` (as well as all of the prebuilt methods such as `beginRecognizeReceipts`) and `beginRecognizeContent` produced arrays of `RecognizedForm` and `FormPage` (respectively). Those types represented extracted structured documents and extracted page elements. However, in the new SDK, all of these methods as well as the new `beginExtractGeneralDocument` method produce objects that have fields for `pages`, `tables`, `documents`, and more.

The fundamental type that represents the result of an analysis operation is `AnalyzeResult`:

```typescript
/**
 * The result of an analysis operation. The type of the Document may be determined by the model used to perform the
 * analysis.
 */
export interface AnalyzeResult<Document = AnalyzedDocument> {
  /**
   * The service API version used to produce this result.
   *
   * Example: "2020-09-30-preview"
   */
  apiVersion: FormRecognizerApiVersion;

  /**
   * The unique ID of the model that was used to produce this result.
   */
  modelId: string;

  /**
   * A string representation of all textual and visual elements in the input, concatenated by reading order (the order
   * in which the service "reads" or extracts the textual anc visual content from the document).
   */
  content: string;

  /**
   * Extracted pages.
   */
  pages: DocumentPage[];

  /**
   * Extracted tables.
   */
  tables: DocumentTable[];

  /**
   * Extracted key-value pairs.
   */
  keyValuePairs: DocumentKeyValuePair[];

  /**
   * Extracted entities.
   */
  entities: DocumentEntity[];

  /**
   * Extracted font styles.
   */
  styles: DocumentStyle[];

  /**
   * Extracted documents (instances of any of the model's document types and corresponding field schemas).
   */
  documents: Document[];
}
```

This type is the result of prebuilt/custom model analysis using `beginAnalyzeDocument`. The other two analysis methods produce related (but not the same) types:

- `beginExtractLayout` produces a reduced "subtype" called `LayoutResult` that only has `pages`, `tables`, and `styles` (since these are the only fields produced by the prebuilt layout model).
- `beginExtractGeneralDocument` produces a type called `GeneralDocumentResult` that has all of the fields of `LayoutResult` and additionally `entities` and `keyValuePairs` (again, as these are the only five fields produced by the prebuilt general document model).

**Notice** that the _relationship between data types has changed_. Whereas `tables` were previously a property of `FormPage` (in other words, every table could be associated to only a single page), they are now properties of the `AnalyzeResult` (meaning that tables can potentially span multiple pages). The same is true for the relationship between `pages` and `documents`. Previously, a `RecognizedForm` (now `AnalyzedDocument`) had a `pages` property, now `pages` is a property of the `AnalyzeResult` and not nested underneath its `documents`. This reflects the fact that in the newest Form Recognizer service APIs, multiple documents may appear on a single page. Additionally, there may be pages that have no documents within, and those pages are now representable in the SDK.

Compare the following samples:

- `beginAnalyzeDocument` vs. `beginRecognizeCustomForms`:

  Previous (3.2.0):

  ```typescript
  const client = new FormRecognizerClient(...);

  const poller = await client.beginRecognizeCustomForms("<model ID>", input);

  // Previously, the forms were the top-level return type (now known as "documents")
  const forms: RecognizedForm[] = await poller.pollUntilDone();
  ```

  Current (4.0.0-beta.5):

  ```typescript
  const client = new DocumentAnalysisClient(...);

  const poller = await client.beginAnalyzeDocument("<model ID>", input);

  const result: AnalyzeResult = await poller.pollUntilDone();

  // `pages` and `tables` are now top-level properties of the result
  const {
    pages,
    tables,
    documents // The `documents` field contains the structured fields, like the previous `RecognizedForm` results did
  } = result;
  ```

- `beginExtractLayout` vs. `beginRecognizeContent`:

  **Deprecation Warning ⚠️**: The `beginExtractLayout` method of SDK version `4.0.0-beta` is deprecated and will be replaced prior to a stable release of version 4.0.0. Please see [the deprecation notice in the README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/README.md#beginextractlayout-deprecation) for more information.

  Previous (3.2.0):

  ```typescript
  const client = new FormRecognizerClient(...);

  const poller = await client.beginRecognizeContent(input);

  // Previously, the pages were the top-level return type, and the
  const pages: FormPage[] = await poller.pollUntilDone();

  for (const page of pages) {
    // tables are properties of pages
    const tables = page.tables;
  }
  ```

  Current (4.0.0-beta.5):

  ```typescript
  const client = new DocumentAnalysisClient(...);

  const poller = await client.beginExtractLayout(...);

  // Now pages and tables are sibling properties of the LayoutResult
  const result: LayoutResult = await poller.pollUntilDone();

  const { pages, tables } = result;
  ```

Consult the table above for more information about the differences within the types for `pages`, `documents`, `styles`, etc.

### Bounding Regions and Bounding Boxes

In order to account for elements that span multiple pages, many objects that contained a `boundingBox` field now contain a `boundingRegions` field instead (see the table above for more information about which types have moved to `boundingRegions`). Whereas a bounding box simply contained four points within the page, a bounding region contains a `pageNumber` _and_ a `boundingBox`. Compare the following samples:

Previous (3.2.0):

```typescript
// In the previous SDK, tables were accessed through `FormPage`.
const table: FormTable = page.tables[0];

if (table.boundingBox) {
  // Unwrap the x and y properties and convert them to strings
  const points = table.boundingBox.map(({ x, y }) => x + "," + y).join(" ");
  console.log(`Bounding Box: {${points}]`);
} else {
  console.log("No bounding box.");
}
```

Current (4.0.0-beta.5):

```typescript
// Now, tables are accessed through `AnalyzeResult`.
const table: FormTable = result.tables[0];

for (const region of table.boundingRegions ?? []) {
  const [x1, y1, x2, y2, x3, y3, x4, y4] = region.boundingBox;
  console.log(
    `Bounding Box: Page ${region.pageNumber} [${x1},${y1} ${x2},${y2} ${x3},${y3} ${x4},${y4}]`
  );
}
```

## Migrating from `FormRecognizerClient` to `DocumentAnalysisClient`

The `DocumentAnalysisClient` class, used for all analysis operations (layout, general document, and custom/prebuilt models), has replaced `FormRecognizerClient` (which has been removed). The constructor signature is the same, but two new options have been introduced to the client constructor:

- `apiVersion`, which allows the application to specify the version of the Form Recognizer service API to use (the default is the newest compatible version).
- `stringIndexType`, which configures the units used to compute string indexes and offsets (this option defaults to UTF-16 code units, and it should not be set without a very good reason).

The previous `FormRecognizerClient` class and new `DocumentAnalysisClient` class have no methods in common. The new class only has three methods in total. They are:

- `beginAnalyzeDocument`, which replaces all of the following:
  - `beginRecognizeCustomForms` and `beginRecognizeCustomFormsFromUrl`
  - `beginRecognizeReceipts` and `beginRecognizeReceiptsFromUrl`
  - `beginRecognizeBusinessCards` and `beginRecognizeBusinessCardsFromUrl`
  - `beginRecognizeInvoices` and `beginRecognizeInvoicesFromUrl`
  - `beginRecognizeIdentityDocuments` and `beginRecognizeIdentityDocumentsFromUrl`
- `beginExtractLayout`, which replaces `beginRecognizeContent` and `beginRecognizeContentFromUrl`
- `beginExtractGeneralDocument`, which is new, and provides similar functionality to unlabeled custom models from the previous SDK without the need to train a model. Please refer to [the `extractGeneralDocument` sample for an example of using this new method](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/samples/v4-beta/typescript/src/extractGeneralDocument.ts), as it is not quite the same as using an unlabeled custom model.

All of these methods produce `AnalyzeResult`, `LayoutResult`, and `GeneralDocumentResult` types respectively. Please see the section above about these types for more information.

_\* Unlabeled custom models are no longer supported in version 4.x of the Form Recognizer SDK, to continue using unlabeled custom models, please continue to use version 3.x, but be aware that the feature is deprecated and future releases of the Form Recognizer service and SDK will not support it._

### URL Inputs

In the previous v3.x SDK, to provide a publicly-accessible URL as an input to an analysis operation, the application used a method with a `-FromUrl` suffix. For example, `beginRecognizeReceiptsFromUrl`. In the new SDK, however, there is only a single unified method signature. If a `string` is given as the input, then the string will be treated as a URL. Otherwise, it will be treated as a binary request body (such as a stream or buffer). Compare the following samples using `beginRecognizeCustomForms` and `beginAnalyzeDocument`:

Previous (3.2.0):

```typescript
const client = new FormRecognizerClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg";

// Previously, a dedicated `FromUrl` method was required.
const poller = await client.beginRecognizeCustomFormsFromUrl("<model ID>", url);
```

Current (4.0.0-beta.5):

```typescript
const client = new DocumentAnalysisClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg";

// Now, the same method may be used as for streams and buffers.
const poller = await client.beginAnalyzeDocument("<model ID>", url);
```

### Prebuilt Models

In the previous v3.x SDK packages, using a prebuilt model required using a method dedicated to that model. In the new v4.x SDK, however, all prebuilt models also utilize the same `beginAnalyzeDocument` method as custom forms. There are two ways to use a prebuilt model with `beginAnalyzeDocument` in the new SDK. They are:

1. Using a `DocumentModel`, which is a data structure that provides a strong, associated type for the prebuilt output and that converts its fields into a "camelCase" JavaScript naming convention.
2. Using the prebuilt model's ID (same as a custom model), which will produce an `AnalyzeResult` with no specific type for the prebuilt model, exactly as if the prebuilt model were a custom model (prebuilt models are simply custom models trained and tested by the Form Recognizer team).

We recommend using the `DocumentModel` approach (#1), as it provides the best type-safety for TypeScript users and the most idiomatic representation of the data at runtime. Compare the following three samples that show the differences using a receipt document:

**Deprecation Warning ⚠️**: `PrebuiltModels` is deprecated as of version `4.0.0-beta.4` and will be replaced prior to a stable release of version 4.0.0. Please see [the deprecation notice in the README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/README.md#prebuiltmodels-deprecation) for more information.

Previous (3.2.0):

```typescript
import { FormRecognizerClient, FormStringField } from "@azure/ai-form-recognizer";

const client = new FormRecognizerClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-allinone.jpg";

// Previously, a dedicated Receipt method was required. In this case, because we're using a URL, we also need to use the
// FromUrl version.
const poller = await client.beginRecognizeReceiptsFromUrl(url);

// Previously, the operation produced a RecognizedFormArray
const [receipt] = await poller.pollUntilDone();

// For the sake of the example, we'll just show the receipt type. The other fields are similar to access.
const receiptType: string = (receipt.fields["ReceiptType"] as FormStringField)?.value ?? "<unknown>";
```

Current (4.0.0-beta.5), using the `DocumentModel`:

```typescript
// We need to import `PrebuiltModels`, which holds the prebuilt `DocumentModel` data structures
import { DocumentAnalysisClient, PrebuiltModels } from "@azure/ai-form-recognizer";

const client = new DocumentAnalysisClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-allinone.jpg";

// Passing the `PrebuiltModels.Receipt` document model will allow TypeScript to infer a stronger type for the output,
// and it will be validated against the model's schema as well as converted to use "camelCase" property names.
const poller = await client.beginAnalyzeDocument(PrebuiltModels.Receipt, url);

const { documents: [receipt] } = await poller.pollUntilDone();

// For the sake of the example, we'll just show the receipt type. The other fields are similar to access.

// Since we used the `PrebuiltModels.Receipt` document model data structure, `receiptType` is a known field, appears in
// IntelliSense, and the type of `value` is known to be `string`
const receiptType: string = receipt.fields.receiptType?.value ?? "<unknown>";
```

Current (4.0.0-beta.5), using the model ID:

```typescript
import { DocumentAnalysisClient, DocumentStringField } from "@azure/ai-form-recognizer";

const client = new DocumentAnalysisClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-allinone.jpg";

// The prebuilt receipt model's ID is "prebuilt-receipt". When passed this way (rather than using the DocumentModel), it
// is functionally the same as a custom model ID.
const poller = await client.beginAnalyzeDocument("prebuilt-receipt", url);

const { documents: [receipt] } = await poller.pollUntilDone();

// Until now, this is the same as above, but "ReceiptType" is in "PascalCase", and it is not a known field of the
// object, so the type of `value` isn't precisely known;
const receiptType: string = (receipt.fields["ReceiptType"] as DocumentStringField)?.value ?? "<unknown>";
```

**Note**: The prebuilt layout and general document models can also be used with `beginAnalyzeDocument` using their model IDs. They do not have `DocumentModel` data structures (as they do not produce `documents` in the result), but their model IDs (`"prebuilt-layout"` and `"prebuilt-document"` respectively) may be used. They will produce only the fields that they support and that would exist if used with their dedicated methods (the layout model will only produce `pages`, `tables`, and `styles`, and the general document model will additionally produce `keyValuePairs` and `entities`), and the `documents` field will be empty.

## Migrating from `FormTrainingClient` to `DocumentModelAdministrationClient`

The `DocumentModelAdministrationClient` class, used for all model management operations (creating, reading, listing, and deleting models), has replaced `FormTrainingClient` (which has been removed). The constructor signature is the same, and the same `zpiVersion` constructor option has been added to this class as in `DocumentAnalysisClient` (see details in the section above).

The `DocumentModelAdministrationClient` has several methods, some of which have the same name as the previous `FormTrainingClient` counterparts. The methods are:

- `beginBuildModel`, which replaces `beginTraining` (a required `modelId` parameter was added, and the `useLabels` parameter was removed, as v4.x of the SDK and the newest Form Recognizer service APIs no longer support unlabeled training of document types).
- `beginComposeModel`, which replaces `beginCreateComposedModel` (like `beginBuildModel` it now requires a `modelId` as its first parameter).
- `beginCopyModelTo`, which performs the same function as `beginCopyModel` in `FormTrainingClient` (though it now requires `modelId` like `beginBuildModel`, and the `CopyAuthorization` has changed, see the table above).
- `deleteModel`, which performs the same function as in `FormTrainingClient`.
- `getCopyAuthorization`, which creates an authorization to copy a model into the client's resource (as in `FormTrainingClient`); however, it no longer requires the resource ID and location, and only requires a model ID (the copy authorization encodes the model ID that the model will be copied into).
- `getInfo`, which replaces `getAccountProperties` and now produces a `GetInfoResponse` (see the table above).
- `getModel` and `listModels`, which replace `getCustomModel` and `listCustomModels`, as these methods may now be used for prebuilt models as well. They produce `ModelInfo` and `ModelSummary` respectively, which have some differences discussed in the table above and in the "Document Types" section below. **Notably**, these methods can no longer get/list models that did not succeed during model creation. Failed creation operations can only be retrieved using the `getOperation` and `listOperations` methods.
- `getOperation` and `listOperations`, which are new and allow the application to query the status of model creation operations. Operations are retained for 24 hours after they either succeed in creating a model or fail.

_\* In previous iterations of the Form Recognizer service, applications could not specify a `modelId`, but could optionally specify a `modelName`. A unique GUID would be generated for every model. However, in the newest Form Recognizer service API and SDK, the model name and ID have been unified. The `modelId` is now the first parameter of each model creation method and is required. It may consist of any text (so long as it does not begin with "prebuilt-"), and the `modelName` option has been removed._

### Document Types

In the previous (3.x) SDK, a `CustomFormModelInfo` contains information about its `submodels` in an array. Each submodel has a `modelId` and `formType` (which contains the model name if one was provided during model training), and it also contains information about the `fields` of the model (the field schema used to train the model). Training a model using a data set would result in a model with a single submodel, and composing models would result in a model that combines all of the input submodels. In the new SDK, however, the concept of "submodels" has been replaced by "document types."

In the new SDK:

- A "document type" represents a field schema and a label (`docType`) for documents that are instances of that field schema.
- A "model" contains zero or more "document types" (for example `"prebuilt-layout"` has zero document types, `"prebuilt-receipt"` has one, `"prebuilt-idDocument"` has two, and a composed model could have several).
- Building a model using a training data set results in a model that has one document type.
- Composing several models results in a model that contains all of the document types of its component models and that
  inserts a classification step into the analysis pipeline to choose the most appropriate document type.

We have additionally chosen to represent document types slightly differently in the newest Form Recognizer service API and SDK. The `submodels` field has been replaced with a `docTypes` field, and rather than an array, it is a record that maps the `docType` string to a `DocTypeInfo` object (which contains an optional `description` of the document type and the `fieldSchema`, as well as `fieldConfidences` indicating the Form Recognizer service's confidence in the correctness of extracted values corresponding to each field). Compare the following samples, which train a model and demonstrate the difference between `submodels` and `docTypes`:

Previous (3.2.0):

```typescript
const client = new FormTrainingClient(...);
const trainingData = "<SAS URL to training data container>";

const poller = await client.beginTraining(trainingData, true, {
  modelName: "myAwesomeModel"
});

const model = await poller.pollUntilDone();

console.log(`Model ID: ${model.modelId}`);
console.log(`Status: ${model.status}`);
console.log(`Training started on: ${model.trainingStartedOn}`);
console.log(`Training completed on: ${model.trainingCompletedOn}`);

if (model.submodels) {
  for (const submodel of model.submodels) {
    console.log(`The submodel "${submodel.formType}" contains the following fields:`);
    for (const [_, field] of Object.entries(submodel.fields)) {
      console.log(`The model found field '${field.name}'`);
    }
  }
}

// Training document information is included in models when using the previous SDK
if (model.trainingDocuments) {
  for (const doc of model.trainingDocuments) {
    console.log(`Document name: ${doc.name}`);
    console.log(`Document status: ${doc.status}`);
    console.log(`Document page count: ${doc.pageCount}`);
    console.log(
      `Document errors: ${doc.errors
        .map((e) => `error code ${e.code} '${e.message}'`)
        .join("\n")}`
    );
  }
}
```

Current (4.0.0-beta.5):

```typescript
const client = new DocumentModelAdministrationClient(...);
const trainingData = "<SAS URL to training data container>";

const poller = await client.beginBuildModel("myAwesomeModel", trainingData, {
  description: "Models may now have descriptions, so this is the description of an awesome model."
});

const model = await poller.pollUntilDone();

console.log("Model ID:", model.modelId);
console.log("Description:", model.description);
// The model no longer differentiates between when training was started and when the model was created, as the model is
// immutable after the operation creates it, and it will only be created if the operation succeeds.
console.log("Created:", model.createdDateTime);

console.log("Document Types:");
// The `docTypes` are an object with the `docType`s as properties and the `DocTypeInfo` as values, so we can use
// `Object.entries` to iterate over it easily.
for (const [docType, { description, fieldSchema: docTypeSchema }] of Object.entries(
  model.docTypes ?? {}
)) {
  console.log(`- Name: "${docType}"`);
  console.log(`  Description: "${description}"`);

  // For simplicity, this example will only show top-level field names
  console.log("  Fields:");

  for (const [fieldName, fieldSchema] of Object.entries(docTypeSchema)) {
    console.log(`  - "${fieldName}" (${fieldSchema.type})`);
    console.log(`    ${fieldSchema.description ?? "<no description>"}`);
  }
}

// Training document information is no longer included.
```

**Note**: all three model creation methods (`beginBuildModel`, `beginComposeModel`, and `beginCopyModelTo`) eventually produce a `ModelInfo` with all of the information shown in the sample above, so while the sample only shows `beginBuildModel`, it actually applies to all three methods as well as `getModel`, which also produces a `ModelInfo`.
