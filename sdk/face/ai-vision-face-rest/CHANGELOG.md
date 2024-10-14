# Release History

## 1.0.0-beta.2 (2024-10-14)

This library now supports the Azure AI Face v1.2-preview.1 API.

### Features Added

- Added support for latest Detect Liveness Session API
  - New face detection operation: [Detect From Session Image Id](https://learn.microsoft.com/rest/api/face/face-detection-operations/detect-from-session-image-id?view=rest-face-v1.2-preview.1) using `DetectFromSessionImageIdParameters`.
  - New liveness session operation: [Get Session Image](https://learn.microsoft.com/rest/api/face/liveness-session-operations/get-session-image?view=rest-face-v1.2-preview.1).
  - New properties `enableSessionImage?: boolean`, `livenessSingleModalModel?: LivenessModel` to `CreateLivenessSessionContent`.
  - New model `CreateLivenessWithVerifySessionJsonContent` for liveness session operations [Create Liveness With Verify Session](https://learn.microsoft.com/rest/api/face/liveness-session-operations/create-liveness-with-verify-session?view=rest-face-v1.2-preview.1) and [Create Liveness With Verify Session With Verify Image](https://learn.microsoft.com/rest/api/face/liveness-session-operations/create-liveness-with-verify-session-with-verify-image?view=rest-face-v1.2-preview.1).

## 1.0.0-beta.1 (2024-05-23)

This is the first preview of the Azure Face Service client library `@azure-rest/ai-vision-face` that follows the [TypeScript Azure SDK Design Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html).
This library replaces the package [@azure/cognitiveservices-face](https://www.npmjs.com/package/@azure/cognitiveservices-face).

This package's [documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples) demonstrate the new API.

### Features Added

These are the new features not supported by the old package [@azure/cognitiveservices-face](https://www.npmjs.com/package/@azure/cognitiveservices-face).

- Added support for Liveness Detection.
- Added support for `Person` and `DynamicPersonGroup` operations.
- Added support for face recognition with `PersonDirectory` by passing `IdentifyFromPersonDirectoryParameters` or `IdentifyFromDynamicPersonGroupParameters` to `/identify`.
- Added support for authentication with Microsoft Entra ID using `DefaultAzureCredential` from `@azure/identity`.

### Breaking Changes

- This library supports only the Azure AI Face v1.1-preview.1 API, whose data models are not compatible with the v1.0 API used by [@azure/cognitiveservices-face](https://www.npmjs.com/package/@azure/cognitiveservices-face).
- This library follows the design of [REST client](https://devblogs.microsoft.com/azure-sdk/azure-rest-libraries-for-javascript/), which is essentially different from [@azure/cognitiveservices-face](https://www.npmjs.com/package/@azure/cognitiveservices-face).
- The Snapshot operations are all removed as [the Snapshot API is no longer supported](https://azure.microsoft.com/updates/facelimitedaccess/).
