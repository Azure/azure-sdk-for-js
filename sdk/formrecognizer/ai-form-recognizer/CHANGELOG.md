# Release History

## 4.0.0-beta.5 (2022-06-22)

### Bugs Fixed

- Reworked a lookbehind regular expression that was preventing `@azure/ai-form-recognizer` from loading in Safari.

## 4.0.0-beta.4 (2022-06-07)

### Features Added

- Updated the SDK to use the latest preview version of the Form Recognizer service: `2022-06-30-preview`.
- Added a `paragraphs` property to the `AnalyzeResult` type and a new `DocumentParagraph` type. This property represents the paragraph structure of the input document's text.
- Documents may now contain a `DocumentAddressField` type, which has an object with several fields related to physical addresses, such as `streetAddress`, `city`, and `state` as its value. This field is identified by the value `"address"` in the `kind` field.
- Added a `kind` field to `DocumentPage`. For now, the only supported value of this field is `"document"`. In the future, other page kinds may be added, indicating different dispositions of the extracted page elements.

### Breaking Changes

- [**DEPRECATION**] Deprecated `PrebuiltModels`. In a future version (prior to a stable release), `PrebuiltModels` and its fields will be replaced with an out-of-tree solution for obtaining strongly-typed analysis results.
- [**DEPRECATION**] Deprecated `beginExtractLayout`, `beginExtractGeneralDocument`, and `beginReadDocument`. In a future version (prior to a stable release), these methods will be removed, and `beginAnalyzeDocument` will be enhanced to provide the same restricted types.
- Renamed the `beginCopyModel` method of `DocumentModelAdministrationClient` to `beginCopyModelTo`. [#20775](https://github.com/Azure/azure-sdk-for-js/pull/20775)
- Renamed `BoundingRegion#boundingBox` to `BoundingRegion#polygon`, as the service may now provide arbitrary, polygonal bounding areas rather than just rectangles.
  - The polygon is represented as an array of `Point2D`, clockwise from the left, -180 degrees inclusive.
- Removed the `entities` property from the `AnalyzeResult` type. This field may be reintroduced in a future version, but service API version `2022-06-30-preview` no longer returns this field.
- Renamed the `languageCode` property in the `DocumentLanguage` type to `locale`.
- Made the `angle`, `height`, `lines`, `unit`, `width`, and `words` properties of `DocumentPage` optional, as not all page kinds are guaranteed to support these fields.

## 4.0.0-beta.3 (2022-02-10)

### Features Added

- Updated the SDK to use the latest preview version of the Form Recognizer service: `2022-01-30-preview`.
- A new prebuilt model, `PrebuiltModels.TaxUsW2`, is available. It supports extracting data from United States W2 tax forms such as employee and employer information, IRS control number, tax withholding information, etc.
- Added a new method, `beginReadDocument` to `DocumentAnalysisClient`. This method uses the "prebuilt-read" model to extract textual information from the document such as page text contents and language spans.
- Added a `languages` field to the `AnalyzeResult` type. This field contains information about regions of text in the document that were identified as being of a particular written language. A `DocumentLanguage` consists of the identified `languageCode` (ISO 639-1 or BCP 47 language code), a list of `spans` of text that are of that language, and a `confidence` value (between zero and one) that the assessment is correct.
- Added a `tags` field to `BuildModelOptions`, `GetCopyAuthorizationOptions`, and `ModelSummary`. Tags are user-specified key-value pairs that are immutably associated with the model. If tags are provided when a model is created, the Form Recognizer service will return the same tags as part of the model's summary. The `OperationInfo` and `TrainingPollOperationState` of a model creation operation also produce the `tags` if they were provided in the `BuildModelOptions`.
- Models now report the service API version used to create the model and that will be used for analysis in the `apiVersion` field.
- Documents may now contain a new field type `DocumentCurrencyField`, which has an object with `amount` and `currencySymbol` fields as its value. This field is identified by the value `"currency"` in the `kind` field. The `amount` field contains the amount of the currency value, and the `currencySymbol` field may contain a three-letter currency symbol if one was identified for the field. For example, the text `$100.50` may have an `amount` of `100.5` and a `currencySymbol` of "USD".
- Added support for setting the `buildMode` of a model building operation and introduced the "neural" build mode. Previous versions of the service and SDK only supported a single build mode that is now known as the "template" mode. Template models only accept documents that have the same basic page structure (i.e. a uniform visual appearance, or the same _relative_ positioning of elements within the document), hence a fixed document "template." Neural models support document classes that have the same information, but different page structures. Examples of these documents include United States W2 tax forms, which all share the same information, but may vary in appearance by the company that created the document. Neural models currently only support English text, and are more costly and time-consuming to train and use for analysis, but should yield higher-quality results for English documents that do not follow a "template."
- The `DocTypeInfo` type now has a `buildMode` field that contains the build mode originally used to create the document type.

### Breaking Changes

- Renamed the `beginAnalyzeDocuments` method of `DocumentAnalysisClient` to `beginAnalyzeDocument` for accuracy (only one input document is supported, though the document may contain multiple pages in certain file formats) and for consistency with other Azure SDK packages.
  - Renamed the options bag type `AnalyzeDocumentsOptions` to `AnalyzeDocumentOptions` for consistency with the method name.
- The `buildMode` parameter of `DocumentModelAdminsitrationClient#beginBuildModel` is a required parameter. To retain the same behavior as in previous versions, explicitly use the template build mode (pass the value `"template"` to the method).
- The `GeneratedDocument` type (as well as related types like `GeneratedDocumentField`) was removed from the public API and its uses replaced with `unknown`, as it is only intended for internal use. These types represented raw REST API response types that are not exposed at runtime by the client methods.
- Removed the `Preview` variant from the `FormRecognizerApiVersion` object because it will never be different from the `Latest` version in beta packages, and stable packages will not support it.
- Renamed `beginExtractGenericDocument` and `GenericDocumentResult` to `beginExtractGeneralDocument` and `GeneralDocumentResult` for consistency with other Form Recognizer SDK packages.
- Several of the prebuilt model schemas and result types have changed:
  - The document type naming convention has changed. Instead of separation by colons (e.g. "prebuilt:receipt"), prebuilt model document type names are now separated by periods and are no longer prefixed with "prebuilt" ("prebuilt:idDocument:driverLicense" becomes "idDocument.driverLicense", "prebuilt:invoice" becomes just "invoice").
  - In the `prebuilt-invoice` model, several numeric fields that represented amounts of money have been changed to a designated `"currency"` type. These include the `subTotal`, `totalTax`, `invoiceTotal`, `amountDue`, and `previousUnpaidBalance` fields of invoices and the `amount`, `tax`, and `unitPrice` fields of invoice items (a subfield of invoices).

### Bugs Fixed

- The `LayoutResult` and `GeneralDocumentResult` types were missing the `apiVersion`, `modelId`, and `content` fields that are common to all other analysis results. This version adds them through a new interface, `AnalyzeResultCommon`, that includes these fields. `LayoutResult`, `GeneralDocumentResult`, `ReadResult`, and `AnalyzeResult` all now extend the `AnalyzeResultCommon` interface.
- The `DocumentSignatureField` interface was missing a type for its `value` property. The property existed at runtime, but no type information was available for this field. The `value` property has been added to the interface.

### Other Changes

- Changed `FormRecognizerCommonClientOptions` to extend `CommonClientOptions` from `@azure/core-client` instead of `PipelineOptions`. `CommonClientOptions` itself extends `PipelineOptions`, so no fields are removed, but `CommonClientOptions` also includes `httpClient` and `allowInsecureConnection` fields to allow overriding the default HTTP client and using insecure connections (without SSL/TLS) respectively.

## 4.0.0-beta.2 (2021-11-09)

### Features Added

- Added a `words` method to `DocumentLine`. This method produces an `IterableIterator` that will yield all of the `DocumentWord`s that are contained by the line's `spans`. This allows accessing the words that are related to the line from the line itself.
- Added `createdOn` and `lastUpdatedOn` properties to `DocumentAnalysisPollOperationState` and `TrainingPollOperationState` that contain the date and time that the operation was created and last modified, respectively.

### Bugs Fixed

- Improved the handling of long-running operations (analysis and model creation operations). This fixes a bug ([#18341](https://github.com/Azure/azure-sdk-for-js/issues/18341)) that caused the clients to reject model IDs that contained certain characters with an error: "unable to parse operationLocation". Our improvements to the long-running operation code make this error no longer possible.

### Breaking Changes

- Replaced the `operationId` field of `DocumentAnalysisPollOperationState` with an `operationLocation` field containing the full operation URL, rather than the operation GUID only.

## 4.0.0-beta.1 (2021-10-07)

This new major version beta introduces a full redesign of the Azure Form Recognizer client library. To leverage features of the newest Form Recognizer service API (version "2021-09-30-preview" and newer), the new SDK is required, and application code must be changed to use the new clients. Please see the [Migration Guide](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/MIGRATION-v3_v4.md) for detailed instructions on how to update application code from version 3.x of the Form Recognizer SDK to the new version (4.x). The following sections contain an outline of the changes.

### Breaking Changes

- This package targets Azure Form Recognizer service API version `2021-09-30-preview` and newer. It _is not_ compatible with the older Form Recognizer service API versions (2.0 and 2.1). To continue to use Form Recognizer API version 2.1, please use major version 3 of the client package (`@azure/ai-form-recognizer@^3.2.0`).
- `FormRecognizerClient` has been replaced by `DocumentAnalysisClient`.
  - The new `beginExtractLayout` method replaces the previous `beginRecognizeContent` method and its `-FromUrl` counterpart. Rather than a `FormPageArray`, the new method produces an object that has properties for `pages`, `tables`, and `styles`.
  - The new `beginAnalyzeDocuments` method replaces the form recognition methods of the previous client. It provides a single method that can analyze documents using any model ID, including prebuilt models. It replaces `beginRecognizeCustomForms`, `beginRecognizeReceipts`, `beginRecognizeBusinessCards`, `beginRecognizeInvoices`, and `beginRecognizeIdentityDocuments`, as well as all of their -`FromUrl` counterparts. Rather than an array of forms, the new method produces an `AnalyzeResult` (an object with several fields, described below).
  - Analysis using models trained without labeled training data is no longer supported by this package. This use-case is now provided by the prebuilt (generic) document model (see "New Features" below).
  - The `language` option has been renamed to `locale`, and it accepts a wider variety of locale codes (such as "en-US" for United States English) as well as two-letter language codes (such as "fr" for French).
  - The `pages` option is now a single `string` instead of an array of strings. Multiple page ranges may be specified by separating them with commas.
  - In many output types, `boundingBox` has been replaced by a list of `boundingRegions`, which may contain a bounding box and page number. This is useful for objects that may span multiple pages.
- `FormTrainingClient` has been replaced by `DocumentModelAdministrationClient`.
  - The new `beginBuildModel` method replaces the previous `beginTraining` method. The new method and underlying service API do not support training a model using unlabeled training data. Labeled data are required to build a custom document model using the new SDK and service API.
  - The new `beginComposeModel` method replaces the `beginCreateComposedModel` method.
  - The `getCopyAuthorization` method no longer requires the target resource name and region, instead requiring only a model ID/name.
  - The `getModel` and `listModels` methods replace the `getCustomModel` and `listCustomModels` methods, as the new methods support prebuilt models as well as custom models. They no longer produce any information about models that did not succeed (if a model creation operation failed, it will not be included in the output of `listModels` and cannot be retrieved with `getModel` by model ID).
  - Custom models no longer have a name that is distinct from the model ID (more accurately, the model ID and name have been unified).
  - You must now specify a model ID to create a model (whether composed, copied, or built). Previously, the Form Recognizer service would generate a GUID for the newly-created model. Now, the model ID may be any text (so long as it does not start with "prebuilt-"), and it must be provided when the model is created.
  - The `ModelInfo` type (previously `CustomFormModelInfo`) has been redesigned. It no longer contains `trainingDocuments`, and it has a property called `docTypes` that contains the information previously contained in `submodels`, but with a different shape. Please refer to the documentation for more information, as this type has changed significantly.
- The structure of many output types has changed. The full list of changes is extensive and discussed in depth in [the migration guide](https://github.com/azure/azure-sdk-for-js/blob/main/sdk/formrecognizer/ai-form-recognizer/MIGRATION-v3_v4.md). The following are some of the changes:
  - When analyzing a document, the output is no longer an array of `RecognizedForm`s. All analysis methods&mdash;including custom/prebuilt model analysis, layout, and the generic document model&mdash;produce an `AnalyzeResult` or a subset thereof. The `AnalyzeResult` has fields for `pages`, `tables`, `styles`, `entities`, `keyValuePairs`, and `documents`. The `beginExtractLayout` and `beginExtractGenericDocument` methods produce subtypes (`LayoutResult` and `GenericDocumentResult` respectively) of `AnalyzeResult` that contain only those fields that are produced by that model. The list of changes within these types is extensive, as they have been redesigned. Please consult the documentation for more information.
  - The new type `AnalyzedDocument` replaces `RecognizedForm`. It does not contain a `pages` property, as `pages` are now a top-level property of the `AnalyzeResult`.
  - The new type `DocumentPage` replaces `FormPage`. It does not have a `tables` property, as `tables` are now a top-level property of the `AnalyzeResult`.
  - The `DocumentLine` type (replacing `FormLine`) no longer has a `words` property, as `words` is now a property of the `DocumentPage`. The `DocumentLine` instead contains `spans` which can be used to correlate `DocumentWord`s to `DocumentLine`s, as words are no longer required to be part of a line.

### New Features

- Added support for a new generic document prebuilt model. The `beginExtractGenericDocument` method of `DocumentAnalysisClient` utilizes this new model, or it may be used with `beginAnalyzeDocuments` by its model ID: "prebuilt-document". This model produces all of the same basic layout information as the prebuilt layout model, but also extracts entities (along with their categories/subcategories) and key-value pairs (associations from one document element, such as a label, to another).
- There are now strong result types for the four prebuilt models (receipts, business cards, invoices, and identity documents) built in to the SDK. To utilize these new result types, the `DocumentModel` data structure corresponding to the prebuilt model must be provided to `beginAnalyzeDocuments` (rather than providing a simple string model ID). These `DocumentModel` data structures are part of `PrebuiltModels` (for example, `PrebuiltModels.Receipt`), which can be imported from this package.
- An extracted table may now span multiple pages. As a result, tables now have multiple bounding regions to describe their locations on multiple pages.
- Models may now have an optional `description` (part of the options bag when building a model, composing a model, or creating a model copy authorization).
- Introduced `listOperations` and `getOperation` methods. These methods access model creation operations (including operations that failed to create a model). Operations are retained for 24 hours, after which point they are deleted.

## 3.2.0 (2021-08-11)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to
  ES2017 in order to produce smaller bundles and use more native platform features

### Key Bugs Fixed

- Fixed an issue in which form recognition would sometimes fail due to encountering an element reference pointing to a selection mark, causing an exception to be thrown. These references are now handled correctly.

## 3.1.0 (2021-05-26)

- This General Availability (GA) release marks the stability of the changes introduced in package versions 3.1.0-beta.1 through 3.1.0-beta.3.
- Changed all names including `IdDocument` to use `IdentityDocument` instead, for example: `BeginRecognizeIdentityDocumentOptions`, `beginRecognizeIdentityDocuments`, and `beginRecognizeIdentityDocumentsFromUrl` for clarity.
- Flattened the `TextStyle` type into the `TextAppearance` type. Rather than having a `style` property with its own `name` and `confidence`, `TextAppearance` now has `styleName` and `styleConfidence` properties.
- Removed the `FormGenderField` type. Any recognized value that was previously produced as a `FormGenderField` is now returned as a `FormStringField` instead (the `value` will remain the same).
- Renamed the `FormCountryField` type to `FormCountryRegionField`, and changed the `valueType` discriminant property of that type to `"countryRegion:`.
- Renamed `ReadingOrder` and `Language` to `FormReadingOrder` and `FormLanguage` to reduce the chance that these types would collide with other types having the same name from other packages.
- Removed the `KnownStyleName`, `KnownSelectionMarkState`, and `KnownKeyValueType` enums, as they represent simple string enums. The `styleName`, `state`, and `valueType` properties (respectively) now have strong string-enum types.
- Added the `KnownFormLocale` enum to access the well-known possible values of form locales (the `locale` property of the options parameters for prebuilt model recognition).
- Migrated to the 2.1 Form Recognizer service endpoint for all REST API calls.

## 3.1.0-beta.3 (2021-04-06)

- Split `FormField` into several different interfaces. This should not cause any API compatibility issues except in certain edge cases (undefined `valueType`), but should result in more accurate type refinement when dealing with FormField values and should significantly improve documentation and code hinting of these values through IntelliSense.
- Added support for recognizing identity documents (such as driver licenses and passports) through the `beginRecognizeIdDocuments` method and its URL-based counterpart `beginRecognizeIdDocumentsFromUrl`. The identity document model is prebuilt and may be used without training a model.
- Introduced two new form field value types: `"gender"` and `"country"`. These value types appear in the identity document recognition responses.
  - The `"gender"` value type signifies the gender or sex of an individual and is represented by a string that is one of three values: "M", "F", or "X".
  - The `"country"` value type indicates a specific country and is represented by a three-letter country code string (ISO 3166-1 alpha-3).
- Added support for the `pages` option to all form recognition methods (custom forms and all prebuilt models). This option works the same as in the content recognition methods, and allows for the specification of which pages within a multi-page document (PDF or TIFF formats) should be considered during analysis and included in the response.
- Added support for a `readingOrder` option to the content recognition methods. This option enables you to control the algorithm that the service uses to determine how recognized lines of text should be ordered.
- Custom model recognition now supports bitmap images through the "image/bmp" content-type (content recognition and all prebuilt models already support this content type).
- Migrated to the 2.1-preview.3 Form Recognizer service endpoint for all REST API calls.

## 3.1.0-beta.2 (2021-02-09)

- Renamed `Appearance` to `TextAppearance`, `Style` to `TextStyle` (previously the name of the enum for `Style.name`, and the `TextStyle` enum to `StyleName` for the sake of clarity in the type names.
- Added `KnownStyleName`, `KnownLanguage`, `KnownSelectionMarkState`, and `KnownKeyValueType` enums to access the well-known possible values of the `StyleName`, `Language`, `SelectionMarkState`, and `KeyValueType` parameters/fields respectively.

## 3.1.0-beta.1 (2020-11-23)

- Added a `pages` option to `BeginRecognizeContentOptions`. This option allows for the specification of which pages of a document to include in the content results. If a value is provided, pages that are not included in the `pages` field will not be analyzed.
- Added an `appearance` property to `FormLine` that contains information about the appearance of the line, such as style (e.g. "handwritten").
- Added an optional `boundingBox` property to `FormTable` that has a bounding box that contains the entire table.
- Added support for the "image/bmp" content type. This content type is supported on all methods that accept a `FormRecognizerRequestBody` **except** for custom form recognition.
- Added a `language` option to `BeginRecognizeContentOptions`. By default, when performing layout/content analysis, the service will attempt to detect the language of the document and supports multi-language inputs. The `language` parameter allows you to override this behavior and force the service to use a specific language.
- Added support for Invoice recognition through the `beginRecognizeInvoices` and `beginRecognizeInvoicesFromUrl` methods. The Invoice model is prebuilt and may be used without training a model.
- Added support for creating composed models through the `beginCreateComposedModel` method of `FormTrainingClient`. It accepts a list of model IDs that refer to labeled custom models that should be composed into a new model.
- Added a `formTypeConfidence` property to `RecognizedForm` indicating the model's confidence in determining the correct form type (and therefore the correct model to use) during recognition.
- Added a `properties` field to `CustomFormModelInfo` that may optionally contain extra properties. Currently, the only property is `isComposedModel` which will indicate whether the model is a composed model or a single trained model.
- Added a `modelId` field to the `CustomFormSubmodel`, `TrainingDocumentInfo`, and `RecognizedForm` types containing the ID of the exact model that they are associated with (for example, in the context of a composed model, the `modelId` field can determine which specific component model is associated with the submodel, training document, or recognized form).
- Added support for selection marks in form fields. In addition to the previously-existing variants of `FormField`, custom models can now return fields with `valueType: "selectionMark"` and their `value` will be the state of the selection mark.
- Added a new page element `FormSelectionMark` that represents marks on a page that can be selected (such as checkboxes and radio buttons). The `selectionMarks` field of `FormPage` contains the selection marks that were recognized in the page. A selection mark has a state value that is either "checked" or "unchecked."
- Made optimizations to the long-running operation infrastructure that should result in faster and more memory-efficient polling for results of custom form recognition, receipt recognition, and business card recognition.
- Added an option for specifying the locale of a document to receipt and business card methods through the `locale` property of the options bag.
- Added support for Business Card recognition through the `beginRecognizeBusinessCards` and `beginRecognizeBusinessCardsFromUrl` methods, which mirror their receipt counterparts. The Invoice model is prebuilt and may be used without training a model.
- Added the `modelName` property to `CustomFormModelInfo`, reflecting the same property that was added to the model training options.
- Altered the type hierarchy so that `CustomFormModel` inherits the properties of `CustomFormModelInfo`.
- Added the `modelName` field to `BeginTrainingOptions`. The given model name will become an immutable property of the trained model.
- Migrated to the 2.1-preview.1 Form Recognizer service endpoint for all REST API calls.

## 3.0.0 (2020-08-20)

- This release marks the general availability of the `@azure/ai-form-recognizer` package.

## 3.0.0-preview.1 (2020-08-11)

- Changed the package version to 3.0.0-preview.1 to reduce confusion with older versions of the Azure Form Recognizer SDKs.
- Changed the name of the `options` bag parameter of `beginRecognizeReceipts` and `beginRecognizeReceiptsFromUrl` to `BeginRecognizeReceiptsOptions`.
- Switched to using the generally-available 2.0 service endpoint rather than 2.0-preview.
- Added a `pageNumber` property to the `FormTable` and `FormTableCell` types indicating the number of the page where the table/cell appeared within the input document.
- [Breaking] Renamed the `includeSubFolders` property of the `TrainSourceFilter` type to `includeSubfolders`.
- [Breaking] Renamed the `documentName` property of the `TrainingDocumentInfo` type to just `name`.
- [Breaking] Removed the `containingLine` property of the `FormWord` type.
- Made the `rowSpan`, `columnSpan`, `isHeader`, and `isFooter` properties of the `FormTableCell` type non-optional to reflect that they have default values.
- [Breaking] Renamed `CustomFormField` to `CustomFormModelField` for similarity to other language SDKs.
- [Breaking] Removed the redundant `expirationDateTimeTicks` property from the `CopyAuthorization` type, as the `expiresOn` property exists.
- [Breaking] Moved the optional `contentType` parameter of the `FormRecognizerClient` recognition methods (`recognizeContent`, `recognizeCustomForms`, `recognizeReceipts`, and their URL-based variants) to the associated options bag for these methods.
- [Breaking] Removed exports of several internal types, including most internal poller operation states and some unused types. All client poller implementations now return a smaller subset of fields.

## 1.0.0-preview.4 (2020-07-07)

- [Breaking] Replace `RecognizedReceiptArray` with the more generic `RecognizedFormArray` in the Poller response type returned by `beginRecognizeReceipts` and `beginRecognizeReceiptsFromUrl`.
- Added an `expiresOn` property to the `CopyAuthorization` type containing the time that the Copy Authorization will expire encoded as a JavaScript `Date` type.
- [Breaking] Rename the `textContent` field of the `FieldData` and `FormTableCell` types to `fieldElements` to mirror the change in its type.
- [Breaking] Rename the `FormField` type's `labelText` and `valueText` fields to `labelData` and `valueData` respectively, to mirror the change of their type to `FieldData`;
- [Breaking] Rename the `includeTextContent` request option to `includeFieldElements` to mirror the change to `FieldData` and `FormElement`.
- [Breaking] Rename `FieldText` to `FieldData` and `FormContent` to `FormElement` to reflect that fields may contain more than textual information.
- [Breaking] Rename `includeTextDetails` to `includeTextContent` in custom form and receipt recognition options to be consistent with other languages.
- [Breaking] Rename properties `requestedOn` to `trainingStartedOn` and `completedOn` to `trainingCompletedOn` in `CustomFormModel` and `CustomFormModelInfo` types.

## 1.0.0-preview.3 (2020-06-10)

- Blank pages in receipt recognition are now handled properly.
- Support Azure Active Directory credential.
- Support to copy a custom model from one Form Recognizer resource to another.
- Headers and query parameters which don't contain sensitive information are no longer redacted in logging output.
- Refactoring for cross-language consistency:
  - [Breaking] Rename `beginRecognizeForms()` to `beginRecognizeCustomForms()` in `FormRecognizerClient`.
  - [Breaking] Rename `listModels()` to `listCustomModels()` in `FormTrainingClient`.
  - [Breaking] Rename `count` to `customModelCount` and `limit` to `customModelLimit` in `AccountProperties`.
  - [Breaking] Rename type `ErrorInformation` to `FormRecognizerError`.
  - [Breaking] Rename type `ModelStatus` to `CustomFormModelStatus`.
  - [Breaking] Rename type `CustomFormSubModelField` to `CustomFormField`.
  - [Breaking] Rename type `FormElement` to `FormContent` and `FormElementCommon` to `FormContentCommon`.
  - [Breaking] Rename property `fieldLabel` to `labelText` in `FormField` type.
  - [Breaking] Rename type `ModelInfo` to `CustomFormModelInfo`.
  - [Breaking] Rename properties `createdOn` to `requestedOn` and `lastModified` to `completedOn` in `CustomModelInfo` type.
  - [Breaking] Rename type `TrainModelOptions` to `TrainingFileFilter`.
  - [Breaking] Rename type `TrainStatus` to `TrainingStatus`.
  - [Breaking] Rename type `ContentType` to `FormContentType`.
  - [Breaking] Rename type `FormText` to `FieldText`.
  - [Breaking] Rename type `CustomFormSubModel` to `CustomFormSubmodel`.
  - [Breaking] Rename `models` to `submodels` in `CustomFormModel`.
  - [Breaking] Recognition methods and training methods now return the result directly, instead of wrapping them in a response object. Specifically,
    - `beginTraining` now returns `CustomFormModel` instead of `FormModelResponse` from the poller.
    - `beginRecognizeContent` and `beginRecognizeContentFromUrl` now return `FormPageArray` instead of `RecognizeContentResultResponse` from the poller.
    - `beginRecognizeForms` and `beginRecognizeFormsFromUrl` now return `RecognizedFormArray` instead of `RecognizeFormResultResponse` from the poller.
    - `beginRecognizeReceipts` and `beginRecognizeReceiptsFromUrl` now return `RecognizedReceiptArray` instead of `RecognizeReceiptResultResponse` from the poller.
  - [Breaking] Remove `getFormTrainingClient()` from `FormRecognizerClient`. A new method `getFormRecognizerClient()` is added to `FormTrainingClient`
  - [Breaking] `useTrainingLabels` parameter is now required for `beginTraining()` method.
  - [Breaking] Rename `intervalInMs` to `updateIntervalInMs` for all LRO poller options.
  - [Breaking] Remove `USReceipt` and associated types.
  - Rename the first parameter of `beginRecognizeContent()` from `data` to `form`.
  - Rename the second parameter of `beginRecognizeForms()` from `data` to `form`.
  - Rename the first parameter of `beginRecognizeReceipts()` from `data` to `receipt`.
  - Rename the first parameter of `beginRecognizeContentFromUrl()` from `documentUrl` to `formUrl`.
  - Rename the second parameter of `beginRecognizeFormsFromUrl()` from `documentUrl` to `formUrl`.
  - Rename the first parameter of `beginRecognizeReceiptsFromUrl()` from `documentUrl` to `receiptUrl`.
  - Rename the first parameter of `beginTraining` from `blobContainerUrl` to `trainingFilesUrl`.

## 1.0.0-preview.2 (2020-05-06)

- `FormTrainingClient.listModels()` now works correctly on NodeJs v8.
- Custom Form recognition now handles missing fields properly.

## 1.0.0-preview.1 (2020-04-23)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
- Differences from previous public package `@azure/cognitiveservices-formrecognizer`
  - Package name changed from `@azure/cognitiveservices-formrecognizer` to `@azure/ai-form-recognizer`.
  - Package targets version `2.0` of the service API.
