# Release History

## 1.0.0 (2026-08-01)

This release migrates the package to the `@azure/ai-translation-document` name and a new client design. It replaces the previous `@azure-rest/ai-translation-document` REST-level client (RLC) package.

### Features Added

- Added support for the `2026-03-01` service API version.
- Added `deploymentName` to `TargetInput` and `DocumentStatus` to support translating with a custom translation model.
- Added `deploymentName` parameter to single document translation.
- Added support for translating text within images: `translateTextWithinImage` on batch and single document translation, and image-scan fields (`imageCharacterDetected`, `imageCharged`, `totalImageScansSucceeded`, `totalImageScansFailed`) on `DocumentStatus`.

### Breaking Changes

- The package name changed from `@azure-rest/ai-translation-document` to `@azure/ai-translation-document`.
- The REST-level client (RLC) surface (`client.path(...).post(...)`) has been replaced with a modeled client surface exposing `DocumentTranslationClient` and `SingleDocumentTranslationClient`. See the README for migration examples.

#### Migration guide

- **Install the new package:** replace `@azure-rest/ai-translation-document` with `@azure/ai-translation-document`.
- **Create the client:** the default export factory is replaced by named clients.

  ```diff
  - import DocumentTranslator from "@azure-rest/ai-translation-document";
  - const client = DocumentTranslator(endpoint, credential);
  + import { DocumentTranslationClient } from "@azure/ai-translation-document";
  + const client = new DocumentTranslationClient(endpoint, credential);
  ```

- **Call operations:** replace the `path(...).method()` pattern with typed methods.

  ```diff
  - await client.path("/batches").post({ body: { inputs } });
  + await client.startTranslation({ inputs });
  ```

- **Single document translation:** use `SingleDocumentTranslationClient`.

  ```diff
  - import DocumentTranslator from "@azure-rest/ai-translation-document";
  - const client = DocumentTranslator(endpoint, credential);
  - await client.path("/document:translate").post({ ... });
  + import { SingleDocumentTranslationClient } from "@azure/ai-translation-document";
  + const client = new SingleDocumentTranslationClient(endpoint, credential);
  + await client.translate(targetLanguage, content);
  ```

- **Responses:** results are returned as typed objects and errors are thrown as `RestError`, instead of checking `response.status` on a raw HTTP response.
