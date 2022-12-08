# Migrating to `@azure/ai-form-recognizer` Version 4

In major version 4, this package introduces a full redesign of the Azure Form Recognizer client library. To leverage features of the newest Form Recognizer service API (version "2021-09-30-preview" and newer), the new SDK is required, and application code must be changed to use the new clients. Similarly, the new major version 4 of the client library cannot be used to communicate with version 2.1 of the service API. To summarize:

- Version 3 of the `@azure/ai-form-recognizer` package _only_ supports Form Recognizer service API version 2.1, and will not receive support for newer (date-based) versions of Form Recognizer.
- Version 4 of the package supports service API version "2022-08-31", and future releases of this major version will support newer service API versions as well.

This document provides instructions for updating your application code to the new major version 4 of the SDK client library. In this document the examples provided use TypeScript to provide type information, but all runtime behavior changes naturally apply to plain JavaScript as well.

## Partial Migration (Side-by-Side)

To avoid migrating an application all at once, major version 3 may be installed alongside major version 4 using a dependency alias. Either version may be aliased. For example, to install the new SDK package under an alias, add the following to the `dependencies` field of `package.json`:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "^3.2.0",
        "@azure/ai-form-recognizer-v4": "npm:@azure/ai-form-recognizer@^4.0.0"
    }
}
```

With this configuration, imports from `"@azure/ai-form-recognizer"` will import from major version 3 of the package, and imports from `"@azure/ai-form-recognizer-v4"` will import from the new package. Of course, major version 3 could be aliased instead:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "^4.0.0",
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
| `CustomFormModel` | `DocumentModelDetails` | Interface | `modelName` has been removed (as model name and model ID have been combined into `modelId`). `status` and `errors` have been removed, as now only model creation operations that succeed create models (operations that fail can be accessed through `getOperation` and `listOperations`). `trainingCompletedOn` was replaced with `createdOn`, and `trainingStartedOn` was removed (the model is now fully immutable after its creation). `submodels` was replaced with `docTypes` (see the section on `docTypes` below). |
| `CustomFormModelInfo` | `DocumentModelSummary` | Interface | This is the base type of `DocumentModelDetails`, so reference the row above. |
| `AccountProperties` | `ResourceDetails` | Interface | All properties replaced with `customDocumentModels`, which itself has `count` and `limit` denoting the number of models in the resource and the maximum allowable, respectively. |
| `CopyAuthorization` | `CopyAuthorization` (no change) | Interface | `modelId` was renamed `targetModelId`, `resourceId` renamed `targetResourceId`, `resourceRegion` renamed `targetResourceRegion` and `expiresOn` renamed `expirationDateTime`. |

### `AnalyzeResult` vs. `RecognizedFormArray` and `FormPageArray`

In the previous SDK, the analysis operations `beginRecognizeCustomForms` (as well as all of the prebuilt methods such as `beginRecognizeReceipts`) and `beginRecognizeContent` produced arrays of `RecognizedForm` and `FormPage` (respectively). Those types represented extracted structured documents and extracted page elements. However, in the new SDK, all analysis uses the `beginAnalyzeDocument` method, which produces objects that have fields for `pages`, `tables`, `documents`, and more.

The fundamental type that represents the result of an analysis operation is `AnalyzeResult`:

```typescript
/**
 * The result of an analysis operation. The type of the Document may be determined by the model used to perform the
 * analysis.
 */
export interface AnalyzeResult extends AnalyzeResultCommon {
  /**
   * Extracted pages.
   */
  pages?: DocumentPage[];

  /**
   * Extracted tables.
   */
  tables?: DocumentTable[];

  /**
   * Extracted key-value pairs.
   */
  keyValuePairs?: DocumentKeyValuePair[];

  /**
   * Extracted text languages.
   */
  languages?: DocumentLanguage[];

  /**
   * Extracted font styles.
   */
  styles?: DocumentStyle[];

  /**
   * Extracted documents (instances of any of the model's document types and corresponding field schemas).
   */
  documents?: AnalyzedDocument[];

