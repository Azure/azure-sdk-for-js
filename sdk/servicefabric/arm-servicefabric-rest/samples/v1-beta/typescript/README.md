# client library samples for TypeScript (Beta)

These sample programs show how to use the TypeScript client libraries for in some common scenarios.

| **File Name**                                                                   | **Description**                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [applicationTypesCreateOrUpdateSample.ts][applicationtypescreateorupdatesample] | Create or update a Service Fabric application type name resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNamePutOperation_example.json                                                                                                                                                 |
| [applicationTypesDeleteSample.ts][applicationtypesdeletesample]                 | Delete a Service Fabric application type name resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameDeleteOperation_example.json                                                                                                                                                        |
| [applicationTypesGetSample.ts][applicationtypesgetsample]                       | Get a Service Fabric application type name resource created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameGetOperation_example.json                                                                                                    |
| [applicationTypesListSample.ts][applicationtypeslistsample]                     | Gets all application type name resources created or in the process of being created in the Service Fabric cluster resource. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ApplicationTypeNameListOperation_example.json                                                                                                              |
| [clustersCreateOrUpdateSample.ts][clusterscreateorupdatesample]                 | Create or update a Service Fabric cluster resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterPutOperation_example_max.json                                                                                                                                                                       |
| [clustersDeleteSample.ts][clustersdeletesample]                                 | Delete a Service Fabric cluster resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterDeleteOperation_example.json                                                                                                                                                                                  |
| [clustersGetSample.ts][clustersgetsample]                                       | Get a Service Fabric cluster resource created or in the process of being created in the specified resource group. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterGetOperation_example.json                                                                                                                                     |
| [clustersListByResourceGroupSample.ts][clusterslistbyresourcegroupsample]       | Gets all Service Fabric cluster resources created or in the process of being created in the resource group. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterListByResourceGroupOperation_example.json                                                                                                                           |
| [clustersListSample.ts][clusterslistsample]                                     | Gets all Service Fabric cluster resources created or in the process of being created in the subscription. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterListOperation_example.json                                                                                                                                            |
| [clustersListUpgradableVersionsSample.ts][clusterslistupgradableversionssample] | If a target is not provided, it will get the minimum and maximum versions available from the current cluster version. If a target is given, it will provide the required path to get from the current cluster version to the target version. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ListUpgradableVersionsMinMax_example.json |
| [clustersUpdateSample.ts][clustersupdatesample]                                 | Update the configuration of a Service Fabric cluster resource with the specified name. x-ms-original-file: specification/servicefabric/resource-manager/Microsoft.ServiceFabric/stable/2021-06-01/examples/ClusterPatchOperation_example.json                                                                                                                                                              |

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
node dist/applicationTypesCreateOrUpdateSample.js
```

Alternatively, run a single sample with the correct environment variables set (setting up the `.env` file is not required if you do this), for example (cross-platform):

```bash
cross-env node dist/applicationTypesCreateOrUpdateSample.js
```

## Next Steps

Take a look at our [API Documentation][apiref] for more information about the APIs that are available in the clients.

[applicationtypescreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/applicationTypesCreateOrUpdateSample.ts
[applicationtypesdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/applicationTypesDeleteSample.ts
[applicationtypesgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/applicationTypesGetSample.ts
[applicationtypeslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/applicationTypesListSample.ts
[clusterscreateorupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersCreateOrUpdateSample.ts
[clustersdeletesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersDeleteSample.ts
[clustersgetsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersGetSample.ts
[clusterslistbyresourcegroupsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersListByResourceGroupSample.ts
[clusterslistsample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersListSample.ts
[clusterslistupgradableversionssample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersListUpgradableVersionsSample.ts
[clustersupdatesample]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicefabric/arm-servicefabric-rest/samples/v1-beta/typescript/src/clustersUpdateSample.ts
[apiref]: https://learn.microsoft.com/javascript/api/@azure-rest/arm-servicefabric?view=azure-node-preview
[freesub]: https://azure.microsoft.com/free/
[package]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicefabric/arm-servicefabric-rest/README.md
[typescript]: https://www.typescriptlang.org/docs/home.html
