# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [fluxConfigOperationStatusGetSample.js][fluxconfigoperationstatusgetsample]         | Get Async Operation status x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/examples/GetFluxConfigurationAsyncOperationStatus.json                                                                           |
| [fluxConfigurationsCreateOrUpdateSample.js][fluxconfigurationscreateorupdatesample] | Create a new Kubernetes Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/examples/CreateFluxConfiguration.json                                                                           |
| [fluxConfigurationsDeleteSample.js][fluxconfigurationsdeletesample]                 | This will delete the YAML file used to set up the Flux Configuration, thus stopping future sync from the source repo. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/examples/DeleteFluxConfiguration.json |
| [fluxConfigurationsGetSample.js][fluxconfigurationsgetsample]                       | Gets details of the Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/examples/GetFluxConfiguration.json                                                                                  |
| [fluxConfigurationsListSample.js][fluxconfigurationslistsample]                     | List all Flux Configurations. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/examples/ListFluxConfigurations.json                                                                                          |
| [fluxConfigurationsUpdateSample.js][fluxconfigurationsupdatesample]                 | Update an existing Kubernetes Flux Configuration. x-ms-original-file: specification/kubernetesconfiguration/resource-manager/Microsoft.KubernetesConfiguration/fluxConfigurations/stable/2025-04-01/examples/PatchFluxConfiguration.json                                                                      |

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
node fluxConfigOperationStatusGetSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env KUBERNETESCONFIGURATION_SUBSCRIPTION_ID="<kubernetesconfiguration subscription id>" KUBERNETESCONFIGURATION_RESOURCE_GROUP="<kubernetesconfiguration resource group>" node fluxConfigOperationStatusGetSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[fluxconfigoperationstatusgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/samples/v1-beta/javascript/fluxConfigOperationStatusGetSample.js
[fluxconfigurationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/samples/v1-beta/javascript/fluxConfigurationsCreateOrUpdateSample.js
[fluxconfigurationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/samples/v1-beta/javascript/fluxConfigurationsDeleteSample.js
[fluxconfigurationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/samples/v1-beta/javascript/fluxConfigurationsGetSample.js
[fluxconfigurationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/samples/v1-beta/javascript/fluxConfigurationsListSample.js
[fluxconfigurationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/samples/v1-beta/javascript/fluxConfigurationsUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-kubernetesconfiguration-fluxconfigurations?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/kubernetesconfiguration/arm-kubernetesconfiguration-fluxconfigurations/README.md
