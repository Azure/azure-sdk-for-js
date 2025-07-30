# @azure/arm-hybridkubernetes client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for @azure/arm-hybridkubernetes in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                        |
| ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [connectedClusterCreateOrReplaceSample.ts][connectedclustercreateorreplacesample]                     | aPI to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). x-ms-original-file: 2024-12-01-preview/CreateClusterAgentless_KindAWSExample.json |
| [connectedClusterDeleteSample.ts][connectedclusterdeletesample]                                       | delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). x-ms-original-file: 2024-12-01-preview/DeleteClusterExample.json                                                            |
| [connectedClusterGetSample.ts][connectedclustergetsample]                                             | returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. x-ms-original-file: 2024-12-01-preview/GetClusterExample.json                         |
| [connectedClusterListByResourceGroupSample.ts][connectedclusterlistbyresourcegroupsample]             | aPI to enumerate registered connected K8s clusters under a Resource Group x-ms-original-file: 2024-12-01-preview/GetClustersByResourceGroupExample.json                                                                |
| [connectedClusterListBySubscriptionSample.ts][connectedclusterlistbysubscriptionsample]               | aPI to enumerate registered connected K8s clusters under a Subscription x-ms-original-file: 2024-12-01-preview/GetClustersBySubscriptionExample.json                                                                   |
| [connectedClusterListClusterUserCredentialSample.ts][connectedclusterlistclusterusercredentialsample] | gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: 2024-12-01-preview/ConnectedClustersListClusterCredentialResultCSPAAD.json                        |
| [connectedClusterUpdateSample.ts][connectedclusterupdatesample]                                       | aPI to update certain properties of the connected cluster resource x-ms-original-file: 2024-12-01-preview/UpdateClusterByPatchExample.json                                                                             |
| [operationsGetSample.ts][operationsgetsample]                                                         | list the operations for the provider x-ms-original-file: 2024-12-01-preview/ListConnectedClusterOperationsExample.json                                                                                                 |

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
node dist/connectedClusterCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx dev-tool run vendored cross-env  node dist/connectedClusterCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[connectedclustercreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterCreateOrReplaceSample.ts
[connectedclusterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterDeleteSample.ts
[connectedclustergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterGetSample.ts
[connectedclusterlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterListByResourceGroupSample.ts
[connectedclusterlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterListBySubscriptionSample.ts
[connectedclusterlistclusterusercredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterListClusterUserCredentialSample.ts
[connectedclusterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/connectedClusterUpdateSample.ts
[operationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/typescript/src/operationsGetSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridkubernetes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridkubernetes/arm-hybridkubernetes/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
