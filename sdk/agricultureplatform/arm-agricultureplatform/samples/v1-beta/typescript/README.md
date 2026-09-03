# @azure/arm-agricultureplatform client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-agricultureplatform in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                 |
| ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| [agriServiceCreateOrUpdateSample.ts][agriservicecreateorupdatesample]                 | create a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_CreateOrUpdate_MaximumSet_Gen.json                              |
| [agriServiceDeleteSample.ts][agriservicedeletesample]                                 | delete a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_Delete_MaximumSet_Gen.json                                      |
| [agriServiceGetSample.ts][agriservicegetsample]                                       | get a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_Get_MaximumSet_Gen.json                                            |
| [agriServiceListAvailableSolutionsSample.ts][agriservicelistavailablesolutionssample] | returns the list of available agri solutions. x-ms-original-file: 2024-06-01-preview/AgriService_ListAvailableSolutions_MaximumSet_Gen.json     |
| [agriServiceListByResourceGroupSample.ts][agriservicelistbyresourcegroupsample]       | list AgriServiceResource resources by resource group x-ms-original-file: 2024-06-01-preview/AgriService_ListByResourceGroup_MaximumSet_Gen.json |
| [agriServiceListBySubscriptionSample.ts][agriservicelistbysubscriptionsample]         | list AgriServiceResource resources by subscription ID x-ms-original-file: 2024-06-01-preview/AgriService_ListBySubscription_MaximumSet_Gen.json |
| [agriServiceUpdateSample.ts][agriserviceupdatesample]                                 | update a AgriServiceResource x-ms-original-file: 2024-06-01-preview/AgriService_Update_MaximumSet_Gen.json                                      |
| [operationsListSample.ts][operationslistsample]                                       | list the operations for the provider x-ms-original-file: 2024-06-01-preview/Operations_List_MaximumSet_Gen.json                                 |

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
node dist/agriServiceCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/agriServiceCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[agriservicecreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceCreateOrUpdateSample.ts
[agriservicedeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceDeleteSample.ts
[agriservicegetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceGetSample.ts
[agriservicelistavailablesolutionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceListAvailableSolutionsSample.ts
[agriservicelistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceListByResourceGroupSample.ts
[agriservicelistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceListBySubscriptionSample.ts
[agriserviceupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/agriServiceUpdateSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/agricultureplatform/arm-agricultureplatform/samples/v1-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-agricultureplatform?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/agricultureplatform/arm-agricultureplatform/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
