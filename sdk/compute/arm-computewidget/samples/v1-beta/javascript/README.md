# @azure/arm-computewidget client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for @azure/arm-computewidget in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                            |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [employeesCreateOrUpdateSample.js][employeescreateorupdatesample]           | create a Employee x-ms-original-file: 2022-11-01/Employees_CreateOrUpdate_MaximumSet_Gen.json                              |
| [employeesDeleteSample.js][employeesdeletesample]                           | delete a Employee x-ms-original-file: 2022-11-01/Employees_Delete_MaximumSet_Gen.json                                      |
| [employeesGetSample.js][employeesgetsample]                                 | get a Employee x-ms-original-file: 2022-11-01/Employees_Get_MaximumSet_Gen.json                                            |
| [employeesListByResourceGroupSample.js][employeeslistbyresourcegroupsample] | list Employee resources by resource group x-ms-original-file: 2022-11-01/Employees_ListByResourceGroup_MaximumSet_Gen.json |
| [employeesListBySubscriptionSample.js][employeeslistbysubscriptionsample]   | list Employee resources by subscription ID x-ms-original-file: 2022-11-01/Employees_ListBySubscription_MaximumSet_Gen.json |
| [employeesUpdateSample.js][employeesupdatesample]                           | update a Employee x-ms-original-file: 2022-11-01/Employees_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.js][operationslistsample]                             | list the operations for the provider x-ms-original-file: 2021-11-01/Operations_List.json                                   |

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
node employeesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node employeesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[employeescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/employeesCreateOrUpdateSample.js
[employeesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/employeesDeleteSample.js
[employeesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/employeesGetSample.js
[employeeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/employeesListByResourceGroupSample.js
[employeeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/employeesListBySubscriptionSample.js
[employeesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/employeesUpdateSample.js
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/javascript/operationsListSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computewidget?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-computewidget/README.md
