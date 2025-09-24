# @azure/arm-disconnectedoperations client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-disconnectedoperations in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [artifactsGetSample.ts][artifactsgetsample]                                                                 | get the resource x-ms-original-file: 2025-06-01-preview/Artifacts_Get_MaximumSet_Gen.json                                                     |
| [artifactsListByParentSample.ts][artifactslistbyparentsample]                                               | list by parent x-ms-original-file: 2025-06-01-preview/Artifact_ListByParent_MaximumSet_Gen.json                                               |
| [artifactsListDownloadUriSample.ts][artifactslistdownloadurisample]                                         | get artifact download link. x-ms-original-file: 2025-06-01-preview/Artifact_ListDownloadUri_MaximumSet_Gen.json                               |
| [disconnectedOperationsCreateOrUpdateSample.ts][disconnectedoperationscreateorupdatesample]                 | create a DisconnectedOperationCreateOrUpdate x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_CreateOrUpdate_MaximumSet_Gen.json |
| [disconnectedOperationsDeleteSample.ts][disconnectedoperationsdeletesample]                                 | delete a DisconnectedOperation x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_Delete_MaximumSet_Gen.json                       |
| [disconnectedOperationsGetSample.ts][disconnectedoperationsgetsample]                                       | get a DisconnectedOperation x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_Get_MaximumSet_Gen.json                             |
| [disconnectedOperationsListDeploymentManifestSample.ts][disconnectedoperationslistdeploymentmanifestsample] | get deployment manifest. x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_ListDeploymentManifest_MaximumSet_Gen.json             |
| [imagesGetSample.ts][imagesgetsample]                                                                       | get the resource. x-ms-original-file: 2025-06-01-preview/Images_Get_MaximumSet_Gen.json                                                       |
| [imagesListByDisconnectedOperationSample.ts][imageslistbydisconnectedoperationsample]                       | list by disconnected operation. x-ms-original-file: 2025-06-01-preview/Images_ListByDisconnectedOperation_MaximumSet_Gen.json                 |
| [imagesListDownloadUriSample.ts][imageslistdownloadurisample]                                               | get the URI to download the image. x-ms-original-file: 2025-06-01-preview/Images_ListDownloadUri_MaximumSet_Gen.json                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

Before running the samples in Node, they must be compiled to JavaScript using the TypeScript compiler. For more information on TypeScript, see the [TypeScript documentation][typescript]. Install the TypeScript compiler using:

```bash
npm install -g typescript
```

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Compile the samples:

```bash
npm run build
```

3. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

4. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node dist/artifactsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/artifactsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[artifactsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/artifactsGetSample.ts
[artifactslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/artifactsListByParentSample.ts
[artifactslistdownloadurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/artifactsListDownloadUriSample.ts
[disconnectedoperationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/disconnectedOperationsCreateOrUpdateSample.ts
[disconnectedoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/disconnectedOperationsDeleteSample.ts
[disconnectedoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/disconnectedOperationsGetSample.ts
[disconnectedoperationslistdeploymentmanifestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/disconnectedOperationsListDeploymentManifestSample.ts
[imagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/imagesGetSample.ts
[imageslistbydisconnectedoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/imagesListByDisconnectedOperationSample.ts
[imageslistdownloadurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/typescript/src/imagesListDownloadUriSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-disconnectedoperations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/disconnectedoperations/arm-disconnectedoperations/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
