# @azure/arm-kubernetesconfiguration-extensions client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-kubernetesconfiguration-extensions in some common scenarios.

| **File Name**                                           | **Description**                                                                                                                                                   |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [extensionsCreateSample.js][extensionscreatesample]     | create a new Kubernetes Cluster Extension. x-ms-original-file: 2024-11-01/CreateExtension.json                                                                    |
| [extensionsDeleteSample.js][extensionsdeletesample]     | delete a Kubernetes Cluster Extension. This will cause the Agent to Uninstall the extension from the cluster. x-ms-original-file: 2024-11-01/DeleteExtension.json |
| [extensionsGetSample.js][extensionsgetsample]           | gets Kubernetes Cluster Extension. x-ms-original-file: 2024-11-01/GetExtension.json                                                                               |
| [extensionsListSample.js][extensionslistsample]         | list all Extensions in the cluster. x-ms-original-file: 2024-11-01/ListExtensions.json                                                                            |
| [extensionsUpdateSample.js][extensionsupdatesample]     | patch an existing Kubernetes Cluster Extension. x-ms-original-file: 2024-11-01/PatchExtension.json                                                                |
| [operationStatusGetSample.js][operationstatusgetsample] | get Async Operation status x-ms-original-file: 2024-11-01/GetExtensionAsyncOperationStatus.json                                                                   |

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
node extensionsCreateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node extensionsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/samples/v1-beta/javascript/extensionsCreateSample.js
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/samples/v1-beta/javascript/extensionsDeleteSample.js
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/samples/v1-beta/javascript/extensionsGetSample.js
[extensionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/samples/v1-beta/javascript/extensionsListSample.js
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/samples/v1-beta/javascript/extensionsUpdateSample.js
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/samples/v1-beta/javascript/operationStatusGetSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-extensions?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-extensions/README.md
