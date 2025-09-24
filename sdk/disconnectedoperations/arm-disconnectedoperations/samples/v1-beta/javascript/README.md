# @azure/arm-disconnectedoperations client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-disconnectedoperations in some common scenarios.

| **File Name**                                                                                               | **Description**                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| [artifactsGetSample.js][artifactsgetsample]                                                                 | get the resource x-ms-original-file: 2025-06-01-preview/Artifacts_Get_MaximumSet_Gen.json                                                     |
| [artifactsListByParentSample.js][artifactslistbyparentsample]                                               | list by parent x-ms-original-file: 2025-06-01-preview/Artifact_ListByParent_MaximumSet_Gen.json                                               |
| [artifactsListDownloadUriSample.js][artifactslistdownloadurisample]                                         | get artifact download link. x-ms-original-file: 2025-06-01-preview/Artifact_ListDownloadUri_MaximumSet_Gen.json                               |
| [disconnectedOperationsCreateOrUpdateSample.js][disconnectedoperationscreateorupdatesample]                 | create a DisconnectedOperationCreateOrUpdate x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_CreateOrUpdate_MaximumSet_Gen.json |
| [disconnectedOperationsDeleteSample.js][disconnectedoperationsdeletesample]                                 | delete a DisconnectedOperation x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_Delete_MaximumSet_Gen.json                       |
| [disconnectedOperationsGetSample.js][disconnectedoperationsgetsample]                                       | get a DisconnectedOperation x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_Get_MaximumSet_Gen.json                             |
| [disconnectedOperationsListDeploymentManifestSample.js][disconnectedoperationslistdeploymentmanifestsample] | get deployment manifest. x-ms-original-file: 2025-06-01-preview/DisconnectedOperations_ListDeploymentManifest_MaximumSet_Gen.json             |
| [imagesGetSample.js][imagesgetsample]                                                                       | get the resource. x-ms-original-file: 2025-06-01-preview/Images_Get_MaximumSet_Gen.json                                                       |
| [imagesListByDisconnectedOperationSample.js][imageslistbydisconnectedoperationsample]                       | list by disconnected operation. x-ms-original-file: 2025-06-01-preview/Images_ListByDisconnectedOperation_MaximumSet_Gen.json                 |
| [imagesListDownloadUriSample.js][imageslistdownloadurisample]                                               | get the URI to download the image. x-ms-original-file: 2025-06-01-preview/Images_ListDownloadUri_MaximumSet_Gen.json                          |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule).

You need [an Azure subscription][freesub] to run these sample programs.

Samples retrieve credentials to access the service endpoint from environment variables. Alternatively, edit the source code to include the appropriate credentials. See each individual sample for details on which environment variables/credentials it requires to function.

Adapting the samples to run in the browser may require some additional consideration. For details, please see the [package README][package].

## Setup

To run the samples using the published version of the package:

1. Install the dependencies using `npm`:

```bash
npm install
```

2. Edit the file `sample.env`, adding the correct credentials to access the Azure service and run the samples. Then rename the file from `sample.env` to just `.env`. The sample programs will read this file automatically.

3. Run whichever samples you like (note that some samples may require additional setup, see the table above):

```bash
node artifactsGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node artifactsGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[artifactsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/artifactsGetSample.js
[artifactslistbyparentsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/artifactsListByParentSample.js
[artifactslistdownloadurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/artifactsListDownloadUriSample.js
[disconnectedoperationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/disconnectedOperationsCreateOrUpdateSample.js
[disconnectedoperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/disconnectedOperationsDeleteSample.js
[disconnectedoperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/disconnectedOperationsGetSample.js
[disconnectedoperationslistdeploymentmanifestsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/disconnectedOperationsListDeploymentManifestSample.js
[imagesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/imagesGetSample.js
[imageslistbydisconnectedoperationsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/imagesListByDisconnectedOperationSample.js
[imageslistdownloadurisample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/disconnectedoperations/arm-disconnectedoperations/samples/v1-beta/javascript/imagesListDownloadUriSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-disconnectedoperations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/disconnectedoperations/arm-disconnectedoperations/README.md
