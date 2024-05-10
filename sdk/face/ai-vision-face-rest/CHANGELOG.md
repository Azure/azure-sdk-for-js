# Release History

## 1.0.0-beta.1 (2024-05-10)

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