# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                                         | **Description**                                                                                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [connectedClusterCreateOrReplaceSample.js][connectedclustercreateorreplacesample]                     | API to register a new Kubernetes cluster and create or replace a connected cluster tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/CreateClusterAgentless_KindAWSExample.json |
| [connectedClusterCreateSample.js][connectedclustercreatesample]                                       | API to register a new Kubernetes cluster and create a tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/CreateClusterExample.json                                                        |
| [connectedClusterDeleteSample.js][connectedclusterdeletesample]                                       | Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/DeleteClusterExample.json                                                            |
| [connectedClusterGetSample.js][connectedclustergetsample]                                             | Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/GetClusterExample.json                         |
| [connectedClusterListByResourceGroupSample.js][connectedclusterlistbyresourcegroupsample]             | API to enumerate registered connected K8s clusters under a Resource Group x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/GetClustersByResourceGroupExample.json                                                                |
| [connectedClusterListBySubscriptionSample.js][connectedclusterlistbysubscriptionsample]               | API to enumerate registered connected K8s clusters under a Subscription x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/GetClustersBySubscriptionExample.json                                                                   |
| [connectedClusterListClusterUserCredentialSample.js][connectedclusterlistclusterusercredentialsample] | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/ConnectedClustersListClusterCredentialResultHPAAD.json                         |
| [connectedClusterUpdateSample.js][connectedclusterupdatesample]                                       | API to update certain properties of the connected cluster resource x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/UpdateClusterByPatchExample.json                                                                             |
| [createClusterExample.js][createclusterexample]                                                       | API to register a new Kubernetes cluster and create a tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/CreateClusterExample.json                                                        |
| [deleteClusterExample.js][deleteclusterexample]                                                       | Delete a connected cluster, removing the tracked resource in Azure Resource Manager (ARM). x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/DeleteClusterExample.json                                                                     |
| [getClusterExample.js][getclusterexample]                                                             | Returns the properties of the specified connected cluster, including name, identity, properties, and additional cluster details. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/GetClusterExample.json                                  |
| [getClustersExample.js][getclustersexample]                                                           | API to enumerate registered connected K8s clusters under a Subscription x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/GetClustersBySubscriptionExample.json                                                                            |
| [listClusterUserCredentialCspExample.js][listclusterusercredentialcspexample]                         | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultHPAAD.json                                  |
| [listClusterUserCredentialExample.js][listclusterusercredentialexample]                               | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultCSPAAD.json                                 |
| [listClusterUserCredentialNonAadCspExample.js][listclusterusercredentialnonaadcspexample]             | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultHPToken.json                                |
| [listClusterUserCredentialNonAadExample.js][listclusterusercredentialnonaadexample]                   | Gets cluster user credentials of the connected cluster with a specified resource group and name. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ConnectedClustersListClusterCredentialResultCSPToken.json                               |
| [listConnectedClusterOperationsExample.js][listconnectedclusteroperationsexample]                     | Lists all of the available API operations for Connected Cluster resource. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/ListConnectedClusterOperationsExample.json                                                                     |
| [operationsGetSample.js][operationsgetsample]                                                         | Lists all of the available API operations for Connected Cluster resource. x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/preview/2024-12-01-preview/examples/ListConnectedClusterOperationsExample.json                                                            |
| [updateClusterExample.js][updateclusterexample]                                                       | API to update certain properties of the connected cluster resource x-ms-original-file: specification/hybridkubernetes/resource-manager/Microsoft.Kubernetes/stable/2021-10-01/examples/UpdateClusterExample.json                                                                                             |

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
node connectedClusterCreateOrReplaceSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env HYBRIDKUBERNETES_SUBSCRIPTION_ID="<hybridkubernetes subscription id>" HYBRIDKUBERNETES_RESOURCE_GROUP="<hybridkubernetes resource group>" node connectedClusterCreateOrReplaceSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[connectedclustercreateorreplacesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterCreateOrReplaceSample.js
[connectedclustercreatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterCreateSample.js
[connectedclusterdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterDeleteSample.js
[connectedclustergetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterGetSample.js
[connectedclusterlistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterListByResourceGroupSample.js
[connectedclusterlistbysubscriptionsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterListBySubscriptionSample.js
[connectedclusterlistclusterusercredentialsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterListClusterUserCredentialSample.js
[connectedclusterupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/connectedClusterUpdateSample.js
[createclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/createClusterExample.js
[deleteclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/deleteClusterExample.js
[getclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/getClusterExample.js
[getclustersexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/getClustersExample.js
[listclusterusercredentialcspexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/listClusterUserCredentialCspExample.js
[listclusterusercredentialexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/listClusterUserCredentialExample.js
[listclusterusercredentialnonaadcspexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/listClusterUserCredentialNonAadCspExample.js
[listclusterusercredentialnonaadexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/listClusterUserCredentialNonAadExample.js
[listconnectedclusteroperationsexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/listConnectedClusterOperationsExample.js
[operationsgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/operationsGetSample.js
[updateclusterexample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/hybridkubernetes/arm-hybridkubernetes/samples/v3-beta/javascript/updateClusterExample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure/arm-hybridkubernetes?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/hybridkubernetes/arm-hybridkubernetes/README.md
