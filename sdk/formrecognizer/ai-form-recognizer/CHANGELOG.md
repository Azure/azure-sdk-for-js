# Release History

## 1.0.0-preview.3 (Unreleased)

- Blank pages in receipt recognition are now handled properly.
- Support Azure Active Directory credential.
- Support to copy a custom model from one Form Recognizer resource to another.
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
  - [Breaking] Rename properties `createOn` to `requestedOn` and `lastModified` to `completedOn` in `CustomModelInfo` type.
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
  [Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
- Differences from previous public package `@azure/cognitiveservices-formrecognizer`
  - Package name changed from `@azure/cognitiveservices-formrecognizer` to `@azure/ai-form-recognizer`.
  - Package targets version `2.0` of the service API.
