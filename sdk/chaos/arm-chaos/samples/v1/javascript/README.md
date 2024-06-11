# client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                          |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.js][capabilitiescreateorupdatesample]     | Create or update a Capability resource that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CreateUpdateCapability.json   |
| [capabilitiesDeleteSample.js][capabilitiesdeletesample]                     | Delete a Capability that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteCapability.json                            |
| [capabilitiesGetSample.js][capabilitiesgetsample]                           | Get a Capability resource that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetCapability.json                         |
| [capabilitiesListSample.js][capabilitieslistsample]                         | Get a list of Capability resources that extend a Target resource.. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListCapabilities.json             |
| [capabilityTypesGetSample.js][capabilitytypesgetsample]                     | Get a Capability Type resource for given Target Type and location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetCapabilityType.json            |
| [capabilityTypesListSample.js][capabilitytypeslistsample]                   | Get a list of Capability Type resources for given Target Type and location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListCapabilityTypes.json |
| [experimentsCancelSample.js][experimentscancelsample]                       | Cancel a running Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CancelExperiment.json                                          |
| [experimentsCreateOrUpdateSample.js][experimentscreateorupdatesample]       | Create or update a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CreateUpdateExperiment.json                                  |
| [experimentsDeleteSample.js][experimentsdeletesample]                       | Delete a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteExperiment.json                                                  |
| [experimentsExecutionDetailsSample.js][experimentsexecutiondetailssample]   | Execution details of an experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DetailsExperiment.json                                  |
| [experimentsGetExecutionSample.js][experimentsgetexecutionsample]           | Get an execution of an Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetExperimentExecution.json                              |
| [experimentsGetSample.js][experimentsgetsample]                             | Get a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetExperiment.json                                                        |
| [experimentsListAllExecutionsSample.js][experimentslistallexecutionssample] | Get a list of executions of an Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListExperimentExecutions.json                    |
| [experimentsListAllSample.js][experimentslistallsample]                     | Get a list of Experiment resources in a subscription. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListExperimentsInASubscription.json            |
| [experimentsListSample.js][experimentslistsample]                           | Get a list of Experiment resources in a resource group. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListExperimentsInAResourceGroup.json         |
| [experimentsStartSample.js][experimentsstartsample]                         | Start a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/StartExperiment.json                                                    |
| [experimentsUpdateSample.js][experimentsupdatesample]                       | The operation to update an experiment. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/UpdateExperiment.json                                         |
| [operationStatusesGetSample.js][operationstatusesgetsample]                 | Get the status of a long running azure asynchronous operation. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetOperationStatus.json               |
| [targetTypesGetSample.js][targettypesgetsample]                             | Get a Target Type resources for given location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetTargetType.json                                   |
| [targetTypesListSample.js][targettypeslistsample]                           | Get a list of Target Type resources for given location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListTargetTypes.json                         |
| [targetsCreateOrUpdateSample.js][targetscreateorupdatesample]               | Create or update a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CreateUpdateTarget.json |
| [targetsDeleteSample.js][targetsdeletesample]                               | Delete a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteTarget.json                 |
| [targetsGetSample.js][targetsgetsample]                                     | Get a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetTarget.json                       |
| [targetsListSample.js][targetslistsample]                                   | Get a list of Target resources that extend a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListTargets.json             |

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
node capabilitiesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env CHAOS_SUBSCRIPTION_ID="<chaos subscription id>" CHAOS_RESOURCE_GROUP="<chaos resource group>" node capabilitiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/capabilitiesCreateOrUpdateSample.js
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/capabilitiesDeleteSample.js
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/capabilitiesGetSample.js
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/capabilitiesListSample.js
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/capabilityTypesGetSample.js
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/capabilityTypesListSample.js
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsCancelSample.js
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsCreateOrUpdateSample.js
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsDeleteSample.js
[experimentsexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsExecutionDetailsSample.js
[experimentsgetexecutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsGetExecutionSample.js
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsGetSample.js
[experimentslistallexecutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsListAllExecutionsSample.js
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsListAllSample.js
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsListSample.js
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsStartSample.js
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/experimentsUpdateSample.js
[operationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/operationStatusesGetSample.js
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/targetTypesGetSample.js
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/targetTypesListSample.js
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/targetsCreateOrUpdateSample.js
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/targetsDeleteSample.js
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/targetsGetSample.js
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/javascript/targetsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md
