# @azure/arm-hybridkubernetes client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-hybridkubernetes in some common scenarios.

| **File Name**                                                                                                             | **Description**                                                                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [connectedClusterOperationsCreateOrReplaceSample.ts][connectedclusteroperationscreateorreplacesample]                     | aPI to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). x-ms-original-file: 2026-05-01/CreateClusterExample.json |
| [connectedClusterOperationsDeleteSample.ts][connectedclusteroperationsdeletesample]                                       | delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). x-ms-original-file: 2026-05-01/DeleteClusterExample.json                                           |
| [connectedClusterOperationsGetSample.ts][connectedclusteroperationsgetsample]                                             | returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. x-ms-original-file: 2026-05-01/GetClusterExample.json        |
| [connectedClusterOperationsListByResourceGroupSample.ts][connectedclusteroperationslistbyresourcegroupsample]             | aPI to enumerate registered connected K8s clusters under a Resource Group x-ms-original-file: 2026-05-01/GetClustersByResourceGroupExample.json                                               |
| [connectedClusterOperationsListBySubscriptionSample.ts][connectedclusteroperationslistbysubscriptionsample]               | aPI to enumerate registered connected K8s clusters under a Subscription x-ms-original-file: 2026-05-01/GetClustersBySubscriptionExample.json                                                  |
| [connectedClusterOperationsListClusterUserCredentialSample.ts][connectedclusteroperationslistclusterusercredentialsample] | gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: 2026-05-01/ConnectedClustersListClusterCredentialResultCSPAAD.json       |
| [connectedClusterOperationsUpdateAsyncSample.ts][connectedclusteroperationsupdateasyncsample]                             | aPI to update certain properties of the connected cluster resource x-ms-original-file: 2026-05-01/UpdateClusterByPatchExample.json                                                            |
| [operationsListSample.ts][operationslistsample]                                                                           | list the operations for the provider x-ms-original-file: 2026-05-01/ListConnectedClusterOperationsExample.json                                                                                |

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
node dist/connectedClusterOperationsCreateOrReplaceSample.js
```

Alternatively, run a single sample with the required environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
node dist/connectedClusterOperationsCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[connectedclusteroperationscreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsCreateOrReplaceSample.ts
[connectedclusteroperationsdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsDeleteSample.ts
[connectedclusteroperationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsGetSample.ts
[connectedclusteroperationslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsListByResourceGroupSample.ts
[connectedclusteroperationslistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsListBySubscriptionSample.ts
[connectedclusteroperationslistclusterusercredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsListClusterUserCredentialSample.ts
[connectedclusteroperationsupdateasyncsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterOperationsUpdateAsyncSample.ts
[operationslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/operationsListSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridkubernetes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridkubernetes/arm-hybridkubernetes/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
