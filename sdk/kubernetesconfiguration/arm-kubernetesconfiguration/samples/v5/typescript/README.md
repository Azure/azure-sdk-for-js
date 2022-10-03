# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [extensionsCreateSample.ts][extensionscreatesample]                                                   | Create a new Kubernetes Cluster Extension. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/CreateExtension.json                                                                                                       |
| [extensionsDeleteSample.ts][extensionsdeletesample]                                                   | Delete a Kubernetes Cluster Extension. This will cause the Agent to Uninstall the extension from the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/DeleteExtension.json                                    |
| [extensionsGetSample.ts][extensionsgetsample]                                                         | Gets Kubernetes Cluster Extension. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetExtension.json                                                                                                                  |
| [extensionsListSample.ts][extensionslistsample]                                                       | List all Extensions in the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListExtensions.json                                                                                                               |
| [extensionsUpdateSample.ts][extensionsupdatesample]                                                   | Patch an existing Kubernetes Cluster Extension. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/PatchExtension.json                                                                                                   |
| [fluxConfigOperationStatusGetSample.ts][fluxconfigoperationstatusgetsample]                           | Get Async Operation status x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetFluxConfigurationAsyncOperationStatus.json                                                                                              |
| [fluxConfigurationsCreateOrUpdateSample.ts][fluxconfigurationscreateorupdatesample]                   | Create a new Kubernetes Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/CreateFluxConfiguration.json                                                                                              |
| [fluxConfigurationsDeleteSample.ts][fluxconfigurationsdeletesample]                                   | This will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/DeleteFluxConfiguration.json                    |
| [fluxConfigurationsGetSample.ts][fluxconfigurationsgetsample]                                         | Gets details of the Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetFluxConfiguration.json                                                                                                     |
| [fluxConfigurationsListSample.ts][fluxconfigurationslistsample]                                       | List all Flux Configurations. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListFluxConfigurations.json                                                                                                             |
| [fluxConfigurationsUpdateSample.ts][fluxconfigurationsupdatesample]                                   | Update an existing Kubernetes Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/PatchFluxConfiguration.json                                                                                         |
| [operationStatusGetSample.ts][operationstatusgetsample]                                               | Get Async Operation status x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetExtensionAsyncOperationStatus.json                                                                                                      |
| [operationStatusListSample.ts][operationstatuslistsample]                                             | List Async Operations, currently in progress, in a cluster x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListAsyncOperationStatus.json                                                                              |
| [operationsListSample.ts][operationslistsample]                                                       | List all the available operations the KubernetesConfiguration resource provider supports. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/OperationsList.json                                                         |
| [sourceControlConfigurationsCreateOrUpdateSample.ts][sourcecontrolconfigurationscreateorupdatesample] | Create a new Kubernetes Source Control Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/CreateSourceControlConfiguration.json                                                                           |
| [sourceControlConfigurationsDeleteSample.ts][sourcecontrolconfigurationsdeletesample]                 | This will delete the YAML file used to set up the Source control configuration, thus stopping future sync from the source repo. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/DeleteSourceControlConfiguration.json |
| [sourceControlConfigurationsGetSample.ts][sourcecontrolconfigurationsgetsample]                       | Gets details of the Source Control Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetSourceControlConfiguration.json                                                                                  |
| [sourceControlConfigurationsListSample.ts][sourcecontrolconfigurationslistsample]                     | List all Source Control Configurations. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListSourceControlConfiguration.json                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/extensionsCreateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/extensionsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/extensionsCreateSample.ts
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/extensionsDeleteSample.ts
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/extensionsGetSample.ts
[extensionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/extensionsListSample.ts
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/extensionsUpdateSample.ts
[fluxconfigoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/fluxConfigOperationStatusGetSample.ts
[fluxconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/fluxConfigurationsCreateOrUpdateSample.ts
[fluxconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/fluxConfigurationsDeleteSample.ts
[fluxconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/fluxConfigurationsGetSample.ts
[fluxconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/fluxConfigurationsListSample.ts
[fluxconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/fluxConfigurationsUpdateSample.ts
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/operationStatusGetSample.ts
[operationstatuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/operationStatusListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/operationsListSample.ts
[sourcecontrolconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/sourceControlConfigurationsCreateOrUpdateSample.ts
[sourcecontrolconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/sourceControlConfigurationsDeleteSample.ts
[sourcecontrolconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/sourceControlConfigurationsGetSample.ts
[sourcecontrolconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/typescript/src/sourceControlConfigurationsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