  /**
   * Extracted document paragraphs.
   */
  paragraphs?: DocumentParagraph[];
}
```

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

  Current (4.0.0):

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

- `beginAnalyzeDocument` vs. `beginRecognizeContent`:

  The `beginAnalyzeDocument` method provides the functionality of `beginRecognizeContent` from the v3.x SDK as well. Simply use the model ID `"prebuilt-document"` when calling the `beginAnalyzeDocument` method.

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

  Current (4.0.0):

  ```typescript
  const client = new DocumentAnalysisClient(...);

  const poller = await client.beginAnalyzeDocument("prebuilt-layout", ...);

  // Now pages and tables are sibling properties of the AnalyzeResult
  const result: LayoutResult = await poller.pollUntilDone();

  const { pages, tables } = result;
  ```

Consult the table above for more information about the differences within the types for `pages`, `documents`, `styles`, etc.

### Bounding Regions and Bounding Boxes

In order to account for elements that span multiple pages, many objects that contained a `boundingBox` field now contain a `boundingRegions` field instead (see the table above for more information about which types have moved to `boundingRegions`). Whereas a bounding box simply contained four points within the page, a bounding region contains a `pageNumber` _and_ a `polygon`. A `polygon` is simply an extension of a `boundingBox`, allowing for three or more points. Compare the following samples:

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

Current (4.0.0):

```typescript
// Now, tables are accessed through `AnalyzeResult`.
const table: DocumentTable = result.tables?.[0];

for (const region of table.boundingRegions ?? []) {
  console.log(`Bounding region (page ${region.pageNumber}), points:`);
  for (const point of region.polygon ?? []) {
    console.log(`- ${point.x}, ${point.y}`);
  }
}
```

## Migrating from `FormRecognizerClient` to `DocumentAnalysisClient`

The `DocumentAnalysisClient` class, used for all analysis operations (layout, general document, and custom/prebuilt models), has replaced `FormRecognizerClient` (which has been removed). The constructor signature is the same, but two new options have been introduced to the client constructor:

- `apiVersion`, which allows the application to specify the version of the Form Recognizer service API to use (the default is the newest compatible GA API version when using a stable package, or the latest preview API version when using a beta package).
- `stringIndexType`, which configures the units used to compute string indexes and offsets (this option defaults to UTF-16 code units, and it should not be set without a very good reason).

The previous `FormRecognizerClient` class and new `DocumentAnalysisClient` class have no methods in common. The new class only has two unique methods (each having two overloads). They are:

- `beginAnalyzeDocument`, which replaces all of the following:
  - `beginRecognizeCustomForms`
  - `beginRecognizeReceipts`
  - `beginRecognizeBusinessCards`
  - `beginRecognizeInvoices`
  - `beginRecognizeIdentityDocuments`
  - `beginExtractLayout`
- `beginAnalyzeDocumentFromUrl`, which replaces the `FromUrl`-suffixed counterparts of the same methods.

Both methods produce an `AnalyzeResult`. Please see the section above about these types for more information.

_\* Unlabeled custom models are no longer supported in version 4.x of the Form Recognizer SDK. The `"prebuilt-document"` prebuilt model supplies similar functionality in the new API without requiring any training. To continue using unlabeled custom models as in API version 2.1, please continue to use SDK version 3.x, but be aware that the feature is deprecated and future releases of the Form Recognizer service and SDK will not support it._

### URL Inputs

As in the previous v3.x SDK, to provide a publicly-accessible URL as an input to an analysis operation, use the `beginAnalyzeDocumentFromUrl` method instead of the `beginAnalyzeDocument` method, which treats the data passed to it as a file's contents.

Previous (3.2.0):

```typescript
const client = new FormRecognizerClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg";

const poller = await client.beginRecognizeCustomFormsFromUrl("<model ID>", url);
```

Current (4.0.0):

```typescript
const client = new DocumentAnalysisClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/identityDocument/license.jpg";

const poller = await client.beginAnalyzeDocumentFromUrl("<model ID>", url);
```

### Prebuilt Models

In the previous v3.x SDK packages, using a prebuilt model required using a method dedicated to that model. In the new v4.x SDK, however, all prebuilt models also utilize the same `beginAnalyzeDocument` method as custom forms. There are two ways to use a prebuilt model with `beginAnalyzeDocument` in the new SDK. They are:

1. Using a `DocumentModel`, which is a data structure that provides a strong, associated type for the prebuilt analysis result and that converts its fields into a "camelCase" JavaScript naming convention.
2. Using the prebuilt model's ID (same as a custom model), which will produce an `AnalyzeResult` with no specific type for the prebuilt model, exactly as if the prebuilt model were a custom model (prebuilt models are simply custom models trained and tested by the Form Recognizer team).

Example `DocumentModel` objects for the current service API version can be found in [the `prebuilt` samples directory][samples-prebuilt]. In the following example, we'll use the `PrebuiltReceiptModel` from the [`prebuilt-receipt.ts`] file in that directory.

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

Current (4.0.0), using a `DocumentModel`:

```typescript
// We need to import `PrebuiltModels`, which holds the prebuilt `DocumentModel` data structures
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";

