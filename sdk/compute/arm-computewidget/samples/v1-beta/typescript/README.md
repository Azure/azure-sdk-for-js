# @azure/arm-computewidget client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-computewidget in some common scenarios.

| **File Name**                                                               | **Description**                                                                                                            |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [employeesCreateOrUpdateSample.ts][employeescreateorupdatesample]           | create a Employee x-ms-original-file: 2022-11-01/Employees_CreateOrUpdate_MaximumSet_Gen.json                              |
| [employeesDeleteSample.ts][employeesdeletesample]                           | delete a Employee x-ms-original-file: 2022-11-01/Employees_Delete_MaximumSet_Gen.json                                      |
| [employeesGetSample.ts][employeesgetsample]                                 | get a Employee x-ms-original-file: 2022-11-01/Employees_Get_MaximumSet_Gen.json                                            |
| [employeesListByResourceGroupSample.ts][employeeslistbyresourcegroupsample] | list Employee resources by resource group x-ms-original-file: 2022-11-01/Employees_ListByResourceGroup_MaximumSet_Gen.json |
| [employeesListBySubscriptionSample.ts][employeeslistbysubscriptionsample]   | list Employee resources by subscription ID x-ms-original-file: 2022-11-01/Employees_ListBySubscription_MaximumSet_Gen.json |
| [employeesUpdateSample.ts][employeesupdatesample]                           | update a Employee x-ms-original-file: 2022-11-01/Employees_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.ts][operationslistsample]                             | list the operations for the provider x-ms-original-file: 2021-11-01/Operations_List.json                                   |

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
node dist/employeesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/employeesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[employeescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/employeesCreateOrUpdateSample.ts
[employeesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/employeesDeleteSample.ts
[employeesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/employeesGetSample.ts
[employeeslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/employeesListByResourceGroupSample.ts
[employeeslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/employeesListBySubscriptionSample.ts
[employeesupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/employeesUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/compute/arm-computewidget/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-computewidget?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/compute/arm-computewidget/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
