# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [offeringsListSample.ts][offeringslistsample]                                   | Returns the list of all provider offerings available for the given location. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/offeringsList.json                                                                                                                             |
| [operationsListSample.ts][operationslistsample]                                 | Returns list of operations. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/operations.json                                                                                                                                                                                 |
| [workspaceCheckNameAvailabilitySample.ts][workspacechecknameavailabilitysample] | Check the availability of the resource name. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesCheckNameAvailability.json                                                                                                                                    |
| [workspaceListKeysSample.ts][workspacelistkeyssample]                           | Get the keys to use with the Quantum APIs. A key is used to authenticate and authorize access to the Quantum REST APIs. Only one key is needed at a time; two are given to provide seamless key regeneration. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/listKeys.json |
| [workspaceRegenerateKeysSample.ts][workspaceregeneratekeyssample]               | Regenerate either the primary or secondary key for use with the Quantum APIs. The old key will stop working immediately. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/regenerateKey.json                                                                                 |
| [workspacesCreateOrUpdateSample.ts][workspacescreateorupdatesample]             | Creates or updates a workspace resource. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesPut.json                                                                                                                                                          |
| [workspacesDeleteSample.ts][workspacesdeletesample]                             | Deletes a Workspace resource. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesDelete.json                                                                                                                                                                  |
| [workspacesGetSample.ts][workspacesgetsample]                                   | Returns the Workspace resource associated with the given name. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesGet.json                                                                                                                                    |
| [workspacesListByResourceGroupSample.ts][workspaceslistbyresourcegroupsample]   | Gets the list of Workspaces within a resource group. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesListResourceGroup.json                                                                                                                                |
| [workspacesListBySubscriptionSample.ts][workspaceslistbysubscriptionsample]     | Gets the list of Workspaces within a Subscription. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesListSubscription.json                                                                                                                                   |
| [workspacesUpdateTagsSample.ts][workspacesupdatetagssample]                     | Updates an existing workspace's tags. x-ms-original-file: specification/quantum/resource-manager/Microsoft.Quantum/preview/2023-11-13-preview/examples/quantumWorkspacesPatch.json                                                                                                                                                           |

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
node dist/offeringsListSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env QUANTUM_SUBSCRIPTION_ID="<quantum subscription id>" node dist/offeringsListSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[offeringslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/offeringsListSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/operationsListSample.ts
[workspacechecknameavailabilitysample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspaceCheckNameAvailabilitySample.ts
[workspacelistkeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspaceListKeysSample.ts
[workspaceregeneratekeyssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspaceRegenerateKeysSample.ts
[workspacescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspacesCreateOrUpdateSample.ts
[workspacesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspacesDeleteSample.ts
[workspacesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspacesGetSample.ts
[workspaceslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspacesListByResourceGroupSample.ts
[workspaceslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspacesListBySubscriptionSample.ts
[workspacesupdatetagssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/quantum/arm-quantum/samples/v1-beta/typescript/src/workspacesUpdateTagsSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-quantum?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/quantum/arm-quantum/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