// Include the prebuilt-receipt.ts file from our sample directory in your own project.
import { PrebuiltReceiptModel } from "./prebuilt-receipt";

const client = new DocumentAnalysisClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-allinone.jpg";

// Passing the `PrebuiltReceiptModel` document model will allow TypeScript to infer a stronger type for the output,
// and it will be validated against the model's schema as well as converted to use "camelCase" property names.
const poller = await client.beginAnalyzeDocument(PrebuiltReceiptModel, url);

const { documents: [receipt] } = await poller.pollUntilDone();

// For the sake of the example, we'll just show the receipt type. The other fields are similar to access.

// Since we used the `PrebuiltReceiptModel` document model data structure, `receipt.docType` has known possible values,
// and the fields may be refined by `docType`.
if (receipt.docType === "receipt.retailMeal") {
  const firstItem = receipt.fields.items?.values[0].properties;
  // The type of this field's value is _strongly_ known to be `string`.
  const description: string = firstItem?.description?.value!;
}
```

Current (4.0.0), using the model ID:

```typescript
import { DocumentAnalysisClient, DocumentStringField } from "@azure/ai-form-recognizer";

const client = new DocumentAnalysisClient(...);
const url = "https://raw.githubusercontent.com/Azure/azure-sdk-for-js/main/sdk/formrecognizer/ai-form-recognizer/assets/receipt/contoso-allinone.jpg";

// The prebuilt receipt model's ID is "prebuilt-receipt". When passed this way (rather than using the DocumentModel), it
// is functionally the same as a custom model ID.
const poller = await client.beginAnalyzeDocument("prebuilt-receipt", url);

const { documents: [receipt] } = await poller.pollUntilDone();

// Until now, this is the same as above, but "Items" is in "PascalCase", and it is not a known field of the
// object, so the types aren't precisely known and it's more cumbersome to reach the value you want, requiring several
// unsafe type assertions or checks of the `kind` field.
if (receipt.docType === "receipt.retailMeal") {
  const firstItemEntry = (receipt.fields["Items"] as DocumentArrayField)?.values[0];
  const firstItem = (firstItemEntry as DocumentObjectField).properties;
  const description: string = (firstItem["Description"] as DocumentStringField).value!;
}
```

**Note**: The prebuilt "read," "layout" and "general document" models can also be used with `beginAnalyzeDocument` using their model IDs or corresponding `DocumentModel` samples.

## Migrating from `FormTrainingClient` to `DocumentModelAdministrationClient`

The `DocumentModelAdministrationClient` class, used for all model management operations (creating, reading, listing, and deleting models), has replaced `FormTrainingClient` (which has been removed). The constructor signature is the same, and the same `apiVersion` constructor option has been added to this class as in `DocumentAnalysisClient` (see details in the section above).

The `DocumentModelAdministrationClient` has several methods, some of which have the same name as the previous `FormTrainingClient` counterparts. The methods are:

- `beginBuildDocumentModel`, which replaces `beginTraining` (a required `modelId` parameter was added, and the `useLabels` parameter was removed, as v4.x of the SDK and the newest Form Recognizer service APIs no longer support unlabeled training of document types). Additionally, a _required_ `buildMode` parameter was added, specifying the training mode for the new model (see the "Document Model Build Mode" section below).
- `beginComposeDocumentModel`, which replaces `beginCreateComposedModel` (like `beginBuildDocumentModel`, it now requires a `modelId` as its first parameter).
- `beginCopyDocumentModelTo`, which performs the same function as `beginCopyModel` in `FormTrainingClient` (though it now requires `modelId` like `beginBuildDocumentModel`, and the `CopyAuthorization` has changed, see the table above).
- `deleteDocumentModel`, which performs the same function as `deleteModel` in `FormTrainingClient`.
- `getCopyAuthorization`, which creates an authorization to copy a model into the client's resource (as in `FormTrainingClient`); however, it no longer requires the resource ID and location, and only requires a model ID (the copy authorization encodes the model ID that the model will be copied into).
- `getResourceDetails`, which replaces `getAccountProperties` and now produces a `ResourceDetails` (see the table above).
- `getDocumentModel` and `listDocumentModels`, which replace `getCustomModel` and `listCustomModels`, as these methods may now be used for prebuilt models as well. They produce `DocumentModelDetails` and `DocumentModelSummary` respectively, which have some differences discussed in the table above and in the "Document Types" section below. **Notably**, these methods can no longer get/list models that did not succeed during model creation. Failed creation operations can only be retrieved using the `getOperation` and `listOperations` methods.
- `getOperation` and `listOperations`, which are new and allow the application to query the status of model creation operations. Operations are retained for 24 hours after they either succeed in creating a model or fail.

_\* In previous iterations of the Form Recognizer service, applications could not specify a `modelId`, but could optionally specify a `modelName`. A unique GUID would be generated for every model. However, in the newest Form Recognizer service API and SDK, the model name and ID have been unified. The `modelId` is now the first parameter of each model creation method and is required. It may consist of any text (so long as it does not begin with "prebuilt-", as such model IDs would conflict with the service's prebuilt models), and the `modelName` option has been removed._

### Document Types

In the previous (3.x) SDK, a `CustomFormModelInfo` contains information about its `submodels` in an array. Each submodel has a `modelId` and `formType` (which contains the model name if one was provided during model training), and it also contains information about the `fields` of the model (the field schema used to train the model). Training a model using a data set would result in a model with a single submodel, and composing models would result in a model that combines all of the input submodels. In the new SDK, however, the concept of "submodels" has been replaced by "document types."

In the new SDK:

- A "document type" represents a field schema and a label (`docType`) for documents that are instances of that field schema.
- A "document model" contains zero or more "document types" (for example `"prebuilt-layout"` has zero document types, `"prebuilt-receipt"` has one, `"prebuilt-idDocument"` has two, and in general a model could have several).
- Building a document model using a training data set results in a model that has one document type.
- Composing several document models results in a model that contains all of the document types of its component models and that inserts a classification step into the analysis pipeline to choose the most appropriate document type.

We have additionally chosen to represent document types slightly differently in the newest Form Recognizer service API and SDK. The `submodels` field has been replaced with a `docTypes` field, and rather than an array, it is an object that maps the `docType` string to a `DocumentTypeDetails` object (which contains an optional `description` of the document type and the `fieldSchema`, as well as `fieldConfidences` indicating the Form Recognizer service's confidence in the correctness of extracted values corresponding to each field). Compare the following samples, which train a model and demonstrate the difference between `submodels` and `docTypes`:

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

Current (4.0.0):

```typescript
const client = new DocumentModelAdministrationClient(...);
const trainingData = "<SAS URL to training data container>";

