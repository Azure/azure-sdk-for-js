# Migrating to `@azure/ai-form-recognizer` Version 4

In major version 4, this package introduces a full redesign of the Azure Form Recognizer client library. To leverage features of the newest Form Recognizer service API (version "2021-09-30-preview" and newer), the new SDK is required, and application code must be changed to use the new clients. Similarly, the new major version 4 of the client library cannot be used to communicate with version 2.1 of the service API. To summarize:

- Version 3 of the `@azure/ai-form-recognizer` package _only_ supports Form Recognizer service API version 2.1, and will not receive support for newer (date-based) versions of Form Recognizer.
- Version 4 (beta) of the package supports service API version "2021-09-30-preview", and future releases of this major version will support newer service API versions as well.

This document provides instructions for updating your application code to the new major version 4 of the SDK client library. In this document the examples provided use TypeScript to provide type information, but all runtime behavior changes naturally apply to plain JavaScript as well.

## Partial Migration (Side-by-Side)

To avoid migrating an application all at once, major version 3 may be installed alongside major version 4 using a dependency alias. Either version may be aliased. For example, to install the new SDK package under an alias, add the following to the `dependencies` field of `package.json`:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "^3.2.0",
        "@azure/ai-form-recognizer-beta": "npm:@azure/ai-form-recognizer@4.0.0-beta.1"
    }
}
```

With this configuration, imports from `"@azure/ai-form-recognizer"` will import from major version 3 of the package, and imports from `"@azure/ai-form-recognizer-beta"` will import from the new beta package. Of course, major version 3 could be aliased instead:

```javascript
{
    ...,
    "dependencies": {
        ...,
        "@azure/ai-form-recognizer": "4.0.0-beta.1",
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
| `FormTrainingClient` | `DocumentModelAdministrationClient` | Class | This class replaces the former, and renames/reworks several of its methods. See the section on `DocumentModelAdministrationClient` below. |
| `RecognizedForm` and `RecognizedFormArray` | `AnalyzedDocument` | Interface | The `pages` property was removed. Pages are now accessed through `AnalyzeResult`. The properties `formType` and `formTypeConfidence` are now `docType` and `confidence` respectively. |
| `FormField` and variants (e.g. `FormArrayField`, `FormStringField`, etc.) | `DocumentField` | Tagged (Branded) Union | The tag (or discriminator) has been renamed to `kind` from `valueType`. The `DocumentArrayField` and `DocumentObjectField` variants have their values in properties named `values` and `properties` respectively (previously, both used `value`). `name`, `labelData`, and `valueData` were removed. |
| `FormPage` and `FormPageArray`                                            | `DocumentPage`                      | Interface              | The `tables` property was removed. Tables are now accessed through the `AnalyzeResult`. `textAngle` was renamed `angle`. There is now a `words` property in addition to `lines` that contains the words on the page. |
| `FormLine` | `DocumentLine` | Interface | `appearance`, `kind`, and `words` were removed. `styles` is now a top-level property of the `AnalyzeResult`, and it replaces the `appearance` property of this type. Additionally, `words` are now properties of the `DocumentPage` and can be related to a `DocumentLine` through the line's `spans`. The `text` property was renamed `content`. |
| `FormWord` | `DocumentWord` | Interface | `pageNumber` and `kind` were removed. `text` was renamed to `content`. `boundingBox` was replaced with `boundingRegions` (see the section on `boundingRegions` below). |
| `FormSelectionMark` | `DocumentSelectionMark` | Interface | Removed `kind`. `boundingBox` was replaced with `boundingRegions` (see the section on `boundingRegions` below). |
| `TextStyle` | `DocumentStyle` | Interface | Renamed `styleConfidence` to `confidence`, and replaced `styleName` with a simple boolean named `isHandwritten`. |
| `FormTable` and `FormTableCell` | `DocumentTable` and `DocumentTableCell` | Interface | The `pageNumber` field was removed from `DocumentTable`. `isHeader`, `isFooter`, `fieldElements`, and `pageNumber` were removed from `DocumentTableCell`. The `text` field was renamed to `content`. Both types have replaced their `boundingBox` property with `boundingRegions`. (See the section on `boundingRegions` below.) |
| `` | `` |  |  |
| `` | `` |  |  |
| `` | `` |  |  |
| `` | `` |  |  |
| `` | `` |  |  |

<!-- wip -- need to do documentmodeladministrationclient types -->

### `AnalyzeResult`, `GenericDocumentResult`, and `LayoutResult` vs. `RecognizedFormArray` and `FormPageArray`

In the previous SDK, the analysis operations `beginRecognizeCustomForms` (as well as all of the prebuilt methods such as `beginRecognizeReceipts`) and `beginRecognizeContent` produced arrays of `RecognizedForm` and `FormPage` (respectively). Those types represented extracted structured documents and extracted page elements. However, in the new SDK, all of these methods as well as the new `beginExtractGenericDocument` method produce objects that have fields for `pages`, `tables`, `documents`, and more.

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

This type is the result of prebuilt/custom model analysis using `beginAnalyzeDocuments`. The other two analysis methods produce related (but not the same) types:

- `beginExtractLayout` produces a reduced "subtype" called `LayoutResult` that only has `pages`, `tables`, and `styles` (since these are the only fields produced by the prebuilt layout model).
- `beginExtractGenericDocument` produces a type called `GenericDocumentResult` that has all of the fields of `LayoutResult` and additionally `entities` and `keyValuePairs` (again, as these are the only five fields produced by the prebuilt generic document model).

**Notice** that the _relationship between data types has changed_. Whereas `tables` were previously a property of `FormPage` (in other words, every table could be associated to only a single page), they are now properties of the `AnalyzeResult` (meaning that tables can potentially span multiple pages). The same is true for the relationship between `pages` and `documents`. Previously, a `RecognizedForm` (now `AnalyzedDocument`) had a `pages` property, now `pages` is a property of the `AnalyzeResult` and not nested underneath its `documents`. This reflects the fact that in the newest Form Recognizer service APIs, multiple documents may appear on a single page. Additionally, there may be pages that have no documents within, and those pages are now representable in the SDK.

Compare the following samples:

- `beginAnalyzeDocuments` vs. `beginRecognizeCustomForms`:

  Previous (3.2.0):

  ```typescript
  const client = new FormRecognizerClient(...);

  const poller = await client.beginRecognizeCustomForms("<model ID>", input);

  // Previously, the forms were the top-level return type (now known as "documents")
  const forms: RecognizedForm[] = await poller.pollUntilDone();
  ```

  Current (4.0.0-beta.1):

  ```typescript
  const client = new DocumentAnalysisClient(...);

  const poller = await client.beginAnalyzeDocuments("<model ID>", input);

  const result: AnalyzeResult = await poller.pollUntilDone();

  // `pages` and `tables` are now top-level properties of the result
  const {
    pages,
    tables,
    documents // The `documents` field contains the structured fields, like the previous `RecognizedForm` results did
  } = result;
  ```

- `beginExtractLayout` vs. `beginRecognizeContent`:

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

  Current (4.0.0-beta.1):

  ```typescript
  const client = new DocumentAnalysisClient(...);

  const poller = await client.beginExtractLayout(...);

  // Now pages and tables are sibling properties of the LayoutResult
  const result: LayoutResult = await poller.pollUntilDone();

  const { pages, tables } = result;
  ```

Consult the table above for more information about the differences within the types for `pages`, `documents`, `styles`, etc.

## Migrating from `FormRecognizerClient` to `DocumentAnalysisClient`

The `DocumentAnalysisClient` class, used for all analysis operations (layout, generic document, and custom/prebuilt models), has replaced `FormRecognizerClient` (which has been removed). The constructor signature is the same, but two new options have been introduced to the client constructor:

- `apiVersion`, which allows the application to specify the version of the Form Recognizer service API to use (the default is the newest compatible version).
- `stringIndexType`, which configures the units used to compute string indexes and offsets (this option defaults to UTF-16 code units, and it should not be set without a very good reason).

The previous `FormRecognizerClient` class and new `DocumentAnalysisClient` class have no methods in common. The following sections describe how to migrate handling of result types and method calls to the new `DocumentAnalysisClient`.

<!-- wip - need to show prebuilt model differences, but mostly covered by the table and previous section-->

## Migrating from `FormTrainingClient` to `DocumentModelAdministrationClient`

The `DocumentModelAdministrationClient` class, used for all model management operations (creating, reading, listing, and deleting models), has replaced `FormTrainingClient` (which has been removed). The constructor signature is the same, and the same two constructor options have been added to this class as in `DocumentAnalysisClient`: `apiVersion` and `stringIndexType` (see details in the section above).

<!-- wip - need to fill out this section -->
