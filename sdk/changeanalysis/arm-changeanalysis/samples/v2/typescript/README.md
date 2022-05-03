# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                         | **Description**                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [changesListChangesByResourceGroupSample.ts][changeslistchangesbyresourcegroupsample] | List the changes of a resource group within the specified time range. Customer data will always be masked. x-ms-original-file: specification/changeanalysis/resource-manager/Microsoft.ChangeAnalysis/stable/2021-04-01/examples/ChangesListChangesByResourceGroup.json      |
| [changesListChangesBySubscriptionSample.ts][changeslistchangesbysubscriptionsample]   | List the changes of a subscription within the specified time range. Customer data will always be masked. x-ms-original-file: specification/changeanalysis/resource-manager/Microsoft.ChangeAnalysis/stable/2021-04-01/examples/ChangesListChangesBySubscription.json         |
| [operationsListSample.ts][operationslistsample]                                       | Lists all the supported operations by the Microsoft.ChangeAnalysis resource provider along with their descriptions. x-ms-original-file: specification/changeanalysis/resource-manager/Microsoft.ChangeAnalysis/stable/2021-04-01/examples/OperationsList.json                |
| [resourceChangesListSample.ts][resourcechangeslistsample]                             | List the changes of a resource within the specified time range. Customer data will be masked if the user doesn't have access. x-ms-original-file: specification/changeanalysis/resource-manager/Microsoft.ChangeAnalysis/stable/2021-04-01/examples/ResourceChangesList.json |

## Prerequisites

The sample programs are compatible with [LTS versions of Node.js](https://nodejs.org/about/releases/).

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
node dist/changesListChangesByResourceGroupSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/changesListChangesByResourceGroupSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[changeslistchangesbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/changeanalysis/arm-changeanalysis/samples/v2/typescript/src/changesListChangesByResourceGroupSample.ts
[changeslistchangesbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/changeanalysis/arm-changeanalysis/samples/v2/typescript/src/changesListChangesBySubscriptionSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/changeanalysis/arm-changeanalysis/samples/v2/typescript/src/operationsListSample.ts
[resourcechangeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/changeanalysis/arm-changeanalysis/samples/v2/typescript/src/resourceChangesListSample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-changeanalysis?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/changeanalysis/arm-changeanalysis/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
