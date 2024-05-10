# Release History

## 1.0.0-beta.1 (Unreleased)

This is the first preview of the Azure Face Service client library `@azure-rest/ai-vision-face` that follows the [TypeScript Azure SDK Design Guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html).
This library replaces the package [@azure/cognitiveservices-face](https://www.npmjs.com/package/@azure/cognitiveservices-face).

This package's [documentation](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/README.md) and [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/face/ai-vision-face-rest/samples) demonstrate the new API.

### Features Added

- Added support for Liveness Detection.
- Added support for `Person` and `DynamicPersonGroup` operations.
- Added support for face recognition with `PersonDirectory` by passing `IdentifyFromPersonDirectoryParameters` or `IdentifyFromDynamicPersonGroupParameters` to `/identify`.

### Breaking Changes

- This library supports only the Azure AI Face v1.1-preview.1 API.
- The `FaceClient` is the primary interface for developers interacting with the Azure AI Face service. It follows the design of [REST client](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/rest-clients.md) and serves as the gateway from which all interaction with the library will occur.
- Authentication with Microsoft Entra ID is supported using `DefaultAzureCredential` from `@azure/identity`.
- The Snapshot operations are all removed as [the Snapshot API is no longer supported](https://azure.microsoft.com/updates/facelimitedaccess/).