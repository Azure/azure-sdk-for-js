# Release History

## 3.1.0-beta.2 (Unreleased)

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
  - [Breaking] Remove `USReceipt` and assoicated types.
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
