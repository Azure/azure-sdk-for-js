# client library samples for JavaScript (Beta)

These sample programs show how to use the JavaScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationTypesCreateOrUpdateSample.js][applicationtypescreateorupdatesample] | Create or update a Service Fabric application type name resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNamePutOperation_example.json                                                                                                                                                 |
| [applicationTypesDeleteSample.js][applicationtypesdeletesample]                 | Delete a Service Fabric application type name resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameDeleteOperation_example.json                                                                                                                                                        |
| [applicationTypesGetSample.js][applicationtypesgetsample]                       | Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameGetOperation_example.json                                                                                                    |
| [applicationTypesListSample.js][applicationtypeslistsample]                     | Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameListOperation_example.json                                                                                                              |
| [clustersCreateOrUpdateSample.js][clusterscreateorupdatesample]                 | Create or update a Service Fabric cluster resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterPutOperation_example_max.json                                                                                                                                                                       |
| [clustersDeleteSample.js][clustersdeletesample]                                 | Delete a Service Fabric cluster resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterDeleteOperation_example.json                                                                                                                                                                                  |
| [clustersGetSample.js][clustersgetsample]                                       | Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterGetOperation_example.json                                                                                                                                     |
| [clustersListByResourceGroupSample.js][clusterslistbyresourcegroupsample]       | Gets all Service Fabric cluster resources created or in the process of being created in the resource group. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterListByResourceGroupOperation_example.json                                                                                                                           |
| [clustersListSample.js][clusterslistsample]                                     | Gets all Service Fabric cluster resources created or in the process of being created in the subscription. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterListOperation_example.json                                                                                                                                            |
| [clustersListUpgradableVersionsSample.js][clusterslistupgradableversionssample] | If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ListUpgradableVersionsMinMax_example.json |
| [clustersUpdateSample.js][clustersupdatesample]                                 | Update the configuration of a Service Fabric cluster resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterPatchOperation_example.json                                                                                                                                                              |

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
node applicationTypesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node applicationTypesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationtypescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/applicationTypesCreateOrUpdateSample.js
[applicationtypesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/applicationTypesDeleteSample.js
[applicationtypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/applicationTypesGetSample.js
[applicationtypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/applicationTypesListSample.js
[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersCreateOrUpdateSample.js
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersDeleteSample.js
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersGetSample.js
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersListByResourceGroupSample.js
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersListSample.js
[clusterslistupgradableversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersListUpgradableVersionsSample.js
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/javascript/clustersUpdateSample.js
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/arm-servicefabric?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicefabric/arm-servicefabric-rest/README.md
