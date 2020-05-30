# Release History

## 1.0.0-preview.3 (Unreleased)

- Blank pages in receipt recognition are now handled properly.
- Support to copy a custom model from one Form Recognizer resource to another.

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
