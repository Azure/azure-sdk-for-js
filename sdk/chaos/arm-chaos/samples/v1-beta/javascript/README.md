# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                     | **Description**                                                                                                                                                                                                      |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.js][capabilitiescreateorupdatesample]           | Create or update a Capability resource that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/CreateOrUpdateACapability.json   |
| [capabilitiesDeleteSample.js][capabilitiesdeletesample]                           | Delete a Capability that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/DeleteACapability.json                              |
| [capabilitiesGetSample.js][capabilitiesgetsample]                                 | Get a Capability resource that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetACapability.json                           |
| [capabilitiesListSample.js][capabilitieslistsample]                               | Get a list of Capability resources that extend a Target resource.. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListCapabilities.json                |
| [capabilityTypesGetSample.js][capabilitytypesgetsample]                           | Get a Capability Type resource for given Target Type and location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetACapabilityType.json              |
| [capabilityTypesListSample.js][capabilitytypeslistsample]                         | Get a list of Capability Type resources for given Target Type and location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListCapabilityTypes.json    |
| [experimentsCancelSample.js][experimentscancelsample]                             | Cancel a running Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/CancelAExperiment.json                                            |
| [experimentsCreateOrUpdateSample.js][experimentscreateorupdatesample]             | Create or update a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/CreateOrUpdateAExperiment.json                                  |
| [experimentsDeleteSample.js][experimentsdeletesample]                             | Delete a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/DeleteAExperiment.json                                                    |
| [experimentsGetExecutionDetailsSample.js][experimentsgetexecutiondetailssample]   | Get an execution detail of a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetAExperimentExecutionDetails.json                   |
| [experimentsGetSample.js][experimentsgetsample]                                   | Get a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetAExperiment.json                                                          |
| [experimentsGetStatusSample.js][experimentsgetstatussample]                       | Get a status of a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetAExperimentStatus.json                                        |
| [experimentsListAllSample.js][experimentslistallsample]                           | Get a list of Experiment resources in a subscription. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListExperimentsInASubscription.json               |
| [experimentsListAllStatusesSample.js][experimentslistallstatusessample]           | Get a list of statuses of a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListExperimentStatuses.json                            |
| [experimentsListExecutionDetailsSample.js][experimentslistexecutiondetailssample] | Get a list of execution details of a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListExperimentExecutionsDetails.json          |
| [experimentsListSample.js][experimentslistsample]                                 | Get a list of Experiment resources in a resource group. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListExperimentsInAResourceGroup.json            |
| [experimentsStartSample.js][experimentsstartsample]                               | Start a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/StartAExperiment.json                                                      |
| [experimentsUpdateSample.js][experimentsupdatesample]                             | The operation to update an experiment. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/PatchExperiment.json                                             |
| [targetTypesGetSample.js][targettypesgetsample]                                   | Get a Target Type resources for given location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetATargetType.json                                     |
| [targetTypesListSample.js][targettypeslistsample]                                 | Get a list of Target Type resources for given location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListTargetTypes.json                            |
| [targetsCreateOrUpdateSample.js][targetscreateorupdatesample]                     | Create or update a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/CreateOrUpdateATarget.json |
| [targetsDeleteSample.js][targetsdeletesample]                                     | Delete a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/DeleteATarget.json                   |
| [targetsGetSample.js][targetsgetsample]                                           | Get a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/GetATarget.json                         |
| [targetsListSample.js][targetslistsample]                                         | Get a list of Target resources that extend a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/preview/2023-04-15-preview/examples/ListTargets.json                |

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

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/capabilitiesCreateOrUpdateSample.js
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/capabilitiesDeleteSample.js
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/capabilitiesGetSample.js
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/capabilitiesListSample.js
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/capabilityTypesGetSample.js
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/capabilityTypesListSample.js
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsCancelSample.js
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsCreateOrUpdateSample.js
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsDeleteSample.js
[experimentsgetexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsGetExecutionDetailsSample.js
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsGetSample.js
[experimentsgetstatussample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsGetStatusSample.js
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsListAllSample.js
[experimentslistallstatusessample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsListAllStatusesSample.js
[experimentslistexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsListExecutionDetailsSample.js
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsListSample.js
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsStartSample.js
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/experimentsUpdateSample.js
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/targetTypesGetSample.js
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/targetTypesListSample.js
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/targetsCreateOrUpdateSample.js
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/targetsDeleteSample.js
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/targetsGetSample.js
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1-beta/javascript/targetsListSample.js
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md