const poller = await client.beginBuildDocumentModel(
  // The Model ID is now the first required parameter
  "myAwesomeModel",
  trainingData,
  // We must now specify the build mode to the service. The "Template" mode is similar to the training behavior of the
  // previous API.
  DocumentModelBuildMode.Template,
  {
    description:
      "Models may now have descriptions, so this is the description of an awesome model.",
  }
);

const model = await poller.pollUntilDone();

console.log("Model ID:", model.modelId);
console.log("Description:", model.description);
// The model no longer differentiates between when training was started and when the model was created, as the model is
// immutable after the operation creates it, and it will only be created if the operation succeeds.
console.log("Created:", model.createdOn);

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

**Note**: all three model creation methods (`beginBuildDocumentModel`, `beginComposeDocumentModel`, and `beginCopyModelTo`) eventually produce a `DocumentModelDetails` with all of the information shown in the sample above, so while the sample only shows `beginBuildDocumentModel`, it actually applies to all three methods as well as `getModel`, which also produces a `ModelInfo`.

### Document Model Build Mode

When training a model using `beginBuildDocumentModel`, a required `buildMode` parameter is now required. The service supports two modes:

- `DocumentModelBuildMode.Template`, a mode that builds a model assuming that documents all follow the same, fixed template layout (the same relative positioning of fields between documents). This mode is equivalent to the training mode of the previous API and is suitable for documents that have a standardized layout.
- `DocumentModelBuildMode.Neural`, a more sophisticated mode that uses a neural engine to extract fields, allowing for documents that have different visual appearances, but that contain the same information. This mode requires more time to train a model than the fixed template mode, but is well suited to types of documents that have the same structure of information, but no standardized layout (such as U.S. W2 tax forms, which the Form Recognizer service provides as a prebuilt model in the `"prebuilt-tax.us.w2"` model).

Please see [the service documentation of custom neural models][custom-neural] for more information.

[samples-prebuilt]: https://github.com/azure/azure-sdk-for-js/tree/main/sdk/formrecognizer/ai-form-recognizer/samples-dev/prebuilt/
[custom-neural]: https://docs.microsoft.com/azure/applied-ai-services/form-recognizer/concept-custom-neural
