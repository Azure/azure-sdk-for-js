# client library samples for TypeScript

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                             | **Description**                                                                                                                                                                                                                                                                |
| ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [createClusterExample.ts][createclusterexample]                                           | API to register a new Kubernetes cluster and create a tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/CreateClusterExample.json                          |
| [deleteClusterExample.ts][deleteclusterexample]                                           | Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/DeleteClusterExample.json                                       |
| [getClusterExample.ts][getclusterexample]                                                 | Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/GetClusterExample.json    |
| [getClustersExample.ts][getclustersexample]                                               | API to enumerate registered connected K8s clusters under a Subscription x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/GetClustersBySubscriptionExample.json                                              |
| [listClusterUserCredentialCspExample.ts][listclusterusercredentialcspexample]             | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultHPAAD.json    |
| [listClusterUserCredentialExample.ts][listclusterusercredentialexample]                   | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultCSPAAD.json   |
| [listClusterUserCredentialNonAadCspExample.ts][listclusterusercredentialnonaadcspexample] | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultHPToken.json  |
| [listClusterUserCredentialNonAadExample.ts][listclusterusercredentialnonaadexample]       | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultCSPToken.json |
| [listConnectedClusterOperationsExample.ts][listconnectedclusteroperationsexample]         | Lists all of the available API operations for Connected Cluster resource. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ListConnectedClusterOperationsExample.json                                       |
| [updateClusterExample.ts][updateclusterexample]                                           | API to update certain properties of the connected cluster resource x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/UpdateClusterExample.json                                                               |

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
node dist/createClusterExample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
npx cross-env  node dist/createClusterExample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[createclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/createClusterExample.ts
[deleteclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/deleteClusterExample.ts
[getclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/getClusterExample.ts
[getclustersexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/getClustersExample.ts
[listclusterusercredentialcspexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/listClusterUserCredentialCspExample.ts
[listclusterusercredentialexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/listClusterUserCredentialExample.ts
[listclusterusercredentialnonaadcspexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/listClusterUserCredentialNonAadCspExample.ts
[listclusterusercredentialnonaadexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/listClusterUserCredentialNonAadExample.ts
[listconnectedclusteroperationsexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/listConnectedClusterOperationsExample.ts
[updateclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v2/typescript/src/updateClusterExample.ts
[apiref]: https://docs.microsoft.com/javascript/api/@azure/arm-hybridkubernetes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridkubernetes/arm-hybridkubernetes/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
