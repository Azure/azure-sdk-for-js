# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [extensionsCreateSample.js][extensionscreatesample]                                                   | Create a new Kubernetes Cluster Extension. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/CreateExtension.json                                                                                                       |
| [extensionsDeleteSample.js][extensionsdeletesample]                                                   | Delete a Kubernetes Cluster Extension. This will cause the Agent to Uninstall the extension from the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/DeleteExtension.json                                    |
| [extensionsGetSample.js][extensionsgetsample]                                                         | Gets Kubernetes Cluster Extension. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetExtension.json                                                                                                                  |
| [extensionsListSample.js][extensionslistsample]                                                       | List all Extensions in the cluster. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListExtensions.json                                                                                                               |
| [extensionsUpdateSample.js][extensionsupdatesample]                                                   | Patch an existing Kubernetes Cluster Extension. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/PatchExtension.json                                                                                                   |
| [fluxConfigOperationStatusGetSample.js][fluxconfigoperationstatusgetsample]                           | Get Async Operation status x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetFluxConfigurationAsyncOperationStatus.json                                                                                              |
| [fluxConfigurationsCreateOrUpdateSample.js][fluxconfigurationscreateorupdatesample]                   | Create a new Kubernetes Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/CreateFluxConfiguration.json                                                                                              |
| [fluxConfigurationsDeleteSample.js][fluxconfigurationsdeletesample]                                   | This will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/DeleteFluxConfiguration.json                    |
| [fluxConfigurationsGetSample.js][fluxconfigurationsgetsample]                                         | Gets details of the Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetFluxConfiguration.json                                                                                                     |
| [fluxConfigurationsListSample.js][fluxconfigurationslistsample]                                       | List all Flux Configurations. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListFluxConfigurations.json                                                                                                             |
| [fluxConfigurationsUpdateSample.js][fluxconfigurationsupdatesample]                                   | Update an existing Kubernetes Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/PatchFluxConfiguration.json                                                                                         |
| [operationStatusGetSample.js][operationstatusgetsample]                                               | Get Async Operation status x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetExtensionAsyncOperationStatus.json                                                                                                      |
| [operationStatusListSample.js][operationstatuslistsample]                                             | List Async Operations, currently in progress, in a cluster x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListAsyncOperationStatus.json                                                                              |
| [operationsListSample.js][operationslistsample]                                                       | List all the available operations the KubernetesConfiguration resource provider supports. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/OperationsList.json                                                         |
| [sourceControlConfigurationsCreateOrUpdateSample.js][sourcecontrolconfigurationscreateorupdatesample] | Create a new Kubernetes Source Control Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/CreateSourceControlConfiguration.json                                                                           |
| [sourceControlConfigurationsDeleteSample.js][sourcecontrolconfigurationsdeletesample]                 | This will delete the YAML file used to set up the Source control configuration, thus stopping future sync from the source repo. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/DeleteSourceControlConfiguration.json |
| [sourceControlConfigurationsGetSample.js][sourcecontrolconfigurationsgetsample]                       | Gets details of the Source Control Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/GetSourceControlConfiguration.json                                                                                  |
| [sourceControlConfigurationsListSample.js][sourcecontrolconfigurationslistsample]                     | List all Source Control Configurations. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/stable/2022-03-01/examples/ListSourceControlConfiguration.json                                                                                           |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node extensionsCreateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[extensionscreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/extensionsCreateSample.js
[extensionsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/extensionsDeleteSample.js
[extensionsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/extensionsGetSample.js
[extensionslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/extensionsListSample.js
[extensionsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/extensionsUpdateSample.js
[fluxconfigoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/fluxConfigOperationStatusGetSample.js
[fluxconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/fluxConfigurationsCreateOrUpdateSample.js
[fluxconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/fluxConfigurationsDeleteSample.js
[fluxconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/fluxConfigurationsGetSample.js
[fluxconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/fluxConfigurationsListSample.js
[fluxconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/fluxConfigurationsUpdateSample.js
[operationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/operationStatusGetSample.js
[operationstatuslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/operationStatusListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/operationsListSample.js
[sourcecontrolconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/sourceControlConfigurationsCreateOrUpdateSample.js
[sourcecontrolconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/sourceControlConfigurationsDeleteSample.js
[sourcecontrolconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/sourceControlConfigurationsGetSample.js
[sourcecontrolconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/samples/v5/javascript/sourceControlConfigurationsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration/README.md
