# @azure/arm-chaos client library samples for JavaScript

These sample programs show how to use the JavaScript client libraries for @azure/arm-chaos in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                                         |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| [capabilitiesCreateOrUpdateSample.js][capabilitiescreateorupdatesample]     | create or update a Capability resource that extends a Target resource. x-ms-original-file: 2025-01-01/Capabilities_CreateOrUpdate.json  |
| [capabilitiesDeleteSample.js][capabilitiesdeletesample]                     | delete a Capability that extends a Target resource. x-ms-original-file: 2025-01-01/Capabilities_Delete.json                             |
| [capabilitiesGetSample.js][capabilitiesgetsample]                           | get a Capability resource that extends a Target resource. x-ms-original-file: 2025-01-01/Capabilities_Get.json                          |
| [capabilitiesListSample.js][capabilitieslistsample]                         | get a list of Capability resources that extend a Target resource. x-ms-original-file: 2025-01-01/Capabilities_List.json                 |
| [capabilityTypesGetSample.js][capabilitytypesgetsample]                     | get a Capability Type resource for given Target Type and location. x-ms-original-file: 2025-01-01/CapabilityTypes_Get.json              |
| [capabilityTypesListSample.js][capabilitytypeslistsample]                   | get a list of Capability Type resources for given Target Type and location. x-ms-original-file: 2025-01-01/CapabilityTypes_List.json    |
| [experimentsCancelSample.js][experimentscancelsample]                       | cancel a running Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Cancel.json                                            |
| [experimentsCreateOrUpdateSample.js][experimentscreateorupdatesample]       | create or update a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_CreateOrUpdate.json                                  |
| [experimentsDeleteSample.js][experimentsdeletesample]                       | delete a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Delete.json                                                    |
| [experimentsExecutionDetailsSample.js][experimentsexecutiondetailssample]   | execution details of an experiment resource. x-ms-original-file: 2025-01-01/Experiments_ExecutionDetails.json                           |
| [experimentsGetExecutionSample.js][experimentsgetexecutionsample]           | get an execution of an Experiment resource. x-ms-original-file: 2025-01-01/Experiments_GetExecution.json                                |
| [experimentsGetSample.js][experimentsgetsample]                             | get a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Get.json                                                          |
| [experimentsListAllExecutionsSample.js][experimentslistallexecutionssample] | get a list of executions of an Experiment resource. x-ms-original-file: 2025-01-01/Experiments_ListAllExecutions.json                   |
| [experimentsListAllSample.js][experimentslistallsample]                     | get a list of Experiment resources in a subscription. x-ms-original-file: 2025-01-01/Experiments_ListAll.json                           |
| [experimentsListSample.js][experimentslistsample]                           | get a list of Experiment resources in a resource group. x-ms-original-file: 2025-01-01/Experiments_List.json                            |
| [experimentsStartSample.js][experimentsstartsample]                         | start a Experiment resource. x-ms-original-file: 2025-01-01/Experiments_Start.json                                                      |
| [experimentsUpdateSample.js][experimentsupdatesample]                       | the operation to update an experiment. x-ms-original-file: 2025-01-01/Experiments_Update.json                                           |
| [operationStatusesGetSample.js][operationstatusesgetsample]                 | returns the current status of an async operation. x-ms-original-file: 2025-01-01/OperationStatuses_Get.json                             |
| [operationsListAllSample.js][operationslistallsample]                       | list the operations for the provider x-ms-original-file: 2025-01-01/Operations_List.json                                                |
| [targetTypesGetSample.js][targettypesgetsample]                             | get a Target Type resources for given location. x-ms-original-file: 2025-01-01/TargetTypes_Get.json                                     |
| [targetTypesListSample.js][targettypeslistsample]                           | get a list of Target Type resources for given location. x-ms-original-file: 2025-01-01/TargetTypes_List.json                            |
| [targetsCreateOrUpdateSample.js][targetscreateorupdatesample]               | create or update a Target resource that extends a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_CreateOrUpdate.json |
| [targetsDeleteSample.js][targetsdeletesample]                               | delete a Target resource that extends a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_Delete.json                   |
| [targetsGetSample.js][targetsgetsample]                                     | get a Target resource that extends a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_Get.json                         |
| [targetsListSample.js][targetslistsample]                                   | get a list of Target resources that extend a tracked regional resource. x-ms-original-file: 2025-01-01/Targets_List.json                |

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
cross-env node capabilitiesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[capabilitiescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/capabilitiesCreateOrUpdateSample.js
[capabilitiesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/capabilitiesDeleteSample.js
[capabilitiesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/capabilitiesGetSample.js
[capabilitieslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/capabilitiesListSample.js
[capabilitytypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/capabilityTypesGetSample.js
[capabilitytypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/capabilityTypesListSample.js
[experimentscancelsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsCancelSample.js
[experimentscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsCreateOrUpdateSample.js
[experimentsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsDeleteSample.js
[experimentsexecutiondetailssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsExecutionDetailsSample.js
[experimentsgetexecutionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsGetExecutionSample.js
[experimentsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsGetSample.js
[experimentslistallexecutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsListAllExecutionsSample.js
[experimentslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsListAllSample.js
[experimentslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsListSample.js
[experimentsstartsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsStartSample.js
[experimentsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/experimentsUpdateSample.js
[operationstatusesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/operationStatusesGetSample.js
[operationslistallsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/operationsListAllSample.js
[targettypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/targetTypesGetSample.js
[targettypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/targetTypesListSample.js
[targetscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/targetsCreateOrUpdateSample.js
[targetsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/targetsDeleteSample.js
[targetsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/targetsGetSample.js
[targetslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/chaos/arm-chaos/samples/v2/javascript/targetsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-chaos?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/chaos/arm-chaos/README.md
