# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [artifactSourcesCreateOrUpdateSample.ts][artifactsourcescreateorupdatesample]     | Synchronously creates a new artifact source or updates an existing artifact source. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsource_createorupdate.json                                                      |
| [artifactSourcesDeleteSample.ts][artifactsourcesdeletesample]                     | Deletes an artifact source. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsource_delete.json                                                                                                                      |
| [artifactSourcesGetSample.ts][artifactsourcesgetsample]                           | Gets an artifact source. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsource_get.json                                                                                                                            |
| [artifactSourcesListSample.ts][artifactsourceslistsample]                         | Lists the artifact sources in a resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsources_list.json                                                                                                   |
| [operationsListSample.ts][operationslistsample]                                   | Lists the supported operations. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/operations_list.json                                                                                                                        |
| [rolloutsCancelSample.ts][rolloutscancelsample]                                   | Only running rollouts can be canceled. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_post_cancel.json                                                                                                             |
| [rolloutsCreateOrUpdateSample.ts][rolloutscreateorupdatesample]                   | This is an asynchronous operation and can be polled to completion using the location header returned by this operation. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_createorupdate.json                         |
| [rolloutsDeleteSample.ts][rolloutsdeletesample]                                   | Only rollouts in terminal state can be deleted. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_delete.json                                                                                                         |
| [rolloutsGetSample.ts][rolloutsgetsample]                                         | Gets detailed information of a rollout. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_get.json                                                                                                                    |
| [rolloutsListSample.ts][rolloutslistsample]                                       | Lists the rollouts in a resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollouts_list.json                                                                                                                  |
| [rolloutsRestartSample.ts][rolloutsrestartsample]                                 | Only failed rollouts can be restarted. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_post_restart.json                                                                                                            |
| [serviceTopologiesCreateOrUpdateSample.ts][servicetopologiescreateorupdatesample] | Synchronously creates a new service topology or updates an existing service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopology_createorupdate.json                                                   |
| [serviceTopologiesDeleteSample.ts][servicetopologiesdeletesample]                 | Deletes the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopology_delete.json                                                                                                                   |
| [serviceTopologiesGetSample.ts][servicetopologiesgetsample]                       | Gets the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopology_get.json                                                                                                                         |
| [serviceTopologiesListSample.ts][servicetopologieslistsample]                     | Lists the service topologies in the resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopologies_list.json                                                                                             |
| [serviceUnitsCreateOrUpdateSample.ts][serviceunitscreateorupdatesample]           | This is an asynchronous operation and can be polled to completion using the operation resource returned by this operation. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunit_createorupdate_noartifactsource.json |
| [serviceUnitsDeleteSample.ts][serviceunitsdeletesample]                           | Deletes the service unit. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunit_delete.json                                                                                                                           |
| [serviceUnitsGetSample.ts][serviceunitsgetsample]                                 | Gets the service unit. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunit_get.json                                                                                                                                 |
| [serviceUnitsListSample.ts][serviceunitslistsample]                               | Lists the service units under a service in the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunits_list.json                                                                                     |
| [servicesCreateOrUpdateSample.ts][servicescreateorupdatesample]                   | Synchronously creates a new service or updates an existing service. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_createorupdate.json                                                                             |
| [servicesDeleteSample.ts][servicesdeletesample]                                   | Deletes the service. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_delete.json                                                                                                                                    |
| [servicesGetSample.ts][servicesgetsample]                                         | Gets the service. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_get.json                                                                                                                                          |
| [servicesListSample.ts][serviceslistsample]                                       | Lists the services in the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/services_list.json                                                                                                              |
| [stepsCreateOrUpdateSample.ts][stepscreateorupdatesample]                         | Synchronously creates a new step or updates an existing step. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/step_health_check_createorupdate.json                                                                         |
| [stepsDeleteSample.ts][stepsdeletesample]                                         | Deletes the step. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/step_delete.json                                                                                                                                          |
| [stepsGetSample.ts][stepsgetsample]                                               | Gets the step. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/step_get.json                                                                                                                                                |
| [stepsListSample.ts][stepslistsample]                                             | Lists the steps in a resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/steps_list.json                                                                                                                        |

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
node dist/artifactSourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/artifactSourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[artifactsourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/artifactSourcesCreateOrUpdateSample.ts
[artifactsourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/artifactSourcesDeleteSample.ts
[artifactsourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/artifactSourcesGetSample.ts
[artifactsourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/artifactSourcesListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/operationsListSample.ts
[rolloutscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/rolloutsCancelSample.ts
[rolloutscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/rolloutsCreateOrUpdateSample.ts
[rolloutsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/rolloutsDeleteSample.ts
[rolloutsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/rolloutsGetSample.ts
[rolloutslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/rolloutsListSample.ts
[rolloutsrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/rolloutsRestartSample.ts
[servicetopologiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceTopologiesCreateOrUpdateSample.ts
[servicetopologiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceTopologiesDeleteSample.ts
[servicetopologiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceTopologiesGetSample.ts
[servicetopologieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceTopologiesListSample.ts
[serviceunitscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceUnitsCreateOrUpdateSample.ts
[serviceunitsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceUnitsDeleteSample.ts
[serviceunitsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceUnitsGetSample.ts
[serviceunitslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/serviceUnitsListSample.ts
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/servicesCreateOrUpdateSample.ts
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/servicesDeleteSample.ts
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/servicesGetSample.ts
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/servicesListSample.ts
[stepscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/stepsCreateOrUpdateSample.ts
[stepsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/stepsDeleteSample.ts
[stepsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/stepsGetSample.ts
[stepslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/typescript/src/stepsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deploymentmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deploymentmanager/arm-deploymentmanager/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
