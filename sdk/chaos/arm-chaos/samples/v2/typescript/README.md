# @azure/arm-chaos client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for @azure/arm-chaos in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                         |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.ts][capabilitiescreateorupdatesample]     | create or update a Capability resource that extends a Target resource. x-ms-original-file: 2025-01-01/Capabilities_CreateOrUpdate.json  |
| [capabilitiesDeleteSample.ts][capabilitiesdeletesample]                     | delete a Capability that extends a Target resource. x-ms-original-file: 2025-01-01/Capabilities_Delete.json                             |
| [capabilitiesGetSample.ts][capabilitiesgetsample]                           | get a Capability resource that extends a Target resource. x-ms-original-file: 2025-01-01/Capabilities_Get.json                          |
| [capabilitiesListSample.ts][capabilitieslistsample]                         | get a list of Capability resources that extend a Target resource. x-ms-original-file: 2025-01-01/Capabilities_List.json                 |
| [capabilityTypesGetSample.ts][capabilitytypesgetsample]                     | get a Capability Type resource for given Target Type and location. x-ms-original-file: 2025-01-01/CapabilityTypes_Get.json              |
| [capabilityTypesListSample.ts][capabilitytypeslistsample]                   | get a list of Capability Type resources for given Target Type and location. x-ms-original-file: 2025-01-01/CapabilityTypes_List.json    |
| [experimentsCancelSample.ts][experimentscancelsample]                       | cancel a running Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Cancel.json                                            |
| [experimentsCreateOrUpdateSample.ts][experimentscreateorupdatesample]       | create or update a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_CreateOrUpdate.json                                  |
| [experimentsDeleteSample.ts][experimentsdeletesample]                       | delete a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Delete.json                                                    |
| [experimentsExecutionDetailsSample.ts][experimentsexecutiondetailssample]   | execution details of an experiment resource. x-ms-original-file: 2025-01-01/Experiments_ExecutionDetails.json                           |
| [experimentsGetExecutionSample.ts][experimentsgetexecutionsample]           | get an execution of an Experiment resource. x-ms-original-file: 2025-01-01/Experiments_GetExecution.json                                |
| [experimentsGetSample.ts][experimentsgetsample]                             | get a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Get.json                                                          |
| [experimentsListAllExecutionsSample.ts][experimentslistallexecutionssample] | get a list of executions of an Experiment resource. x-ms-original-file: 2025-01-01/Experiments_ListAllExecutions.json                   |
| [experimentsListAllSample.ts][experimentslistallsample]                     | get a list of Experiment resources in a subscription. x-ms-original-file: 2025-01-01/Experiments_ListAll.json                           |
| [experimentsListSample.ts][experimentslistsample]                           | get a list of Experiment resources in a resource group. x-ms-original-file: 2025-01-01/Experiments_List.json                            |
| [experimentsStartSample.ts][experimentsstartsample]                         | start a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Start.json                                                      |
| [experimentsUpdateSample.ts][experimentsupdatesample]                       | the operation to update an experiment. x-ms-original-file: 2025-01-01/Experiments_Update.json                                           |
| [operationStatusesGetSample.ts][operationstatusesgetsample]                 | returns the current status of an async operation. x-ms-original-file: 2025-01-01/OperationStatuses_Get.json                             |
| [operationsListAllSample.ts][operationslistallsample]                       | list the operations for the provider x-ms-original-file: 2025-01-01/Operations_List.json                                                |
| [targetTypesGetSample.ts][targettypesgetsample]                             | get a Target Type resources for given location. x-ms-original-file: 2025-01-01/TargetTypes_Get.json                                     |
| [targetTypesListSample.ts][targettypeslistsample]                           | get a list of Target Type resources for given location. x-ms-original-file: 2025-01-01/TargetTypes_List.json                            |
| [targetsCreateOrUpdateSample.ts][targetscreateorupdatesample]               | create or update a Target resource that extends a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_CreateOrUpdate.json |
| [targetsDeleteSample.ts][targetsdeletesample]                               | delete a Target resource that extends a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_Delete.json                   |
| [targetsGetSample.ts][targetsgetsample]                                     | get a Target resource that extends a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_Get.json                         |
| [targetsListSample.ts][targetslistsample]                                   | get a list of Target resources that extend a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_List.json                |

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
cross-env node dist/capabilitiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/capabilitiesCreateOrUpdateSample.ts
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/capabilitiesDeleteSample.ts
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/capabilitiesGetSample.ts
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/capabilitiesListSample.ts
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/capabilityTypesGetSample.ts
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/capabilityTypesListSample.ts
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsCancelSample.ts
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsCreateOrUpdateSample.ts
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsDeleteSample.ts
[experimentsexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsExecutionDetailsSample.ts
[experimentsgetexecutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsGetExecutionSample.ts
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsGetSample.ts
[experimentslistallexecutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsListAllExecutionsSample.ts
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsListAllSample.ts
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsListSample.ts
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsStartSample.ts
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/experimentsUpdateSample.ts
[operationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/operationStatusesGetSample.ts
[operationslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/operationsListAllSample.ts
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/targetTypesGetSample.ts
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/targetTypesListSample.ts
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/targetsCreateOrUpdateSample.ts
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/targetsDeleteSample.ts
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/targetsGetSample.ts
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/typescript/src/targetsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
