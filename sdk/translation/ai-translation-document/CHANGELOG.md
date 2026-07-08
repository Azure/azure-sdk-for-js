# Release History

## 2.0.0 (Unreleased)

This release migrates the package to the `@azure/ai-translation-document` name and a new client design. It replaces the previous `@azure-rest/ai-translation-document` REST-level client (RLC) package.

### Features Added

- Added support for the `2026-03-01` service API version.
- Added `deploymentName` to `TargetInput` and `DocumentStatus` to support translating with a custom translation model.
- Added `deploymentName` parameter to single document translation.
- Added support for translating text within images: `translateTextWithinImage` on batch and single document translation, and image-scan fields (`imageCharacterDetected`, `imageCharged`, `totalImageScansSucceeded`, `totalImageScansFailed`) on `DocumentStatus`.

### Breaking Changes

- The package name changed from `@azure-rest/ai-translation-document` to `@azure/ai-translation-document`.
- The REST-level client (RLC) surface (`client.path(...).post(...)`) has been replaced with a modeled client surface exposing `DocumentTranslationClient` and `SingleDocumentTranslationClient`. See the README for migration examples.

## 1.0.0 (2024-11-15)

### Other Changes

- Renamed SingleDocumentTranslationClient's API from `document_translate` to `translate`

## 1.0.0-beta.2 (2024-07-01)

### Other Changes

- Re-release of 1.0.0-beta.1 as the SDK package was released without types

## 1.0.0-beta.1 (2024-06-27)

- Initial release. Please see the README and wiki for information on the new design.

Version 1.0.0-beta.1 is preview of our efforts in creating a client library that is developer-friendly, idiomatic
to the JS/TS ecosystem, and as consistent across different languages and platforms as possible.

This package's
[documentation](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document/README.md)
and
[samples](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/translation/ai-translation-document/samples)
demonstrate the new API.

### Features Added

- Added support for Synchronous document translation - [translate-document API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/translate-document)
- Added support for Batch Translation - [start Translation API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/start-batch-translation)
- Added support for Get Translations Status - [get translations status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-translations-status)
- Added support for Get Translation Status - [get translation status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-translation-status)
- Added support for Get Documents Status - [get documents status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-documents-status)
- Added support for Get Document Status - [get document status API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-document-status)
- Added support for Cancel Translation - [cancel translation API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/cancel-translation)
- Added support for Get Supported Document Formats - [get supported document formats API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-supported-document-formats)
- Added support for Get Supported Glossary Formats - [get supported glossary formats API](https://learn.microsoft.com/azure/ai-services/translator/document-translation/reference/get-supported-glossary-formats)
