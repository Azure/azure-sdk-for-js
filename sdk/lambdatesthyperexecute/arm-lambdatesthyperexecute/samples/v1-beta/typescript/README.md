# @azure/arm-lambdatesthyperexecute client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-lambdatesthyperexecute in some common scenarios.

| **File Name**                                                                       | **Description**                                                                                                                            |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| [operationsListSample.ts][operationslistsample]                                     | list the operations for the provider x-ms-original-file: 2024-02-01/Operations_List_MaximumSet_Gen.json                                    |
| [organizationsCreateOrUpdateSample.ts][organizationscreateorupdatesample]           | create a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_CreateOrUpdate_MaximumSet_Gen.json                              |
| [organizationsDeleteSample.ts][organizationsdeletesample]                           | delete a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_Delete_MaximumSet_Gen.json                                      |
| [organizationsGetSample.ts][organizationsgetsample]                                 | get a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_Get_MaximumSet_Gen.json                                            |
| [organizationsListByResourceGroupSample.ts][organizationslistbyresourcegroupsample] | list OrganizationResource resources by resource group x-ms-original-file: 2024-02-01/Organizations_ListByResourceGroup_MaximumSet_Gen.json |
| [organizationsListBySubscriptionSample.ts][organizationslistbysubscriptionsample]   | list OrganizationResource resources by subscription ID x-ms-original-file: 2024-02-01/Organizations_ListBySubscription_MaximumSet_Gen.json |
| [organizationsUpdateSample.ts][organizationsupdatesample]                           | update a OrganizationResource x-ms-original-file: 2024-02-01/Organizations_Update_MaximumSet_Gen.json                                      |

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
node dist/operationsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/operationsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/operationsListSample.ts
[organizationscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/organizationsCreateOrUpdateSample.ts
[organizationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/organizationsDeleteSample.ts
[organizationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/organizationsGetSample.ts
[organizationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/organizationsListByResourceGroupSample.ts
[organizationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/organizationsListBySubscriptionSample.ts
[organizationsupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/samples/v1-beta/typescript/src/organizationsUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-lambdatesthyperexecute?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/lambdatesthyperexecute/arm-lambdatesthyperexecute/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
