# Release History

## 1.0.0 (Unreleased)

This release migrates the package to the `@azure/ai-translation-document` name and a new client design. It replaces the previous `@azure-rest/ai-translation-document` REST-level client (RLC) package.

### Features Added

- Added support for the `2026-03-01` service API version.
- Added `deploymentName` to `TargetInput` and `DocumentStatus` to support translating with a custom translation model.
- Added `deploymentName` parameter to single document translation.
- Added support for translating text within images: `translateTextWithinImage` on batch and single document translation, and image-scan fields (`imageCharacterDetected`, `imageCharged`, `totalImageScansSucceeded`, `totalImageScansFailed`) on `DocumentStatus`.

### Breaking Changes

- The package name changed from `@azure-rest/ai-translation-document` to `@azure/ai-translation-document`.
- The REST-level client (RLC) surface (`client.path(...).post(...)`) has been replaced with a modeled client surface exposing `DocumentTranslationClient` and `SingleDocumentTranslationClient`. See the README for migration examples.
