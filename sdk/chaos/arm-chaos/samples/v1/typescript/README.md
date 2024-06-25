# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                                                                                          |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.ts][capabilitiescreateorupdatesample]     | Create or update a Capability resource that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CreateUpdateCapability.json   |
| [capabilitiesDeleteSample.ts][capabilitiesdeletesample]                     | Delete a Capability that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteCapability.json                            |
| [capabilitiesGetSample.ts][capabilitiesgetsample]                           | Get a Capability resource that extends a Target resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetCapability.json                         |
| [capabilitiesListSample.ts][capabilitieslistsample]                         | Get a list of Capability resources that extend a Target resource.. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListCapabilities.json             |
| [capabilityTypesGetSample.ts][capabilitytypesgetsample]                     | Get a Capability Type resource for given Target Type and location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetCapabilityType.json            |
| [capabilityTypesListSample.ts][capabilitytypeslistsample]                   | Get a list of Capability Type resources for given Target Type and location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListCapabilityTypes.json |
| [experimentsCancelSample.ts][experimentscancelsample]                       | Cancel a running Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CancelExperiment.json                                          |
| [experimentsCreateOrUpdateSample.ts][experimentscreateorupdatesample]       | Create or update a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CreateUpdateExperiment.json                                  |
| [experimentsDeleteSample.ts][experimentsdeletesample]                       | Delete a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteExperiment.json                                                  |
| [experimentsExecutionDetailsSample.ts][experimentsexecutiondetailssample]   | Execution details of an experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DetailsExperiment.json                                  |
| [experimentsGetExecutionSample.ts][experimentsgetexecutionsample]           | Get an execution of an Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetExperimentExecution.json                              |
| [experimentsGetSample.ts][experimentsgetsample]                             | Get a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetExperiment.json                                                        |
| [experimentsListAllExecutionsSample.ts][experimentslistallexecutionssample] | Get a list of executions of an Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListExperimentExecutions.json                    |
| [experimentsListAllSample.ts][experimentslistallsample]                     | Get a list of Experiment resources in a subscription. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListExperimentsInASubscription.json            |
| [experimentsListSample.ts][experimentslistsample]                           | Get a list of Experiment resources in a resource group. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListExperimentsInAResourceGroup.json         |
| [experimentsStartSample.ts][experimentsstartsample]                         | Start a Experiment resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/StartExperiment.json                                                    |
| [experimentsUpdateSample.ts][experimentsupdatesample]                       | The operation to update an experiment. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/UpdateExperiment.json                                         |
| [operationStatusesGetSample.ts][operationstatusesgetsample]                 | Get the status of a long running azure asynchronous operation. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetOperationStatus.json               |
| [targetTypesGetSample.ts][targettypesgetsample]                             | Get a Target Type resources for given location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetTargetType.json                                   |
| [targetTypesListSample.ts][targettypeslistsample]                           | Get a list of Target Type resources for given location. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListTargetTypes.json                         |
| [targetsCreateOrUpdateSample.ts][targetscreateorupdatesample]               | Create or update a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/CreateUpdateTarget.json |
| [targetsDeleteSample.ts][targetsdeletesample]                               | Delete a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/DeleteTarget.json                 |
| [targetsGetSample.ts][targetsgetsample]                                     | Get a Target resource that extends a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/GetTarget.json                       |
| [targetsListSample.ts][targetslistsample]                                   | Get a list of Target resources that extend a tracked regional resource. x-ms-original-file: specification/chaos/resource-manager/Microsoft.Chaos/stable/2024-01-01/examples/ListTargets.json             |

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
node dist/capabilitiesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env CHAOS_SUBSCRIPTION_ID="<chaos subscription id>" CHAOS_RESOURCE_GROUP="<chaos resource group>" node dist/capabilitiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/capabilitiesCreateOrUpdateSample.ts
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/capabilitiesDeleteSample.ts
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/capabilitiesGetSample.ts
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/capabilitiesListSample.ts
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/capabilityTypesGetSample.ts
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/capabilityTypesListSample.ts
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsCancelSample.ts
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsCreateOrUpdateSample.ts
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsDeleteSample.ts
[experimentsexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsExecutionDetailsSample.ts
[experimentsgetexecutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsGetExecutionSample.ts
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsGetSample.ts
[experimentslistallexecutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsListAllExecutionsSample.ts
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsListAllSample.ts
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsListSample.ts
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsStartSample.ts
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/experimentsUpdateSample.ts
[operationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/operationStatusesGetSample.ts
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/targetTypesGetSample.ts
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/targetTypesListSample.ts
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/targetsCreateOrUpdateSample.ts
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/targetsDeleteSample.ts
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/targetsGetSample.ts
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v1/typescript/src/targetsListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
