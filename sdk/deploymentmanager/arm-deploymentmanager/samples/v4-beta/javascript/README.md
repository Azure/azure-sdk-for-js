# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                                                                                                                  |
| --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [artifactSourcesCreateOrUpdateSample.js][artifactsourcescreateorupdatesample]     | Synchronously creates a new artifact source or updates an existing artifact source. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsource_createorupdate.json                                                      |
| [artifactSourcesDeleteSample.js][artifactsourcesdeletesample]                     | Deletes an artifact source. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsource_delete.json                                                                                                                      |
| [artifactSourcesGetSample.js][artifactsourcesgetsample]                           | Gets an artifact source. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsource_get.json                                                                                                                            |
| [artifactSourcesListSample.js][artifactsourceslistsample]                         | Lists the artifact sources in a resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/artifactsources_list.json                                                                                                   |
| [operationsListSample.js][operationslistsample]                                   | Lists the supported operations. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/operations_list.json                                                                                                                        |
| [rolloutsCancelSample.js][rolloutscancelsample]                                   | Only running rollouts can be canceled. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_post_cancel.json                                                                                                             |
| [rolloutsCreateOrUpdateSample.js][rolloutscreateorupdatesample]                   | This is an asynchronous operation and can be polled to completion using the location header returned by this operation. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_createorupdate.json                         |
| [rolloutsDeleteSample.js][rolloutsdeletesample]                                   | Only rollouts in terminal state can be deleted. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_delete.json                                                                                                         |
| [rolloutsGetSample.js][rolloutsgetsample]                                         | Gets detailed information of a rollout. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_get.json                                                                                                                    |
| [rolloutsListSample.js][rolloutslistsample]                                       | Lists the rollouts in a resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollouts_list.json                                                                                                                  |
| [rolloutsRestartSample.js][rolloutsrestartsample]                                 | Only failed rollouts can be restarted. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/rollout_post_restart.json                                                                                                            |
| [serviceTopologiesCreateOrUpdateSample.js][servicetopologiescreateorupdatesample] | Synchronously creates a new service topology or updates an existing service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopology_createorupdate.json                                                   |
| [serviceTopologiesDeleteSample.js][servicetopologiesdeletesample]                 | Deletes the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopology_delete.json                                                                                                                   |
| [serviceTopologiesGetSample.js][servicetopologiesgetsample]                       | Gets the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopology_get.json                                                                                                                         |
| [serviceTopologiesListSample.js][servicetopologieslistsample]                     | Lists the service topologies in the resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/servicetopologies_list.json                                                                                             |
| [serviceUnitsCreateOrUpdateSample.js][serviceunitscreateorupdatesample]           | This is an asynchronous operation and can be polled to completion using the operation resource returned by this operation. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunit_createorupdate_noartifactsource.json |
| [serviceUnitsDeleteSample.js][serviceunitsdeletesample]                           | Deletes the service unit. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunit_delete.json                                                                                                                           |
| [serviceUnitsGetSample.js][serviceunitsgetsample]                                 | Gets the service unit. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunit_get.json                                                                                                                                 |
| [serviceUnitsListSample.js][serviceunitslistsample]                               | Lists the service units under a service in the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/serviceunits_list.json                                                                                     |
| [servicesCreateOrUpdateSample.js][servicescreateorupdatesample]                   | Synchronously creates a new service or updates an existing service. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_createorupdate.json                                                                             |
| [servicesDeleteSample.js][servicesdeletesample]                                   | Deletes the service. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_delete.json                                                                                                                                    |
| [servicesGetSample.js][servicesgetsample]                                         | Gets the service. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/service_get.json                                                                                                                                          |
| [servicesListSample.js][serviceslistsample]                                       | Lists the services in the service topology. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/services_list.json                                                                                                              |
| [stepsCreateOrUpdateSample.js][stepscreateorupdatesample]                         | Synchronously creates a new step or updates an existing step. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/step_health_check_createorupdate.json                                                                         |
| [stepsDeleteSample.js][stepsdeletesample]                                         | Deletes the step. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/step_delete.json                                                                                                                                          |
| [stepsGetSample.js][stepsgetsample]                                               | Gets the step. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/step_get.json                                                                                                                                                |
| [stepsListSample.js][stepslistsample]                                             | Lists the steps in a resource group. x-ms-original-file: specification/deploymentmanager/resource-manager/Microsoft.DeploymentManager/preview/2019-11-01-preview/examples/steps_list.json                                                                                                                        |

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
node artifactSourcesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node artifactSourcesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[artifactsourcescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/artifactSourcesCreateOrUpdateSample.js
[artifactsourcesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/artifactSourcesDeleteSample.js
[artifactsourcesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/artifactSourcesGetSample.js
[artifactsourceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/artifactSourcesListSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/operationsListSample.js
[rolloutscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/rolloutsCancelSample.js
[rolloutscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/rolloutsCreateOrUpdateSample.js
[rolloutsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/rolloutsDeleteSample.js
[rolloutsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/rolloutsGetSample.js
[rolloutslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/rolloutsListSample.js
[rolloutsrestartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/rolloutsRestartSample.js
[servicetopologiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceTopologiesCreateOrUpdateSample.js
[servicetopologiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceTopologiesDeleteSample.js
[servicetopologiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceTopologiesGetSample.js
[servicetopologieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceTopologiesListSample.js
[serviceunitscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceUnitsCreateOrUpdateSample.js
[serviceunitsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceUnitsDeleteSample.js
[serviceunitsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceUnitsGetSample.js
[serviceunitslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/serviceUnitsListSample.js
[servicescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/servicesCreateOrUpdateSample.js
[servicesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/servicesDeleteSample.js
[servicesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/servicesGetSample.js
[serviceslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/servicesListSample.js
[stepscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/stepsCreateOrUpdateSample.js
[stepsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/stepsDeleteSample.js
[stepsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/stepsGetSample.js
[stepslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/deploymentmanager/arm-deploymentmanager/samples/v4-beta/javascript/stepsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-deploymentmanager?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/deploymentmanager/arm-deploymentmanager/README.md
